// Summarises real AI spend by task from the ledger (WordPress store). Usage: node --env-file=.env.local --experimental-strip-types scripts/cost-report.ts
import { getStore } from '../src/lib/automation/store.ts';
import type { UsageRecord } from '../src/lib/automation/store.ts';
const rows = await getStore().list<UsageRecord>('ai_usage');
const by = new Map<string, { n: number; usd: number; model: string }>();
for (const r of rows) {
  const k = `${r.task} [${r.model}]`;
  const v = by.get(k) ?? { n: 0, usd: 0, model: r.model };
  v.n++;
  v.usd += r.costUsd;
  by.set(k, v);
}
console.log('calls  total$   avg$     task');
for (const [k, v] of [...by].sort((a, b) => b[1].usd - a[1].usd)) console.log(String(v.n).padStart(5), v.usd.toFixed(3).padStart(8), (v.usd / v.n).toFixed(4).padStart(8), ' ', k);
console.log('TOTAL so far: $' + rows.reduce((s, r) => s + r.costUsd, 0).toFixed(3), 'over', rows.length, 'calls');
