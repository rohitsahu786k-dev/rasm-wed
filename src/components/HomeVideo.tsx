'use client';

import { useEffect, useRef } from 'react';
import { MEDIA_ORIGIN } from '@/lib/site';

/**
 * Homepage reels: four 9:16 videos side by side. They autoplay muted and loop (browsers only allow autoplay when
 * muted), play only while on screen, and stay paused for visitors who prefer reduced motion.
 * The files are the portrait videos already in the WordPress media library.
 */
const BASE = `${MEDIA_ORIGIN}/wp-content/uploads/2024/01`;
const LONG = 'Withourserviceyoullgetaccesstoover550ThemeDecorPhotos1000decorphotos1500colorpalettes403Dstages40themes300reelvideos3DVidhiMandapdesignsmuchmore.Withallof';
const VIDEOS = [
  { src: `${BASE}/${LONG}th-1.mp4`, label: 'Wedding stage decor reel' },
  { src: `${BASE}/${LONG}these.mp4`, label: 'Mandap and theme decor reel' },
  { src: `${BASE}/IGDownloader.App_3278757679231072673.mp4`, label: 'Wedding celebration reel' },
  { src: `${BASE}/${LONG}th-2.mp4`, label: 'Wedding venue decor reel' },
];

export function HomeVideo() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !reduce) void v.play().catch(() => undefined);
          else v.pause();
        }
      },
      { threshold: 0.35 },
    );
    refs.current.forEach((v) => {
      if (!v) return;
      v.muted = true;
      io.observe(v);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="home-video-heading" className="py-14 sm:py-16 bg-[#FDFCFA] border-b border-gold/15">
      <div className="rasm-container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">Watch Our Story</p>
          <h2 id="home-video-heading" className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            See How We Plan <span className="gold-gradient-text italic">Your Wedding</span>
          </h2>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mx-auto max-w-6xl">
          {VIDEOS.map((v, i) => (
            <li key={v.src} className="relative overflow-hidden rounded-2xl border border-gold/25 bg-black aspect-[9/16] shadow-md">
              <video
                ref={(el) => { refs.current[i] = el; }}
                className="absolute inset-0 h-full w-full object-cover"
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={v.label}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
