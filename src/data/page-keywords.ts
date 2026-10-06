/**
 * Primary and secondary keywords per page. The primary phrase must appear in the title, H1 and meta description;
 * secondary phrases are worked into headings, FAQs and body copy. `scripts/check-keywords.ts` verifies this against the live build.
 */
export interface PageKeywords {
  primary: string;
  secondary: string[];
}

export const PAGE_KEYWORDS: Record<string, PageKeywords> = {
  '/': { primary: 'wedding planner in udaipur', secondary: ['destination wedding planner', 'palace wedding', 'wedding in rajasthan', 'wedding decor'] },
  '/wedding-destination/': { primary: 'wedding destinations', secondary: ['destination wedding', 'udaipur', 'jaipur', 'goa', 'jaisalmer'] },
  '/services/': { primary: 'wedding planning services', secondary: ['wedding decor', 'catering', 'entertainment', 'guest hospitality', 'budget'] },
  '/gallery/': { primary: 'wedding gallery', secondary: ['wedding decor', 'mandap', 'udaipur', 'celebrations'] },
  // About/Contact no longer target the home page's primary phrase (see src/data/routes.ts).
  '/about-us/': { primary: 'rasm weddings and events', secondary: ['wedding planning company udaipur', 'destination wedding planners', 'rajasthan'] },
  '/contact-us/': { primary: 'contact wedding planner udaipur', secondary: ['free consultation', 'whatsapp', 'udaipur office'] },
  '/traditional-decoration/': { primary: 'wedding decoration in udaipur', secondary: ['mandap', 'stage', 'floral', 'lighting'] },
  '/corporate-events/': { primary: 'corporate event management in udaipur', secondary: ['conference', 'gala dinner', 'product launch', 'incentive'] },
  '/blog/': { primary: 'wedding planning blog', secondary: ['udaipur', 'destination wedding', 'rajasthan', 'budget'] },
  // Pillar pages (src/data/pillars.ts). Each anchors a cluster and targets an informational head term the
  // commercial city pages should not chase.
  '/destination-weddings-in-india-guide/': {
    primary: 'destination wedding in india',
    secondary: ['destination wedding planner india', 'how to plan a destination wedding in india', 'destination wedding season india', 'destination wedding budget'],
  },
  '/palace-and-heritage-weddings-in-rajasthan-guide/': {
    primary: 'palace wedding in rajasthan',
    secondary: ['heritage wedding venues rajasthan', 'fort wedding rajasthan', 'royal wedding in rajasthan', 'rajasthan wedding venue'],
  },
  '/nri-wedding-in-india-guide/': {
    primary: 'nri wedding in india',
    secondary: ['planning indian wedding from abroad', 'destination wedding in india from usa', 'nri wedding planner india', 'indian wedding from uk'],
  },
};

/**
 * City pages follow one pattern: "wedding planner in {city}" plus destination-wedding variants.
 * Udaipur is the exception: the home page owns "wedding planner in udaipur", so the city page takes the
 * destination/venue intent instead (see src/data/city-destinations.ts).
 */
export function cityKeywords(city: string): PageKeywords {
  const c = city.toLowerCase();
  if (c === 'udaipur') {
    return { primary: 'destination wedding planner in udaipur', secondary: ['destination wedding in udaipur', 'udaipur wedding venues', 'palace wedding in udaipur', 'lake pichola wedding venues'] };
  }
  return { primary: `wedding planner in ${c}`, secondary: [`destination wedding in ${c}`, `${c} wedding venues`, 'palace wedding', 'wedding decor'] };
}
