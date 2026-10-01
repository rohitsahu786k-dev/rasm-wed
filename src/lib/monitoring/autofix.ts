/**
 * Technical auto-fix. Two tiers, matching the risk engine:
 *
 *  LEVEL 1 (fixed automatically, no deploy needed, all in WordPress data, every change logged and reversible):
 *    - missing / duplicate meta descriptions -> unique description written by the cheap model, saved in Rank Math
 *    - media-library images without alt text -> alt derived from the image title (deterministic, no AI)
 *
 *  LEVEL 3 (never auto-applied): anything that needs a code change (canonicals, noindex, 5xx, redirects, schema code...).
 *    The strong model produces a root-cause diagnosis and a concrete fix proposal, stored for review / PR creation.
 */
import type { Store } from '../automation/store.ts';
import { logAction } from '../automation/store.ts';
import type { AuditReport, Issue } from './health-audit.ts';
import { runAi } from '../ai/client.ts';
import { setRankMath, type WpCreds } from '../content/wp-publisher.ts';

type F = typeof fetch;
const auth = (c: WpCreds) => ({ Authorization: `Basic ${Buffer.from(`${c.username}:${c.appPassword}`).toString('base64')}` });
const strip = (h: string) => h.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();

export interface WpObject {
  id: number;
  kind: 'posts' | 'pages';
  title: string;
  text: string;
}

async function findWpObject(c: WpCreds, path: string, f: F): Promise<WpObject | null> {
  const slug = path.replace(/^\/|\/$/g, '');
  if (!slug) return null;
  for (const kind of ['posts', 'pages'] as const) {
    const r = await f(`${c.url}/wp-json/wp/v2/${kind}?slug=${encodeURIComponent(slug)}&context=edit&_fields=id,title,content`, { headers: auth(c), signal: AbortSignal.timeout(30_000) });
    const j = (await r.json().catch(() => [])) as { id: number; title: { raw: string }; content: { raw: string } }[];
    if (Array.isArray(j) && j[0]) return { id: j[0].id, kind, title: j[0].title.raw, text: strip(j[0].content.raw).slice(0, 2500) };
  }
  return null;
}

export const validDescription = (d: unknown): d is string => typeof d === 'string' && d.length >= 110 && d.length <= 158 && !/[<>]/.test(d);

export async function fixDescriptions(
  c: WpCreds,
  issues: Issue[],
  store: Store,
  deps: { fetchImpl?: F; run?: typeof runAi; max?: number } = {},
) {
  const f = deps.fetchImpl ?? fetch;
  const run = deps.run ?? runAi;
  const targets = [...new Map(issues.filter((i) => i.code === 'missing-description' || i.code === 'duplicate-description').map((i) => [new URL(i.url).pathname, i])).values()].slice(0, deps.max ?? 6);
  const fixed: string[] = [];
  for (const issue of targets) {
    const path = new URL(issue.url).pathname;
    const obj = await findWpObject(c, path, f);
    if (!obj) continue;
    const r = await run<{ description: string }>({
      task: 'title-meta-generation',
      priority: 'P3',
      json: true,
      maxOutputTokens: 300,
      instructions:
        'Write ONE meta description for this web page: 120-155 characters, specific to the page content, natural language, no clickbait, no quotes, no claims that are not in the text (no prices, rankings, awards). Return JSON {"description": "..."}.',
      input: `Page title: ${obj.title}\nContent excerpt: ${obj.text}`,
    });
    if (!validDescription(r.output.description)) continue;
    await setRankMath(c, obj.id, { rank_math_description: r.output.description }, f);
    await logAction(store, { agent: 'seo-autofix', task: 'fix-meta-description', reason: issue.code, target: path, after: r.output.description, model: r.model, tokensIn: r.tokensIn, tokensOut: r.tokensOut, costUsd: r.costUsd, risk: 1, result: `rank math description set on ${obj.kind}/${obj.id}` });
    fixed.push(path);
  }
  return fixed;
}

