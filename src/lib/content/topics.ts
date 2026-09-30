import kb from '../../data/knowledge-base.json' with { type: 'json' };
import { runAi } from '../ai/client.ts';
import { similarity } from './quality.ts';

export interface TopicPlan {
  skip?: boolean;
  reason?: string;
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  audience: string;
  whyNeeded: string;
  slug: string;
}

export interface TopicContext {
  existing: { title: string; slug: string }[];
  /** Search Console queries with impressions (demand signal). Empty if GSC is unavailable. */
  queries: { query: string; impressions: number; clicks: number; position: number }[];
  recentTopics: string[];
}

export async function chooseTopic(ctx: TopicContext, run: typeof runAi = runAi): Promise<TopicPlan> {
  const r = await run<TopicPlan>({
    task: 'seo-strategy',
    priority: 'P8',
    json: true,
    maxOutputTokens: 1500,
    instructions: [
      `You are the content strategist for ${kb.brand.name} (${kb.brand.positioning}).`,
      'Pick ONE new blog topic that is closely related to the business: destination weddings, palace/heritage weddings, wedding planning, rituals, decor, venues and destinations in Rajasthan and India, for couples and families (including NRI).',
      'It must serve a real search intent, answer a genuine question, and NOT overlap with any existing post (a different angle on the same query is still a duplicate).',
      'Prefer topics backed by the Search Console demand list (queries with impressions but no dedicated page). If nothing genuinely worthwhile and non-duplicate exists today, return {"skip":true,"reason":"..."}.',
      'Return JSON only: {"topic","primaryKeyword","secondaryKeywords":[],"searchIntent","audience","whyNeeded","slug"} where slug is lowercase-hyphenated, <=8 words.',
    ].join(' '),
    input: JSON.stringify({
      existingPosts: ctx.existing.map((p) => p.title),
      recentlyPlanned: ctx.recentTopics,
      searchConsoleQueries: ctx.queries.slice(0, 80),
    }),
  });
  return r.output;
}

/** Deterministic duplicate guard applied after the model's choice. */
export function isDuplicateTopic(plan: TopicPlan, ctx: TopicContext) {
  const titles = [...ctx.existing.map((p) => p.title), ...ctx.recentTopics];
  const worst = titles.reduce((m, t) => Math.max(m, similarity(`${plan.topic} ${plan.primaryKeyword}`, t)), 0);
  const slugTaken = ctx.existing.some((p) => p.slug === plan.slug);
  return slugTaken || worst >= 0.55;
}
