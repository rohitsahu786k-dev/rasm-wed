/**
 * Daily content pipeline: topic -> article -> quality gate -> images (WebP) -> WordPress media -> PUBLISH.
 * WordPress (MySQL) is the only system of record for posts and media. There are no drafts:
 * an article is published only if it passes every critical quality check, otherwise it is rejected.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getStore, logAction, type Store } from '../automation/store.ts';
import { runAi } from '../ai/client.ts';
import { chooseTopic, isDuplicateTopic, type TopicContext } from './topics.ts';
import { writeArticle, type LinkTarget } from './article.ts';
import { evaluateArticle, type ArticleDraft } from './quality.ts';
import { generateWebp, imageFilename } from '../images/generate.ts';
import { createPost, uploadMedia, type WpCreds } from './wp-publisher.ts';
import { googleCredsFromEnv } from '../google/auth.ts';
import { daysAgo, query } from '../google/search-console.ts';

export interface PipelineOptions {
  creds: WpCreds;
  siteUrl: string;
  dryRun?: boolean;
  /** Publish even if a post already went out in the last 20 hours (manual runs only). */
  force?: boolean;
  store?: Store;
  fetchImpl?: typeof fetch;
}

export type PipelineResult =
  | { status: 'skipped'; reason: string }
  | { status: 'rejected'; reason: string; failures: string[] }
  | { status: 'published'; id: number; link: string; slug: string; words: number; images: number }
  | { status: 'dry-run'; slug: string; words: number; dir: string; warnings: string[] };

interface WpListPost {
  slug: string;
  title: { rendered: string };
  date_gmt: string;
}
const basicAuth = (c: WpCreds) => `Basic ${Buffer.from(`${c.username}:${c.appPassword}`).toString('base64')}`;
const decode = (s: string) => s.replace(/&#8217;/g, '’').replace(/&#8211;/g, '–').replace(/&amp;/g, '&').replace(/&#038;/g, '&');

async function wpGet<T>(c: WpCreds, p: string, f: typeof fetch): Promise<T> {
  const r = await f(`${c.url}/wp-json/wp/v2${p}`, { headers: { Authorization: basicAuth(c) }, signal: AbortSignal.timeout(30_000) });
  if (!r.ok) throw new Error(`WordPress GET ${p} -> ${r.status}`);
  return (await r.json()) as T;
}

export async function loadContext(o: PipelineOptions, store: Store) {
  const f = o.fetchImpl ?? fetch;
  const posts = await wpGet<WpListPost[]>(o.creds, '/posts?per_page=100&status=publish&orderby=date&order=desc&_fields=slug,title,date_gmt', f);
  const pages = await wpGet<{ slug: string; title: { rendered: string } }[]>(o.creds, '/pages?per_page=100&status=publish&_fields=slug,title', f);

  const links: LinkTarget[] = [
    { path: '/wedding-destination/', title: 'Wedding destinations' },
    { path: '/services/', title: 'Wedding planning services' },
    { path: '/contact-us/', title: 'Contact Rasm Weddings' },
    ...pages.filter((p) => p.slug.startsWith('wedding-planner-in-')).map((p) => ({ path: `/${p.slug}/`, title: decode(p.title.rendered) })),
    ...posts.map((p) => ({ path: `/${p.slug}/`, title: decode(p.title.rendered) })),
  ];

  let queries: TopicContext['queries'] = [];
  const g = googleCredsFromEnv();
  const property = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || 'https://rasmwed.com/';
  if (g) {
    try {
      const rows = await query(g, property, { start: daysAgo(90), end: daysAgo(3), dimensions: ['query'], rowLimit: 250 }, f);
      queries = rows.map((r) => ({ query: r.keys[0], impressions: r.impressions, clicks: r.clicks, position: Math.round(r.position * 10) / 10 }));
    } catch {
      /* GSC optional: the pipeline still works from site knowledge */
    }
  }
  const memory = await store.list<{ topic: string }>('content_articles', { limit: 60 });
  return {
    existing: posts.map((p) => ({ title: decode(p.title.rendered), slug: p.slug })),
    latestPostAt: posts[0]?.date_gmt,
    links,
    ctx: { existing: posts.map((p) => ({ title: decode(p.title.rendered), slug: p.slug })), queries, recentTopics: memory.map((m) => m.topic) } satisfies TopicContext,
  };
}

function embedImages(html: string, imgs: { source_url: string; alt: string; width: number; height: number }[]) {
  return imgs.reduce(
    (out, im, i) =>
      out.replace(
        new RegExp(`(<p>\\s*)?\\[\\[IMAGE_${i + 1}\\]\\](\\s*</p>)?`),
        `<figure class="wp-block-image size-large"><img src="${im.source_url}" alt="${im.alt.replace(/"/g, '&quot;')}" width="${im.width}" height="${im.height}" loading="lazy" decoding="async" style="height:auto;max-width:100%"/></figure>`,
      ),
    html,
  );
}

export async function runContentPipeline(o: PipelineOptions): Promise<PipelineResult> {
  const store = o.store ?? getStore();
  const f = o.fetchImpl ?? fetch;
  const siteOrigin = o.siteUrl.replace(/\/$/, '');

  // Never publish while a serious production problem is open (P0-P3 outrank new content).
  const audit = await store.getJson<{ counts?: { CRITICAL?: number } }>('latest_audit');
  if ((audit?.counts?.CRITICAL ?? 0) > 0) return { status: 'skipped', reason: 'open CRITICAL site-health issue; content paused' };

  const { existing, latestPostAt, links, ctx } = await loadContext(o, store);
  if (!o.force && latestPostAt && Date.now() - Date.parse(`${latestPostAt}Z`.replace('ZZ', 'Z')) < 20 * 3600_000) {
    return { status: 'skipped', reason: 'a post was already published in the last 20 hours' };
  }

  const plan = await chooseTopic(ctx);
  if (plan.skip) return { status: 'skipped', reason: plan.reason ?? 'no worthwhile topic today' };
  if (isDuplicateTopic(plan, ctx)) return { status: 'skipped', reason: `topic "${plan.topic}" overlaps existing content` };

  const gateCtx = {
    allowedInternalPaths: new Set(links.map((l) => l.path)),
    existingTitles: existing.map((e) => e.title),
    siteOrigin,
  };

  let article: ArticleDraft | undefined;
  let feedback: string[] = [];
  let gate = { pass: false, words: 0, failures: [] as string[], warnings: [] as string[] };
  for (let attempt = 0; attempt < 2; attempt++) {
    article = await writeArticle(plan, links, feedback);
    article.slug = article.slug || plan.slug;
    gate = evaluateArticle(article, gateCtx);
    if (gate.pass) break;
    feedback = gate.failures;
  }
  if (!gate.pass || !article) {
    await logAction(store, { agent: 'content-editor', task: 'reject-article', reason: plan.topic, evidence: gate.failures, risk: 1, result: 'rejected by quality gate' });
    return { status: 'rejected', reason: plan.topic, failures: gate.failures };
  }

  // Images: 1 featured + 2-3 inline, WebP, no text.
  const generated = [];
  const inlineCount = { n: 0 };
  for (const spec of article.images) {
    const role = spec.role;
    if (role === 'inline') inlineCount.n++;
    const img = await generateWebp({ scene: spec.prompt, role, task: 'article-image' }, { store, fetchImpl: f });
    generated.push({ spec, img, name: imageFilename(article.slug, role, inlineCount.n) });
  }

  if (o.dryRun) {
    const dir = path.join(process.cwd(), '.data', 'dryrun', article.slug);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'article.json'), JSON.stringify({ plan, article, gate }, null, 2));
    for (const g of generated) await fs.writeFile(path.join(dir, g.name), g.img.webp);
    return { status: 'dry-run', slug: article.slug, words: gate.words, dir, warnings: gate.warnings };
  }

  return publishPrepared(o, store, plan, article, gate, generated);
}

