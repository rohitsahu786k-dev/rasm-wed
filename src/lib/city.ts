import profiles from '../data/city-profiles.json' with { type: 'json' };

export interface CityProfile {
  slug: string;
  tagline: string;
  facts: { nearestAirport: string; railAccess: string; bestMonths: string; settings: string[]; knownFor: string[]; gettingThere: string };
  faqs: { q: string; a: string }[];
}

export const cityKeyFromSlug = (pageSlug: string) => pageSlug.replace(/^wedding-planner-in-/, '');
export const cityNameFromSlug = (pageSlug: string) =>
  cityKeyFromSlug(pageSlug).split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

export const getCityProfile = (pageSlug: string): CityProfile | undefined => (profiles as Record<string, CityProfile>)[cityKeyFromSlug(pageSlug)];

/** Destinations that are sensible next stops when planning (shown as crawlable cards). */
export const NEARBY: Record<string, string[]> = {
  udaipur: ['nathdwara', 'kumbhalgarh', 'mount-abu', 'ranakpur'],
  jaipur: ['pushkar', 'jodhpur', 'kota'],
  jodhpur: ['jaisalmer', 'jaipur', 'pushkar'],
  jaisalmer: ['jodhpur', 'pushkar', 'jaipur'],
  kumbhalgarh: ['udaipur', 'ranakpur', 'mount-abu', 'nathdwara'],
  'mount-abu': ['udaipur', 'ranakpur', 'ahmedabad'],
  nathdwara: ['udaipur', 'kumbhalgarh', 'ranakpur'],
  pushkar: ['jaipur', 'jodhpur', 'kota'],
  kota: ['jaipur', 'udaipur', 'pushkar'],
  ranakpur: ['kumbhalgarh', 'udaipur', 'mount-abu'],
  goa: ['udaipur', 'jaipur', 'thailand'],
  ahmedabad: ['gandhinagar', 'mount-abu', 'udaipur'],
  gandhinagar: ['ahmedabad', 'mount-abu', 'udaipur'],
  thailand: ['goa', 'udaipur', 'jaipur'],
};

export interface FaqParse {
  /** Body HTML with the FAQ section removed (it is rendered as an accordion instead). */
  body: string;
  faqs: { q: string; a: string }[];
  /** Anything after the last Q&A (e.g. a closing call-to-action paragraph). */
  tail: string;
}

const text = (h: string) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, '’').replace(/\s+/g, ' ').trim();

/** Pulls the "Frequently asked questions" section (h2, then h3 + p pairs) out of WordPress/AI-authored HTML. */
export function parseFaqs(html: string): FaqParse {
  const m = /<h2[^>]*>[^<]*(frequently asked|faq)[^<]*<\/h2>/i.exec(html);
  if (!m) return { body: html, faqs: [], tail: '' };
  const start = m.index;
  const rest = html.slice(start + m[0].length);
  const next = /<h2[\s>]/i.exec(rest);
  const section = next ? rest.slice(0, next.index) : rest;
  const after = next ? rest.slice(next.index) : '';
  const faqs: { q: string; a: string }[] = [];
  const heads = [...section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
  let tail = '';
  heads.forEach((h, i) => {
    const from = (h.index ?? 0) + h[0].length;
    const to = heads[i + 1]?.index ?? section.length;
    const chunk = section.slice(from, to);
    const paras = [...chunk.matchAll(/<p[^>]*>[\s\S]*?<\/p>/gi)].map((m) => m[0]);
    if (paras.length === 0) return;
    // The first paragraph(s) answer the question; for the LAST question, anything after the first paragraph is a closing call-to-action.
    const isLast = i === heads.length - 1;
    const answer = isLast ? paras.slice(0, 1) : paras;
    if (isLast) tail = paras.slice(1).join('\n');
    faqs.push({ q: text(h[1]), a: text(answer.join(' ')) });
  });
  if (faqs.length < 2) return { body: html, faqs: [], tail: '' };
  return { body: html.slice(0, start) + after, faqs, tail };
}

/** Posts that are about this city (title or slug mentions it), newest first as given. */
export function relatedPosts<T extends { slug: string; title: string }>(posts: T[], city: string, limit = 3): T[] {
  const key = city.toLowerCase();
  return posts.filter((p) => p.title.toLowerCase().includes(key) || p.slug.includes(key.replace(/\s+/g, '-'))).slice(0, limit);
}
