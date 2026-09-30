import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { getStore, logAction } from '@/lib/automation/store';
import { googleCredsFromEnv } from '@/lib/google/auth';
import { daysAgo, query as gscQuery, type GscRow } from '@/lib/google/search-console';
import { runReport } from '@/lib/google/analytics';
import { findOpportunities, totals, type QueryPageRow } from '@/lib/seo/opportunities';
import { sendAlerts } from '@/lib/monitoring/alerts';
import { spendSummary } from '@/lib/ai/budget';
import { loadAiConfig } from '@/lib/ai/config';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const toRows = (rows: GscRow[]): QueryPageRow[] =>
  rows.map((r) => ({ query: r.keys[0], page: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));

/** Weekly SEO intelligence report: Search Console + GA4 + opportunities + AI spend. No model call needed (cost $0). */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });
  const creds = googleCredsFromEnv();
  if (!creds) return NextResponse.json({ error: 'Google credentials not configured' }, { status: 500 });
  const store = getStore();
  const property = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || `${SITE_URL}/`;

  // GSC data lags ~2 days: compare the last 28 days ending 3 days ago against the 28 days before.
  const cur = { start: daysAgo(30), end: daysAgo(3) };
  const prev = { start: daysAgo(58), end: daysAgo(31) };
  const [curRows, prevRows] = await Promise.all([
    gscQuery(creds, property, { ...cur, dimensions: ['query', 'page'], rowLimit: 5000 }),
    gscQuery(creds, property, { ...prev, dimensions: ['query', 'page'], rowLimit: 5000 }),
  ]);
  const current = toRows(curRows);
  const previous = toRows(prevRows);
  const opportunities = findOpportunities(current, previous);

  let ga: { organicSessions?: number; topLandingPages?: { page: string; sessions: number }[]; error?: string } = {};
  const ga4 = process.env.GA4_PROPERTY_ID;
  if (ga4) {
    try {
      const rows = await runReport(creds, ga4, { start: '28daysAgo', end: 'yesterday', dimensions: ['landingPagePlusQueryString'], metrics: ['sessions'], organicOnly: true, limit: 15 });
      ga = { organicSessions: rows.reduce((s, r) => s + r.metrics[0], 0), topLandingPages: rows.map((r) => ({ page: r.dims[0], sessions: r.metrics[0] })) };
    } catch (e) {
      ga = { error: (e as Error).message };
    }
  }

  const t1 = totals(current);
  const t0 = totals(previous);
  const pct = (a: number, b: number) => (b ? Math.round(((a - b) / b) * 1000) / 10 : null);
  const spend = await spendSummary(store);
  const report = {
    ts: new Date().toISOString(),
    period: { current: cur, previous: prev },
    search: { current: t1, previous: t0, clicksChangePct: pct(t1.clicks, t0.clicks), impressionsChangePct: pct(t1.impressions, t0.impressions) },
    analytics: ga,
    opportunities: opportunities.slice(0, 25),
    opportunityCounts: opportunities.reduce<Record<string, number>>((m, o) => ((m[o.type] = (m[o.type] ?? 0) + 1), m), {}),
    aiSpend: { monthUsd: spend.monthUsd, monthlyBudgetUsd: loadAiConfig().budget.monthlyUsd },
    audit: await store.getJson<{ score?: number; counts?: unknown }>('latest_audit'),
  };
  await store.append('weekly_reports', report);
  await store.setJson('latest_opportunities', report.opportunities);

  // Alert on a real traffic collapse (guards against noise on tiny volumes).
  if (t0.clicks >= 20 && t1.clicks <= t0.clicks * 0.5) {
    await sendAlerts(store, [{ ts: report.ts, level: 'HIGH', code: 'organic-clicks-drop', message: `Organic clicks fell ${t0.clicks} -> ${t1.clicks} (28d vs previous 28d)` }]);
  }
  await logAction(store, { agent: 'seo-analyst', task: 'weekly-report', reason: 'scheduled', risk: 0, result: `${opportunities.length} opportunities; clicks ${t0.clicks}->${t1.clicks}` });
  return NextResponse.json({ clicks: t1.clicks, impressions: t1.impressions, opportunities: report.opportunityCounts });
}
