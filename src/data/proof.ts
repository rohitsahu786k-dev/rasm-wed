/**
 * Social proof, supplied by the business. NOTHING here is invented: every list starts empty and the matching section
 * stays hidden until real entries are added (testimonials need the client's permission; ratings must match the
 * Google Business Profile). Add entries below and redeploy, no code changes needed.
 */

export interface Testimonial {
  /** Client name as approved for publication, e.g. "Priya and Rohan S." */
  name: string;
  /** Where the clients live, e.g. "London, UK" */
  from: string;
  /** City and venue of the wedding, e.g. "Udaipur, Lake Pichola" */
  wedding: string;
  quote: string;
  /** ISO date the review was given (used for Review schema) */
  date?: string;
  /** Link to the original review (Google, WedMeGood, WeddingWire ...) */
  sourceUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export interface CaseStudy {
  title: string;
  city: string;
  venue: string;
  guests: number;
  summary: string;
  href?: string;
}

export const TESTIMONIALS: Testimonial[] = [];
export const TEAM: TeamMember[] = [];
export const CASE_STUDIES: CaseStudy[] = [];

/** Link to the public Google Business Profile reviews (shown only when set). */
export const GOOGLE_REVIEWS_URL = '';
