'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Crown, Sparkles, X } from 'lucide-react';
import type { MediaItem } from '@/types';

interface Props {
  media: MediaItem[];
}

/**
 * Photo gallery fed by the WordPress media library (real photographs only, no invented captions or locations).
 * Masonry layout keeps every photo uncropped; the lightbox supports keyboard navigation.
 */
export const RealWeddingsGallery: React.FC<Props> = ({ media }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState(24);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % media.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + media.length) % media.length));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, media.length]);

  const current = open === null ? null : media[open];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="rasm-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-200 border border-gold/35 mb-3">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] font-medium uppercase tracking-normal gold-gradient-text">Wedding Gallery</span>
          </div>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
            Moments from <span className="gold-gradient-text italic">Rasm Celebrations</span>
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
          {media.slice(0, visible).map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-stone-100 border border-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={m.sourceUrl}
                alt={m.altText}
                width={m.width ?? 1080}
                height={m.height ?? 810}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
            </button>
          ))}
        </div>

        {visible < media.length && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 24)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F1012] text-white text-sm font-medium hover:bg-black transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#E2C785]" />
              <span>Show more photos</span>
            </button>
          </div>
        )}
      </div>

      {current && (
        <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <button type="button" onClick={() => setOpen(null)} className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open! - 1 + media.length) % media.length); }} className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous photo">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <Image src={current.sourceUrl} alt={current.altText} width={current.width ?? 1600} height={current.height ?? 1200} sizes="100vw" className="max-h-[88vh] w-auto max-w-full object-contain rounded-xl" onClick={(e) => e.stopPropagation()} priority />
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open! + 1) % media.length); }} className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next photo">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
