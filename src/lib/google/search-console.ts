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
