#!/usr/bin/env node
/**
 * Post-build SEO QA crawl.
 *   pnpm build && pnpm start -p 3111   (in another terminal)
 *   node scripts/seo-qa.mjs http://localhost:3111
 * Checks every URL in /sitemap.xml plus a set of redirect / 404 expectations.
 */
const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const problems = [];
const rows = [];
const fail = (url, msg) => problems.push(`${url}  ${msg}`);

const get = (u, opts = {}) => fetch(u, { redirect: 'manual', ...opts });
const count = (html, re) => (html.match(re) ?? []).length;

const sitemap = await (await get(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (new Set(urls).size !== urls.length) fail('/sitemap.xml', 'duplicate URLs');

for (const path of urls) {
  const res = await get(base + path);
  const html = await res.text();
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => new URL(m[1]).pathname);
  const h1 = count(html, /<h1[\s>]/g);
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const imgNoAlt = count(html, /<img(?![^>]*\balt=)[^>]*>/g);
  const ld = count(html, /application\/ld\+json/g);
  rows.push({ path, status: res.status, h1, canon: canon[0] === path ? 'self' : canon[0], ld, title: title.slice(0, 60) });
  if (res.status !== 200) fail(path, `status ${res.status}`);
  if (!title) fail(path, 'missing <title>');
  if (!desc) fail(path, 'missing meta description');
  if (canon.length !== 1) fail(path, `canonical tags: ${canon.length}`);
  else if (canon[0] !== path) fail(path, `canonical points to ${canon[0]}`);
  if (h1 !== 1) fail(path, `h1 count ${h1}`);
  if (noindex) fail(path, 'noindex on a sitemap URL');
  if (imgNoAlt) fail(path, `${imgNoAlt} <img> without alt attribute`);
}

// Redirects must be single-hop 308/301 to a final 200 URL.
const redirects = { '/about/': '/about-us/', '/journal/': '/blog/', '/contact/': '/contact-us/', '/venues/': '/wedding-destination/', '/category/blog/': '/blog/' };
for (const [from, to] of Object.entries(redirects)) {
  const r = await get(base + from);
  const loc = r.headers.get('location');
  if (![301, 308].includes(r.status) || !loc || new URL(loc, base).pathname !== to) fail(from, `expected 30x -> ${to}, got ${r.status} ${loc}`);
}

// Unknown URLs must be real 404s (no soft 404).
for (const p of ['/does-not-exist/', '/venue-blog/aura-by-area83/', '/wedding-planner-in-atlantis/']) {
  const r = await get(base + p);
  if (r.status !== 404) fail(p, `expected 404, got ${r.status}`);
}

const robots = await (await get(`${base}/robots.txt`)).text();
if (/Disallow:\s*\/\s*$/m.test(robots)) fail('/robots.txt', 'blanket Disallow: / (only valid on non-production)');
if (!/Sitemap:/i.test(robots)) fail('/robots.txt', 'no sitemap reference');

console.table(rows);
console.log(`\nChecked ${rows.length} sitemap URLs.`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):\n` + problems.map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log('All checks passed.');
