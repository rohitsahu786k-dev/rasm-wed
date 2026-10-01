/**
 * Search opportunity engine. Pure functions over Search Console rows, so it is fully testable.
 * Volumes on a young site are small, so thresholds are deliberately low and every finding carries a confidence score.
 */

export interface QueryPageRow {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export type OpportunityType = 'low-ctr' | 'striking-distance' | 'content-decay' | 'cannibalization' | 'no-dedicated-page';

export interface Opportunity {
  type: OpportunityType;
  target: string;
  detail: string;
  impressions: number;
  /** Rough expected extra monthly clicks if fixed. */
  estimatedClicks: number;
  confidence: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  risk: 'low' | 'medium';
  action: string;
  score: number;
}

/** Typical organic CTR by average position (industry-average curve, used only to judge "low for its position"). */
export const expectedCtr = (pos: number) => {
  if (pos <= 1.5) return 0.28;
  if (pos <= 2.5) return 0.15;
  if (pos <= 3.5) return 0.10;
  if (pos <= 5) return 0.06;
  if (pos <= 8) return 0.03;
  if (pos <= 10) return 0.02;
  if (pos <= 20) return 0.008;
  return 0.002;
};

const conf = (impr: number): Opportunity['confidence'] => (impr >= 200 ? 'high' : impr >= 40 ? 'medium' : 'low');
const STOP = new Set(['best', 'top', 'in', 'for', 'the', 'of', 'and', 'near', 'me', 'a', 'an', 'to', 'is', 'how', 'what', 'with']);
const words = (t: string) => t.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));
export const isBrandQuery = (q: string) => /\brasm(wed)?\b/i.test(q);
/** A page counts as dedicated when its URL covers at least half of the query's meaningful words. */
export function hasDedicatedPage(query: string, paths: string[]) {
  const q = words(query);
  if (!q.length) return true;
  return paths.some((p) => p !== '/' && q.filter((w) => words(p).includes(w)).length / q.length >= 0.5);
}
const path = (u: string) => {
  try {
    return new URL(u).pathname;
  } catch {
    return u;
  }
};

