/* eslint-disable @typescript-eslint/no-explicit-any */
import { WP_ORIGIN } from './site';
import type { Destination } from '@/types';
import { parseElementor } from './elementor';
import { getCityProfile } from './city';

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
  imageWidth?: number;
  imageHeight?: number;
}

const REVALIDATE = 3600; // ISR: content refreshes hourly without a redeploy.

/** The site does not use emoji: remove any that were typed into WordPress content (deep walk over the REST response). */
const EMOJI = /[🀀-🫿☀-➿⭐⭕️‍]/gu;
function stripEmoji(v: unknown): unknown {
  if (typeof v === 'string') return v.replace(EMOJI, '');
  if (Array.isArray(v)) return v.map(stripEmoji);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, stripEmoji(x)]));
  return v;
}

async function wp<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_ORIGIN}/wp-json/wp/v2${path}`, { next: { revalidate: REVALIDATE } });
    return res.ok ? (stripEmoji(await res.json()) as T) : null;
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
      imageWidth: media?.media_details?.width,
      imageHeight: media?.media_details?.height,
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
    imageWidth: media?.media_details?.width,
    imageHeight: media?.media_details?.height,
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

/** The 12 destinations featured on the WordPress homepage, in its order. Ahmedabad/Gandhinagar have pages but are not featured. */
export const FEATURED_DESTINATIONS = ['udaipur', 'nathdwara', 'kumbhalgarh', 'mount-abu', 'pushkar', 'ranakpur', 'jaisalmer', 'jodhpur', 'jaipur', 'kota', 'goa', 'thailand'];

const firstSentence = (t: string, max = 110) => {
  const s1 = t.split(/(?<=[.!?])\s/)[0] ?? t;
  return s1.length <= max ? s1 : `${s1.slice(0, max - 1).replace(/\s+\S*$/, '')}\u2026`;
};

/** Several city pages share one generic featured image in WordPress; these give those cities their own photograph. */
const IMAGE_OVERRIDE: Record<string, string> = {
  jaipur: '2024/01/jaipur.png',
  jodhpur: '2024/01/Jodhpur.png',
  goa: '2024/08/Goa.webp',
  kumbhalgarh: '2026/09/best-wedding-venues-in-kumbhalgarh-1.webp',
};

/** Destination cards built from the real WordPress city pages (text + photo), not hard-coded copy. */
export async function getDestinations(slugs: string[] = FEATURED_DESTINATIONS): Promise<Destination[]> {
  const pages = await Promise.all(slugs.map((s) => getPage(`wedding-planner-in-${s}`)));
  return pages.flatMap((p, i) => {
    if (!p) return [];
    const blocks = parseElementor(p.content);
    const imgBlock = blocks.find((b) => b.type === 'img' && b.width && b.width >= 400 && !/border|icon/i.test(b.src));
    const img = p.image ?? (imgBlock && imgBlock.type === 'img' ? imgBlock.src : undefined);
    const lead = p.excerpt || (blocks.find((b) => b.type === 'p' && b.text.length > 60) as { text: string } | undefined)?.text || '';
    // City name from the slug: WordPress titles vary ("Best Wedding Planner In Udaipur").
    const name = slugs[i].split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
    return [{
      id: slugs[i],
      title: name,
      slug: p.slug,
      tagline: getCityProfile(`wedding-planner-in-${slugs[i]}`)?.tagline ?? (lead ? firstSentence(lead) : `Destination wedding in ${name}`),
      season: '',
      venues: '',
      imageUrl: IMAGE_OVERRIDE[slugs[i]] ? `${WP_ORIGIN}/wp-content/uploads/${IMAGE_OVERRIDE[slugs[i]]}` : ((img as string | undefined) ?? ''),
    }];
  });
}

/** The 9 planning services and thumbnails from the WordPress "services" page. */
export async function getServices(): Promise<{ title: string; image?: string }[]> {
  const page = await getPage('services');
  if (!page) return [];
  const blocks = parseElementor(page.content);
  const out: { title: string; image?: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type !== 'h3') continue;
    const prev = blocks[i - 1];
    out.push({ title: b.text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(' And ', ' & '), image: prev?.type === 'img' && /elementor\/thumbs|uploads/.test(prev.src) ? prev.src : undefined });
  }
  return out.slice(0, 12);
}
