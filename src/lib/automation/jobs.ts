/**
 * All scheduled jobs in one place. They are called by the /api/cron/* routes (Vercel Cron) AND by
 * scripts/agent-run.ts (GitHub Actions / any server cron), so scheduling never depends on serverless time limits.
 */
import { getStore, logAction } from './store.ts';
import { SITE_URL, IS_PRODUCTION } from '../site.ts';
import { auditSite } from '../monitoring/health-audit.ts';
import { alertsFromAudit, sendAlerts } from '../monitoring/alerts.ts';
import { runAutofix } from '../monitoring/autofix.ts';
import { runContentPipeline } from '../content/pipeline.ts';
import { wpCredsFromEnv } from '../content/wp-publisher.ts';
import { checkGuidelines, type GuidelineChange } from '../seo/guidelines.ts';
import { findOpportunities, totals, type QueryPageRow } from '../seo/opportunities.ts';
import { googleCredsFromEnv } from '../google/auth.ts';
import { daysAgo, query as gscQuery, type GscRow } from '../google/search-console.ts';
import { runReport } from '../google/analytics.ts';
import { runAi } from '../ai/client.ts';
import { BudgetExceededError, spendSummary } from '../ai/budget.ts';
import { loadAiConfig } from '../ai/config.ts';
import { fetchAllSitemapUrls, type AuditReport } from '../monitoring/health-audit.ts';
import { runIndexingCheck } from '../monitoring/indexing.ts';
import { refreshOne } from '../content/refresh.ts';
import { runCwvCheck, cwvAlerts } from '../monitoring/cwv.ts';

export type JobName = 'health' | 'autofix' | 'content' | 'programmatic' | 'weekly' | 'guidelines' | 'indexing' | 'cwv';

const redact = (m: string) => m.replace(/sk-[A-Za-z0-9_-]+/g, 'sk-***');

export async function runHealthJob() {
  const store = getStore();
  const report = await auditSite({ baseUrl: process.env.AUDIT_BASE_URL || SITE_URL, isProduction: IS_PRODUCTION, checkLinks: true });
  await store.append('seo_audits', { ts: report.ts, score: report.score, counts: report.counts, pagesCrawled: report.pagesCrawled });
  await store.setJson('latest_audit', report);
  const alerts = await sendAlerts(store, alertsFromAudit(report));
  await logAction(store, { agent: 'technical-seo', task: 'daily-health-audit', reason: 'scheduled', evidence: { score: report.score, counts: report.counts }, risk: 0, result: `${report.pagesCrawled} pages, ${report.issues.length} issues, ${alerts.length} alert(s)` });
  return { score: report.score, counts: report.counts, pages: report.pagesCrawled, alerts: alerts.length };
}

export async function runAutofixJob() {
  const creds = wpCredsFromEnv();
  if (!creds) throw new Error('WordPress credentials not configured');
  const store = getStore();
  const report = await store.getJson<AuditReport>('latest_audit');
  if (!report) return { status: 'skipped', reason: 'no audit yet' };
  return runAutofix(creds, report, store);
}

async function contentJob(mode: 'daily' | 'programmatic', dryRun = false) {
  const creds = wpCredsFromEnv();
  if (!creds) throw new Error('WordPress credentials not configured');
  return runContentPipeline({ creds, siteUrl: SITE_URL, mode, dryRun });
}
export const runContentJob = (dryRun = false) => contentJob('daily', dryRun);
export const runProgrammaticJob = (dryRun = false) => contentJob('programmatic', dryRun);

export async function runGuidelinesJob() {
  const store = getStore();
  const interpret = async (c: GuidelineChange) => {
    const r = await runAi<string>({
      task: 'google-doc-interpretation',
      priority: 'P5',
      instructions: `You are a senior technical SEO. A Google Search Central page changed. Using ONLY the diff below (a primary source), state (1) what changed, (2) whether it affects a Next.js marketing/blog site, (3) the concrete action, or "no action". Do not speculate. Max 120 words.`,
      input: `Page: ${c.url}\nADDED:\n${c.added.join('\n')}\nREMOVED:\n${c.removed.join('\n')}`,
      maxOutputTokens: 600,
    });
    await logAction(store, { agent: 'guideline-monitor', task: 'interpret-google-change', reason: c.url, model: r.model, tokensIn: r.tokensIn, tokensOut: r.tokensOut, costUsd: r.costUsd, risk: 0 });
    return r.output;
  };
  const changes = await checkGuidelines(store, { interpret });
  await logAction(store, { agent: 'guideline-monitor', task: 'weekly-guideline-check', reason: 'scheduled', risk: 0, result: `${changes.length} change(s)` });
  return { changes: changes.map((c) => ({ id: c.id, status: c.status })) };
}

