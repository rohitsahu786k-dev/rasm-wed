/** WP pages that exist but must not be indexed or listed in the sitemap. */
export const NOINDEX_SLUGS = new Set(['thank-you-page']);

/** Dedicated-template pages: SEO copy for each. */
export const STATIC_PAGES: Record<string, { title: string; description: string; label: string }> = {
  'wedding-destination': {
    label: 'Wedding Destinations',
    title: 'Royal Wedding Venues & Destinations in India',
    description:
      'Browse palace, fort and heritage wedding venues across Udaipur, Jaipur, Jodhpur, Goa and beyond, curated by Rasm Weddings & Events for NRI and international couples.',
  },
  services: {
    label: 'Services',
    title: 'Luxury Wedding Planning Services',
    description:
      'From direct palace reservations to 3D mandap simulations and royal Mewari feasts, explore the bespoke destination wedding services of Rasm Weddings & Events.',
  },
  gallery: {
    label: 'Gallery',
    title: 'Real Palace Wedding Gallery',
    description: "Browse real royal wedding photography from Udaipur's lake palaces, Rajasthan's forts and beyond, planned by Rasm Weddings & Events.",
  },
  'about-us': {
    label: 'About Us',
    title: 'About Us',
    description:
      'Founded in Udaipur, Rasm Weddings & Events has planned over 500 events for couples from India and abroad.',
  },
  'contact-us': {
    label: 'Contact',
    title: 'Contact Our Udaipur Wedding Concierge',
    description: 'Request a private consultation with Rasm Weddings & Events, luxury destination wedding planners in Udaipur, Rajasthan.',
  },
  'traditional-decoration': {
    label: 'Traditional Decoration',
    title: 'Traditional Wedding Decoration & Mandap Design',
    description: 'Palatial mandap architecture, floral scenography and traditional Rajasthani wedding decoration by Rasm Weddings & Events.',
  },
  'corporate-events': {
    label: 'Corporate Events',
    title: 'Corporate & VIP Events in Rajasthan',
    description: "Heritage galas, VIP logistics and corporate events at Rajasthan's palaces, produced by Rasm Weddings & Events.",
  },
  blog: {
    label: 'Journal',
    title: 'The Wedding Journal: Destination Guides & Insights',
    description: "In-depth guides on royal Udaipur venues, realistic destination wedding budgets and bridal planning from Rajasthan's leading consultants.",
  },
};
