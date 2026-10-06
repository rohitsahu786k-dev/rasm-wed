import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import type { Pillar } from '@/data/pillars';
import { otherPillars } from '@/data/pillars';
import { Band, Breadcrumbs, CtaBand, ExploreLinks, Faq, SectionTitle } from '@/components/PageParts';
import { InquiryAnimatedButton } from '@/components/InquiryClient';

/**
 * One layout for every pillar page. Pillars carry no banner image: they are long-form reference pages, so the
 * first thing in the viewport is the H1 and the opening paragraph rather than a hero that pushes text below
 * the fold (and that would become the LCP element on mobile).
 */
export function PillarPage({ pillar }: { pillar: Pillar }) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/blog/' },
    { name: pillar.h1Accent.replace(/^The /, '') },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#FDFCFA] border-b border-gold/20 pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="rasm-container max-w-4xl">
          <Breadcrumbs items={crumbs} />
          <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold mb-3">{pillar.eyebrow}</p>
          <h1 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.14] mb-5">
            {pillar.h1} <span className="gold-gradient-text italic">{pillar.h1Accent}</span>
          </h1>
          <p className="text-charcoal-700 text-base sm:text-lg font-light leading-relaxed">{pillar.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={`Pillar: ${pillar.title}`} icon={<ArrowRight className="w-4 h-4" />}>
              Get a Free Consultation
            </InquiryAnimatedButton>
            <Link
              href="/wedding-destination/"
              className="inline-block px-5 py-3 rounded-full border border-gold/35 text-sm text-charcoal-800 hover:border-gold hover:bg-white transition-colors"
            >
              Browse wedding destinations
            </Link>
          </div>
        </div>
      </section>

      {/* On-page table of contents: helps readers skim a long page and gives Google clear section anchors. */}
      <section className="bg-white border-b border-gold/15 py-10">
        <div className="rasm-container max-w-4xl">
          <h2 className="font-manrope font-medium text-lg text-charcoal-900 tracking-tight mb-4">What this guide covers</h2>
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {pillar.sections.map((s, i) => (
              <li key={s.h2} className="text-[15px] font-light">
                <a href={`#${sectionId(s.h2)}`} className="text-charcoal-700 hover:text-gold-dark transition-colors">
                  <span className="text-gold-dark mr-2 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {s.h2}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {pillar.sections.map((s, i) => (
        <Band key={s.h2} tone={i % 2 === 0 ? 'white' : 'ivory'} id={sectionId(s.h2)}>
          <div className="max-w-4xl">
            <h2 className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-tight leading-snug mb-5">{s.h2}</h2>
            <div className="space-y-4 text-charcoal-700 font-light leading-relaxed text-[15px] sm:text-base">
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            {s.bullets && (
              <ul className="mt-7 grid sm:grid-cols-2 gap-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 rounded-2xl border border-gold/20 bg-white p-4">
                    <Check className="w-4 h-4 text-gold-dark shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sm text-charcoal-700 font-light leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Band>
      ))}

      <Band tone="sand">
        <SectionTitle title="Plan your wedding by" accent="destination" center />
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillar.cities.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block h-full rounded-2xl border border-gold/25 bg-white p-5 text-sm text-charcoal-800 hover:border-gold hover:shadow-[0_8px_30px_rgba(197,160,89,0.1)] transition-all"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="white">
        <SectionTitle title="More guides in this" accent="series" center />
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pillar.guides.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="flex h-full items-start gap-3 rounded-2xl border border-gold/20 bg-[#FDFCFA] p-5 hover:border-gold transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-gold-dark shrink-0 mt-1" aria-hidden="true" />
                <span className="text-sm text-charcoal-700 font-light leading-relaxed">{g.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Faq faqs={pillar.faqs} tone="ivory" title="Frequently asked" accent="questions" />

      <ExploreLinks title="Other planning guides" links={otherPillars(pillar.slug)} />

      <CtaBand
        title="Talk it through with our Udaipur team"
        text="Tell us the city, the rough dates and the guest count you have in mind. We will tell you honestly what is realistic. The first consultation is free."
        context={`Pillar CTA: ${pillar.title}`}
      />
    </div>
  );
}

/** Stable, readable anchor ids so the table of contents and any future deep links keep working. */
export const sectionId = (h2: string) =>
  h2
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
