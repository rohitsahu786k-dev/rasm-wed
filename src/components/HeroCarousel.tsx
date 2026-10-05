'use client';

import { getImageProps } from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Flower2, Award, MapPin, ShieldCheck } from 'lucide-react';
import type { HeroSlide } from '@/lib/acf';
import { useInquiry } from '@/components/InquiryProvider';

const REDUCED = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/** "*word*" in a heading renders in gold italic (e.g. "Your Palace *Wedding* Begins Here."). */
function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <span key={i} className="gold-gradient-text italic">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/**
 * Homepage Hero with Responsive Banners & Dedicated Text Content Below:
 * - Desktop Banner: 21:9 Aspect Ratio (`aspect-[21/9]`)
 * - Mobile Banner: 1:1 Aspect Ratio (`aspect-square`)
 * - No text on banner image (clean, crisp luxury photography)
 * - Text starts cleanly below the banner with zero washed-out background images
 * - Fully editable from WordPress ACF (new-home hero slides & banners)
 */
export function HeroCarousel({ slides, autoplaySeconds }: { slides: HeroSlide[]; autoplaySeconds: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const touchX = useRef<number | null>(null);
  const { open } = useInquiry();
  const count = slides.length;

  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || autoplaySeconds <= 0 || paused || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), autoplaySeconds * 1000);
    return () => window.clearInterval(id);
  }, [count, autoplaySeconds, paused, reduced, active]);

  useEffect(() => {
    const onVis = () => setPaused((p) => (document.hidden ? true : p));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const currentSlide = slides[active] || slides[0];

  return (
    <div className="w-full bg-[#FDFCFA]">
      {/* ---------------- 1. CLEAN RESPONSIVE BANNER (NO TEXT ON IMAGE) ---------------- */}
      <section
        aria-roledescription="carousel"
        aria-label="Homepage Featured Banners"
        className="relative w-full bg-stone-100 overflow-hidden border-b border-gold/20"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(active + 1);
          if (e.key === 'ArrowLeft') go(active - 1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        }}
      >
        {/* Desktop Container: 21:9 Aspect Ratio */}
        <div className="hidden md:block relative w-full aspect-[21/9] max-h-[660px]">
          {slides.map((s, i) => {
            const isActive = i === active;
            const common = {
              alt: s.alt,
              sizes: '100vw',
              quality: 85,
              priority: i === 0,
              loading: i === 0 ? ('eager' as const) : ('lazy' as const),
              fetchPriority: i === 0 ? ('high' as const) : ('low' as const),
            };
            const desktop = getImageProps({
              ...common,
              src: s.desktop.url,
              width: s.desktop.width,
              height: s.desktop.height,
            });

            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  {...desktop.props}
                  alt={s.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Container: 1:1 Aspect Ratio (Square) */}
        <div className="block md:hidden relative w-full aspect-square">
          {slides.map((s, i) => {
            const isActive = i === active;
            const common = {
              alt: s.alt,
              sizes: '100vw',
              quality: 85,
              priority: i === 0,
              loading: i === 0 ? ('eager' as const) : ('lazy' as const),
              fetchPriority: i === 0 ? ('high' as const) : ('low' as const),
            };
            const mobileSrc = s.mobile ?? s.desktop;
            const mobile = getImageProps({
              ...common,
              src: mobileSrc.url,
              width: mobileSrc.width,
              height: mobileSrc.height,
            });

            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  {...mobile.props}
                  alt={s.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        {/* Carousel Slide Indicators & Navigation Controls */}
        {count > 1 && (
          <div className="absolute z-20 inset-x-0 bottom-4 sm:bottom-6">
            <div className="rasm-container flex items-center justify-between gap-4">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active}
                    className="group grid place-items-center w-6 h-6 focus:outline-none rounded-full"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? 'w-7 bg-gold' : 'w-2 bg-white/60 group-hover:bg-white'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / Next & Pause Controls */}
              <div className="flex items-center gap-2">
                {autoplaySeconds > 0 && (
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                    className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/60 transition-colors"
                  >
                    {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous slide"
                  className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next slide"
                  className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ---------------- 2. TEXT CONTENT SECTION (STARTS CLEANLY BELOW THE BANNER) ---------------- */}
      <section className="relative w-full bg-[#FDFCFA] py-10 sm:py-16 border-b border-gold/20">
        <div className="rasm-container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold">
              <Flower2 className="w-3.5 h-3.5 text-gold-dark" />
              <span>
                {currentSlide.eyebrow || 'Premier Luxury Destination Wedding Planners · Rajasthan & Worldwide'}
              </span>
            </div>

            {/* Main H1 Title */}
            <h1 className="font-manrope font-medium text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.14]">
              <Accent text={currentSlide.heading} />
            </h1>

            {/* Subheading / Copy */}
            {currentSlide.subheading && (
              <p className="text-base sm:text-xl text-charcoal-700 font-light leading-relaxed max-w-2xl mx-auto">
                {currentSlide.subheading}
              </p>
            )}

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => open()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-charcoal-950 text-sm font-semibold tracking-wide uppercase shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Plan Your Wedding</span>
                <ArrowRight className="w-4 h-4 text-charcoal-950" />
              </button>

              <Link
                href={currentSlide.buttonHref || '/wedding-destination/'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/40 bg-white text-charcoal-800 text-sm font-medium tracking-wide hover:border-gold hover:bg-gold/5 transition-all shadow-xs"
              >
                <span>{currentSlide.buttonLabel || 'Explore 14 Destinations'}</span>
              </Link>
            </div>

            {/* Trust Highlights Strip Underneath Text */}
            <div className="pt-8 mt-6 border-t border-gold/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gold/15 shadow-2xs">
                <Award className="w-5 h-5 text-gold-dark shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal-900 text-sm">10+ Years Heritage</div>
                  <div className="text-[11px] text-charcoal-500">500+ Royal Celebrations</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gold/15 shadow-2xs">
                <MapPin className="w-5 h-5 text-gold-dark shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal-900 text-sm">14 Prime Hubs</div>
                  <div className="text-[11px] text-charcoal-500">Rajasthan, Goa & Beyond</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gold/15 shadow-2xs">
                <Flower2 className="w-5 h-5 text-gold-dark shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal-900 text-sm">Full Palace Buyouts</div>
                  <div className="text-[11px] text-charcoal-500">Lake Mandaps & Forts</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gold/15 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal-900 text-sm">Zero Markups</div>
                  <div className="text-[11px] text-charcoal-500">100% Direct Vendor Rates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroCarousel;
