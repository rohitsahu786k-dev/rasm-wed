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

/** Repair legacy WordPress mojibake and whitespace before metadata is rendered. */
export function cleanMetaText(raw: string): string {
  return raw
    .replace(/\u00e2\u20ac\u2122/g, '’')
    .replace(/\u00e2\u20ac\u201c/g, '–')
    .replace(/\u00e2\u20ac\u201d/g, '—')
    .replace(/\u00e2\u20ac\u00a6/g, '…')
    .replace(/\u00e2\u201a\u00b9/g, '₹')
    .replace(/\u00c3\u00a9/g, 'é')
    .replace(/\u00c2(?=\s)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Evergreen corrections for old Rank Math titles that are grammatically weak or date-stale. */
const improveLegacyTitle = (title: string) => title
  .replace(/^What to Consider for a best Wedding in Goa\??$/i, 'What to Consider for a Wedding in Goa')
  .replace(/^Why Rishikesh Is New Destination Wedding Hotspot$/i, 'Why Rishikesh Is a Destination Wedding Hotspot')
  .replace(/^Rituals to Decor Ideas for Haldi Ceremony$/i, 'Haldi Ceremony: Rituals and Decor Ideas')
  .replace(/^Top Wedding Entry for Destination Weddings in Rajasthan$/i, 'Wedding Entry Ideas for Rajasthan Weddings')
  .replace(/^Why to Hire a Wedding Planner is Essential$/i, 'Why Hiring a Wedding Planner Is Essential')
  .replace(/^Top 10 Honeymoon Destinations in 20\d{2}$/i, 'Top 10 Honeymoon Destinations for Couples')
  .replace(/^Destination For A Royal Wedding In Udaipur$/i, 'Why Udaipur Is Perfect for a Royal Wedding');

/**
 * One consistent, SERP-safe title everywhere: "Main phrase | Rasm Weddings", at most 60 characters.
 * WordPress/Rank Math titles carry mixed suffixes ("- rasmwed.com", "| Rasm Wedding", "| RASM"); keep the first phrase only.
 */
export function tidyTitle(raw: string): string {
  let head = cleanMetaText(raw)
    .replace(/\s+(?:\||-|–|—)\s+(?:rasmwed\.com|rasm weddings?(?: & events)?|rasm|[a-z0-9-]+\.hostingersite\.com)\s*$/i, '')
    .split(/\s+\|\s+/)[0]
    .trim();
  head = improveLegacyTitle(head);
  if (head.length > 60) head = head.slice(0, 58).replace(/\s+\S*$/, '').replace(/[,:;\-–—]+$/, '');
  const full = `${head} | ${BRAND}`;
  return full.length <= 60 ? full : head;
}

export const clip = (s: string, n = 158) => {
  const clean = cleanMetaText(s);
  return clean.length <= n ? clean : `${clean.slice(0, n - 1).replace(/\s+\S*$/, '')}…`;
};

/** One place that guarantees every page self-canonicalises with unique OG/Twitter tags. */
export function buildMetadata({ title, description, path, image, type = 'website', publishedTime, modifiedTime, noindex, preferOpts }: Opts): Metadata {
  const url = absoluteUrl(path);
  // Titles/descriptions already ranking on the live WordPress site win: migration must not change SEO equity.
  const live = preferOpts ? undefined : LIVE[path.endsWith("/") ? path : path + "/"];
  const finalTitle = tidyTitle(live?.title || title);
  const finalDesc = clip(live?.description || description);
  const img = image ?? SITE.ogImage;
  return {
    title: { absolute: finalTitle },
    description: finalDesc,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      title: finalTitle,
      description: finalDesc,
      siteName: SITE.name,
      images: [{ url: img, alt: finalTitle }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: finalTitle, description: finalDesc, images: [img] },
  };
}
