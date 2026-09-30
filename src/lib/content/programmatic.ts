/**
 * Programmatic SEO, done safely.
 *
 * NOT city-name find-and-replace. Each candidate pairs an approved destination with a genuinely different search
 * intent, is scored by real Search Console demand, must be justified by the model, and is published only if the
 * finished article is substantially original against every existing page (see uniqueness.ts).
 * Hard caps keep it from ever becoming a doorway/scaled-content farm.
 */
import kb from '../../data/knowledge-base.json' with { type: 'json' };
import { similarity } from './quality.ts';
import type { TopicPlan } from './topics.ts';

export interface Intent {
  id: string;
  /** Distinct user need this page serves; the writer is told to cover ONLY this. */
  title: (city: string) => string;
  keyword: (city: string) => string;
  angle: string;
}

export const INTENTS: Intent[] = [
  {
    id: 'rituals',
    title: (c) => `Wedding Rituals and Local Traditions in ${c}: A Guide for Families`,
    keyword: (c) => `${c} wedding traditions`,
    angle: 'Local customs, ceremonies and etiquette that shape a wedding in this place; what guests unfamiliar with them should know.',
  },
  {
    id: 'decor',
    title: (c) => `Wedding Decor Ideas for ${c}: Settings, Colours and Materials`,
    keyword: (c) => `${c} wedding decor ideas`,
    angle: 'Decor that suits this place’s architecture, landscape, light and climate; what to avoid; practical set-up constraints.',
  },
  {
    id: 'food',
    title: (c) => `Wedding Food and Catering in ${c}: What to Plan For`,
    keyword: (c) => `${c} wedding catering`,
    angle: 'Regional cuisine worth featuring, dietary needs (Jain, vegetarian, international guests), service logistics and tasting checklist.',
  },
  {
    id: 'guests',
    title: (c) => `Guest Travel and Stay Guide for a ${c} Wedding`,
    keyword: (c) => `${c} wedding guest accommodation`,
    angle: 'How guests reach and move around, room-block planning, elderly and international guests, transfers, arrival-day schedule.',
  },
  {
    id: 'honeymoon',
    title: (c) => `After the Wedding: Honeymoon Ideas Near ${c}`,
    keyword: (c) => `honeymoon near ${c}`,
    angle: 'Where to go after a wedding here, how to time it, travel practicalities. Only relevant, real places; no prices.',
  },
];

export interface Candidate {
  city: string;
  intent: Intent;
  plan: TopicPlan;
  score: number;
  demand: number;
}

export interface ProgrammaticContext {
  existing: { title: string; slug: string }[];
  queries: { query: string; impressions: number; clicks: number; position: number }[];
  /** Slugs already published by the programmatic engine (for per-city caps). */
  programmaticSlugs: string[];
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').split('-').slice(0, 8).join('-');

export const PER_CITY_CAP = 3;

export function buildCandidates(ctx: ProgrammaticContext): Candidate[] {
  const out: Candidate[] = [];
  const cities = kb.destinationsWithPages as string[];
  for (const city of cities) {
    const cityLower = city.toLowerCase();
    const already = ctx.programmaticSlugs.filter((s) => s.includes(slugify(city))).length;
    if (already >= PER_CITY_CAP) continue;
    for (const intent of INTENTS) {
      const title = intent.title(city);
      const keyword = intent.keyword(city);
      const slug = slugify(keyword); // short, keyword-first URL (e.g. udaipur-wedding-decor-ideas)
      if (ctx.existing.some((p) => p.slug === slug || similarity(`${title} ${keyword}`, p.title) >= 0.5)) continue;

      // Demand: impressions on queries that mention the city AND an intent word.
      const intentWords = keyword.toLowerCase().split(' ').filter((w) => w.length > 3 && w !== cityLower);
      const demand = ctx.queries
        .filter((q) => q.query.toLowerCase().includes(cityLower) && intentWords.some((w) => q.query.toLowerCase().includes(w)))
        .reduce((s, q) => s + q.impressions, 0);
      // Cities that already have several pages score lower so coverage spreads out.
      const score = demand * 10 + 1 - already * 0.4 + (cityLower === 'udaipur' ? 0.2 : 0);
      out.push({
        city,
        intent,
        demand,
        score,
        plan: {
          topic: title,
          primaryKeyword: keyword,
          secondaryKeywords: [],
          searchIntent: intent.angle,
          audience: 'couples and families planning a destination wedding',
          whyNeeded: `Distinct intent "${intent.id}" for ${city}${demand ? ` with ${demand} Search Console impressions on related queries` : ' (curated, no measured demand yet)'}.`,
          slug,
        },
      });
    }
  }
  return out.sort((a, b) => b.score - a.score);
}

export const nextCandidate = (ctx: ProgrammaticContext) => buildCandidates(ctx)[0] ?? null;

/** Weekly and total safety limits. */
export function withinCaps(published: { ts: string; kind?: string }[], now = Date.now(), perWeek = Number(process.env.AI_PROGRAMMATIC_PER_WEEK ?? 2), total = Number(process.env.AI_PROGRAMMATIC_MAX_TOTAL ?? 40)) {
  const prog = published.filter((p) => p.kind === 'programmatic');
  const lastWeek = prog.filter((p) => now - Date.parse(p.ts) < 7 * 86400_000).length;
  return { ok: lastWeek < perWeek && prog.length < total, lastWeek, total: prog.length };
}
