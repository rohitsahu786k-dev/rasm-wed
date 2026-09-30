import type { Store } from '../automation/store.ts';
import type { AuditReport } from './health-audit.ts';

export interface Alert {
  ts: string;
  level: 'CRITICAL' | 'HIGH' | 'INFO';
  code: string;
  message: string;
}

/**
 * Derive alerts from an audit. CRITICAL issues (site down, accidental noindex, robots blocking,
 * 5xx, empty sitemap) always alert; everything else is summarised in the weekly report.
 */
export function alertsFromAudit(report: AuditReport): Alert[] {
  const ts = new Date().toISOString();
  const alerts: Alert[] = [];
  const critical = report.issues.filter((i) => i.severity === 'CRITICAL');
  const byCode = new Map<string, string[]>();
  for (const i of critical) byCode.set(i.code, [...(byCode.get(i.code) ?? []), i.url]);
  for (const [code, urls] of byCode) {
    alerts.push({ ts, level: 'CRITICAL', code, message: `${code}: ${urls.length} URL(s), e.g. ${urls.slice(0, 3).join(', ')}` });
  }
  if (report.score < 70 && critical.length === 0) alerts.push({ ts, level: 'HIGH', code: 'health-score-low', message: `health score ${report.score}/100` });
  return alerts;
}

/** Sends to ALERT_WEBHOOK_URL (Slack/Discord/Teams-compatible `{text}` payload). De-duplicates for 6 hours. */
export async function sendAlerts(store: Store, alerts: Alert[], webhook = process.env.ALERT_WEBHOOK_URL, fetchImpl: typeof fetch = fetch) {
  const sent = (await store.getJson<Record<string, string>>('alert_dedupe')) ?? {};
  const now = Date.now();
  const fresh = alerts.filter((a) => now - Date.parse(sent[a.code] ?? '1970-01-01') > 6 * 3600_000);
  for (const a of fresh) {
    await store.append('alerts', a);
    sent[a.code] = a.ts;
  }
  await store.setJson('alert_dedupe', sent);
  if (webhook && fresh.length) {
    const text = fresh.map((a) => `[${a.level}] ${a.message}`).join('\n');
    await fetchImpl(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }).catch(() => undefined);
  }
  return fresh;
}
