import Script from 'next/script';
import { IS_PRODUCTION } from '@/lib/site';
import { PixelRouteTracker } from '@/components/PixelRouteTracker';

/**
 * Tracking carried over from the live WordPress site (Site Kit + PixelYourSite), same IDs so history continues.
 * Production only: previews/staging must not pollute analytics. Loaded after the page is interactive.
 * GA4 sends its own page_view on history changes (enhanced measurement); the Meta Pixel needs PixelRouteTracker.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-633JRXXMKW';
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? 'GT-TQDJTSP5';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '861960160150480';

export function Analytics() {
  if (!IS_PRODUCTION) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
        gtag('config', '${GOOGLE_TAG_ID}');
      `}</Script>
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}</Script>
      <PixelRouteTracker />
    </>
  );
}
