#!/usr/bin/env node
/**
 * Snapshot the CURRENT live WordPress/Rank Math SEO metadata for every sitemap URL.
 * The Next.js site uses it to keep exactly the titles/descriptions that already rank.
 *   node scripts/snapshot-live-seo.mjs [origin]      (default https://rasmwed.com)
 * Writes src/data/seo-live.json
 */
import fs from 'node:fs';

const origin = (process.argv[2] ?? 'https://rasmwed.com').replace(/\/$/, '');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#0?39;|&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const attr = (html, re) => decode(re.exec(html)?.[1] ?? '');
const get = async (u) => (await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (seo-snapshot)' }, signal: AbortSignal.timeout(30000) })).text();

const index = await get(`${origin}/sitemap_index.xml`);
const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = new Set([`${origin}/`]);
for (const m of maps) for (const x of (await get(m)).matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(x[1]);

const out = {};
for (const u of urls) {
  const path = new URL(u).pathname;
  const html = await get(u);
  out[path] = {
    title: attr(html, /<title>([^<]*)<\/title>/i),
    description: attr(html, /<meta name="description" content="([^"]*)"/i),
    robots: attr(html, /<meta name="robots" content="([^"]*)"/i),
    ogImage: attr(html, /<meta property="og:image" content="([^"]*)"/i),
  };
  console.log(path.padEnd(60), out[path].title.slice(0, 70));
}
fs.writeFileSync('src/data/seo-live.json', `${JSON.stringify(out, null, 2)}\n`);
console.log(`\n${Object.keys(out).length} URLs written to src/data/seo-live.json`);
