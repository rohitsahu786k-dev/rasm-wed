import type { Metadata } from 'next';
import { absoluteUrl, SITE } from './site';
import liveSeo from '../data/seo-live.json';

type Live = { title?: string; description?: string };
const LIVE = liveSeo as Record<string, Live>;

interface Opts {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Title is already final (e.g. from Rank Math): do not append the site name template. */
  titleIsFinal?: boolean;
  /** Use the values passed in (fresh from WordPress/Rank Math) instead of the pinned snapshot in seo-live.json. */
  preferOpts?: boolean;
}

const BRAND = 'Rasm Weddings';

/**
 * One consistent, SERP-safe title everywhere: "Main phrase | Rasm Weddings", at most 60 characters.
 * WordPress/Rank Math titles carry mixed suffixes ("- rasmwed.com", "| Rasm Wedding", "| RASM"); keep the first phrase only.
 */
export function tidyTitle(raw: string): string {
  let head = raw.split(/\s+[|–—]\s+/)[0].replace(/\s+-\s+(rasmwed\.com|rasm weddings?( & events)?)\s*$/i, '').trim();
  if (head.length > 60) head = head.slice(0, 58).replace(/\s+\S*$/, '').replace(/[,:;\-–]+$/, '');
  const full = `${head} | ${BRAND}`;
  return full.length <= 60 ? full : head;
}

export const clip = (s: string, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);

/** One place that guarantees every page self-canonicalises with unique OG/Twitter tags. */
export function buildMetadata({ title, description, path, image, type = 'website', publishedTime, modifiedTime, noindex, preferOpts }: Opts): Metadata {
  const url = absoluteUrl(path);
  // Titles/descriptions already ranking on the live WordPress site win: migration must not change SEO equity.
  const live = preferOpts ? undefined : LIVE[path.endsWith("/") ? path : path + "/"];
  const finalTitle = tidyTitle(live?.title || title);
  const finalDesc = live?.description || description;
  const img = image ?? SITE.ogImage;
  return {
    title: { absolute: finalTitle },
    description: clip(finalDesc),
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      title: finalTitle,
      description: clip(finalDesc),
      siteName: SITE.name,
      images: [{ url: img, alt: finalTitle }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: finalTitle, description: clip(finalDesc), images: [img] },
  };
}
