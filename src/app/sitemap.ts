import type { MetadataRoute } from 'next';
import { getPages, getPosts } from '@/lib/wp';
import { absoluteUrl, MEDIA_ORIGIN, WP_ORIGIN } from '@/lib/site';
import { NOINDEX_SLUGS, PAGE_UPDATED, SITEMAP_EXCLUDE, STATIC_PAGES } from '@/data/routes';
import { PILLAR_SLUGS } from '@/data/pillars';

export const revalidate = 3600;

/** Image URLs are listed on the public domain (never the CMS host). */
const publicImage = (u?: string) => (u ? u.replace(WP_ORIGIN, MEDIA_ORIGIN) : undefined);

/**
 * Sitemap rules: only indexable URLs, `lastModified` only when we know a real content date (never a build-time stamp),
 * no `priority` (Google ignores it), and key photographs listed as image entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([getPages(), getPosts()]);
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];
  const add = (path: string, lastModified?: string, image?: string) => {
    const url = absoluteUrl(path);
    if (seen.has(url)) return;
    seen.add(url);
    const img = publicImage(image);
    entries.push({ url, ...(lastModified ? { lastModified } : {}), ...(img ? { images: [img] } : {}) });
  };
  const skip = (slug: string) => NOINDEX_SLUGS.has(slug) || SITEMAP_EXCLUDE.has(slug);
  const newest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().pop();

  add('/', newest([...posts.map((p) => p.modified), PAGE_UPDATED.home]));
  for (const slug of PILLAR_SLUGS) add(`/${slug}/`, PAGE_UPDATED[slug]);
  for (const slug of Object.keys(STATIC_PAGES)) {
    if (skip(slug)) continue;
    add(`/${slug}/`, slug === 'blog' ? newest(posts.map((p) => p.modified)) : PAGE_UPDATED[slug]);
  }
  for (const p of pages) if (p.slug !== 'new-home' && !skip(p.slug)) add(`/${p.slug}/`, p.modified);
  for (const p of posts) if (!skip(p.slug)) add(`/${p.slug}/`, p.modified, p.image);
  return entries;
}
