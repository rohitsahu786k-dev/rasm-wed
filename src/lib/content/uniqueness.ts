/**
 * Body-level duplicate detection for programmatic pages. Title similarity is not enough: pages built from one
 * template differ in a city name but share paragraphs. We measure the fraction of a candidate's 5-word shingles
 * that already appear in ANY existing page (containment), which is what Google's "scaled content" policy targets.
 */
import { stripTags } from './quality.ts';

const words = (html: string) => stripTags(html).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);

export function shingles(html: string, n = 5): Set<string> {
  const w = words(html);
  const out = new Set<string>();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(' '));
  return out;
}

export interface UniquenessResult {
  /** Highest share of the candidate's shingles found in a single existing document (0-1). */
  maxContainment: number;
  mostSimilar?: string;
  /** Share of shingles found anywhere in the corpus (0-1). */
  totalContainment: number;
}

export function measureUniqueness(candidateHtml: string, corpus: { id: string; html: string }[]): UniquenessResult {
  const cand = shingles(candidateHtml);
  if (cand.size === 0) return { maxContainment: 1, totalContainment: 1 };
  const union = new Set<string>();
  let max = 0;
  let which: string | undefined;
  for (const doc of corpus) {
    const s = shingles(doc.html);
    let hit = 0;
    for (const sh of cand) {
      if (s.has(sh)) {
        hit++;
        union.add(sh);
      }
    }
    const c = hit / cand.size;
    if (c > max) {
      max = c;
      which = doc.id;
    }
  }
  return { maxContainment: max, mostSimilar: which, totalContainment: union.size / cand.size };
}

/** Programmatic pages must be substantially original: reject when >18% of any single page or >30% overall is reused. */
export const isUniqueEnough = (r: UniquenessResult) => r.maxContainment <= 0.18 && r.totalContainment <= 0.3;
