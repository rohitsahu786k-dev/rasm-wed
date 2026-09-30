import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Crown, MapPin } from 'lucide-react';
import { InquiryAnimatedButton } from '@/components/InquiryClient';
import type { WPPage } from '@/lib/wp';
import { WpBody } from '@/components/WpBody';

/**
 * Landing page for a city whose content lives in WordPress. Renders clean semantic HTML in the site's design:
 * either WordPress body HTML (AI/editor-authored) or, for legacy Elementor pages, blocks extracted from it.
 * The featured image is shown uncropped at its natural ratio.
 */
export function CityLanding({ page }: { page: WPPage }) {
  const city = page.title.replace(/^wedding planner in /i, '').trim();

  return (
    <div className="bg-white min-h-screen text-charcoal-900">
      <section className="pt-32 pb-12 bg-[#FDFCFA] border-b border-gold/20">
        <div className="rasm-container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-200 border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.28em] font-medium mb-6">
            <Crown className="w-3.5 h-3.5" />
            <span>Destination Weddings</span>
          </div>
          <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 tracking-tight leading-[1.2] mb-5">{page.title}</h1>
          {page.excerpt && <p className="text-charcoal-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">{page.excerpt}</p>}
          <div className="mt-8 flex justify-center">
            <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={`${city} wedding`} icon={<ArrowRight className="w-4 h-4" />}>
              Plan Your {city} Wedding
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>

      {page.image && (
        <div className="rasm-container max-w-5xl -mt-2 pt-10">
          <Image
            src={page.image}
            alt={page.imageAlt ?? `Wedding setting in ${city}`}
            width={page.imageWidth ?? 1536}
            height={page.imageHeight ?? 1024}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="w-full h-auto rounded-3xl border border-gold/20 shadow-[0_16px_45px_rgba(197,160,89,0.15)]"
          />
        </div>
      )}

      <article className="rasm-container max-w-3xl py-14">
        <WpBody content={page.content} />
      </article>

      <section className="py-16 bg-gradient-to-b from-[#FAF8F5] to-white text-center border-t border-gold/15">
        <div className="rasm-container max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium">
            <MapPin className="w-4 h-4" />
            <span>Talk to our Udaipur team</span>
          </div>
          <h2 className="font-manrope font-medium text-2xl sm:text-4xl tracking-tight">Ready to plan your {city} celebration?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={`${city} wedding`} icon={<ArrowRight className="w-4 h-4" />}>
              Request a Private Consultation
            </InquiryAnimatedButton>
            <Link href="/wedding-destination/" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-gold/40 text-sm tracking-[0.18em] uppercase text-charcoal-800 hover:bg-ivory-200 transition-colors">
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
