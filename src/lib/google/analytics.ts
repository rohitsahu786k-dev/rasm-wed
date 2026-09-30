import { getAccessToken, type GoogleCreds } from './auth.ts';

const SCOPE = ['https://www.googleapis.com/auth/analytics.readonly'];

export interface Ga4Row {
  dims: string[];
  metrics: number[];
}

/** Aggregate reporting only: no user-level identifiers are ever requested. */
export async function runReport(
  c: GoogleCreds,
  propertyId: string,
  opts: { start: string; end: string; dimensions: string[]; metrics: string[]; limit?: number; organicOnly?: boolean },
  f: typeof fetch = fetch,
): Promise<Ga4Row[]> {
  const token = await getAccessToken(c, SCOPE, f);
  const res = await f(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: opts.start, endDate: opts.end }],
      dimensions: opts.dimensions.map((name) => ({ name })),
      metrics: opts.metrics.map((name) => ({ name })),
      limit: opts.limit ?? 100,
      ...(opts.organicOnly
        ? { dimensionFilter: { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { matchType: 'EXACT', value: 'Organic Search' } } } }
        : {}),
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const body = (await res.json().catch(() => ({}))) as { rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[]; error?: { message?: string } };
  if (!res.ok) throw new Error(`GA4 ${res.status}: ${body.error?.message ?? 'request failed'}`);
  return (body.rows ?? []).map((r) => ({ dims: r.dimensionValues.map((d) => d.value), metrics: r.metricValues.map((m) => Number(m.value)) }));
}
