import type { NextConfig } from 'next';

const wpHost = new URL(process.env.WP_ORIGIN ?? 'https://rasmwed.com').hostname;
const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rasmwed.com').hostname;

const nextConfig: NextConfig = {
  // WordPress URLs use trailing slashes; keeping them means zero redirects for existing backlinks.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 85],
    formats: ['image/webp'],
    remotePatterns: [...new Set([wpHost, siteHost])].map((hostname) => ({ protocol: 'https' as const, hostname, pathname: '/wp-content/uploads/**' })),
  },
  async redirects() {
    // Aliases that only ever existed in the Vite SPA -> canonical WordPress URLs (single hop).
    const alias = (from: string, to: string) => ({ source: `/${from}`, destination: to, permanent: true });
    return [
      alias('venue-catalogue', '/wedding-destination/'),
      alias('destinations', '/wedding-destination/'),
      alias('venues', '/wedding-destination/'),
      alias('wedding-venues', '/wedding-destination/'),
      alias('journal', '/blog/'),
      alias('about', '/about-us/'),
      alias('contact', '/contact-us/'),
      { source: '/blog/:slug', destination: '/:slug/', permanent: true },
      { source: '/category/blog', destination: '/blog/', permanent: true },
    ];
  },
  async rewrites() {
    // Media stays on the WordPress origin; keep existing /wp-content/uploads URLs working on the public domain.
    if (wpHost === siteHost) return [];
    const origin = (process.env.WP_ORIGIN ?? '').replace(/\/$/, '');
    return [{ source: '/wp-content/uploads/:path*', destination: `${origin}/wp-content/uploads/:path*` }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
