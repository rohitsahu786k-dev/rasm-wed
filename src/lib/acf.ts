/**
 * Homepage content managed in WordPress with Advanced Custom Fields (field group "Rasm Homepage & Site Details",
 * import file: acf-export-rasm-homepage.json). The front page's `acf` object is read from the WordPress REST API and
 * cached briefly (ISR). If ACF is empty or unreachable, sensible defaults built from real site content are used, so the
 * homepage always renders.
 */
import type { SiteSettings } from '../types/index.ts';
import { settings as baseSettings } from '../data/settings.ts';
import { SITE, SITE_URL, WP_ORIGIN } from './site.ts';

export interface AcfImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface HeroSlide {
  desktop: AcfImage;
  mobile?: AcfImage;
  alt: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  buttonLabel?: string;
  buttonHref?: string;
  align: 'left' | 'center' | 'right';
  overlay: number;
}

export interface HomeContent {
  slides: HeroSlide[];
  autoplaySeconds: number;
  stats: { value: string; label: string }[];
  intro: { eyebrow: string; heading: string; text: string; image?: AcfImage; buttonLabel?: string; buttonHref?: string };
}

const REVALIDATE = 300; // homepage edits in WordPress appear within ~5 minutes (or instantly via /api/revalidate)

type Raw = Record<string, unknown>;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const num = (v: unknown, d: number) => {
  const n = typeof v === 'string' || typeof v === 'number' ? Number(v) : NaN;
  return Number.isFinite(n) ? n : d;
};

/** ACF image (return format "array"). Numeric IDs or empty values are ignored. */
export function toImage(v: unknown): AcfImage | undefined {
  if (!v || typeof v !== 'object') return undefined;
  const o = v as Raw;
  const url = str(o.url);
  const width = num(o.width, 0);
  const height = num(o.height, 0);
  if (!url || !/^https?:\/\//.test(url) || !width || !height) return undefined;
  return { url, width, height, alt: str(o.alt) || undefined };
}

/** Only same-site paths and http(s) links are accepted from the CMS (no javascript: URLs). */
export function safeHref(v: unknown): string | undefined {
  const raw = typeof v === 'object' && v ? str((v as Raw).url) : str(v);
  if (!raw) return undefined;
  if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return undefined;
    // Links back to our own WordPress/site domain become relative so navigation stays inside the Next.js site.
    const own = [WP_ORIGIN, SITE_URL].map((x) => new URL(x).hostname);
    if (own.includes(u.hostname)) return `${u.pathname}${u.search}${u.hash}`;
    return raw;
  } catch {
    return undefined;
  }
}

const up = (p: string, w: number, h: number): AcfImage => ({ url: `${WP_ORIGIN}/wp-content/uploads/${p}`, width: w, height: h });

/** Defaults: real event photographs already in the media library. Replace them from ACF at any time. */
export const DEFAULT_SLIDES: HeroSlide[] = [
  { desktop: up('2026/10/golden_hour_palace_lake_wedding_mandap.webp', 1672, 941), alt: 'Floral wedding mandap on a lakeside palace terrace at golden hour, wedding in Udaipur', eyebrow: 'Wedding Planner in Udaipur, Rajasthan', heading: 'Your Palace *Wedding* Begins Here.', subheading: 'Royal venues, unforgettable celebrations and timeless memories. Plan your wedding in Udaipur with a team that manages everything, from venue to farewell.', buttonLabel: 'Explore Destinations', buttonHref: '/wedding-destination/', align: 'left', overlay: 0 },
  { desktop: up('2026/10/sunset_palace_wedding_by_the_lake.webp', 1672, 941), alt: 'Lake palace wedding setup at sunset, palace wedding decor in Udaipur', eyebrow: 'Wedding Decor & Design', heading: 'Stages and Setups Designed Around *Your Story*', subheading: 'Luxury wedding decor, entertainment and guest hospitality for palace weddings in Udaipur and across Rajasthan.', buttonLabel: 'Our Services', buttonHref: '/services/', align: 'left', overlay: 0 },
  { desktop: up('2026/10/opulent_palace_courtyard_at_dusk.webp', 1672, 941), alt: 'Palace courtyard at dusk lit for a wedding celebration in Rajasthan', eyebrow: '12 Wedding Destinations', heading: 'Get Married Where the *Setting* Tells a Story', subheading: 'Destination weddings in Udaipur, Jaipur, Jodhpur, Jaisalmer, Goa and more, planned end to end.', buttonLabel: 'Choose Your Destination', buttonHref: '/wedding-destination/', align: 'left', overlay: 0 },
];

