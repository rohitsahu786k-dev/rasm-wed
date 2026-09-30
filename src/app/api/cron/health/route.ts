import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { auditSite } from '@/lib/monitoring/health-audit';
import { alertsFromAudit, sendAlerts } from '@/lib/monitoring/alerts';
import { getStore, logAction } from '@/lib/automation/store';
import { IS_PRODUCTION, SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Daily health audit. Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });

  const store = getStore();
  const baseUrl = process.env.AUDIT_BASE_URL || SITE_URL;
  const report = await auditSite({ baseUrl, isProduction: IS_PRODUCTION, checkLinks: true });

  await store.append('seo_audits', { ts: report.ts, score: report.score, counts: report.counts, pagesCrawled: report.pagesCrawled });
  await store.setJson('latest_audit', report);
  const alerts = await sendAlerts(store, alertsFromAudit(report));
  await logAction(store, {
    agent: 'technical-seo',
    task: 'daily-health-audit',
    reason: 'scheduled',
    evidence: { score: report.score, counts: report.counts },
    risk: 0,
    result: `${report.pagesCrawled} pages, ${report.issues.length} issues, ${alerts.length} alert(s)`,
  });

  return NextResponse.json({ score: report.score, counts: report.counts, pages: report.pagesCrawled, alerts: alerts.length });
}
