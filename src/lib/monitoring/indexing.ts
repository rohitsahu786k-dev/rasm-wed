/**
 * Search Console error monitor + fixer. Google exposes indexing status per URL (URL Inspection API) and sitemap
 * health (Sitemaps API); the "Page indexing" report itself has no API, so we inspect every sitemap URL instead.
 *
 * What is fixed automatically:
 *   - sitemap not submitted / stale  -> (re)submitted (legitimate, documented)
 *   - "Crawled/Discovered - currently not indexed" on pages WE authored -> queued for a quality refresh
 *   - everything is logged, alerted when serious, and de-duplicated
 * What needs code and therefore only gets an AI diagnosis + alert (never auto-applied):
 *   noindex, blocked by robots.txt, canonical mismatch, 404/soft-404, redirects on sitemap URLs.
 * Not available via any API (must be watched in the Search Console UI): manual actions and security issues.
 */
import type { Store } from '../automation/store.ts';
import { logAction } from '../automation/store.ts';
import type { GoogleCreds } from '../google/auth.ts';
import { inspectUrl, listSitemaps, submitSitemap, type InspectionSummary } from '../google/search-console.ts';
import type { Issue, Severity } from './health-audit.ts';

export interface Classified {
  code: string;
  severity: Severity;
  message: string;
  /** True when improving/refreshing the page content is the right fix. */
  contentFix?: boolean;
}

/** Pure classifier over one inspection result. */
export function classify(r: InspectionSummary): Classified | null {
  const cov = r.coverageState.toLowerCase();
  if (r.verdict === 'PASS' && r.googleCanonical && r.userCanonical && r.googleCanonical !== r.userCanonical) {
    return { code: 'gsc-canonical-mismatch', severity: 'HIGH', message: `Google chose ${r.googleCanonical} instead of the declared canonical ${r.userCanonical}` };
  }
  if (r.verdict === 'PASS') return null;
  if (/noindex/.test(cov) || r.indexingState === 'BLOCKED_BY_META_TAG' || r.indexingState === 'BLOCKED_BY_HTTP_HEADER') return { code: 'gsc-noindex', severity: 'CRITICAL', message: 'Google reports the page is excluded by noindex' };
  if (/robots/.test(cov) || r.robotsTxtState === 'DISALLOWED') return { code: 'gsc-robots-blocked', severity: 'CRITICAL', message: 'Google reports the page is blocked by robots.txt' };
  if (/soft 404/.test(cov)) return { code: 'gsc-soft-404', severity: 'HIGH', message: 'Google treats the page as a soft 404 (thin or empty content)', contentFix: true };
  if (/not found|404/.test(cov)) return { code: 'gsc-404', severity: 'HIGH', message: 'Google gets a 404 for a sitemap URL' };
  if (/redirect/.test(cov)) return { code: 'gsc-redirect', severity: 'MEDIUM', message: 'Sitemap URL redirects' };
  if (/crawled - currently not indexed/.test(cov)) return { code: 'gsc-crawled-not-indexed', severity: 'MEDIUM', message: 'Crawled but not indexed: usually quality/uniqueness', contentFix: true };
  if (/discovered - currently not indexed/.test(cov)) return { code: 'gsc-discovered-not-indexed', severity: 'MEDIUM', message: 'Discovered but not crawled yet: needs internal links / crawl budget', contentFix: true };
  if (/unknown to google/.test(cov)) return { code: 'gsc-unknown', severity: 'LOW', message: 'URL not yet known to Google (new page)' };
  if (r.verdict === 'FAIL') return { code: 'gsc-fail', severity: 'HIGH', message: `Inspection failed: ${r.coverageState}` };
  return null;
}

export interface IndexState {
  ts: string;
  results: Record<string, { coverage: string; verdict: string; code?: string; lastCrawl?: string; firstSeenIssue?: string; consecutive?: number }>;
}

export interface IndexingReport {
  inspected: number;
  indexed: number;
  issues: Issue[];
  sitemapsSubmitted: string[];
  sitemapProblems: string[];
  refreshQueue: string[];
}

