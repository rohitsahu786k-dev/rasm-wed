/**
 * Publishes to WordPress through its REST API (server-side only, Application Password auth).
 * WordPress remains the CMS and the source of truth: the Next.js site reads posts from it and revalidates.
 *
 * Safety defaults: everything is created as a DRAFT. A post only goes live when the caller explicitly asks for
 * `publish` (the content engine does that only after its quality gate passes AND AI_AUTOPUBLISH=true).
 */

export interface WpCreds {
  url: string;
  username: string;
  appPassword: string;
}

export function wpCredsFromEnv(env: Record<string, string | undefined> = process.env): WpCreds | null {
  const url = env.WP_URL ?? env.WP_ORIGIN;
  if (!url || !env.WP_USERNAME || !env.WP_APP_PASSWORD) return null;
  return { url: url.replace(/\/$/, ''), username: env.WP_USERNAME, appPassword: env.WP_APP_PASSWORD };
}

export interface NewPost {
  title: string;
  slug: string;
  /** Sanitised HTML body. */
  html: string;
  excerpt: string;
  categoryIds?: number[];
  featuredMediaId?: number;
  /** Rank Math fields; these keep the SEO plugin in charge of <title>/description on the WordPress side. */
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  status?: 'draft' | 'pending' | 'publish' | 'future';
  /** ISO date; with status "future" WordPress schedules it. */
  date?: string;
}

export interface CreatedPost {
  id: number;
  link: string;
  status: string;
  slug: string;
}

type F = typeof fetch;
const auth = (c: WpCreds) => `Basic ${Buffer.from(`${c.username}:${c.appPassword}`).toString('base64')}`;

async function wpFetch<T>(c: WpCreds, path: string, init: RequestInit, f: F): Promise<T> {
  const res = await f(`${c.url}/wp-json/wp/v2${path}`, {
    ...init,
    headers: { Authorization: auth(c), ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(60_000),
  });
  const body = (await res.json().catch(() => ({}))) as { message?: string } & T;
  if (!res.ok) throw new Error(`WordPress ${res.status}: ${body.message ?? 'request failed'}`);
  return body;
}

/** Strips scripts, inline handlers and javascript: URLs from generated HTML before it reaches the CMS. */
export function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1=$2#$2');
}

export async function createPost(c: WpCreds, p: NewPost, f: F = fetch): Promise<CreatedPost> {
  const status = p.status ?? 'draft';
  const meta: Record<string, string> = {};
  if (p.seoTitle) meta.rank_math_title = p.seoTitle;
  if (p.seoDescription) meta.rank_math_description = p.seoDescription;
  if (p.focusKeyword) meta.rank_math_focus_keyword = p.focusKeyword;
  const created = await wpFetch<CreatedPost>(
    c,
    '/posts',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: p.title,
        slug: p.slug,
        content: sanitizeHtml(p.html),
        excerpt: p.excerpt,
        status,
        ...(p.date ? { date: p.date } : {}),
        categories: p.categoryIds ?? [1],
        ...(p.featuredMediaId ? { featured_media: p.featuredMediaId } : {}),
      }),
    },
    f,
  );
  if (Object.keys(meta).length) await setRankMath(c, created.id, meta, f);
  return created;
}

/** Rank Math keeps its fields outside core REST meta; its own endpoint (used by its editor) writes them. */
export async function setRankMath(c: WpCreds, id: number, meta: Record<string, string>, f: F = fetch) {
  const res = await f(`${c.url}/wp-json/rankmath/v1/updateMeta`, {
    method: 'POST',
    headers: { Authorization: auth(c), 'Content-Type': 'application/json' },
    body: JSON.stringify({ objectID: id, objectType: 'post', meta }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Rank Math updateMeta failed: ${res.status}`);
}

export async function updatePost(c: WpCreds, id: number, patch: Partial<NewPost>, f: F = fetch): Promise<CreatedPost> {
  const body: Record<string, unknown> = {};
  if (patch.title) body.title = patch.title;
  if (patch.html) body.content = sanitizeHtml(patch.html);
  if (patch.excerpt) body.excerpt = patch.excerpt;
  if (patch.status) body.status = patch.status;
  const updated = await wpFetch<CreatedPost>(c, `/posts/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }, f);
  if (patch.seoTitle || patch.seoDescription) {
    await setRankMath(c, id, { ...(patch.seoTitle ? { rank_math_title: patch.seoTitle } : {}), ...(patch.seoDescription ? { rank_math_description: patch.seoDescription } : {}) }, f);
  }
  return updated;
}

/** Uploads an image (already optimised) and sets alt text. Returns the media id. */
export async function uploadMedia(c: WpCreds, file: { bytes: Uint8Array; filename: string; mime: string; alt: string; title?: string }, f: F = fetch) {
  const created = await wpFetch<{ id: number; source_url: string }>(
    c,
    '/media',
    {
      method: 'POST',
      headers: { 'Content-Type': file.mime, 'Content-Disposition': `attachment; filename="${file.filename.replace(/[^a-z0-9._-]/gi, '-')}"` },
      body: file.bytes as unknown as BodyInit,
    },
    f,
  );
  await wpFetch(c, `/media/${created.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alt_text: file.alt, title: file.title ?? file.alt }) }, f);
  return created;
}

export async function deletePost(c: WpCreds, id: number, f: F = fetch) {
  return wpFetch(c, `/posts/${id}?force=true`, { method: 'DELETE' }, f);
}

/** Replaces the body of an existing WordPress PAGE (revisions are kept by WordPress, so this is reversible). */
export async function updatePage(c: WpCreds, id: number, patch: { html: string; featuredMediaId?: number; excerpt?: string }, f: F = fetch) {
  return wpFetch<CreatedPost>(
    c,
    `/pages/${id}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Elementor renders from its own JSON and ignores post_content; switching edit mode off makes WordPress serve our HTML.
      // The original Elementor data stays in the database (and in .data/backups) so this is reversible.
      body: JSON.stringify({ content: sanitizeHtml(patch.html), meta: { _elementor_edit_mode: '' }, ...(patch.featuredMediaId ? { featured_media: patch.featuredMediaId } : {}), ...(patch.excerpt ? { excerpt: patch.excerpt } : {}) }),
    },
    f,
  );
}
