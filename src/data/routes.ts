/** WP pages that exist but must not be indexed or listed in the sitemap. */
export const NOINDEX_SLUGS = new Set(['thank-you-page']);

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
