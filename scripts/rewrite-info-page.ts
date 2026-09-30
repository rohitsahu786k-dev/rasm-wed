// Fills an empty/thin WordPress page with a quality-gated body (no image; the page's designed layout stays).
//   node --env-file=.env.local --experimental-strip-types scripts/rewrite-info-page.ts corporate-events
import { promises as fs } from 'node:fs';
import { writeInfoPage } from '../src/lib/content/city-pages.ts';
import { evaluateArticle } from '../src/lib/content/quality.ts';
import { setRankMath, updatePage, wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';
import { getStore, logAction } from '../src/lib/automation/store.ts';
import { loadContext } from '../src/lib/content/pipeline.ts';

const PAGES: Record<string, { title: string; brief: string }> = {
  'corporate-events': {
    title: 'Corporate and VIP Events in Rajasthan',
    brief: 'Corporate galas, conferences, incentive trips, brand launches and VIP hospitality at Rajasthan palaces and heritage venues, produced by Rasm Weddings & Events from Udaipur. Practical guidance for corporate buyers: venue selection, guest logistics, permissions, production, timelines.',
  },
};
const slug = process.argv[2];
const spec = PAGES[slug];
if (!spec) throw new Error(`unknown page ${slug}`);
const creds = wpCredsFromEnv()!;
const store = getStore();
const { links: all, existing } = await loadContext({ creds, siteUrl: 'https://rasmwed.com' }, store);
const auth = { Authorization: `Basic ${Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')}` };
const [page] = (await (await fetch(`${creds.url}/wp-json/wp/v2/pages?slug=${slug}&context=edit&_fields=id,title,content,meta`, { headers: auth })).json()) as { id: number }[];
await fs.mkdir('.data/backups/pages', { recursive: true });
await fs.writeFile(`.data/backups/pages/${slug}.json`, JSON.stringify(page, null, 2));

const links = all.filter((l) => l.path !== `/${slug}/`).slice(0, 40);
let draft, fb: string[] = [], gate = { pass: false, words: 0, failures: [] as string[], warnings: [] as string[] };
for (let i = 0; i < 2; i++) {
  draft = await writeInfoPage({ slug, ...spec }, links, fb);
  gate = evaluateArticle(draft, { allowedInternalPaths: new Set(all.map((l) => l.path)), existingTitles: existing.map((e) => e.title), siteOrigin: 'https://rasmwed.com' });
  if (gate.pass) break;
  fb = gate.failures;
}
if (!gate.pass || !draft) throw new Error(`rejected: ${gate.failures.join('; ')}`);
await updatePage(creds, page.id, { html: draft.html });
await setRankMath(creds, page.id, { rank_math_description: draft.metaDescription });
await logAction(store, { agent: 'content-editor', task: 'fill-thin-page', reason: 'empty WordPress body', target: `/${slug}/`, after: { words: gate.words }, risk: 2, tests: { gate: 'passed' }, result: `page ${page.id} updated` });
console.log(slug, 'published', gate.words, 'words');
