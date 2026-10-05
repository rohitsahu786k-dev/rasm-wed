
const WP_ORIGIN = (process.env.NEXT_PUBLIC_WP_ORIGIN ?? process.env.WP_ORIGIN ?? 'https://admin.rasmwed.com').replace(/\/$/, '');
const wpHost = new URL(WP_ORIGIN).hostname;
const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rasmwed.com').hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // WordPress URLs use trailing slashes; keeping them means zero redirects for existing backlinks.
  trailingSlash: true,
  poweredByHeader: false,
  // Fewer parallel WordPress requests while prerendering (the origin throttles bursts); retry a failed page once more.
  experimental: { staticGenerationMaxConcurrency: 3, staticGenerationRetryCount: 2 },
  images: {
    qualities: [75, 85],
    formats: ['image/webp'],
    remotePatterns: [...new Set([wpHost, siteHost])].map((hostname) => ({ protocol: 'https', hostname, pathname: '/wp-content/uploads/**' })),
  },
  async redirects() {
    // Aliases that only ever existed in the Vite SPA -> canonical WordPress URLs (single hop).
    const alias = (from, to) => ({ source: `/${from}`, destination: to, permanent: true });
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
    return [{ source: '/wp-content/uploads/:path*', destination: `${WP_ORIGIN}/wp-content/uploads/:path*` }];
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
