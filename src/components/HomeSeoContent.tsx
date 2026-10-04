'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { HOME_SEO_CONTENT, HOME_SEO_HEADING, type SeoBlock } from '@/data/home-seo-content';

/** Turns the configured link texts inside a paragraph into real internal links. */
function Linked({ block }: { block: Extract<SeoBlock, { type: 'p' }> }) {
  const links = block.links ?? [];
  if (!links.length) return <>{block.text}</>;
  const parts: React.ReactNode[] = [];
  let rest = block.text;
  links.forEach((l, i) => {
    const at = rest.indexOf(l.text);
    if (at < 0) return;
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push(
      <Link key={i} href={l.href} className="text-gold-dark underline decoration-gold/40 underline-offset-4 hover:text-charcoal-900">
        {l.text}
      </Link>,
    );
    rest = rest.slice(at + l.text.length);
  });
  parts.push(rest);
  return <>{parts}</>;
}

/**
 * Long SEO copy above the footer. The complete text is always in the HTML (crawlable); it is only visually collapsed
 * behind a fade until "Read more" is pressed.
 */
export function HomeSeoContent() {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <section aria-labelledby={`${id}-h`} className="bg-white border-t border-gold/15 py-14 sm:py-20">
      <div className="rasm-container max-w-6xl">
        <h2 id={`${id}-h`} className="font-manrope font-medium text-2xl sm:text-4xl text-charcoal-900 tracking-tight leading-[1.2] mb-8">
          {HOME_SEO_HEADING}
        </h2>

        <div className="relative">
          <div
            id={id}
            className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${open ? 'max-h-[60000px]' : 'max-h-[260px] sm:max-h-[230px]'}`}
          >
            <div className="space-y-4 text-charcoal-600 text-[15px] sm:text-base font-light leading-relaxed">
              {HOME_SEO_CONTENT.map((b, i) => {
                if (b.type === 'h2') return <h3 key={i} className="pt-6 font-manrope font-medium text-xl sm:text-2xl text-charcoal-900 tracking-tight">{b.text}</h3>;
                if (b.type === 'h3') return <h4 key={i} className="pt-2 font-manrope font-medium text-base sm:text-lg text-charcoal-800">{b.text}</h4>;
                if (b.type === 'ul')
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1.5 marker:text-gold">
                      {b.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  );
                return <p key={i}><Linked block={b} /></p>;
              })}
            </div>
          </div>

          {/* White fade over the collapsed text */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent transition-opacity duration-500 ${open ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark hover:text-charcoal-900 transition-colors"
        >
          {open ? 'Read less' : 'Read more'}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </section>
  );
}
