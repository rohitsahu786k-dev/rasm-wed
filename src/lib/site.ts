export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rasmwed.com').replace(/\/$/, '');
export const WP_ORIGIN = (process.env.WP_ORIGIN ?? 'https://rasmwed.com').replace(/\/$/, '');

/** Only the production deployment is indexable; previews/staging must not compete with it. */
export const IS_PRODUCTION = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false';

export const SITE = {
  name: 'Rasm Weddings & Events',
  tagline: 'Luxury Destination Wedding Planner in Udaipur, India',
  description:
    'Award-winning luxury destination wedding planners in Udaipur, Rajasthan. Specialising in palace weddings for NRI & international couples from UK, USA, UAE & beyond.',
  logo: '/rasm-official-logo.png',
  ogImage: `${WP_ORIGIN}/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp`,
  instagram: 'https://www.instagram.com/rasmwedding/',
  // TODO(owner): placeholders carried over from the Vite app; replace with real values.
  phone: '+91 98290 12345',
  whatsapp: '919829012345',
  email: 'ankitab890@gmail.com',
  address: 'Near Lake Pichola, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001',
} as const;

/** Canonical URL: always absolute, always with a trailing slash (matches existing WordPress URLs). */
export const absoluteUrl = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p.endsWith('/') ? p : `${p}/`}`;
};