const humanize = (s: string) =>
  s
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/-e\d{6,}|-scaled|-\d{2,4}x\d{2,4}/gi, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Fills empty alt text in the media library from the image title. Deterministic: no AI cost. */
export async function fixMediaAlt(c: WpCreds, store: Store, deps: { fetchImpl?: F; max?: number } = {}) {
  const f = deps.fetchImpl ?? fetch;
  const r = await f(`${c.url}/wp-json/wp/v2/media?per_page=100&media_type=image&_fields=id,alt_text,title,source_url`, { headers: auth(c), signal: AbortSignal.timeout(30_000) });
  const items = ((await r.json().catch(() => [])) as { id: number; alt_text: string; title: { rendered: string }; source_url: string }[]) ?? [];
  const missing = (Array.isArray(items) ? items : []).filter((m) => !m.alt_text?.trim()).slice(0, deps.max ?? 40);
  let n = 0;
  for (const m of missing) {
    const alt = humanize(m.title?.rendered || m.source_url.split('/').pop() || '');
    if (alt.length < 4 || /^(img|image|dsc|screenshot|untitled|download|border)\b/i.test(alt)) continue; // meaningless names stay untouched
    const u = await f(`${c.url}/wp-json/wp/v2/media/${m.id}`, { method: 'POST', headers: { ...auth(c), 'Content-Type': 'application/json' }, body: JSON.stringify({ alt_text: alt }), signal: AbortSignal.timeout(30_000) });
    if (u.ok) n++;
  }
  if (n) await logAction(store, { agent: 'seo-autofix', task: 'fix-media-alt', reason: 'empty alt text', risk: 1, result: `${n} media item(s) given alt text from their titles` });
  return n;
}

/** Root-cause diagnosis for issues that need a code change. Proposals only; never applied automatically. */
export async function diagnoseUnfixable(
  issues: Issue[],
  store: Store,
  deps: { run?: typeof runAi; max?: number; now?: number } = {},
) {
  const run = deps.run ?? runAi;
  const now = deps.now ?? Date.now();
  const done = (await store.getJson<Record<string, string>>('diagnosed')) ?? {};
  const fixable = new Set(['missing-description', 'duplicate-description', 'image-alt-missing', 'long-title']);
  const todo = issues.filter((i) => (i.severity === 'CRITICAL' || i.severity === 'HIGH') && !fixable.has(i.code)).filter((i) => now - Date.parse(done[`${i.code}|${i.url}`] ?? '1970-01-01') > 7 * 86400_000).slice(0, deps.max ?? 4);
  const out: { code: string; url: string; diagnosis: string }[] = [];
  for (const i of todo) {
    const r = await run<{ rootCause: string; proposedFix: string; filesLikelyInvolved: string[]; risk: string }>({
      task: 'code-repair',
      priority: 'P2',
      json: true,
      maxOutputTokens: 900,
      instructions:
        'You are a senior Next.js 16 (App Router, ISR, headless WordPress) engineer. Given a production health-audit issue, give the most likely root cause and a minimal, safe fix. Be concrete, do not invent file contents you cannot know. Return JSON {"rootCause","proposedFix","filesLikelyInvolved":[],"risk":"low|medium|high"}.',
      input: JSON.stringify(i),
    });
    await store.append('recommendations', { ts: new Date(now).toISOString(), issue: i, ...r.output, status: 'needs-review' });
    await logAction(store, { agent: 'nextjs-engineer', task: 'diagnose-issue', reason: `${i.code} ${i.url}`, model: r.model, tokensIn: r.tokensIn, tokensOut: r.tokensOut, costUsd: r.costUsd, risk: 3, result: 'diagnosis stored; requires human/PR review' });
    done[`${i.code}|${i.url}`] = new Date(now).toISOString();
    out.push({ code: i.code, url: i.url, diagnosis: r.output.rootCause });
  }
  await store.setJson('diagnosed', done);
  return out;
}

export async function runAutofix(c: WpCreds, report: AuditReport, store: Store, deps: { fetchImpl?: F; run?: typeof runAi } = {}) {
  const descriptions = await fixDescriptions(c, report.issues, store, deps);
  const alt = await fixMediaAlt(c, store, deps);
  const diagnosed = await diagnoseUnfixable(report.issues, store, deps);
  return { descriptionsFixed: descriptions, mediaAltFixed: alt, diagnosed };
}
