import type { AiConfig, ModelPrice } from './config.ts';
import type { Store, UsageRecord } from '../automation/store.ts';
import { isCriticalPriority, type Priority } from './router.ts';

export function priceFor(cfg: AiConfig, model: string): ModelPrice {
  return cfg.prices[model] ?? cfg.unknownModelPrice;
}

export function costUsd(cfg: AiConfig, model: string, tokensIn: number, tokensOut: number) {
  const p = priceFor(cfg, model);
  return (tokensIn * p.input + tokensOut * p.output) / 1_000_000;
}

export class BudgetExceededError extends Error {
  reason: string;
  constructor(reason: string) {
    super(`AI budget: ${reason}`);
    this.reason = reason;
  }
}

const startOfDay = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString();
const startOfMonth = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString();

export async function spendSummary(store: Store, now = new Date()) {
  const month = await store.list<UsageRecord>('ai_usage', { since: startOfMonth(now) });
  const dayStart = startOfDay(now);
  const day = month.filter((r) => r.ts >= dayStart);
  const sum = (rows: UsageRecord[]) => rows.reduce((s, r) => s + r.costUsd, 0);
  return {
    dayUsd: sum(day),
    monthUsd: sum(month),
    dayRequests: day.length,
    dayImages: day.filter((r) => r.kind === 'image').length,
  };
}

/**
 * Throws BudgetExceededError when a call must not happen.
 * Above `criticalOnlyAfter` of either budget only P0-P3 work may spend; above 100% nothing may.
 */
export async function assertBudget(
  store: Store,
  cfg: AiConfig,
  priority: Priority,
  opts: { image?: boolean; now?: Date } = {},
) {
  const s = await spendSummary(store, opts.now);
  const b = cfg.budget;
  if (s.dayUsd >= b.dailyUsd) throw new BudgetExceededError('daily budget exhausted');
  if (s.monthUsd >= b.monthlyUsd) throw new BudgetExceededError('monthly budget exhausted');
  if (s.dayRequests >= b.maxRequestsPerDay) throw new BudgetExceededError('daily request cap reached');
  if (opts.image && s.dayImages >= b.maxImagesPerDay) throw new BudgetExceededError('daily image cap reached');
  const nearLimit = s.dayUsd >= b.dailyUsd * b.criticalOnlyAfter || s.monthUsd >= b.monthlyUsd * b.criticalOnlyAfter;
  if (nearLimit && !isCriticalPriority(priority)) {
    throw new BudgetExceededError(`near budget limit; only P0-P3 tasks allowed (got ${priority})`);
  }
  return s;
}
