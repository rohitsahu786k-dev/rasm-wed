import type { MetadataRoute } from 'next';
import { getPages, getPosts } from '@/lib/wp';
import { absoluteUrl } from '@/lib/site';
import { NOINDEX_SLUGS } from '@/data/routes';

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
  for (const p of pages) if (p.slug !== 'new-home' && !NOINDEX_SLUGS.has(p.slug)) add(`/${p.slug}/`, p.modified);
  for (const p of posts) add(`/${p.slug}/`, p.modified);
  return entries;
}
