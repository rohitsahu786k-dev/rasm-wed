// Replaces the cloned/empty Elementor city pages with unique, quality-gated landing pages (one image each).
// Originals are backed up to .data/backups/pages/<slug>.json first; WordPress also keeps page revisions.
//   node --env-file=.env.local --experimental-strip-types scripts/rewrite-city-pages.ts [slug ...] [--dry]
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { CITY_LANDINGS, writeCityPage } from '../src/lib/content/city-pages.ts';
import { evaluateArticle } from '../src/lib/content/quality.ts';
import { generateWebp, imageFilename } from '../src/lib/images/generate.ts';
import { setRankMath, updatePage, uploadMedia, wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';
import { getStore, logAction } from '../src/lib/automation/store.ts';
import { loadContext } from '../src/lib/content/pipeline.ts';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const only = args.filter((a) => !a.startsWith('--'));
const creds = wpCredsFromEnv();
if (!creds) throw new Error('WordPress credentials missing');
const store = getStore();
const auth = { Authorization: `Basic ${Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')}` };

const { links: allLinks, existing } = await loadContext({ creds, siteUrl: 'https://rasmwed.com' }, store);
const allowed = new Set(allLinks.map((l) => l.path));

for (const c of CITY_LANDINGS.filter((x) => only.length === 0 || only.includes(x.slug))) {
  const [page] = (await (await fetch(`${creds.url}/wp-json/wp/v2/pages?slug=${c.slug}&context=edit&_fields=id,title,content,meta,featured_media`, { headers: auth })).json()) as { id: number; title: { raw: string }; content: { raw: string }; featured_media: number }[];
  if (!page) {
    console.log(c.slug, 'page not found, skipped');
    continue;
  }
  await fs.mkdir('.data/backups/pages', { recursive: true });
  await fs.writeFile(path.join('.data/backups/pages', `${c.slug}.json`), JSON.stringify(page, null, 2));

  // Links: contact/services/hub + nearby cities + a few relevant posts. The page must not link to itself.
  const nearby = new Set<string>(c.nearby.map((s) => `/${s}/`));
  const links = allLinks.filter((l) => l.path !== `/${c.slug}/` && (nearby.has(l.path) || ['/contact-us/', '/services/', '/wedding-destination/'].includes(l.path) || !l.path.startsWith('/wedding-planner-in-'))).slice(0, 40);

  let draft;
  let feedback: string[] = [];
  let gate = { pass: false, words: 0, failures: [] as string[], warnings: [] as string[] };
  for (let i = 0; i < 2; i++) {
    draft = await writeCityPage(c, links, feedback);
    gate = evaluateArticle(draft, { allowedInternalPaths: allowed, existingTitles: existing.map((e) => e.title), siteOrigin: 'https://rasmwed.com' });
    if (gate.pass) break;
    feedback = gate.failures;
  }
  if (!gate.pass || !draft) {
    console.log(c.slug, 'REJECTED', gate.failures);
    continue;
  }
  console.log(c.slug, 'gate passed:', gate.words, 'words');
  if (dry) {
    await fs.mkdir('.data/dryrun-pages', { recursive: true });
    await fs.writeFile(path.join('.data/dryrun-pages', `${c.slug}.json`), JSON.stringify(draft, null, 2));
    continue;
  }

  const spec = draft.images[0];
  const img = await generateWebp({ scene: spec.prompt, role: 'featured', task: 'city-page-image', priority: 'P5' }, { store });
  const media = await uploadMedia(creds, { bytes: img.webp, filename: imageFilename(c.slug, 'featured', 0), mime: 'image/webp', alt: spec.alt });
  await updatePage(creds, page.id, { html: draft.html, featuredMediaId: media.id, excerpt: draft.excerpt });
  // Keep each page's existing SEO title; only set a new description (the old ones were duplicated across cities).
  await setRankMath(creds, page.id, { rank_math_description: draft.metaDescription, rank_math_focus_keyword: draft.focusKeyword });
  await logAction(store, { agent: 'content-editor', task: 'rewrite-city-page', reason: 'cloned/empty Elementor content', target: `/${c.slug}/`, before: { words: page.content.raw.length }, after: { words: gate.words }, risk: 2, tests: { gate: 'passed' }, result: `page ${page.id} updated` });
  console.log(c.slug, 'published, page', page.id);
}
