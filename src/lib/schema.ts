import { absoluteUrl, SITE, SITE_URL } from './site';

type Json = Record<string, unknown>;

/**
 * Review rating shown to Google. Only emitted when real figures are configured (NEXT_PUBLIC_RATING_VALUE and
 * NEXT_PUBLIC_RATING_COUNT, taken from the Google Business Profile). Invented ratings violate Google's structured data policy.
 */
const ratingFromEnv = (): Json | undefined => {
  const value = Number(process.env.NEXT_PUBLIC_RATING_VALUE);
  const count = Number(process.env.NEXT_PUBLIC_RATING_COUNT);
  if (!(value >= 1 && value <= 5) || !(count >= 1)) return undefined;
  return { '@type': 'AggregateRating', ratingValue: value, reviewCount: count, bestRating: 5, worstRating: 1 };
};

export const organizationSchema = (o: { phone?: string; email?: string; sameAs?: string[] } = {}): Json => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  description: SITE.description,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${SITE.logo}`,
  image: SITE.ogImage,
  telephone: o.phone ?? SITE.phone,
  email: o.email ?? SITE.email,
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: 'Udaipur', addressRegion: 'Rajasthan', postalCode: SITE.postalCode, addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: 24.5854, longitude: 73.7125 },
  areaServed: ['India', 'United Kingdom', 'United States', 'United Arab Emirates', 'Canada', 'Australia'],
  priceRange: 'From INR 30,00,000',
  currenciesAccepted: 'INR',
  knowsAbout: ['Destination wedding planning', 'Palace weddings', 'Wedding decor', 'Corporate events', 'Udaipur weddings', 'Rajasthan weddings'],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Rasm Weddings & Events, ${SITE.address}`)}`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: o.phone ?? SITE.phone,
      email: o.email ?? SITE.email,
      areaServed: ['IN', 'GB', 'US', 'AE', 'CA', 'AU'],
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  sameAs: (o.sameAs ?? [SITE.instagram, SITE.facebook, SITE.youtube]).filter(Boolean),
  ...(ratingFromEnv() ? { aggregateRating: ratingFromEnv() } : {}),
});

export type WebPageKind = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ImageGallery' | 'Blog';

/** Page-level entity linked to the site and organisation, so every URL has a typed WebPage node. */
export const webPageSchema = (p: { kind?: WebPageKind; path: string; name: string; description: string; image?: string; modified?: string }): Json => ({
  '@context': 'https://schema.org',
  '@type': p.kind ?? 'WebPage',
  '@id': `${absoluteUrl(p.path)}#webpage`,
  url: absoluteUrl(p.path),
  name: p.name,
  description: p.description,
  inLanguage: 'en',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  ...(p.path !== '/' ? { breadcrumb: { '@id': `${absoluteUrl(p.path)}#breadcrumb` } } : {}),
  ...(p.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: p.image }, image: p.image } : {}),
  ...(p.modified ? { dateModified: p.modified } : {}),
});

export const itemListSchema = (name: string, items: { name: string; path: string; image?: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: absoluteUrl(it.path), ...(it.image ? { image: it.image } : {}) })),
});

export const websiteSchema = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE.name,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
});

export const breadcrumbSchema = (items: { name: string; path: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(items[items.length - 1]?.path ?? '/')}#breadcrumb`,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const blogPostingSchema = (p: {
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  section?: string;
  wordCount?: number;
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(p.path)}#article`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${absoluteUrl(p.path)}#webpage` },
  isPartOf: { '@type': 'Blog', '@id': `${absoluteUrl('/blog/')}#blog`, name: `${SITE.name} Blog`, url: absoluteUrl('/blog/') },
  headline: p.title.slice(0, 110),
  description: p.description,
  ...(p.image ? { image: [p.image] } : {}),
  datePublished: p.datePublished,
  dateModified: p.dateModified,
  inLanguage: 'en',
  ...(p.section ? { articleSection: p.section } : {}),
  ...(p.wordCount ? { wordCount: p.wordCount } : {}),
  author: { '@type': 'Organization', name: SITE.name, url: `${SITE_URL}/` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});

/**
 * Evergreen reference guide (pillar pages). Article rather than BlogPosting: these are not dated blog entries,
 * so no datePublished/dateModified is asserted unless one is genuinely known.
 */
export const articleSchema = (p: {
  path: string;
  title: string;
  description: string;
  image?: string;
  section?: string;
  wordCount?: number;
  datePublished?: string;
  dateModified?: string;
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${absoluteUrl(p.path)}#article`,
  mainEntityOfPage: { '@id': `${absoluteUrl(p.path)}#webpage` },
  headline: p.title.slice(0, 110),
  description: p.description,
  ...(p.image ? { image: [p.image] } : {}),
  ...(p.section ? { articleSection: p.section } : {}),
  ...(p.wordCount ? { wordCount: p.wordCount } : {}),
  ...(p.datePublished ? { datePublished: p.datePublished } : {}),
  ...(p.dateModified ? { dateModified: p.dateModified } : {}),
  inLanguage: 'en',
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const serviceSchema = (s: { name: string; description: string; area: string; path: string }): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absoluteUrl(s.path)}#service`,
  name: s.name,
  serviceType: 'Wedding planning',
  description: s.description,
  url: absoluteUrl(s.path),
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Place', name: s.area },
});
