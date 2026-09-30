import type { ModelTier } from './config.ts';

/** Every AI task the agent can run. Add a task here and choose its tier deliberately. */
export type AiTask =
  | 'seo-strategy'
  | 'ranking-loss-analysis'
  | 'code-repair'
  | 'architecture-decision'
  | 'article-write'
  | 'article-edit-factcheck'
  | 'google-doc-interpretation'
  | 'competitive-analysis'
  | 'high-risk-change-review'
  | 'title-meta-generation'
  | 'schema-generation'
  | 'log-classification'
  | 'duplicate-detection'
  | 'summary'
  | 'content-extraction';

const STRONG: AiTask[] = [
  'seo-strategy',
  'ranking-loss-analysis',
  'code-repair',
  'architecture-decision',
  'article-write',
  'article-edit-factcheck',
  'google-doc-interpretation',
  'competitive-analysis',
  'high-risk-change-review',
];
const BALANCED: AiTask[] = ['title-meta-generation', 'schema-generation'];

/** Correctness first: only mechanical tasks are ever routed to the cheap tier. */
export function tierFor(task: AiTask): ModelTier {
  if (STRONG.includes(task)) return 'strong';
  if (BALANCED.includes(task)) return 'balanced';
  return 'cheap';
}

export type Priority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9';
/** P0-P3 (availability, indexability, errors, critical regressions) are "critical" for budget purposes. */
export const isCriticalPriority = (p: Priority) => p <= 'P3';
