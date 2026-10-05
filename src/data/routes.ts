/** WP pages that exist but must not be indexed or listed in the sitemap. */
export const NOINDEX_SLUGS = new Set(['thank-you-page']);

/**
 * Dedicated-template pages: fallback SEO copy for each.
 * (Rank Math on WordPress takes priority when it provides a title/description; the site name is appended by the title template.)
 */
export const STATIC_PAGES: Record<string, { title: string; description: string; label: string }> = {
  'wedding-planner-in-jodhpur': {
    label: 'Wedding Planner in Jodhpur',
    title: 'Luxury Destination Wedding Planner in Jodhpur | Royal Palaces & Forts | RASM',
    description:
      'Premier destination wedding planner in Jodhpur. Planning royal celebrations at Umaid Bhawan Palace, Mehrangarh Fort, Ajit Bhawan, Bal Samand Lake Palace & luxury Thar dunes with custom decor, guest logistics and Marwari hospitality.',
  },
  'wedding-destination': {
    label: 'Wedding Destinations',
    title: 'Destination Wedding Planner in Rajasthan, Goa & Beyond',
    description:
      'Compare 12 destination wedding locations: Udaipur, Jaipur, Jodhpur, Jaisalmer, Goa and more. Rasm Weddings & Events plans palace, fort and resort weddings end to end.',
  },
  services: {
    label: 'Services',
    title: 'Wedding Planning Services in Udaipur',
    description:
      'Nine wedding planning services in Udaipur: venue selection, decor, catering, entertainment, guest hospitality, logistics and budgets. Packages from Rs 30 Lacs. Free consultation.',
  },
  gallery: {
    label: 'Gallery',
    title: 'Wedding Gallery: Decor & Celebrations in Udaipur',
    description: 'Browse wedding decor, mandaps, stages and celebrations planned by Rasm Weddings & Events in Udaipur and across Rajasthan.',
  },
  'about-us': {
    label: 'About Us',
    title: 'About Us: Wedding Planner in Udaipur, 10+ Years',
    description: 'Udaipur-based wedding and event planners with 10+ years of experience and 500+ events planned for families in India and abroad.',
  },
  'contact-us': {
    label: 'Contact',
    title: 'Contact the Wedding Planner in Udaipur',
    description: 'Call, WhatsApp or email Rasm Weddings & Events in Udaipur for a free wedding planning consultation. Office at Ashok Nagar, Udaipur.',
  },
  'traditional-decoration': {
    label: 'Wedding Decoration',
    title: 'Wedding Decoration in Udaipur: Mandap, Stage & Florals',
    description: 'Wedding decorators in Udaipur for mandaps, stages, entrances, florals and lighting. Traditional Rajasthani and modern styles by Rasm Weddings & Events.',
  },
  'corporate-events': {
    label: 'Corporate Events',
    title: 'Corporate Event Management in Udaipur',
    description: 'Corporate event planners in Udaipur and Rajasthan: conferences, incentive trips, gala dinners and product launches at palaces and heritage hotels.',
  },
  blog: {
    label: 'Blog',
    title: 'Wedding Planning Blog: Udaipur & Destination Guides',
    description: 'Venue guides, budget advice, rituals and decor ideas for weddings in Udaipur and across Rajasthan from Rasm Weddings & Events.',
  },
};
