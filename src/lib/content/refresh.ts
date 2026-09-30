/**
 * Quality refresh for pages WE authored that Search Console keeps reporting as "crawled/discovered - not indexed".
 * Conservative by design: max 1 page per run, page must be 28+ days old, at most one refresh per page every 45 days,
 * the rewrite must pass the full quality gate AND the body-uniqueness gate, and dateModified only changes because the
 * content really changed. The old text is kept in WordPress revisions.
 */
import type { Store } from '../automation/store.ts';
import { logAction } from '../automation/store.ts';
import { fetchRetry } from '../net.ts';
import { writeArticle } from './article.ts';
import { evaluateArticle } from './quality.ts';
import { isUniqueEnough, measureUniqueness } from './uniqueness.ts';
import { loadBodies, loadContext, loadOwnerFacts } from './pipeline.ts';
import { updatePost, type WpCreds } from './wp-publisher.ts';

interface Memory {
  ts: string;
  slug: string;
  topic: string;
  primaryKeyword: string;
  hubSlug?: string;
  family?: string;
}

export async function refreshOne(creds: WpCreds, siteUrl: string, store: Store, deps: { fetchImpl?: typeof fetch; now?: number } = {}) {
  const f = deps.fetchImpl ?? fetch;
  const now = deps.now ?? Date.now();
  const queue = (await store.getJson<string[]>('refresh_queue')) ?? [];
  if (queue.length === 0) return { status: 'skipped', reason: 'refresh queue empty' } as const;
  const memory = await store.list<Memory>('content_articles');
  const log = (await store.getJson<Record<string, string>>('refresh_log')) ?? {};

  const target = queue
    .map((u) => ({ url: u, slug: new URL(u).pathname.replace(/^\/|\/$/g, '') }))
    .map((q) => ({ ...q, mem: memory.find((m) => m.slug === q.slug) }))
    .find((q) => q.mem && now - Date.parse(q.mem.ts) > 28 * 86400_000 && now - Date.parse(log[q.slug] ?? '1970-01-01') > 45 * 86400_000);
  if (!target?.mem) return { status: 'skipped', reason: 'no eligible authored page in queue' } as const;

  const h = { Authorization: `Basic ${Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')}` };
  const r = await fetchRetry(f, `${creds.url}/wp-json/wp/v2/posts?slug=${target.slug}&context=edit&_fields=id,content`, { headers: h });
  const [post] = ((await r.json().catch(() => [])) as { id: number; content: { raw: string } }[]) ?? [];
  if (!post) return { status: 'skipped', reason: 'post not found' } as const;

  const ctx = await loadContext({ creds, siteUrl }, store);
  const links = ctx.links.filter((l) => l.path !== `/${target.slug}/`);
  const facts = await loadOwnerFacts(creds, f);
  const feedback = [
    'The previous version of this page was crawled by Google but NOT indexed. Rewrite it to be substantially deeper, more original and more specific than a generic guide: concrete practical detail, decisions and trade-offs, original structure and wording. Keep every fact hedged and verifiable.',
  ];
  const plan = { topic: target.mem.topic, primaryKeyword: target.mem.primaryKeyword, secondaryKeywords: [], searchIntent: 'Improve depth and originality', audience: 'couples and families planning a destination wedding in India', whyNeeded: 'Quality refresh of a page not indexed by Google', slug: target.slug };
  const article = await writeArticle(plan, links, feedback, undefined, { ownerFacts: facts, hubSlug: target.mem.hubSlug });
  article.slug = target.slug;

  const gate = evaluateArticle(article, {
    allowedInternalPaths: new Set(ctx.links.map((l) => l.path)),
    existingTitles: [],
    siteOrigin: siteUrl.replace(/\/$/, ''),
    requiredLinks: target.mem.hubSlug && target.mem.family !== 'hub' ? [`/${target.mem.hubSlug}/`] : [],
  });
  const corpus = (await loadBodies(creds, f)).filter((b) => b.id !== target.slug);
  const uniq = measureUniqueness(article.html, corpus);
  if (!gate.pass || !isUniqueEnough(uniq)) {
    await logAction(store, { agent: 'content-editor', task: 'refresh-page', reason: 'not indexed', target: target.url, evidence: gate.failures, risk: 2, result: 'rewrite rejected by gates; page left unchanged' });
    return { status: 'rejected', slug: target.slug, failures: gate.failures } as const;
  }
  await updatePost(creds, post.id, { html: article.html, excerpt: article.excerpt }, f);
  log[target.slug] = new Date(now).toISOString();
  await store.setJson('refresh_log', log);
  await logAction(store, { agent: 'content-editor', task: 'refresh-page', reason: 'crawled/discovered but not indexed', target: target.url, before: { chars: post.content.raw.length }, after: { words: gate.words }, risk: 2, tests: { gate: 'passed', uniqueness: uniq }, result: `post ${post.id} refreshed` });
  return { status: 'refreshed', slug: target.slug, words: gate.words } as const;
}
