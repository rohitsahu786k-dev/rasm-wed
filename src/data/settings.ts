import type { SiteSettings } from '@/types';
import { SITE, SITE_URL } from '@/lib/site';

export const settings: SiteSettings = {
  title: 'Rasm Wedding & Events',
  description: 'Premier Luxury Destination Wedding Architects in Udaipur & Rajasthan',
  url: SITE_URL,
  logoUrl: SITE.logo,
  phone: SITE.phone,
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  address: SITE.address,
  heroHeadline: 'Where Royal Heritage Meets Timeless Romance',
  heroSubheadline:
    'Curating bespoke palatial celebrations across Udaipur, Jaipur, and iconic rasm destinations for discerning couples worldwide.',
  instagramUrl: 'https://instagram.com/rasmwed',
  stats: {
    experience: '12+ Years',
    weddings: '450+ Curated',
    destinations: '18+ Palaces',
    satisfaction: '100% Bliss',
  },
};
