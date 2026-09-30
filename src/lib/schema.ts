import { absoluteUrl, SITE, SITE_URL } from './site';

type Json = Record<string, unknown>;

export const organizationSchema = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  description: SITE.description,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${SITE.logo}`,
  image: SITE.ogImage,
  address: { '@type': 'PostalAddress', addressLocality: 'Udaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: 24.5854, longitude: 73.7125 },
  areaServed: ['India', 'United Kingdom', 'United States', 'United Arab Emirates', 'Canada', 'Australia'],
  sameAs: [SITE.instagram],
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
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(p.path) },
  headline: p.title,
  description: p.description,
  ...(p.image ? { image: [p.image] } : {}),
  datePublished: p.datePublished,
  dateModified: p.dateModified,
  author: { '@type': 'Organization', name: SITE.name, url: `${SITE_URL}/` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});
