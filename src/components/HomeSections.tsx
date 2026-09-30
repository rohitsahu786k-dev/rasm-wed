import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HomeContent } from '@/lib/acf';
import type { GalleryItem } from '@/lib/media';

export function TrustBar({ stats }: { stats: HomeContent['stats'] }) {
  return (
    <section aria-label="Rasm Weddings at a glance" className="relative z-10 -mt-px bg-white border-b border-gold/20">
      <dl className="rasm-container grid grid-cols-2 lg:flex lg:justify-between gap-y-6 py-8 lg:py-10">
        {stats.map((s, i) => (
          <div key={s.label} className={`text-center lg:flex-1 ${i > 0 ? 'lg:border-l lg:border-gold/25' : ''}`}>
            <dt className="font-manrope text-3xl sm:text-4xl font-medium gold-gradient-text">{s.value}</dt>
            <dd className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-charcoal-600">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function AboutIntro({ intro }: { intro: HomeContent['intro'] }) {
  const paragraphs = intro.text.split(/\n{1,}/).filter(Boolean);
  return (
    <section className="py-20 sm:py-28 bg-[#FDFCFA] border-b border-gold/15">
      <div className={`rasm-container grid gap-12 items-center ${intro.image ? 'lg:grid-cols-2' : 'max-w-3xl text-center'}`}>
        <div>
          {intro.eyebrow && <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-4">{intro.eyebrow}</p>}
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15] mb-6">{intro.heading}</h2>
          <div className="space-y-4 text-charcoal-600 text-base sm:text-lg font-light leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {intro.buttonLabel && intro.buttonHref && (
            <Link href={intro.buttonHref} className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0F1012] text-white text-sm font-medium hover:bg-black transition-colors group">
              {intro.buttonLabel}
              <ArrowRight className="w-4 h-4 text-[#E2C785] transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        {intro.image && (
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/30 -z-10 translate-x-3 translate-y-3" aria-hidden="true" />
            <Image src={intro.image.url} alt={intro.image.alt ?? intro.heading} width={intro.image.width} height={intro.image.height} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-auto rounded-[2rem] shadow-[0_24px_60px_rgba(15,16,18,0.18)]" />
          </div>
        )}
      </div>
    </section>
  );
}

/** Light-weight gallery teaser (server-rendered, no lightbox JS); the full gallery lives on /gallery/. */
export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  const pics = items.slice(0, 7);
  if (pics.length < 4) return null;
  const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:row-span-2', '', 'md:col-span-2', ''];
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gold/15">
      <div className="rasm-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">Gallery</p>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15]">
            Moments from <span className="gold-gradient-text italic">Rasm Celebrations</span>
          </h2>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {pics.map((m, i) => (
            <li key={m.id} className={`relative overflow-hidden rounded-2xl bg-stone-100 ${spans[i]}`}>
              <Image src={m.sourceUrl} alt={m.altText} fill sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} className="object-cover" />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link href="/gallery/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/50 text-sm font-medium text-charcoal-900 hover:bg-ivory-200 transition-colors group">
            View Full Gallery
            <ArrowRight className="w-4 h-4 text-gold-dark transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