export async function runIndexingCheck(
  creds: GoogleCreds,
  property: string,
  urls: string[],
  store: Store,
  deps: { inspect?: typeof inspectUrl; submit?: typeof submitSitemap; list?: typeof listSitemaps; sitemapUrls?: string[]; max?: number; delayMs?: number; now?: number } = {},
): Promise<IndexingReport> {
  const inspect = deps.inspect ?? inspectUrl;
  const submit = deps.submit ?? submitSitemap;
  const list = deps.list ?? listSitemaps;
  const now = deps.now ?? Date.now();
  const prev = (await store.getJson<IndexState>('gsc_index_state')) ?? { ts: '', results: {} };
  const next: IndexState = { ts: new Date(now).toISOString(), results: {} };
  const issues: Issue[] = [];
  const refreshQueue: string[] = [];
  let indexed = 0;

  // 1) Sitemap health + (re)submission.
  const sitemapProblems: string[] = [];
  const submitted: string[] = [];
  const known = await list(creds, property).catch(() => []);
  for (const sm of deps.sitemapUrls ?? []) {
    const info = known.find((k) => k.path === sm);
    if (!info || Date.now() - Date.parse(info.lastSubmitted ?? '1970-01-01') > 7 * 86400_000) {
      try {
        await submit(creds, property, sm);
        submitted.push(sm);
      } catch (e) {
        sitemapProblems.push(`${sm}: submit failed (${(e as Error).message})`);
      }
    }
  }
  for (const k of known) if (Number(k.errors ?? 0) > 0) sitemapProblems.push(`${k.path}: ${k.errors} error(s), ${k.warnings ?? 0} warning(s)`);
  for (const p of sitemapProblems) issues.push({ severity: 'HIGH', code: 'gsc-sitemap-problem', url: property, message: p });

  // 2) Per-URL inspection (quota-safe: capped and paced).
  for (const url of urls.slice(0, deps.max ?? 150)) {
    let r: InspectionSummary;
    try {
      r = await inspect(creds, property, url);
    } catch {
      continue;
    }
    if (deps.delayMs) await new Promise((res) => setTimeout(res, deps.delayMs));
    const c = classify(r);
    const before = prev.results[url];
    if (r.verdict === 'PASS' && !c) indexed++;
    next.results[url] = {
      coverage: r.coverageState,
      verdict: r.verdict,
      code: c?.code,
      lastCrawl: r.lastCrawlTime,
      firstSeenIssue: c ? (before?.code === c.code ? before.firstSeenIssue : new Date(now).toISOString()) : undefined,
      consecutive: c ? (before?.code === c.code ? (before.consecutive ?? 1) + 1 : 1) : 0,
    };
    if (!c) continue;
    // Brand-new pages are expected to be unknown for a while; only flag if still unknown after 21 days.
    if (c.code === 'gsc-unknown') {
      const age = now - Date.parse(next.results[url].firstSeenIssue ?? new Date(now).toISOString());
      if (age < 21 * 86400_000) continue;
      issues.push({ severity: 'MEDIUM', code: 'gsc-not-discovered', url, message: 'Still unknown to Google 21+ days after first check: strengthen internal links from indexed pages' });
      continue;
    }
    issues.push({ severity: c.severity, code: c.code, url, message: c.message });
    // Quality refresh only after the state persisted across two weekly runs (Google often self-resolves).
    if (c.contentFix && (next.results[url].consecutive ?? 0) >= 2) refreshQueue.push(url);
  }

  await store.setJson('gsc_index_state', next);
  await store.append('gsc_index_history', { ts: next.ts, inspected: Object.keys(next.results).length, indexed, issues: issues.length });
  await store.setJson('refresh_queue', refreshQueue);
  await logAction(store, { agent: 'gsc-monitor', task: 'indexing-check', reason: 'scheduled', evidence: { inspected: Object.keys(next.results).length, indexed, issues: issues.length }, risk: 0, result: `${indexed}/${Object.keys(next.results).length} indexed; ${submitted.length} sitemap(s) submitted; ${refreshQueue.length} queued for refresh` });
  return { inspected: Object.keys(next.results).length, indexed, issues, sitemapsSubmitted: submitted, sitemapProblems, refreshQueue };
}
