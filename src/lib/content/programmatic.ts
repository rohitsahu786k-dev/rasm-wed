/**
 * Programmatic SEO, done safely.
 *
 * Five families, each pairing an approved entity with a genuinely different search need (never a find-and-replace):
 *   hub        5 pillar guides (built first; each later keeps an auto-updated index of its detailed guides)
 *   market     NRI/overseas market x planning need     (e.g. destination wedding in India from the UK: timeline)
 *   community  wedding community x Rajasthan           (rituals/planning differ by community)
 *   cityIntent approved destination x intent           (rituals, decor, food, guest logistics, honeymoon)
 *   month      city x month                            (weather, crowds, timing differ)
 * Every spoke must link to its hub, is ranked by Search Console demand plus strategy weight, must pass the full
 * quality gate and the body-uniqueness gate, and is capped per week/city/total so it can never become a doorway farm.
 */
import kb from '../../data/knowledge-base.json' with { type: 'json' };
import strategy from '../../data/keyword-strategy.json' with { type: 'json' };
import { similarity } from './quality.ts';
import type { TopicPlan } from './topics.ts';

export type Family = 'hub' | 'market' | 'community' | 'cityIntent' | 'month';

export interface Intent {
  id: string;
  title: (city: string) => string;
  keyword: (city: string) => string;
  angle: string;
}

export const INTENTS: Intent[] = [
  { id: 'rituals', title: (c) => `Wedding Rituals and Local Traditions in ${c}: A Guide for Families`, keyword: (c) => `${c} wedding traditions`, angle: 'Local customs, ceremonies and etiquette that shape a wedding in this place; what guests unfamiliar with them should know.' },
  { id: 'decor', title: (c) => `Wedding Decor Ideas for ${c}: Settings, Colours and Materials`, keyword: (c) => `${c} wedding decor ideas`, angle: 'Decor that suits this place’s architecture, landscape, light and climate; what to avoid; practical set-up constraints.' },
  { id: 'food', title: (c) => `Wedding Food and Catering in ${c}: What to Plan For`, keyword: (c) => `${c} wedding catering`, angle: 'Regional cuisine worth featuring, dietary needs (Jain, vegetarian, international guests), service logistics and tasting checklist.' },
  { id: 'guests', title: (c) => `Guest Travel and Stay Guide for a ${c} Wedding`, keyword: (c) => `${c} wedding guest accommodation`, angle: 'How guests reach and move around, room-block planning, elderly and international guests, transfers, arrival-day schedule.' },
  { id: 'honeymoon', title: (c) => `After the Wedding: Honeymoon Ideas Near ${c}`, keyword: (c) => `honeymoon near ${c}`, angle: 'Where to go after a wedding here, how to time it, travel practicalities. Only relevant, real places; no prices.' },
];

