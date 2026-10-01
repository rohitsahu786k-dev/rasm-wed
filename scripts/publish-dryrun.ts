// Publishes an article you already reviewed from a dry run (same images, same text) to WordPress.
//   node --env-file=.env.local --experimental-strip-types scripts/publish-dryrun.ts <slug>
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { publishPrepared } from '../src/lib/content/pipeline.ts';
import { evaluateArticle } from '../src/lib/content/quality.ts';
import { wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';
import { getStore } from '../src/lib/automation/store.ts';
import { imageFilename } from '../src/lib/images/generate.ts';

const slug = process.argv[2];
if (!slug) throw new Error('usage: publish-dryrun.ts <slug>');
const creds = wpCredsFromEnv();
if (!creds) throw new Error('WordPress credentials missing');
const dir = path.join(process.cwd(), '.data', 'dryrun', slug);
const { plan, article } = JSON.parse(await fs.readFile(path.join(dir, 'article.json'), 'utf8'));

// Re-run the quality gate against the CURRENT site before publishing.
const pages = (await (await fetch(`${creds.url}/wp-json/wp/v2/pages?per_page=100&_fields=slug`)).json()) as { slug: string }[];
const posts = (await (await fetch(`${creds.url}/wp-json/wp/v2/posts?per_page=100&_fields=slug,title`)).json()) as { slug: string; title: { rendered: string } }[];
const allowed = new Set(['/wedding-destination/', '/services/', '/contact-us/', ...pages.map((p) => `/${p.slug}/`), ...posts.map((p) => `/${p.slug}/`)]);
const gate = evaluateArticle(article, { allowedInternalPaths: allowed, existingTitles: posts.map((p) => p.title.rendered), siteOrigin: 'https://rasmwed.com' });
if (!gate.pass) throw new Error(`gate failed: ${gate.failures.join('; ')}`);

const generated = [];
let n = 0;
for (const spec of article.images) {
  if (spec.role === 'inline') n++;
  const name = imageFilename(article.slug, spec.role, n);
  const webp = await fs.readFile(path.join(dir, name));
  const m = await sharp(webp).metadata();
  generated.push({ spec, img: { webp, width: m.width!, height: m.height! }, name });
}
const result = await publishPrepared({ creds, siteUrl: 'https://rasmwed.com' }, getStore(), plan, article, gate, generated);
console.log(JSON.stringify(result, null, 2));
