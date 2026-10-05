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
  instagram: 'https://www.instagram.com/rasmwed/',
  facebook: 'https://www.facebook.com/profile.php?id=61564418983917',
  youtube: 'https://youtube.com/@rasmwed',
  // Real contact details, as published on the live WordPress site (contact-us page, header, WhatsApp button).
  phone: '+91 80948 75504',
  phone2: '+91 91169 29135',
  whatsapp: '918094875504',
  email: process.env.CONTACT_EMAIL || 'rasmwed@gmail.com',
  address: '510, City Centre, Ashok Nagar, Udaipur, Rajasthan 313001',
  street: '510, City Centre, Ashok Nagar',
  postalCode: '313001',
} as const;

/** Canonical URL: always absolute, always with a trailing slash (matches existing WordPress URLs). */
export const absoluteUrl = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p.endsWith('/') ? p : `${p}/`}`;
};