export interface Candidate {
  family: Family;
  /** Slug of the pillar page this page must link to and be listed on. */
  hubSlug: string;
  city?: string;
  intent?: Intent;
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

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').split('-').slice(0, 9).join('-');

export const PER_CITY_CAP = 3;
const W = strategy.weights;

const demandFor = (queries: ProgrammaticContext['queries'], mustHave: string[], anyOf: string[]) =>
  queries
    .filter((q) => mustHave.every((m) => q.query.toLowerCase().includes(m.toLowerCase())) && (anyOf.length === 0 || anyOf.some((w) => q.query.toLowerCase().includes(w.toLowerCase()))))
    .reduce((s, q) => s + q.impressions, 0);

const plan = (topic: string, keyword: string, slug: string, angle: string, why: string, audience = 'couples and families planning a destination wedding in India'): TopicPlan => ({
  topic,
  primaryKeyword: keyword,
  secondaryKeywords: [],
  searchIntent: angle,
  audience,
  whyNeeded: why,
  slug,
});

export function buildCandidates(ctx: ProgrammaticContext): Candidate[] {
  const out: Candidate[] = [];
  const have = new Set(ctx.existing.map((p) => p.slug));
  // Titles are only compared loosely: sibling pages in a family legitimately share most words.
  const taken = (slug: string, title: string) => have.has(slug) || ctx.existing.some((p) => similarity(title, p.title) >= 0.85);
  const push = (c: Omit<Candidate, 'score'> & { weight: number; fatigue?: number }) => {
    const { weight, fatigue = 0, ...rest } = c;
    out.push({ ...rest, score: weight + c.demand * 10 - fatigue });
  };

  // 1) Hubs: built first. Spokes are only offered once their hub is published.
  for (const h of strategy.hubs) {
    if (taken(h.slug, h.title)) continue;
    push({ family: 'hub', hubSlug: h.slug, demand: 0, weight: W.hub, plan: plan(h.title, h.keyword, h.slug, h.angle, `Pillar page "${h.id}" anchoring a topic cluster.`) });
  }
  const hubReady = (id: string) => {
    const h = strategy.hubs.find((x) => x.id === id)!;
    return have.has(h.slug) ? h.slug : null;
  };

  // 2) NRI/overseas market x need.
  const nriHub = hubReady('nri');
  if (nriHub) {
    for (const m of strategy.markets) {
      for (const n of strategy.marketNeeds) {
        const title = n.title.replace('{M}', m.name);
        const slug = slugify(`india destination wedding from ${m.short} ${n.slugTail}`);
        if (taken(slug, title)) continue;
        const demand = demandFor(ctx.queries, ['india'], [m.short.toLowerCase(), m.id === 'usa' ? 'america' : '', m.id === 'uae' ? 'dubai' : ''].filter(Boolean));
        push({
          family: 'market',
          hubSlug: nriHub,
          demand,
          weight: W.market,
          plan: plan(title, `india destination wedding from ${m.short.toLowerCase()}`, slug, `${n.angle.replace(/\{M\}/g, m.name)} Market context: ${m.context}`, `Market "${m.id}" x need "${n.id}": distinct origin-country planning problem.`, `families and couples living in ${m.name} planning a wedding in India`),
        });
      }
    }
  }

  // 3) Communities.
  const ritualHub = hubReady('rituals');
  if (ritualHub) {
    for (const c of strategy.communities) {
      const cities = ['Rajasthan', ...(((strategy.communityCities as Record<string, string[]>)[c.id]) ?? [])];
      for (const place of cities) {
        const title = `${c.name} Wedding in ${place}: Rituals, Planning and Venue Considerations`;
        const slug = slugify(`${c.id} wedding in ${place}`);
        if (taken(slug, title)) continue;
        push({
          family: 'community',
          hubSlug: ritualHub,
          demand: demandFor(ctx.queries, [c.id === 'sikh' ? 'sikh' : c.id], ['wedding']),
          weight: W.community - (place === 'Rajasthan' ? 0 : 5),
          plan: plan(title, `${c.name.split(' ')[0].toLowerCase()} wedding in ${place.toLowerCase()}`, slug, strategy.communityAngle.replace('{C}', c.name).replace('{IN}', place === 'Rajasthan' ? '' : ` (specifically in ${place})`), `Community "${c.id}" has distinct ceremonies, food and timing needs.`, `${c.name} families planning a wedding in ${place}`),
        });
      }
    }
  }

  // 4) City x intent.
  const destHub = hubReady('destination');
  if (destHub) {
    for (const city of kb.destinationsWithPages as string[]) {
      const cityLower = city.toLowerCase();
      const already = ctx.programmaticSlugs.filter((s) => s.includes(slugify(city))).length;
      if (already >= PER_CITY_CAP) continue;
      for (const intent of INTENTS) {
        const title = intent.title(city);
        const keyword = intent.keyword(city);
        const slug = slugify(keyword);
        if (taken(slug, title)) continue;
        const words = keyword.toLowerCase().split(' ').filter((w) => w.length > 3 && w !== cityLower);
        push({ family: 'cityIntent', hubSlug: destHub, city, intent, demand: demandFor(ctx.queries, [cityLower], words), weight: W.cityIntent - already * 0.4 + (cityLower === 'udaipur' ? 0.2 : 0), plan: plan(title, keyword, slug, intent.angle, `Distinct intent "${intent.id}" for ${city}.`) });
      }
    }

    // 5) City x month.
    for (const cm of strategy.months) {
      for (const month of cm.months) {
        const title = `${cm.city} Wedding in ${month}: Weather, Crowds and Planning Notes`;
        const slug = slugify(`${cm.city} wedding in ${month}`);
        if (taken(slug, title)) continue;
        push({ family: 'month', hubSlug: destHub, city: cm.city, demand: demandFor(ctx.queries, [cm.city.toLowerCase(), month.toLowerCase()], []), weight: W.month, plan: plan(title, `${cm.city.toLowerCase()} wedding in ${month.toLowerCase()}`, slug, strategy.monthAngle.replace('{CITY}', cm.city).replace('{MONTH}', month), `Month "${month}" changes weather, crowds and timing in ${cm.city}.`) });
      }
    }
  }

  return out.sort((a, b) => b.score - a.score);
}

export const nextCandidate = (ctx: ProgrammaticContext) => buildCandidates(ctx)[0] ?? null;

/** Weekly and total safety limits (env-overridable). */
export function withinCaps(
  published: { ts: string; kind?: string }[],
  now = Date.now(),
  perWeek = Number(process.env.AI_PROGRAMMATIC_PER_WEEK ?? 3),
  total = Number(process.env.AI_PROGRAMMATIC_MAX_TOTAL ?? 150),
) {
  const prog = published.filter((p) => p.kind === 'programmatic');
  const lastWeek = prog.filter((p) => now - Date.parse(p.ts) < 7 * 86400_000).length;
  return { ok: lastWeek < perWeek && prog.length < total, lastWeek, total: prog.length };
}
