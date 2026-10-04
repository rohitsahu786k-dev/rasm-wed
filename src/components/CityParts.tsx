import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, ChevronDown, Landmark, MapPin, Plane, TrainFront } from 'lucide-react';
import type { CityProfile } from '@/lib/city';
import type { Destination } from '@/types';
import type { WPPost } from '@/lib/wp';
import { InquiryAnimatedButton } from '@/components/InquiryClient';

export function CityFacts({ city, facts }: { city: string; facts: CityProfile['facts'] }) {
  const cells = [
    { icon: CalendarDays, label: 'Comfortable months', value: facts.bestMonths },
    { icon: Plane, label: 'Nearest airport', value: facts.nearestAirport },
    { icon: TrainFront, label: 'By rail', value: facts.railAccess },
    { icon: Landmark, label: 'Typical settings', value: facts.settings.join(', ') },
  ];
  return (
    <section aria-label={`${city} wedding planning facts`} className="py-12 bg-white border-b border-gold/15">
      <div className="rasm-container max-w-6xl">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cells.map(({ icon: Icon, label, value }) => (
            <li key={label} className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-5">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-ivory-200 mb-3"><Icon className="w-5 h-5 text-gold-dark" /></span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">{label}</p>
              <p className="text-sm text-charcoal-700 font-light leading-relaxed">{value}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-charcoal-600 font-light leading-relaxed">
          <p><strong className="font-medium text-charcoal-900">Known for: </strong>{facts.knownFor.join(' · ')}</p>
          <p><strong className="font-medium text-charcoal-900">Getting there: </strong>{facts.gettingThere}</p>
        </div>
        <p className="mt-4 text-xs text-charcoal-500">Travel options and schedules change; please confirm current routes and availability when booking.</p>
      </div>
    </section>
  );
}

/** Native <details> accordion: works without JavaScript and stays crawlable. */
export function FaqAccordion({ city, faqs }: { city: string; faqs: { q: string; a: string }[] }) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="py-16 bg-[#FDFCFA] border-t border-gold/15">
      <div className="rasm-container"><div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight text-center mb-10">
          {city} Wedding <span className="gold-gradient-text italic">Questions</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group rounded-2xl border border-gold/25 bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-ivory-100 transition-colors">
                <h3 className="font-manrope font-semibold text-base sm:text-lg text-charcoal-900 tracking-tight">{f.q}</h3>
                <ChevronDown className="w-5 h-5 text-gold-dark shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 pt-1 text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div></div>
    </section>
  );
}

export function HowWeHelp({ city, services }: { city: string; services: string[] }) {
  return (
    <section className="py-16 bg-white border-t border-gold/15">
      <div className="rasm-container max-w-5xl text-center">
        <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight mb-3">
          How Rasm Plans Your <span className="gold-gradient-text italic">{city} Wedding</span>
        </h2>
        <p className="text-charcoal-600 font-light max-w-2xl mx-auto mb-8">
          One Udaipur-based team handles planning, vendors and on-ground execution. Packages start from ₹30,00,000 (30 lakh) and depend on scale, venue and customisation.
        </p>
        <ul className="flex flex-wrap justify-center gap-2.5 mb-10">
          {services.map((s) => (
            <li key={s} className="px-4 py-2 rounded-full border border-gold/30 bg-[#FDFCFA] text-sm text-charcoal-700">{s}</li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={`${city} wedding`} icon={<ArrowRight className="w-4 h-4" />}>
            Plan Your {city} Wedding
          </InquiryAnimatedButton>
          <Link href="/services/" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-gold/40 text-sm tracking-[0.18em] uppercase text-charcoal-800 hover:bg-ivory-200 transition-colors">
            View Services &amp; Packages
          </Link>
        </div>
      </div>
    </section>
  );
}

export function NearbyDestinations({ items }: { items: Destination[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="nearby-heading" className="py-16 bg-[#FDFCFA] border-t border-gold/15">
      <div className="rasm-container max-w-6xl">
        <h2 id="nearby-heading" className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight text-center mb-10">
          Explore Nearby <span className="gold-gradient-text italic">Wedding Destinations</span>
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((d) => (
            <li key={d.id}>
              <Link href={`/${d.slug}/`} className="group block h-full rounded-2xl overflow-hidden border border-gold/25 bg-white hover:shadow-lg transition-shadow">
                {d.imageUrl && (
                  <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden">
                    <Image src={d.imageUrl} alt={`Wedding in ${d.title}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-manrope font-medium text-lg text-charcoal-900 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold-dark" />Wedding in {d.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-600 font-light line-clamp-2">{d.tagline}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RelatedGuides({ city, posts }: { city: string; posts: WPPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="guides-heading" className="py-16 bg-white border-t border-gold/15">
      <div className="rasm-container"><div className="mx-auto max-w-4xl">
        <h2 id="guides-heading" className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-tight text-center mb-8">
          Guides for Planning in {city}
        </h2>
        <ul className="grid gap-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/${p.slug}/`} className="group flex items-center justify-between gap-4 rounded-2xl border border-gold/20 p-4 hover:border-gold hover:bg-ivory-100 transition-colors">
                <span className="font-manrope text-base text-charcoal-900">{p.title}</span>
                <ArrowRight className="w-4 h-4 text-gold-dark shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div></div>
    </section>
  );
}
