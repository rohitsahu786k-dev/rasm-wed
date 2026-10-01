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

export const clip = (s: string, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);

/** One place that guarantees every page self-canonicalises with unique OG/Twitter tags. */
export function buildMetadata({ title, description, path, image, type = 'website', publishedTime, modifiedTime, noindex, titleIsFinal, preferOpts }: Opts): Metadata {
  const url = absoluteUrl(path);
  // Titles/descriptions already ranking on the live WordPress site win: migration must not change SEO equity.
  const live = preferOpts ? undefined : LIVE[path.endsWith("/") ? path : path + "/"];
  const finalTitle = live?.title || title;
  const finalDesc = live?.description || description;
  const img = image ?? SITE.ogImage;
  return {
    title: live?.title ? { absolute: live.title } : titleIsFinal ? { absolute: title } : title,
    description: clip(finalDesc),
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      title: finalTitle,
      description: clip(finalDesc),
      siteName: SITE.name,
      images: [{ url: img, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: finalTitle, description: clip(finalDesc), images: [img] },
  };
}
