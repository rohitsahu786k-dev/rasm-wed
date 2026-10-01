#!/usr/bin/env node
// Summarise Lighthouse JSON reports in ./reports: scores, LCP element, failing audits with offending nodes.
import fs from 'node:fs';

const only = process.argv[2];
for (const f of fs.readdirSync('reports').filter((x) => x.endsWith('.json') && (!only || x.includes(only)))) {
  const r = JSON.parse(fs.readFileSync(`reports/${f}`, 'utf8'));
  const cats = Object.values(r.categories).map((c) => `${c.id}:${Math.round(c.score * 100)}`).join(' ');
  const a = r.audits;
  console.log(`\n== ${f}\n${cats}  LCP ${a['largest-contentful-paint'].displayValue}  CLS ${a['cumulative-layout-shift'].displayValue}  TBT ${a['total-blocking-time'].displayValue}`);
  const walk = (d) => (Array.isArray(d?.items) ? d.items : []).flatMap((i) => (i.items ? walk(i) : [i]));
  for (const [id, au] of Object.entries(a)) {
    if (au.score === null || au.score >= 0.9 || ['informative', 'notApplicable', 'manual'].includes(au.scoreDisplayMode)) continue;
    const nodes = walk(au.details).map((i) => i.node?.snippet ?? i.url ?? '').filter(Boolean).slice(0, 3);
    console.log(` - ${id} (${au.score}) ${au.displayValue ?? ''}${nodes.length ? '\n     ' + nodes.map((n) => n.slice(0, 140)).join('\n     ') : ''}`);
  }
  const lcp = walk(a['largest-contentful-paint-element']?.details).find((i) => i.node);
  if (lcp) console.log(` LCP element: ${lcp.node.snippet.slice(0, 200)}`);
}
