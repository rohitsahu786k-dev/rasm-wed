import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';
import type { Destination } from '@/types';
import { PackagesBlock } from '@/components/PackagesBlock';
import { InquiryAnimatedButton } from '@/components/InquiryClient';

const Hero = ({ eyebrow, title, accent, lead }: { eyebrow: string; title: string; accent: string; lead: string }) => (
  <section className="pt-32 pb-14 bg-[#FDFCFA] border-b border-gold/20 text-center">
    <div className="rasm-container max-w-4xl">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-200 border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.28em] font-medium mb-6">
        <Crown className="w-3.5 h-3.5" />
        <span>{eyebrow}</span>
      </div>
      <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 tracking-tight leading-[1.2] mb-5">
        {title} <span className="gold-gradient-text italic">{accent}</span>
      </h1>
      <p className="text-charcoal-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">{lead}</p>
    </div>
  </section>
);

export function ServicesGrid({ services, headingAs: H = 'h2' }: { services: { title: string; image?: string }[]; headingAs?: 'h2' | 'h3' }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((s, i) => (
        <li key={s.title} className="rounded-3xl overflow-hidden border border-gold/25 bg-white shadow-2xs">
          {s.image && (
            <div className="relative aspect-[3/2] bg-stone-100">
              <Image src={s.image} alt={`${s.title} by Rasm Weddings & Events`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" priority={i < 3} />
            </div>
          )}
          <H className="p-5 font-manrope font-medium text-lg text-charcoal-900 tracking-tight">{s.title}</H>
        </li>
      ))}
    </ul>
  );
}

/** Facts the business publishes about itself on rasmwed.com (no invented claims). */
export function WhyRasm() {
  const facts = [
    { big: '500+', small: 'successful events planned' },
    { big: '10+', small: 'years in wedding & event planning' },
    { big: '9', small: 'planning services under one roof' },
    { big: '12', small: 'wedding destinations covered' },
  ];
  return (
    <section className="py-16 bg-white border-b border-gold/15">
      <div className="rasm-container max-w-5xl text-center">
        <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight mb-3">
          Udaipur&apos;s <span className="gold-gradient-text italic">Wedding Planning Team</span>
        </h2>
        <p className="text-charcoal-600 font-light max-w-2xl mx-auto mb-10">
          Rasm Weddings &amp; Events plans weddings and events from its Udaipur office, with special room rates for wedding groups at partner hotels.
        </p>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((f) => (
            <div key={f.small} className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6">
              <dt className="font-manrope text-4xl font-medium gold-gradient-text">{f.big}</dt>
              <dd className="mt-1 text-sm text-charcoal-600 font-light">{f.small}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** /services/ : the 9 planning services from WordPress + the published package details. */
export function ServicesPage({ services }: { services: { title: string; image?: string }[] }) {
  return (
    <div className="bg-white min-h-screen">
      <Hero eyebrow="What We Do" title="Wedding Planning" accent="Services" lead="From venue selection to on-ground execution, Rasm Weddings & Events manages every part of your celebration." />
      <section className="py-16">
        <div className="rasm-container max-w-6xl">
          <ServicesGrid services={services} />
        </div>
      </section>
      <PackagesBlock headingAs="h2" />
    </div>
  );
}

/** /wedding-destination/ : one card per real destination page. */
export function DestinationsPage({ destinations }: { destinations: Destination[] }) {
  return (
    <div className="bg-white min-h-screen">
      <Hero eyebrow="Wedding Destinations" title="Popular Wedding Destinations" accent="in Rajasthan & Beyond" lead="Choose a destination and explore how Rasm Weddings & Events plans weddings there." />
      <section className="py-16">
        <div className="rasm-container max-w-6xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d, i) => (
              <li key={d.id}>
                <Link href={`/${d.slug}/`} className="group block h-full rounded-3xl overflow-hidden border border-gold/25 bg-white shadow-2xs hover:shadow-xl transition-shadow">
                  {d.imageUrl && (
                    <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden">
                      <Image src={d.imageUrl} alt={`Wedding in ${d.title}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={i < 3} />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight mb-2">Wedding in {d.title}</h2>
                    <p className="text-charcoal-600 text-sm font-light leading-relaxed mb-4">{d.tagline}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-gold-dark">
                      Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <InquiryAnimatedButton variant="gold-shimmer" size="lg" context="Destination wedding enquiry">
              Plan Your Destination Wedding
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>
      <PackagesBlock headingAs="h2" />
    </div>
  );
}
