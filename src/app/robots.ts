import type { MetadataRoute } from 'next';
import { IS_PRODUCTION, SITE_URL } from '@/lib/site';

/**
 * AI crawler policy: public marketing content is welcome in AI search and answer engines (they cite and link the source),
 * while the API and admin areas stay closed to everyone. Change a user agent here to opt out.
 */
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];
const PRIVATE = ['/api/', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  // Blanket disallow applies ONLY to non-production deployments.
  if (!IS_PRODUCTION) return { rules: { userAgent: '*', disallow: '/' } };
  // /thank-you-page/ is NOT disallowed: it carries a noindex meta tag, which crawlers can only honour if they may fetch it.
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
