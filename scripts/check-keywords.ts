// Verifies the primary keyword is in title, H1 and description, and reports secondary-keyword coverage.
//   node --experimental-strip-types scripts/check-keywords.ts http://localhost:3100
import { PAGE_KEYWORDS, cityKeywords } from '../src/data/page-keywords.ts';

const base = (process.argv[2] ?? 'http://localhost:3100').replace(/\/$/, '');
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)</g)].map((m) => m[1]);
let bad = 0;
for (const path of paths) {
  const city = /^\/wedding-planner-in-([a-z-]+)\/$/.exec(path)?.[1];
  const kw = PAGE_KEYWORDS[path] ?? (city ? cityKeywords(city.replace(/-/g, ' ')) : undefined);
  if (!kw) continue;
  const html = await (await fetch(base + path)).text();
  const text = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').toLowerCase();
  const title = text(/<title>([^<]*)</.exec(html)?.[1] ?? '');
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] ?? '');
  const desc = (/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '').toLowerCase();
  const body = text(/<main[\s\S]*<\/main>/.exec(html)?.[0] ?? html);
  const p = kw.primary;
  const missing = [!title.includes(p) && 'title', !h1.includes(p) && 'h1', !desc.includes(p) && 'description', !body.includes(p) && 'body'].filter(Boolean);
  const sec = kw.secondary.filter((s) => body.includes(s.toLowerCase()));
  if (missing.length || sec.length < Math.ceil(kw.secondary.length / 2)) {
    bad++;
    console.log(path, '| primary missing in:', missing.join(',') || '-', '| secondary', `${sec.length}/${kw.secondary.length}`);
  }
}
console.log(`checked ${paths.length} urls, ${bad} need attention`);
