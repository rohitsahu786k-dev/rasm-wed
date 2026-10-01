import type { MediaItem } from '@/types';
import { WP_ORIGIN } from './site';

interface WpMedia {
  id: number;
  alt_text: string;
  title: { rendered: string };
  source_url: string;
  mime_type: string;
  media_details?: { width?: number; height?: number };
}

/** Real event photographs live in these upload folders; everything else in the library is stock, graphics, icons or AI images. */
const REAL_PHOTO_FOLDERS = /\/uploads\/(2024\/07|2023\/10)\//;
const EXCLUDE = /(banner|background|section|overlay|video|slider|logo|border|placeholder|untitled|thumb|featured|rasm-1080|wallpaper|pexels|shrinathji|reputed|^\d+(-\d+)?\.)/i;

export interface GalleryItem extends MediaItem {
  width?: number;
  height?: number;
}

const baseName = (url: string) =>
  (url.split('/').pop() ?? '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/-scaled(-\d+)?$|-e\d{6,}$|-\d+x\d+$/i, '')
    .toLowerCase();

/**
 * Photographs for the gallery, read live from the WordPress media library (source of truth) and cached with ISR.
 * Filters out stock photos, graphics and AI-generated images so "real wedding" claims stay honest.
 */
export async function getGalleryMedia(limit = 96): Promise<GalleryItem[]> {
  const out: WpMedia[] = [];
  for (let page = 1; page <= 10; page++) {
    try {
      const res = await fetch(
        `${WP_ORIGIN}/wp-json/wp/v2/media?per_page=100&page=${page}&media_type=image&_fields=id,alt_text,title,source_url,mime_type,media_details`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) break;
      const rows = (await res.json()) as WpMedia[];
      out.push(...rows);
      if (rows.length < 100) break;
    } catch {
      break;
    }
  }
  const seen = new Set<string>();
  const items: GalleryItem[] = [];
  for (const m of out.sort((a, b) => b.id - a.id)) {
    const w = m.media_details?.width ?? 0;
    const h = m.media_details?.height ?? 0;
    const name = baseName(m.source_url);
    if (!REAL_PHOTO_FOLDERS.test(m.source_url) || !/jpe?g|webp/.test(m.mime_type) || w < 1000 || EXCLUDE.test(name) || seen.has(name)) continue;
    const ratio = w / (h || 1);
    if (ratio < 0.6 || ratio > 2.2) continue;
    seen.add(name);
    items.push({
      id: String(m.id),
      title: m.title.rendered,
      sourceUrl: m.source_url,
      altText: m.alt_text?.trim() || `Wedding celebration planned by Rasm Weddings & Events, photo ${items.length + 1}`,
      width: w,
      height: h,
    });
    if (items.length >= limit) break;
  }
  return items;
}
