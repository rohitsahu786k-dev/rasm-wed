/* eslint-disable @typescript-eslint/no-explicit-any */
import { WP_ORIGIN } from './site';

export interface WPPage {
  slug: string;
  title: string;
  content: string;
  modified: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}
export interface WPPost extends WPPage {
  date: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
}

const REVALIDATE = 3600; // ISR: content refreshes hourly without a redeploy.

async function wp<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_ORIGIN}/wp-json/wp/v2${path}`, { next: { revalidate: REVALIDATE } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

const strip = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&hellip;/g, '…')
    .replace(/&#8217;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const toPage = (p: any): WPPage => ({
  slug: p.slug,
  title: strip(p.title?.rendered ?? ''),
  content: p.content?.rendered ?? '',
  modified: p.modified_gmt ? `${p.modified_gmt}Z` : p.modified,
});

/** Lightweight list (no body) for sitemap/static params; bodies are fetched per page to stay under the 2MB fetch-cache limit. */
export async function getPages(): Promise<WPPage[]> {
  const data = await wp<any[]>('/pages?per_page=100&status=publish&_fields=slug,title,modified_gmt');
  return (data ?? []).map(toPage);
}

export async function getPage(slug: string): Promise<WPPage | null> {
  const data = await wp<any[]>(`/pages?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia&_fields=slug,title,content,excerpt,modified_gmt,_links,_embedded`);
  if (!data?.[0]) return null;
  const media = data[0]._embedded?.['wp:featuredmedia']?.[0];
  return {
    ...toPage(data[0]),
    excerpt: strip(data[0].excerpt?.rendered ?? ''),
    image: media?.source_url,
    imageAlt: media?.alt_text || undefined,
    imageWidth: media?.media_details?.width,
    imageHeight: media?.media_details?.height,
  };
}

export async function getPosts(): Promise<WPPost[]> {
  const data = await wp<any[]>(
    '/posts?per_page=100&_embed=wp:featuredmedia&_fields=slug,title,excerpt,date_gmt,modified_gmt,_links,_embedded',
  );
  return (data ?? []).map((p) => {
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    return {
      ...toPage(p),
      date: `${p.date_gmt}Z`,
      excerpt: strip(p.excerpt?.rendered ?? ''),
      image: media?.source_url,
      imageAlt: media?.alt_text || undefined,
    };
  });
}

export interface WPPostFull extends WPPost {
  content: string;
}

export async function getPost(slug: string): Promise<WPPostFull | null> {
  const data = await wp<any[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia&_fields=slug,title,content,excerpt,date_gmt,modified_gmt,_links,_embedded`,
  );
  if (!data?.[0]) return null;
  const p = data[0];
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  return {
    ...toPage(p),
    date: `${p.date_gmt}Z`,
    excerpt: strip(p.excerpt?.rendered ?? ''),
    image: media?.source_url,
    imageAlt: media?.alt_text || undefined,
  };
}

/**
 * SEO title/description as Rank Math renders them on the WordPress side (single source of truth for posts the
 * agent or editors publish in WordPress). Read from the WordPress front end and cached with ISR.
 */
export async function getRankMathMeta(slug: string): Promise<{ title: string; description: string } | null> {
  try {
    const res = await fetch(`${WP_ORIGIN}/${slug}/`, { next: { revalidate: REVALIDATE }, headers: { 'User-Agent': 'rasm-next-meta/1.0' } });
    if (!res.ok) return null;
    const html = await res.text();
    const title = /<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim();
    const description = /<meta name="description" content="([^"]*)"/i.exec(html)?.[1]?.trim();
    if (!title) return null;
    const dec = (s: string) => s.replace(/&amp;/g, '&').replace(/&#0?39;|&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’');
    return { title: dec(title), description: dec(description ?? '') };
  } catch {
    return null;
  }
}
