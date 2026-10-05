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
  '/about-us/': { primary: 'wedding planner in udaipur', secondary: ['event planners', '500+ events', 'rajasthan'] },
  '/contact-us/': { primary: 'wedding planner in udaipur', secondary: ['free consultation', 'whatsapp', 'udaipur'] },
  '/traditional-decoration/': { primary: 'wedding decoration in udaipur', secondary: ['mandap', 'stage', 'floral', 'lighting'] },
  '/corporate-events/': { primary: 'corporate event management in udaipur', secondary: ['conference', 'gala dinner', 'product launch', 'incentive'] },
  '/blog/': { primary: 'wedding planning blog', secondary: ['udaipur', 'destination wedding', 'rajasthan', 'budget'] },
};

/** City pages follow one pattern: "wedding planner in {city}" plus destination-wedding variants. */
export function cityKeywords(city: string): PageKeywords {
  const c = city.toLowerCase();
  return { primary: `wedding planner in ${c}`, secondary: [`destination wedding in ${c}`, `${c} wedding venues`, 'palace wedding', 'wedding decor'] };
}