export function findOpportunities(current: QueryPageRow[], previous: QueryPageRow[], opts: { minImpressions?: number } = {}): Opportunity[] {
  const min = opts.minImpressions ?? 5;
  const out: Opportunity[] = [];
  const push = (o: Omit<Opportunity, 'score'>) => {
    const w = { low: 1, medium: 2, high: 3 }[o.confidence];
    const e = { low: 3, medium: 2, high: 1 }[o.effort];
    out.push({ ...o, score: Math.round((o.estimatedClicks + 1) * w * e * (o.risk === 'low' ? 1 : 0.6) * 10) / 10 });
  };

  // Aggregate per query (best page) and per page.
  const byQuery = new Map<string, QueryPageRow[]>();
  const byPage = new Map<string, { clicks: number; impressions: number }>();
  for (const r of current) {
    byQuery.set(r.query, [...(byQuery.get(r.query) ?? []), r]);
    const p = byPage.get(path(r.page)) ?? { clicks: 0, impressions: 0 };
    p.clicks += r.clicks;
    p.impressions += r.impressions;
    byPage.set(path(r.page), p);
  }

  for (const [query, rows] of byQuery) {
    const impr = rows.reduce((s, r) => s + r.impressions, 0);
    const clicks = rows.reduce((s, r) => s + r.clicks, 0);
    const top = rows.reduce((a, b) => (b.impressions > a.impressions ? b : a));
    if (impr < min) continue;
    const pos = rows.reduce((s, r) => s + r.position * r.impressions, 0) / impr;

    // 1) Low CTR for its position -> rewrite title/description (never clickbait).
    const exp = expectedCtr(pos);
    if (pos <= 10 && impr >= min && clicks / impr < exp * 0.5) {
      push({ type: 'low-ctr', target: path(top.page), detail: `"${query}" pos ${pos.toFixed(1)}, CTR ${((clicks / impr) * 100).toFixed(1)}% vs ~${(exp * 100).toFixed(1)}% expected`, impressions: impr, estimatedClicks: Math.round(impr * (exp - clicks / impr)), confidence: conf(impr), effort: 'low', risk: 'low', action: 'Test a clearer, more specific title/description that matches the query intent; measure for 28 days before changing again.' });
    }
    // 2) Striking distance (positions 4-15): closest wins.
    if (pos > 3.5 && pos <= 15 && impr >= min) {
      push({ type: 'striking-distance', target: path(top.page), detail: `"${query}" averages position ${pos.toFixed(1)} (${impr} impressions)`, impressions: impr, estimatedClicks: Math.round(impr * Math.max(0, expectedCtr(Math.max(3, pos - 4)) - exp)), confidence: conf(impr), effort: 'medium', risk: 'low', action: 'Deepen the page for this query (missing sub-topics, FAQ), add contextual internal links from related posts.' });
    }
    // 3) Cannibalization: two pages each meaningfully visible for one query.
    const strong = rows.filter((r) => r.impressions >= Math.max(min, impr * 0.25));
    if (new Set(strong.map((r) => path(r.page))).size >= 2) {
      push({ type: 'cannibalization', target: query, detail: `pages competing for "${query}": ${[...new Set(strong.map((r) => path(r.page)))].join(', ')}`, impressions: impr, estimatedClicks: Math.round(impr * 0.02), confidence: 'medium', effort: 'medium', risk: 'medium', action: 'Differentiate the intent of each page or consolidate; do NOT auto-merge. Review internal links so the preferred page is linked with the query anchor.' });
    }
    // 4) Demand but no dedicated page: query ranks only via the homepage or a very different page.
    const dedicated = hasDedicatedPage(query, rows.map((r) => path(r.page)));
    if (!dedicated && !isBrandQuery(query) && impr >= min && pos > 8) {
      push({ type: 'no-dedicated-page', target: query, detail: `"${query}" gets ${impr} impressions at position ${pos.toFixed(1)} without a page clearly about it`, impressions: impr, estimatedClicks: Math.round(impr * 0.03), confidence: conf(impr), effort: 'high', risk: 'low', action: 'Candidate topic for the daily content engine if it fits the business and is not a near-duplicate of an existing post.' });
    }
  }

  // 5) Content decay: page lost >=30% clicks (or >=40% impressions) vs previous period.
  const prev = new Map<string, { clicks: number; impressions: number }>();
  for (const r of previous) {
    const p = prev.get(path(r.page)) ?? { clicks: 0, impressions: 0 };
    p.clicks += r.clicks;
    p.impressions += r.impressions;
    prev.set(path(r.page), p);
  }
  for (const [p, before] of prev) {
    const now = byPage.get(p) ?? { clicks: 0, impressions: 0 };
    const clickDrop = before.clicks >= 3 ? 1 - now.clicks / before.clicks : 0;
    const imprDrop = before.impressions >= 20 ? 1 - now.impressions / before.impressions : 0;
    if (clickDrop >= 0.3 || imprDrop >= 0.4) {
      push({ type: 'content-decay', target: p, detail: `clicks ${before.clicks} -> ${now.clicks}, impressions ${before.impressions} -> ${now.impressions}`, impressions: before.impressions, estimatedClicks: Math.max(0, before.clicks - now.clicks), confidence: conf(before.impressions), effort: 'medium', risk: 'low', action: 'Check for a technical cause first (status, canonical, noindex); then refresh with genuinely new information. Do not bump dateModified without real changes.' });
    }
  }

  return out.sort((a, b) => b.score - a.score);
}

/** Period-over-period totals for the weekly report. */
export function totals(rows: { clicks: number; impressions: number; position: number }[]) {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const position = impressions ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions : 0;
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position };
}
