import type { MetadataRoute } from 'next';
import { getPages, getPosts } from '@/lib/wp';
import { absoluteUrl } from '@/lib/site';
import { NOINDEX_SLUGS, STATIC_PAGES } from '@/data/routes';
import { PILLAR_SLUGS } from '@/data/pillars';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([getPages(), getPosts()]);
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];
  const add = (path: string, lastModified?: string, priority?: number) => {
    const url = absoluteUrl(path);
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastModified, priority });
  };
  add('/', undefined, 1);
  // Pillars and designed templates are code-owned routes. They were previously listed only if a WordPress page
  // happened to share the slug, so any code-only route was missing from the sitemap entirely.
  for (const slug of PILLAR_SLUGS) add(`/${slug}/`, undefined, 0.9);
  for (const slug of Object.keys(STATIC_PAGES)) if (!NOINDEX_SLUGS.has(slug)) add(`/${slug}/`, undefined, 0.8);
  for (const p of pages) if (p.slug !== 'new-home' && !NOINDEX_SLUGS.has(p.slug)) add(`/${p.slug}/`, p.modified, 0.8);
  // Posts were not filtered against NOINDEX_SLUGS, so a noindexed post could still be submitted to Google.
  for (const p of posts) if (!NOINDEX_SLUGS.has(p.slug)) add(`/${p.slug}/`, p.modified, 0.6);
  return entries;
}
