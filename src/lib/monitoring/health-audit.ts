/**
 * Daily website health audit. Dependency-free HTML checks over the real, deployed site.
 * Pure functions + an injectable fetch so everything is unit-testable.
 */

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface Issue {
  severity: Severity;
  code: string;
  url: string;
  message: string;
  /** True when a deterministic, low-risk automatic fix exists (still goes through the QA pipeline). */
  autofixable?: boolean;
}

export interface PageFacts {
  url: string;
  status: number;
  title: string;
  description: string;
  canonicals: string[];
  h1Count: number;
  noindex: boolean;
  imagesWithoutAlt: number;
  mainWords: number;
  jsonLdInvalid: number;
  jsonLdCount: number;
  internalLinks: string[];
}

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;

const mainWordCount = (html: string) => {
  const main = /<main[\s\S]*?<\/main>/i.exec(html)?.[0] ?? html;
  return (main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').match(/[\p{L}\p{N}]+/gu) ?? []).length;
};

export function extractFacts(url: string, status: number, html: string, headers: Headers, origin: string): PageFacts {
  const title = decode(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').trim();
  const description = decode(/<meta\s+name="description"\s+content="([^"]*)"/i.exec(html)?.[1] ?? '').trim();
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)].map((m) => m[1]);
  const metaRobots = [...html.matchAll(/<meta\s+name="robots"\s+content="([^"]*)"/gi)].map((m) => m[1]).join(',');
  const noindex = /noindex/i.test(metaRobots) || /noindex/i.test(headers.get('x-robots-tag') ?? '');

  let jsonLdInvalid = 0;
  let jsonLdCount = 0;
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdCount++;
    try {
      JSON.parse(m[1]);
    } catch {
      jsonLdInvalid++;
    }
  }

  const links = new Set<string>();
  for (const m of html.matchAll(/<a\s[^>]*href="([^"#][^"]*)"/gi)) {
    try {
      const u = new URL(decode(m[1]), url);
      if (u.origin === origin && !/\.(png|jpe?g|webp|svg|pdf|ico|xml|txt)$/i.test(u.pathname) && !u.pathname.startsWith('/_next')) {
        links.add(u.pathname);
      }
    } catch {
      /* ignore unparsable hrefs */
    }
  }

  return {
    url,
    status,
    title,
    description,
    canonicals,
    h1Count: count(html, /<h1[\s>]/gi),
    noindex,
    imagesWithoutAlt: count(html, /<img(?![^>]*\balt=)[^>]*>/gi),
    mainWords: mainWordCount(html),
    jsonLdInvalid,
    jsonLdCount,
    internalLinks: [...links],
  };
}

/** Per-page rules. `expectIndexable` is true for every URL that appears in the sitemap. */
const THIN_EXEMPT = /^\/(thank-you-page|gallery|contact-us|privacy-policy|terms-and-conditions|refund-policy|shipping-policy)\/$/;

