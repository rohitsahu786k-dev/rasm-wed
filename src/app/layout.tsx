import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import '@/styles/globals.css';
import { IS_PRODUCTION, SITE, SITE_URL } from '@/lib/site';
import { InquiryProvider } from '@/components/InquiryProvider';
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider';
import { getSiteSettings } from '@/lib/acf';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  robots: IS_PRODUCTION ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Keeps Search Console ownership (same token as the live WordPress site).
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? 'lfleq68y7a9Qsn1-rs2LHXMyXUkhm_vlteSp37KlTHM' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={`${manrope.variable} scroll-smooth`}>
      <body className="bg-white text-[#1a1a1a] font-body selection:bg-[#D4AF37] selection:text-white antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema({ phone: settings.phone, email: settings.email, sameAs: [settings.instagramUrl, settings.facebookUrl, settings.youtubeUrl] }), websiteSchema()]} />
        <Analytics />
        <SiteSettingsProvider value={settings}>
        <InquiryProvider>
          <div className="min-h-screen bg-white text-charcoal-900 flex flex-col selection:bg-gold selection:text-white">
            <Navbar />
            <main id="main" className="flex-grow">
              {children}
            </main>
            <Footer settings={settings} />
          </div>
        </InquiryProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
