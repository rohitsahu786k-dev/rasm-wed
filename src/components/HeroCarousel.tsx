'use client';

import { getImageProps } from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
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
        p.startsWith('*') && p.endsWith('*') ? <span key={i} className="gold-gradient-text italic">{p.slice(1, -1)}</span> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

/**
 * Homepage banner carousel. Art-directed images: a landscape image on desktop and a separate portrait image on mobile
 * (<picture>), served through the Next.js image optimiser. Only the first slide is preloaded (LCP); the rest load lazily.
 * Accessible: labelled carousel region, pause button, keyboard arrows, swipe, respects prefers-reduced-motion.
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

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured wedding highlights"
      className="relative isolate w-full overflow-hidden bg-[#FDFCFA] text-charcoal-900 h-[78svh] min-h-[560px] max-h-[780px] md:h-[78vh] md:min-h-[560px]"
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
      {slides.map((s, i) => {
        const isActive = i === active;
        const common = { alt: s.alt, sizes: '100vw', quality: 75, priority: i === 0, loading: i === 0 ? ('eager' as const) : ('lazy' as const), fetchPriority: i === 0 ? ('high' as const) : ('low' as const) };
        const desktop = getImageProps({ ...common, src: s.desktop.url, width: s.desktop.width, height: s.desktop.height });
        const mobileSrc = s.mobile ?? s.desktop;
        const mobile = getImageProps({ ...common, src: mobileSrc.url, width: mobileSrc.width, height: mobileSrc.height });
        const H = i === 0 ? 'h1' : 'h2';
        const align = s.align === 'center' ? 'items-center text-center' : s.align === 'right' ? 'items-end text-right' : 'items-start text-left';
        return (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!isActive}
            {...(!isActive ? { inert: true as never } : {})}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={desktop.props.srcSet} sizes="100vw" />
              <source media="(max-width: 767px)" srcSet={mobile.props.srcSet} sizes="100vw" />
              <img
                {...desktop.props}
                alt={s.alt}
                className={`absolute inset-0 h-full w-full object-cover md:object-[70%_50%] ${isActive && !reduced ? 'hero-kenburns' : ''}`}
              />
            </picture>
            <div aria-hidden="true" className="absolute inset-0 md:hidden" style={{ background: `linear-gradient(0deg, rgba(253,252,250,0.97) 0%, rgba(253,252,250,0.9) 38%, rgba(253,252,250,${Math.max(0, 0.25 - s.overlay / 400).toFixed(2)}) 70%)` }} />
            <div aria-hidden="true" className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(90deg, rgba(253,252,250,0.97) 0%, rgba(253,252,250,0.88) 30%, rgba(253,252,250,0.35) 52%, rgba(253,252,250,0) 70%)` }} />

            <div className="rasm-container relative h-full flex">
              <div className={`flex flex-col justify-end md:justify-center gap-5 w-full max-w-2xl pb-20 sm:pb-24 pt-0 ${align} ${s.align === 'center' ? 'mx-auto' : s.align === 'right' ? 'ml-auto' : ''}`}>
                {s.eyebrow && <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gold-dark font-medium">{s.eyebrow}</p>}
                <H className={`font-manrope font-medium text-[2.1rem] leading-[1.15] sm:text-5xl lg:text-[3.75rem] tracking-tight text-charcoal-900 ${isActive ? 'hero-rise' : ''}`}><Accent text={s.heading} /></H>
                {s.subheading && <p className="text-base sm:text-lg text-charcoal-700 font-light leading-relaxed max-w-xl">{s.subheading}</p>}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button type="button" onClick={() => open()} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#A88434] via-[#B8923A] to-[#8F6A14] text-white text-sm font-medium tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Plan Your Wedding
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {s.buttonLabel && s.buttonHref && (
                    <Link href={s.buttonHref} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gold/60 bg-white/60 text-charcoal-900 text-sm font-medium tracking-wide hover:bg-white transition-colors">
                      {s.buttonLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <>
          <div className="absolute z-20 inset-x-0 bottom-6 sm:bottom-8">
            <div className="rasm-container flex items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active}
                    className="group grid place-items-center w-8 h-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-9 bg-gold' : 'w-3 bg-charcoal-900/25 group-hover:bg-charcoal-900/50'}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {autoplaySeconds > 0 && (
                  <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} className="grid place-items-center w-10 h-10 rounded-full bg-white/80 text-charcoal-900 border border-gold/30 backdrop-blur hover:bg-white transition-colors">
                    {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                )}
                <button type="button" onClick={() => go(active - 1)} aria-label="Previous slide" className="hidden sm:grid place-items-center w-10 h-10 rounded-full bg-white/80 text-charcoal-900 border border-gold/30 backdrop-blur hover:bg-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => go(active + 1)} aria-label="Next slide" className="hidden sm:grid place-items-center w-10 h-10 rounded-full bg-white/80 text-charcoal-900 border border-gold/30 backdrop-blur hover:bg-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{`Slide ${active + 1} of ${count}`}</p>
        </>
      )}
    </section>
  );
}
