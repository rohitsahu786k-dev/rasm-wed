export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rasmwed.com').replace(/\/$/, '');
/**
 * WordPress (admin.rasmwed.com) is the content backend only: REST API, media and Rank Math. The public site is SITE_URL.
 * NEXT_PUBLIC_WP_ORIGIN lets client components see the same value (it is inlined at build time).
 */
export const WP_ORIGIN = (process.env.NEXT_PUBLIC_WP_ORIGIN ?? process.env.WP_ORIGIN ?? 'https://admin.rasmwed.com').replace(/\/$/, '');

/** Only the production deployment is indexable; previews/staging must not compete with it. */
export const IS_PRODUCTION = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false';

export const SITE = {
  name: 'Rasm Weddings & Events',
  tagline: 'Luxury Destination Wedding Planner in Udaipur, India',
  description:
    'Wedding planner in Udaipur, Rajasthan. We plan palace, fort and resort weddings for families in India and abroad, from venue and decor to guest travel.',
  logo: '/rasm-official-logo.png',
  ogImage: `${WP_ORIGIN}/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp`,
  instagram: 'https://www.instagram.com/rasmwed/',
  facebook: 'https://www.facebook.com/profile.php?id=61564418983917',
  youtube: 'https://youtube.com/@rasmwed',
  // One published number everywhere: header, footer, contact page, WhatsApp, sticky bar and LocalBusiness schema.
  // The two previous numbers (+91 80948 75504, +91 91169 29135) were retired, so nothing should surface them.
  // These are fallbacks: WordPress ACF Site Settings (rasm_phone_number / rasm_whatsapp_number) wins when set,
  // so those fields must be cleared or updated in WordPress too, or the old number returns when WP is reachable.
  phone: '+91 99284 64259',
  // Digits only, with country code: used to build wa.me links.
  whatsapp: '919928464259',
  // Every enquiry and every published contact detail uses this one inbox.
  email: 'rasmwed@gmail.com',
  address: '510, City Centre, Ashok Nagar, Udaipur, Rajasthan 313001',
  street: '510, City Centre, Ashok Nagar',
  postalCode: '313001',
} as const;

/**
 * Retired phone numbers, as digit strings. WordPress ACF Site Settings normally override the numbers above, so a
 * stale value stored there would put a disconnected number back on the site the moment WordPress is reachable
 * again. Any ACF phone or WhatsApp value matching this list is ignored in favour of SITE.phone.
 * Remove an entry only when that line is genuinely back in service.
 */
const RETIRED_PHONE_DIGITS = new Set(['918094875504', '919116929135', '8094875504', '9116929135']);

/** True when a phone/WhatsApp value is a retired line and must not be published. */
export const isRetiredPhone = (value: string) => RETIRED_PHONE_DIGITS.has(value.replace(/\D/g, ''));

/** Subscriber part of the live number, for rewriting compact forms like wa.me/<digits>. */
const LIVE_LOCAL_DIGITS = SITE.whatsapp.replace(/^91/, '');

/** Retired numbers as authored in legacy WordPress/Elementor content: with or without country code and separators. */
const RETIRED_IN_TEXT = /(\+?91[\s-]?)?(?:80948[\s-]?75504|91169[\s-]?29135)/g;

/**
 * Rewrites retired numbers inside WordPress-authored HTML to the live number.
 * Six legacy city pages have `wa.me/918094875504` hard-coded into Elementor buttons, and WordPress cannot be
 * edited from here, so without this the retired line would keep appearing on the public site. Compact matches
 * (URLs, tel: hrefs) stay compact; separated matches become the display form.
 */
export function scrubRetiredPhones(text: string): string {
  return text.replace(RETIRED_IN_TEXT, (match, cc: string | undefined) => {
    if (!/[\s-]/.test(match)) return `${cc ?? ''}${LIVE_LOCAL_DIGITS}`;
    return SITE.phone;
  });
}

/** Canonical URL: always absolute, always with a trailing slash (matches existing WordPress URLs). */
export const absoluteUrl = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p.endsWith('/') ? p : `${p}/`}`;
};