export function pageIssues(f: PageFacts, expectIndexable = true): Issue[] {
  const out: Issue[] = [];
  const add = (severity: Severity, code: string, message: string, autofixable = false) => out.push({ severity, code, url: f.url, message, autofixable });
  const path = new URL(f.url).pathname;

  if (f.status >= 500) add('CRITICAL', 'status-5xx', `HTTP ${f.status}`);
  else if (f.status >= 400) add('HIGH', 'status-4xx', `HTTP ${f.status}`);
  else if (f.status >= 300) add('MEDIUM', 'redirect', `sitemap/internal URL redirects (${f.status})`);
  if (f.status >= 400) return out;

  if (expectIndexable && f.noindex) add('CRITICAL', 'unexpected-noindex', 'indexable page carries noindex (meta or X-Robots-Tag)');
  if (!f.title) add('HIGH', 'missing-title', 'missing <title>', true);
  else if (f.title.length > 70) add('LOW', 'long-title', `title is ${f.title.length} chars`);
  if (!f.description) add('MEDIUM', 'missing-description', 'missing meta description', true);
  if (f.canonicals.length === 0) add('HIGH', 'missing-canonical', 'no canonical tag', true);
  else if (f.canonicals.length > 1) add('HIGH', 'duplicate-canonical', `${f.canonicals.length} canonical tags`);
  else {
    let cp = '';
    try {
      cp = new URL(f.canonicals[0]).pathname;
    } catch {
      /* fallthrough */
    }
    if (expectIndexable && cp !== path) add('HIGH', 'canonical-mismatch', `canonical points to ${f.canonicals[0]}`);
  }
  if (f.h1Count === 0) add('MEDIUM', 'missing-h1', 'no <h1>');
  if (f.h1Count > 1) add('LOW', 'multiple-h1', `${f.h1Count} <h1> elements`);
  if (expectIndexable && f.mainWords < 200 && !THIN_EXEMPT.test(path)) add('HIGH', 'thin-content', `only ${f.mainWords} words of main content on an indexable page`);
  if (f.imagesWithoutAlt > 0) add('LOW', 'image-alt-missing', `${f.imagesWithoutAlt} <img> without alt`, true);
  if (f.jsonLdInvalid > 0) add('HIGH', 'invalid-jsonld', `${f.jsonLdInvalid} JSON-LD block(s) fail to parse`);
  return out;
}

/** Duplicate titles/descriptions across the crawled set. */
export function duplicateIssues(pages: PageFacts[]): Issue[] {
  const out: Issue[] = [];
  for (const key of ['title', 'description'] as const) {
    const seen = new Map<string, string[]>();
    for (const p of pages) if (p[key]) seen.set(p[key], [...(seen.get(p[key]) ?? []), p.url]);
    for (const [value, urls] of seen) {
      if (urls.length > 1) {
        for (const url of urls) out.push({ severity: 'MEDIUM', code: `duplicate-${key}`, url, message: `same ${key} on ${urls.length} pages: "${value.slice(0, 60)}"` });
      }
    }
  }
  return out;
}

/** robots.txt guard: a blanket Disallow on production is CRITICAL and must block deployment. */
export function robotsIssues(robotsTxt: string, baseUrl: string, isProduction: boolean): Issue[] {
  const url = `${baseUrl}/robots.txt`;
  const out: Issue[] = [];
  const groups = robotsTxt.split(/\n\s*\n/);
  const blocksAll = groups.some((g) => /user-agent:\s*\*/i.test(g) && /^\s*disallow:\s*\/\s*$/im.test(g) && !/^\s*allow:\s*\/\s*$/im.test(g));
  if (isProduction && blocksAll) out.push({ severity: 'CRITICAL', code: 'robots-blocks-all', url, message: 'robots.txt has "Disallow: /" for all crawlers on production' });
  if (isProduction && !/^\s*sitemap:/im.test(robotsTxt)) out.push({ severity: 'MEDIUM', code: 'robots-no-sitemap', url, message: 'robots.txt does not reference a sitemap' });
  return out;
}

export function sitemapUrls(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]).trim());
}

export function scoreFor(issues: Issue[]): number {
  const w: Record<Severity, number> = { CRITICAL: 25, HIGH: 6, MEDIUM: 2, LOW: 0.5, INFO: 0 };
  return Math.max(0, Math.round(100 - issues.reduce((s, i) => s + w[i.severity], 0)));
}

export interface AuditReport {
  ts: string;
  baseUrl: string;
  pagesCrawled: number;
  score: number;
  counts: Record<Severity, number>;
  issues: Issue[];
}

interface AuditOptions {
  baseUrl: string;
  isProduction: boolean;
  fetchImpl?: typeof fetch;
  maxUrls?: number;
  /** Also HEAD-check internal links discovered on crawled pages. */
  checkLinks?: boolean;
}

