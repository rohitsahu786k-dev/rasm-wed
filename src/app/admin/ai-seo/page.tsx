import type { Metadata } from 'next';
import { getStore, type AiAction } from '@/lib/automation/store';
import { spendSummary } from '@/lib/ai/budget';
import { loadAiConfig } from '@/lib/ai/config';
import type { AuditReport } from '@/lib/monitoring/health-audit';
import type { Alert } from '@/lib/monitoring/alerts';
import type { GuidelineChange } from '@/lib/seo/guidelines';
import type { Opportunity } from '@/lib/seo/opportunities';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'AI SEO Agent', robots: { index: false, follow: false } };

const sevColor: Record<string, string> = { CRITICAL: '#b91c1c', HIGH: '#c2410c', MEDIUM: '#a16207', LOW: '#4b5563', INFO: '#6b7280' };

export default async function AdminAiSeo() {
  const store = getStore();
  const cfg = loadAiConfig();
  const [audit, actions, alerts, updates, spend, opps, articles] = await Promise.all([
    store.getJson<AuditReport>('latest_audit'),
    store.list<AiAction>('ai_actions', { limit: 25 }),
    store.list<Alert>('alerts', { limit: 10 }),
    store.list<GuidelineChange>('google_updates', { limit: 10 }),
    spendSummary(store),
    store.getJson<Opportunity[]>('latest_opportunities'),
    store.list<{ ts: string; url: string; words: number; slug: string }>('content_articles', { limit: 10 }),
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8 pt-28">
      <h1 className="text-3xl font-semibold">AI SEO Agent</h1>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Health score" value={audit ? `${audit.score}/100` : 'no audit yet'} />
        <Stat label="Pages crawled" value={audit?.pagesCrawled ?? '-'} />
        <Stat label="AI spend today" value={`$${spend.dayUsd.toFixed(2)} / $${cfg.budget.dailyUsd}`} />
        <Stat label="AI spend month" value={`$${spend.monthUsd.toFixed(2)} / $${cfg.budget.monthlyUsd}`} />
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Alerts</h2>
        {alerts.length === 0 ? <p className="text-sm text-gray-500">None.</p> : (
          <ul className="text-sm space-y-1">{alerts.slice().reverse().map((a, i) => <li key={i}><b style={{ color: sevColor[a.level] }}>{a.level}</b> {a.ts.slice(0, 16)} {a.message}</li>)}</ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Open issues ({audit?.issues.length ?? 0})</h2>
        <table className="w-full text-sm">
          <tbody>
            {(audit?.issues ?? []).filter((i) => i.severity !== 'INFO').slice(0, 60).map((i, n) => (
              <tr key={n} className="border-t">
                <td className="py-1 pr-3 font-semibold" style={{ color: sevColor[i.severity] }}>{i.severity}</td>
                <td className="pr-3">{i.code}</td>
                <td className="pr-3 break-all">{i.url}</td>
                <td>{i.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Search opportunities</h2>
        {(opps ?? []).length === 0 ? <p className="text-sm text-gray-500">Run the weekly job to populate.</p> : (
          <ul className="text-sm space-y-1">{(opps ?? []).slice(0, 15).map((o, i) => <li key={i}><b>{o.type}</b> · {o.target} · {o.detail} · est. +{o.estimatedClicks} clicks · {o.confidence} confidence</li>)}</ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Published by the agent</h2>
        <ul className="text-sm space-y-1">{articles.slice().reverse().map((a) => <li key={a.slug}>{a.ts.slice(0, 10)} · <a className="underline" href={a.url}>{a.slug}</a> · {a.words} words</li>)}</ul>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Google guideline updates</h2>
        {updates.length === 0 ? <p className="text-sm text-gray-500">No changes detected yet.</p> : (
          <ul className="text-sm space-y-2">{updates.slice().reverse().map((u, i) => <li key={i}><b>{u.id}</b> ({u.ts.slice(0, 10)}, {u.status}) {u.summary}</li>)}</ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Recent AI actions</h2>
        <ul className="text-sm space-y-1">
          {actions.slice().reverse().map((a) => (
            <li key={a.id}>{a.ts.slice(0, 16)} · {a.agent} · {a.task} · risk {a.risk} · {a.result ?? a.reason}{a.costUsd ? ` · $${a.costUsd.toFixed(4)}` : ''}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}
