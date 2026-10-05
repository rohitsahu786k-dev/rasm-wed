/* eslint-disable @typescript-eslint/no-explicit-any */
import { WP_ORIGIN } from './site';
import { fetchRetry } from './net';
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
  desktopBanner?: string;
  mobileBanner?: string;
  bannerAlt?: string;
}
export interface WPPost extends WPPage {
  date: string;
  categories?: string[];
  excerpt: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const REVALIDATE = 3600; // ISR: content refreshes hourly without a redeploy.

/** The site does not use emoji: remove any that were typed into WordPress content (deep walk over the REST response). */
const EMOJI = /[🀀-🫿☀-➿⭐⭕️‍]/gu;
const OLD_EMAIL = /\b(?:info|contact|hello|enquiry|inquiry)@rasmwed\.com\b/gi; // one contact inbox site-wide
function stripEmoji(v: unknown): unknown {
  if (typeof v === 'string') return v.replace(EMOJI, '').replace(OLD_EMAIL, 'rasmwed@gmail.com');
  if (Array.isArray(v)) return v.map(stripEmoji);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, stripEmoji(x)]));
  return v;
}

async function wp<T>(path: string): Promise<T | null> {
  try {
    // Retry transient origin errors so a brief WordPress hiccup never turns into a cached 404 or an empty blog list.
    const res = await fetchRetry(fetch, `${WP_ORIGIN}/wp-json/wp/v2${path}`, { next: { revalidate: REVALIDATE } }, { tries: 3, baseDelayMs: 700, timeoutMs: 20_000 });
    return res.ok ? (stripEmoji(await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Category names from an embedded WordPress response ("Uncategorized" is not a useful label). */
const categoryNames = (p: any): string[] =>
  ((p._embedded?.['wp:term']?.[0] ?? []) as { name?: string; taxonomy?: string }[])
    .filter((t) => t.taxonomy === 'category' && t.name && !/^uncategori[sz]ed$/i.test(t.name))
    .map((t) => strip(t.name as string));

const strip = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&hellip;/g, '…')
    .replace(/&#8217;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

function extractImageUrl(v: unknown): string | undefined {
  if (!v) return undefined;
  if (typeof v === 'string' && /^https?:\/\//.test(v.trim())) return v.trim();
  if (typeof v === 'object' && v !== null) {
    const obj = v as Record<string, unknown>;
    if (typeof obj.url === 'string' && /^https?:\/\//.test(obj.url.trim())) return obj.url.trim();
    if (typeof obj.source_url === 'string' && /^https?:\/\//.test(obj.source_url.trim())) return obj.source_url.trim();
  }
  return undefined;
}

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
  const data = await wp<any[]>(`/pages?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia&_fields=slug,title,content,excerpt,modified_gmt,acf,_links,_embedded`);
  if (!data?.[0]) return null;
  const media = data[0]._embedded?.['wp:featuredmedia']?.[0];
  const acf = data[0].acf && typeof data[0].acf === 'object' ? data[0].acf : {};
  const desktopBanner =
    extractImageUrl(acf.desktop_banner) ||
    extractImageUrl(acf.banner_desktop) ||
    extractImageUrl(acf.hero_desktop_banner) ||
    media?.source_url;
  const mobileBanner =
    extractImageUrl(acf.mobile_banner) ||
    extractImageUrl(acf.banner_mobile) ||
    extractImageUrl(acf.hero_mobile_banner);
  const bannerAlt = (typeof acf.banner_alt === 'string' && acf.banner_alt) || media?.alt_text || undefined;

  return {
    ...toPage(data[0]),
    excerpt: strip(data[0].excerpt?.rendered ?? ''),
    image: media?.source_url,
    imageAlt: media?.alt_text || undefined,
    imageWidth: media?.media_details?.width,
    imageHeight: media?.media_details?.height,
    desktopBanner,
    mobileBanner,
    bannerAlt,
  };
}

/** Every published WordPress post, newest first (pages through the REST API so nothing beyond the first 100 is dropped). */
export async function getPosts(): Promise<WPPost[]> {
  const data: any[] = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await wp<any[]>(
      `/posts?per_page=100&page=${page}&orderby=date&order=desc&_embed=wp:featuredmedia,wp:term&_fields=slug,title,excerpt,date_gmt,modified_gmt,_links,_embedded`,
    );
    if (!batch?.length) break;
    data.push(...batch);
    if (batch.length < 100) break;
  }
  return data.map((p) => {
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    return {
      ...toPage(p),
      date: `${p.date_gmt}Z`,
      excerpt: strip(p.excerpt?.rendered ?? ''),
      categories: categoryNames(p),
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
    `/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,wp:term&_fields=slug,title,content,excerpt,date_gmt,modified_gmt,_links,_embedded`,
  );
  if (!data?.[0]) return null;
  const p = data[0];
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  return {
    ...toPage(p),
    date: `${p.date_gmt}Z`,
    excerpt: strip(p.excerpt?.rendered ?? ''),
    categories: categoryNames(p),
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
  udaipur: '2026/10/golden_sunset_over_udaipur_palace.webp',
  jaipur: '2026/10/golden_hour_at_a_rajasthani_palace.webp',
  jodhpur: '2026/10/golden_hour_over_the_blue_city.webp',
  jaisalmer: '2026/10/golden_desert_wedding_lounge_at_sunset.webp',
  kumbhalgarh: '2026/10/golden_fort_reflected_at_sunset.webp',
  goa: '2024/08/Goa.webp',
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