export async function auditSite(opts: AuditOptions): Promise<AuditReport> {
  const f = opts.fetchImpl ?? fetch;
  const base = opts.baseUrl.replace(/\/$/, '');
  const origin = new URL(base).origin;
  const issues: Issue[] = [];
  const get = (u: string, init?: RequestInit) => f(u, { redirect: 'manual', signal: AbortSignal.timeout(20_000), ...init });

  let robots = '';
  try {
    const r = await get(`${base}/robots.txt`);
    robots = await r.text();
    if (!r.ok) issues.push({ severity: 'HIGH', code: 'robots-missing', url: `${base}/robots.txt`, message: `robots.txt HTTP ${r.status}` });
  } catch (e) {
    issues.push({ severity: 'CRITICAL', code: 'site-down', url: base, message: `site unreachable: ${(e as Error).message}` });
    return finish(base, [], issues);
  }
  issues.push(...robotsIssues(robots, base, opts.isProduction));

  let urls: string[] = [];
  try {
    const r = await get(`${base}/sitemap.xml`);
    if (!r.ok) issues.push({ severity: 'HIGH', code: 'sitemap-missing', url: `${base}/sitemap.xml`, message: `sitemap.xml HTTP ${r.status}` });
    else urls = sitemapUrls(await r.text());
  } catch (e) {
    issues.push({ severity: 'HIGH', code: 'sitemap-error', url: `${base}/sitemap.xml`, message: (e as Error).message });
  }
  if (new Set(urls).size !== urls.length) issues.push({ severity: 'MEDIUM', code: 'sitemap-duplicates', url: `${base}/sitemap.xml`, message: 'duplicate URLs in sitemap' });
  urls = [...new Set(urls)].slice(0, opts.maxUrls ?? 500);
  if (urls.length === 0) issues.push({ severity: 'HIGH', code: 'sitemap-empty', url: `${base}/sitemap.xml`, message: 'sitemap has no URLs' });

  const pages: PageFacts[] = [];
  for (const u of urls) {
    // Audit the same path on the audited origin (sitemap may name the production host while auditing staging).
    const target = `${base}${new URL(u).pathname}`;
    try {
      const r = await get(target);
      const html = r.status < 300 ? await r.text() : '';
      const facts = extractFacts(target, r.status, html, r.headers, origin);
      pages.push(facts);
      issues.push(...pageIssues(facts));
    } catch (e) {
      issues.push({ severity: 'HIGH', code: 'fetch-failed', url: target, message: (e as Error).message });
    }
  }
  issues.push(...duplicateIssues(pages));

  // Internal link graph: orphan pages + broken links.
  const inbound = new Map<string, number>();
  for (const p of pages) for (const l of p.internalLinks) inbound.set(l, (inbound.get(l) ?? 0) + 1);
  for (const p of pages) {
    const path = new URL(p.url).pathname;
    if (path !== '/' && !(inbound.get(path) ?? inbound.get(path.replace(/\/$/, '')) ?? inbound.get(`${path}/`))) {
      issues.push({ severity: 'MEDIUM', code: 'orphan-page', url: p.url, message: 'no internal links point to this page' });
    }
  }
  if (opts.checkLinks) {
    const known = new Set(pages.map((p) => new URL(p.url).pathname));
    const unknown = [...new Set(pages.flatMap((p) => p.internalLinks))].filter((l) => !known.has(l) && !known.has(`${l}/`)).slice(0, 200);
    for (const l of unknown) {
      try {
        const r = await get(`${base}${l}`, { method: 'HEAD' });
        if (r.status >= 400) issues.push({ severity: 'HIGH', code: 'broken-internal-link', url: `${base}${l}`, message: `linked internally but returns ${r.status}`, autofixable: false });
      } catch {
        /* transient; next run will retry */
      }
    }
  }

  return finish(base, pages, issues);
}

function finish(baseUrl: string, pages: PageFacts[], issues: Issue[]): AuditReport {
  const counts: Record<Severity, number> = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 };
  for (const i of issues) counts[i.severity]++;
  return { ts: new Date().toISOString(), baseUrl, pagesCrawled: pages.length, score: scoreFor(issues), counts, issues };
}
