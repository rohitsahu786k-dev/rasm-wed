'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MEDIA_ORIGIN } from '@/lib/site';

/**
 * Homepage video. Autoplays muted and loops (browsers only allow autoplay when muted), plays only while on screen,
 * and respects "reduce motion". Replace the file by setting NEXT_PUBLIC_HOME_VIDEO_URL (any .mp4 URL).
 */
const SRC = process.env.NEXT_PUBLIC_HOME_VIDEO_URL || `${MEDIA_ORIGIN}/wp-content/uploads/2024/11/Rasm-Wedding-Events-.mp4`;

export function HomeVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce) void v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section aria-labelledby="home-video-heading" className="py-14 sm:py-16 bg-[#FDFCFA] border-b border-gold/15">
      <div className="rasm-container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">Watch Our Story</p>
          <h2 id="home-video-heading" className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            See How We Plan <span className="gold-gradient-text italic">Your Wedding</span>
          </h2>
        </div>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/25 bg-black aspect-video shadow-md">
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            src={SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Rasm Weddings & Events wedding planning video"
          />
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
            className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur hover:bg-black/75 transition-colors"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
