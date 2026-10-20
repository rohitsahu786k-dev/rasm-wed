/** WP pages that exist but must not be indexed or listed in the sitemap. */
export const NOINDEX_SLUGS = new Set([
  'thank-you-page',
  // A shipping policy is leftover shop-template content for a service business.
  'shipping-policy',
  // City pages that are not ready to rank: they need real local venues, logistics and photos before they are indexed.
  'wedding-planner-in-ahmedabad',
  'wedding-planner-in-gandhinagar',
]);

/** Indexable utility pages kept out of the sitemap (they are not landing pages). */
export const SITEMAP_EXCLUDE = new Set(['privacy-policy', 'terms-and-conditions', 'refund-policy']);

/**
 * Real "last materially edited" dates for code-owned pages (YYYY-MM-DD), used as sitemap lastmod. WordPress pages and
 * posts use their own modified dates. Update an entry only when the page content genuinely changes.
 */
export const PAGE_UPDATED: Record<string, string> = {
  home: '2026-10-20',
  'wedding-destination': '2026-10-20',
  services: '2026-10-20',
  gallery: '2026-10-20',
  'about-us': '2026-10-20',
  'contact-us': '2026-10-20',
  'traditional-decoration': '2026-10-20',
  'corporate-events': '2026-10-20',
  'wedding-planner-in-jodhpur': '2026-10-20',
  'destination-weddings-in-india-guide': '2026-10-06',
  'nri-wedding-in-india-guide': '2026-10-06',
  'palace-and-heritage-weddings-in-rajasthan-guide': '2026-10-06',
};

/**
 * Dedicated-template pages: SEO copy for each. The primary keyword (see page-keywords.ts) is in every title and
 * description; the site name is appended by tidyTitle() when it fits in 60 characters.
 */
export const STATIC_PAGES: Record<string, { title: string; description: string; label: string }> = {
  'wedding-planner-in-jodhpur': {
    label: 'Wedding Planner in Jodhpur',
    title: 'Wedding Planner in Jodhpur: Palaces and Forts',
    description:
      'Wedding planner in Jodhpur for royal celebrations at Umaid Bhawan Palace, Mehrangarh Fort, Ajit Bhawan and Bal Samand Lake Palace, with decor, guest travel and logistics.',
  },
  'wedding-destination': {
    label: 'Wedding Destinations',
    title: 'Wedding Destinations in Rajasthan, Goa and Thailand',
    description:
      'Compare 12 wedding destinations: Udaipur, Jaipur, Jodhpur, Jaisalmer, Goa and more. Rasm Weddings & Events plans palace, fort and resort weddings end to end.',
  },
  services: {
    label: 'Services',
    title: 'Wedding Planning Services in Udaipur',
    description:
      'Nine wedding planning services in Udaipur: venue selection, decor, catering, entertainment, guest hospitality, logistics and budgets. Packages from Rs 30 Lacs.',
  },
  gallery: {
    label: 'Gallery',
    title: 'Wedding Gallery: Decor and Celebrations in Udaipur',
    description: 'Browse our wedding gallery: mandaps, stages, decor and celebrations planned by Rasm Weddings & Events in Udaipur and across Rajasthan.',
  },
  'about-us': {
    label: 'About Us',
    // About and Contact both led with "Wedding Planner in Udaipur", the home page's primary phrase. They now
    // target their own intent (who we are / how to reach us) so they stop competing with the home page.
    title: 'About Rasm Weddings & Events, Udaipur',
    description: 'Who we are: Rasm Weddings & Events is a destination wedding planning company based in Udaipur, Rajasthan, planning palace, fort and resort celebrations for families in India and abroad.',
  },
  'contact-us': {
    label: 'Contact',
    title: 'Contact Rasm Weddings & Events, Udaipur',
    description: 'Call, WhatsApp or email our Udaipur office for a free wedding planning consultation. Rasm Weddings & Events, 510 City Centre, Ashok Nagar, Udaipur, Rajasthan.',
  },
  'traditional-decoration': {
    label: 'Wedding Decoration',
    title: 'Wedding Decoration in Udaipur: Mandap and Stage',
    description: 'Wedding decoration in Udaipur for mandaps, stages, entrances, florals and lighting. Traditional Rajasthani and modern styles by Rasm Weddings & Events.',
  },
  'corporate-events': {
    label: 'Corporate Events',
    title: 'Corporate Event Management in Udaipur',
    description: 'Corporate event management in Udaipur and Rajasthan: conferences, incentive trips, gala dinners and product launches at palaces and heritage hotels.',
  },
  blog: {
    label: 'Blog',
    title: 'Wedding Planning Blog: Udaipur Guides and Tips',
    description: 'Wedding planning blog from Rasm Weddings & Events: venue guides, budget advice, rituals and decor ideas for destination weddings in Udaipur and Rajasthan.',
  },
};
