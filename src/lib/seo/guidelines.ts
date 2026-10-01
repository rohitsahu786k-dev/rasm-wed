/**
 * Google Guidelines Knowledge Store. Weekly: fetch a watchlist of PRIMARY Google Search documentation pages,
 * detect content changes, and (budget permitting) have the strong model summarise what changed and what it
 * means for this site. Third-party SEO blogs are never sources.
 */
import { createHash } from 'node:crypto';
import type { Store } from '../automation/store.ts';

export const GUIDELINE_WATCHLIST: { id: string; url: string }[] = [
  { id: 'search-essentials', url: 'https://developers.google.com/search/docs/essentials' },
  { id: 'spam-policies', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
  { id: 'structured-data-gallery', url: 'https://developers.google.com/search/docs/appearance/structured-data/search-gallery' },
  { id: 'javascript-seo', url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics' },
  { id: 'core-web-vitals', url: 'https://developers.google.com/search/docs/appearance/core-web-vitals' },
  { id: 'ai-features', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
  { id: 'image-seo', url: 'https://developers.google.com/search/docs/appearance/google-images' },
  { id: 'video-seo', url: 'https://developers.google.com/search/docs/appearance/video' },
  { id: 'crawling-overview', url: 'https://developers.google.com/search/docs/crawling-indexing/overview' },
  { id: 'search-console-api', url: 'https://developers.google.com/webmaster-tools' },
  { id: 'search-updates', url: 'https://developers.google.com/search/updates' },
];

export interface GuidelineSnapshot {
  id: string;
  url: string;
  hash: string;
  checkedAt: string;
  lines: string[];
}

export interface GuidelineChange {
  ts: string;
  id: string;
  url: string;
  added: string[];
  removed: string[];
  summary?: string;
  status: 'new' | 'reviewed';
}

export const htmlToLines = (html: string) =>
  html
    .replace(/<(script|style|nav|footer|header)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|li|h[1-6]|div|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter((l) => l.length > 25);

export function diffLines(before: string[], after: string[]) {
  const b = new Set(before);
  const a = new Set(after);
  return { added: after.filter((l) => !b.has(l)), removed: before.filter((l) => !a.has(l)) };
}

export async function checkGuidelines(
  store: Store,
  opts: { fetchImpl?: typeof fetch; interpret?: (change: GuidelineChange) => Promise<string | undefined> } = {},
) {
  const f = opts.fetchImpl ?? fetch;
  const changes: GuidelineChange[] = [];
  for (const doc of GUIDELINE_WATCHLIST) {
    let html: string;
    try {
      const r = await f(doc.url, { signal: AbortSignal.timeout(20_000), headers: { 'User-Agent': 'rasm-seo-agent/1.0' } });
      if (!r.ok) continue;
      html = await r.text();
    } catch {
      continue;
    }
    const lines = htmlToLines(html);
    const hash = createHash('sha256').update(lines.join('\n')).digest('hex');
    const key = `guideline_${doc.id.replace(/[^a-z0-9]/gi, '_')}`;
    const prev = await store.getJson<GuidelineSnapshot>(key);
    if (prev && prev.hash !== hash) {
      const { added, removed } = diffLines(prev.lines, lines);
      // Ignore pure boilerplate churn: require at least one substantive changed line.
      if (added.length + removed.length > 0) {
        const change: GuidelineChange = { ts: new Date().toISOString(), id: doc.id, url: doc.url, added: added.slice(0, 40), removed: removed.slice(0, 40), status: 'new' };
        try {
          change.summary = await opts.interpret?.(change);
          if (change.summary) change.status = 'reviewed';
        } catch {
          /* budget or API problem: keep raw diff, summarise next run */
        }
        await store.append('google_updates', change);
        changes.push(change);
      }
    }
    await store.setJson(key, { id: doc.id, url: doc.url, hash, checkedAt: new Date().toISOString(), lines } satisfies GuidelineSnapshot);
  }
  return changes;
}