export interface PreparedImage {
  spec: { role: 'featured' | 'inline'; alt: string; prompt: string };
  img: { webp: Buffer; width: number; height: number };
  name: string;
}

/** Uploads WebP images to the WordPress media library, then publishes the post. Shared by the daily run and reviewed dry-runs. */
export async function publishPrepared(
  o: PipelineOptions,
  store: Store,
  plan: { topic: string; primaryKeyword: string; whyNeeded: string },
  article: ArticleDraft,
  gate: { words: number; warnings: string[] },
  generated: PreparedImage[],
): Promise<PipelineResult> {
  const f = o.fetchImpl ?? fetch;
  const siteOrigin = o.siteUrl.replace(/\/$/, '');
  // Upload to the WordPress media library (stored in the live WP database/uploads).
  const media = [];
  for (const g of generated) {
    const m = await uploadMedia(o.creds, { bytes: g.img.webp, filename: g.name, mime: 'image/webp', alt: g.spec.alt }, f);
    media.push({ role: g.spec.role, id: m.id, source_url: m.source_url, alt: g.spec.alt, width: g.img.width, height: g.img.height });
  }
  const featured = media.find((m) => m.role === 'featured');
  const html = embedImages(article.html, media.filter((m) => m.role === 'inline'));

  const post = await createPost(
    o.creds,
    {
      title: article.title,
      slug: article.slug,
      html,
      excerpt: article.excerpt,
      featuredMediaId: featured?.id,
      seoTitle: article.seoTitle,
      seoDescription: article.metaDescription,
      focusKeyword: article.focusKeyword,
      status: 'publish',
    },
    f,
  );

  // Make it visible on the Next.js site immediately (best effort; ISR would pick it up within the hour anyway).
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    await f(`${siteOrigin}/api/revalidate/`, { method: 'POST', headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: article.slug }) }).catch(() => undefined);
  }

  await store.append('content_articles', { ts: new Date().toISOString(), topic: plan.topic, primaryKeyword: plan.primaryKeyword, slug: article.slug, wpId: post.id, url: post.link, words: gate.words, images: media.length, status: post.status });
  await logAction(store, { agent: 'content-writer', task: 'publish-article', reason: plan.whyNeeded, target: post.link, after: { words: gate.words, images: media.length }, risk: 2, tests: { gate: 'passed', warnings: gate.warnings }, result: `published wp#${post.id}` });
  return { status: 'published', id: post.id, link: post.link, slug: article.slug, words: gate.words, images: media.length };
}


export { runAi };
