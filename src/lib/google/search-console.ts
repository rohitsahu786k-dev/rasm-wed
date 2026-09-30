import { getAccessToken, type GoogleCreds } from './auth.ts';

const SCOPE = ['https://www.googleapis.com/auth/webmasters.readonly'];

export interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

const authed = async (c: GoogleCreds, url: string, init: RequestInit = {}, f: typeof fetch = fetch) => {
  const token = await getAccessToken(c, SCOPE, f);
  const res = await f(url, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30_000) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Search Console ${res.status}: ${(body as { error?: { message?: string } }).error?.message ?? 'request failed'}`);
  return body;
};

export async function listSites(c: GoogleCreds, f: typeof fetch = fetch) {
  const b = (await authed(c, 'https://www.googleapis.com/webmasters/v3/sites', {}, f)) as { siteEntry?: { siteUrl: string; permissionLevel: string }[] };
  return b.siteEntry ?? [];
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
export const daysAgo = (n: number, now = new Date()) => iso(new Date(now.getTime() - n * 86400_000));

export async function query(
  c: GoogleCreds,
  property: string,
  opts: { start: string; end: string; dimensions: ('query' | 'page' | 'device' | 'country' | 'date')[]; rowLimit?: number },
  f: typeof fetch = fetch,
): Promise<GscRow[]> {
  const b = (await authed(
    c,
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    { method: 'POST', body: JSON.stringify({ startDate: opts.start, endDate: opts.end, dimensions: opts.dimensions, rowLimit: opts.rowLimit ?? 500, dataState: 'final' }) },
    f,
  )) as { rows?: GscRow[] };
  return b.rows ?? [];
}

const SCOPE_RW = ['https://www.googleapis.com/auth/webmasters'];

export interface InspectionSummary {
  url: string;
  verdict: string;
  coverageState: string;
  robotsTxtState?: string;
  indexingState?: string;
  pageFetchState?: string;
  googleCanonical?: string;
  userCanonical?: string;
  lastCrawlTime?: string;
  richResults?: string;
}

/** URL Inspection API (quota: 2,000/day/property). Never used to "force" indexing, only to read status. */
export async function inspectUrl(c: GoogleCreds, property: string, url: string, f: typeof fetch = fetch): Promise<InspectionSummary> {
  const token = await getAccessToken(c, SCOPE_RW, f);
  const res = await f('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: property }),
    signal: AbortSignal.timeout(30_000),
  });
  const body = (await res.json().catch(() => ({}))) as {
    inspectionResult?: { indexStatusResult?: Record<string, string>; richResultsResult?: { verdict?: string } };
    error?: { message?: string };
  };
  if (!res.ok) throw new Error(`URL Inspection ${res.status}: ${body.error?.message ?? 'failed'}`);
  const i = body.inspectionResult?.indexStatusResult ?? {};
  return {
    url,
    verdict: i.verdict ?? 'UNKNOWN',
    coverageState: i.coverageState ?? 'UNKNOWN',
    robotsTxtState: i.robotsTxtState,
    indexingState: i.indexingState,
    pageFetchState: i.pageFetchState,
    googleCanonical: i.googleCanonical,
    userCanonical: i.userCanonical,
    lastCrawlTime: i.lastCrawlTime,
    richResults: body.inspectionResult?.richResultsResult?.verdict,
  };
}

export interface SitemapInfo {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  errors?: string;
  warnings?: string;
}

export async function listSitemaps(c: GoogleCreds, property: string, f: typeof fetch = fetch): Promise<SitemapInfo[]> {
  const b = (await authedRw(c, `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps`, {}, f)) as { sitemap?: SitemapInfo[] };
  return b.sitemap ?? [];
}

/** Submitting/resubmitting a sitemap is a documented, legitimate way to tell Google about new URLs. */
export async function submitSitemap(c: GoogleCreds, property: string, sitemapUrl: string, f: typeof fetch = fetch) {
  const token = await getAccessToken(c, SCOPE_RW, f);
  const res = await f(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemapUrl)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Length': '0' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Sitemap submit ${res.status}`);
  return true;
}

async function authedRw(c: GoogleCreds, url: string, init: RequestInit = {}, f: typeof fetch = fetch) {
  const token = await getAccessToken(c, SCOPE_RW, f);
  const res = await f(url, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30_000) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Search Console ${res.status}: ${(body as { error?: { message?: string } }).error?.message ?? 'request failed'}`);
  return body;
}
