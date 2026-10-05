import type { SiteSettings } from '../types/index.ts';
import { SITE, SITE_URL } from '../lib/site.ts';

export const settings: SiteSettings = {
  title: 'Rasm Wedding & Events',
  description: 'Premier Luxury Destination Wedding Architects in Udaipur & Rajasthan',
  url: SITE_URL,
  logoUrl: SITE.logo,
  phone: SITE.phone,
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  address: SITE.address,
  heroHeadline: 'Where Royal Heritage Meets Classic Romance',
  heroSubheadline:
    'Curating custom palace celebrations across Udaipur, Jaipur, and famous rasm destinations for careful couples worldwide.',
  instagramUrl: SITE.instagram,
  stats: {
    experience: '10+ Years',
    weddings: '500+ Events',
    destinations: '12 Destinations',
    satisfaction: '9 Planning Services',
  },
};