const toRows = (rows: GscRow[]): QueryPageRow[] => rows.map((r) => ({ query: r.keys[0], page: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));

export async function runWeeklyJob() {
  const creds = googleCredsFromEnv();
  if (!creds) throw new Error('Google credentials not configured');
  const store = getStore();
  const property = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || `${SITE_URL}/`;
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
  if (process.env.GA4_PROPERTY_ID) {
    try {
      const rows = await runReport(creds, process.env.GA4_PROPERTY_ID, { start: '28daysAgo', end: 'yesterday', dimensions: ['landingPagePlusQueryString'], metrics: ['sessions'], organicOnly: true, limit: 15 });
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
  if (t0.clicks >= 20 && t1.clicks <= t0.clicks * 0.5) {
    await sendAlerts(store, [{ ts: report.ts, level: 'HIGH', code: 'organic-clicks-drop', message: `Organic clicks fell ${t0.clicks} -> ${t1.clicks} (28d vs previous 28d)` }]);
  }
  await logAction(store, { agent: 'seo-analyst', task: 'weekly-report', reason: 'scheduled', risk: 0, result: `${opportunities.length} opportunities; clicks ${t0.clicks}->${t1.clicks}` });
  return { clicks: t1.clicks, impressions: t1.impressions, opportunities: report.opportunityCounts };
}

export async function runIndexingJob() {
  const creds = googleCredsFromEnv();
  if (!creds) throw new Error('Google credentials not configured');
  const store = getStore();
  const property = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || `${SITE_URL}/`;
  const base = SITE_URL;
  // Pages that are intentionally not indexable are not errors.
  const urls = (await fetchAllSitemapUrls(`${base}/sitemap.xml`)).filter((u) => !/\/(thank-you-page|category)\//.test(u));
  const report = await runIndexingCheck(creds, property, urls, store, { sitemapUrls: [`${base}/sitemap.xml`], delayMs: 400 });
  const serious = report.issues.filter((i) => i.severity === 'CRITICAL' || i.severity === 'HIGH');
  if (serious.length) {
    await sendAlerts(store, serious.slice(0, 5).map((i) => ({ ts: new Date().toISOString(), level: (i.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH') as 'CRITICAL' | 'HIGH', code: `${i.code}:${i.url}`, message: `${i.code} ${i.url} ${i.message}` })));
  }
  const creds2 = wpCredsFromEnv();
  const refreshed = creds2 ? await refreshOne(creds2, SITE_URL, store).catch((e) => ({ status: 'error', error: redact((e as Error).message) })) : { status: 'skipped' };
  return { inspected: report.inspected, indexed: report.indexed, issues: report.issues.length, sitemapsSubmitted: report.sitemapsSubmitted, sitemapProblems: report.sitemapProblems, queuedForRefresh: report.refreshQueue.length, refresh: refreshed };
}

export async function runCwvJob() {
  const store = getStore();
  const posts = await fetchAllSitemapUrls(`${SITE_URL}/sitemap.xml`);
  const pick = ['/', '/wedding-planner-in-udaipur/', '/services/', '/blog/', ...posts.map((u) => new URL(u).pathname).filter((p) => !['/', '/services/', '/blog/'].includes(p)).slice(-2)];
  const results = await runCwvCheck([...new Set(pick)].map((p) => `${SITE_URL}${p}`), store);
  const alerts = cwvAlerts(results);
  if (alerts.length) await sendAlerts(store, alerts);
  return { measured: results.length, field: results.filter((r) => r.source === 'field').length, alerts: alerts.length };
}

/**
 * Node's fetch reports DNS, TLS and connection failures as a bare "fetch failed"; the real reason (for example
 * `getaddrinfo ENOTFOUND admin.rasmwed.com`) is only on `error.cause`. Scheduled runs are reported by email, so
 * flattening the cause chain is the difference between a useless alert and an actionable one.
 */
function describeError(e: unknown): string {
  const parts: string[] = [];
  let cur: unknown = e;
  for (let depth = 0; depth < 4 && cur instanceof Error; depth++) {
    const m = cur.message?.trim();
    if (m && !parts.includes(m)) parts.push(m);
    cur = (cur as { cause?: unknown }).cause;
  }
  return parts.join(' <- ') || 'unknown error';
}

/** Runs a job and converts budget/API errors into a safe, secret-free result (a cron must never crash loudly with secrets). */
export async function runJob(name: JobName, opts: { dry?: boolean } = {}): Promise<unknown> {
  try {
    switch (name) {
      case 'health': return await runHealthJob();
      case 'autofix': return await runAutofixJob();
      case 'content': return await runContentJob(opts.dry);
      case 'programmatic': return await runProgrammaticJob(opts.dry);
      case 'weekly': return await runWeeklyJob();
      case 'guidelines': return await runGuidelinesJob();
      case 'indexing': return await runIndexingJob();
      case 'cwv': return await runCwvJob();
    }
  } catch (e) {
    if (e instanceof BudgetExceededError) return { status: 'skipped', reason: e.message };
    return { status: 'error', error: redact(describeError(e)) };
  }
}
