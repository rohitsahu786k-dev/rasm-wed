/**
 * Core Web Vitals via the PageSpeed Insights API (field data from CrUX when Google has enough traffic, lab data otherwise).
 * Field data wins when present. A free API key (PAGESPEED_API_KEY) raises quotas but is optional.
 */
import type { Store } from '../automation/store.ts';
import { logAction } from '../automation/store.ts';
import { fetchRetry } from '../net.ts';
import type { Alert } from './alerts.ts';

export interface CwvResult {
  url: string;
  source: 'field' | 'lab' | 'none';
  lcpMs?: number;
  cls?: number;
  inpMs?: number;
  perfScore?: number;
}

export const THRESHOLDS = { lcpMs: 2500, lcpPoorMs: 4000, cls: 0.1, clsPoor: 0.25, inpMs: 200, inpPoorMs: 500 };

interface Psi {
  loadingExperience?: { metrics?: Record<string, { percentile?: number }> };
  lighthouseResult?: { categories?: { performance?: { score?: number } }; audits?: Record<string, { numericValue?: number }> };
}

export function parsePsi(url: string, j: Psi): CwvResult {
  const m = j.loadingExperience?.metrics ?? {};
  const lcpF = m.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
  const clsF = m.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;
  const inpF = m.INTERACTION_TO_NEXT_PAINT?.percentile;
  const perfScore = j.lighthouseResult?.categories?.performance?.score;
  if (lcpF !== undefined || clsF !== undefined || inpF !== undefined) {
    return { url, source: 'field', lcpMs: lcpF, cls: clsF !== undefined ? clsF / 100 : undefined, inpMs: inpF, perfScore };
  }
  const a = j.lighthouseResult?.audits ?? {};
  if (a['largest-contentful-paint']) {
    return { url, source: 'lab', lcpMs: a['largest-contentful-paint']?.numericValue, cls: a['cumulative-layout-shift']?.numericValue, perfScore };
  }
  return { url, source: 'none' };
}

export function cwvAlerts(results: CwvResult[]): Alert[] {
  const ts = new Date().toISOString();
  const out: Alert[] = [];
  for (const r of results.filter((x) => x.source === 'field')) {
    if ((r.lcpMs ?? 0) > THRESHOLDS.lcpPoorMs) out.push({ ts, level: 'HIGH', code: `cwv-lcp:${r.url}`, message: `Field LCP ${Math.round(r.lcpMs!)}ms (poor > ${THRESHOLDS.lcpPoorMs}) on ${r.url}` });
    if ((r.cls ?? 0) > THRESHOLDS.clsPoor) out.push({ ts, level: 'HIGH', code: `cwv-cls:${r.url}`, message: `Field CLS ${r.cls} (poor > ${THRESHOLDS.clsPoor}) on ${r.url}` });
    if ((r.inpMs ?? 0) > THRESHOLDS.inpPoorMs) out.push({ ts, level: 'HIGH', code: `cwv-inp:${r.url}`, message: `Field INP ${Math.round(r.inpMs!)}ms (poor > ${THRESHOLDS.inpPoorMs}) on ${r.url}` });
  }
  return out;
}

export async function runCwvCheck(urls: string[], store: Store, deps: { fetchImpl?: typeof fetch; apiKey?: string } = {}) {
  const f = deps.fetchImpl ?? fetch;
  const key = deps.apiKey ?? process.env.PAGESPEED_API_KEY;
  const results: CwvResult[] = [];
  for (const url of urls) {
    try {
      const res = await fetchRetry(f, `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?strategy=mobile&category=performance&url=${encodeURIComponent(url)}${key ? `&key=${key}` : ''}`, {}, { timeoutMs: 90_000, tries: 3 });
      if (res.ok) results.push(parsePsi(url, (await res.json()) as Psi));
    } catch {
      /* PSI is best-effort; next week retries */
    }
  }
  await store.append('cwv', { ts: new Date().toISOString(), results });
  await logAction(store, { agent: 'performance-engineer', task: 'cwv-check', reason: 'scheduled', risk: 0, result: `${results.length} URL(s) measured (${results.filter((r) => r.source === 'field').length} with field data)` });
  return results;
}