export const DEFAULT_INTRO: HomeContent['intro'] = {
  eyebrow: 'Welcome to Rasm Wedding',
  heading: 'Best Event Management Company in Udaipur',
  text: 'We at Rasm Wedding & Events thoroughly believe that matches might be made in heaven, yet the marriage between two souls takes place on earth. As a premier wedding event planner in Udaipur, we make sure to do everything that makes special days as outstanding as they can be.',
  image: up('2024/07/HPBI2932-scaled.jpg', 2560, 1536),
  buttonLabel: 'About Rasm',
  buttonHref: '/about-us/',
};

export const DEFAULT_STATS = [
  { value: '500+', label: 'Successful Events' },
  { value: '10+', label: 'Years of Experience' },
  { value: '12', label: 'Wedding Destinations' },
  { value: '9', label: 'Planning Services' },
];

async function fetchFrontPageAcf(): Promise<Raw> {
  try {
    const res = await fetch(`${WP_ORIGIN}/wp-json/wp/v2/pages?slug=new-home&_fields=acf`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return {};
    const [page] = (await res.json()) as { acf?: unknown }[];
    return page?.acf && !Array.isArray(page.acf) && typeof page.acf === 'object' ? (page.acf as Raw) : {};
  } catch {
    return {};
  }
}

export function parseHome(acf: Raw): HomeContent {
  const rawSlides = Array.isArray(acf.hero_slides) ? (acf.hero_slides as Raw[]) : [];
  const slides: HeroSlide[] = rawSlides.flatMap((s) => {
    const desktop = toImage(s.desktop_image);
    const heading = str(s.heading);
    if (!desktop || !heading) return [];
    const align = str(s.text_align);
    return [{
      desktop,
      mobile: toImage(s.mobile_image),
      alt: str(s.alt_text) || desktop.alt || heading,
      eyebrow: str(s.eyebrow) || undefined,
      heading,
      subheading: str(s.subheading) || undefined,
      buttonLabel: str(s.button_label) || undefined,
      buttonHref: safeHref(s.button_link),
      align: align === 'center' || align === 'right' ? align : 'left',
      overlay: Math.min(80, Math.max(0, num(s.overlay, 35))),
    } satisfies HeroSlide];
  });

  const stats = (Array.isArray(acf.home_stats) ? (acf.home_stats as Raw[]) : [])
    .map((s) => ({ value: str(s.value), label: str(s.label) }))
    .filter((s) => s.value && s.label);

  const heading = str(acf.intro_heading);
  const hasIntro = heading || str(acf.intro_text);
  return {
    slides: slides.length ? slides : DEFAULT_SLIDES,
    autoplaySeconds: acf.hero_autoplay_seconds === undefined || acf.hero_autoplay_seconds === '' ? 6 : Math.min(20, Math.max(0, num(acf.hero_autoplay_seconds, 6))),
    stats: stats.length ? stats : DEFAULT_STATS,
    intro: hasIntro
      ? { eyebrow: str(acf.intro_eyebrow), heading, text: str(acf.intro_text), image: toImage(acf.intro_image), buttonLabel: str(acf.intro_button_label) || undefined, buttonHref: safeHref(acf.intro_button_link) }
      : DEFAULT_INTRO,
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  return parseHome(await fetchFrontPageAcf());
}

const digits = (s: string) => s.replace(/\D/g, '');

/** Contact details: ACF values (editable in WordPress) over the values published in code. */
export async function getSiteSettings(): Promise<SiteSettings & { phone2: string; facebookUrl: string; youtubeUrl: string }> {
  const a = await fetchFrontPageAcf();
  const phone = str(a.rasm_phone_number);
  return {
    ...baseSettings,
    phone: phone || SITE.phone,
    phone2: str(a.rasm_phone_number_2) || SITE.phone2,
    whatsapp: digits(str(a.rasm_whatsapp_number)) || SITE.whatsapp,
    email: str(a.rasm_email_address) || SITE.email,
    address: str(a.rasm_office_address) || SITE.address,
    instagramUrl: str(a.rasm_instagram_url) || SITE.instagram,
    facebookUrl: str(a.rasm_facebook_url) || SITE.facebook,
    youtubeUrl: str(a.rasm_youtube_url) || SITE.youtube,
  };
}
