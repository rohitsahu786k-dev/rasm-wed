import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, Castle, ClipboardList, Flower2, Gem, Handshake, HeartHandshake, Landmark, Play, Star, Users } from 'lucide-react';
import type { HomeContent } from '@/lib/acf';
import { HOME_IMAGES } from '@/data/home-media';
import { SITE } from '@/lib/site';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">{children}</p>
);

const GoldButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#A88434] via-[#B8923A] to-[#8F6A14] text-white text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group">
    {children}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>
);

const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-900 hover:text-gold-dark transition-colors">
    {children}
    <ArrowRight className="w-4 h-4 text-gold-dark" />
  </Link>
);

/** Four trust points + "Watch Our Story", directly under the hero banner. */
export function HeroFeatures() {
  const items = [
    { icon: Landmark, label: 'Famous Venues' },
    { icon: Gem, label: 'Custom Planning' },
    { icon: Handshake, label: 'End-to-End Support' },
    { icon: Flower2, label: 'Selected Experiences' },
  ];
  return (
    <section aria-label="Why plan your wedding with Rasm" className="bg-[#FDFCFA] border-b border-gold/15">
      <div className="rasm-container py-7 sm:py-9 flex flex-col lg:flex-row items-center justify-between gap-6">
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 w-full lg:w-auto">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="grid place-items-center w-12 h-12 rounded-full border border-gold/40 bg-white text-gold-dark">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <span className="text-xs sm:text-[13px] text-charcoal-700">{label}</span>
            </li>
          ))}
        </ul>
        <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group">
          <span className="grid place-items-center w-14 h-14 rounded-full border border-gold/50 bg-white text-gold-dark transition-colors group-hover:bg-gold group-hover:text-white">
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          </span>
          <span className="text-sm text-charcoal-800">Watch Our Story</span>
        </a>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const cards = [
    { icon: Castle, title: 'Selected Venues', text: 'Handpicked palaces, forts and luxury properties across Udaipur and Rajasthan.' },
    { icon: ClipboardList, title: 'Personalised Planning', text: 'Tailor-made weddings designed around your story, budget and guest list.' },
    { icon: Users, title: 'Trusted Network', text: 'Decorators, caterers, artists and hospitality partners we work with every season.' },
    { icon: HeartHandshake, title: 'Smooth Execution', text: 'A dedicated on-ground team for a stress-free celebration from first call to farewell.' },
  ];
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gold/15">
      <div className="rasm-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15] mb-5">
            Why Careful Couples Choose <span className="gold-gradient-text italic">Rasm</span>, the Wedding Planner in Udaipur
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
            A perfect blend of royal venues, smooth planning and memorable experiences. Whether you are planning a wedding in Udaipur or a destination wedding anywhere in India, Rasm Weddings & Events crafts it for your special day.
          </p>
          <GoldButton href="/services/">About Our Services</GoldButton>
        </div>
        <ul className="grid sm:grid-cols-2 gap-4">
          {cards.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-gold/20 bg-white p-5 shadow-[0_8px_30px_rgba(197,160,89,0.10)]">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-ivory-200 text-gold-dark shrink-0">
                <Icon className="w-5 h-5" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-manrope font-medium text-[15px] text-charcoal-900 mb-1">{title}</h3>
                <p className="text-[13px] text-charcoal-600 font-light leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FeaturedWeddings() {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFCFA] border-b border-gold/15">
      <div className="rasm-container">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <Eyebrow>Featured Wedding Styles</Eyebrow>
            <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight">Wedding Styles We Plan in Udaipur &amp; Rajasthan</h2>
            <p className="mt-2 text-sm text-charcoal-600 font-light">Palace, fort and lakeside settings for your wedding in Udaipur and across Rajasthan.</p>
          </div>
          <div className="hidden sm:block shrink-0"><TextLink href="/gallery/">View Wedding Gallery</TextLink></div>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HOME_IMAGES.weddings.map((w) => (
            <li key={w.src} className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-stone-100 group">
              <Image src={w.src} alt={w.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[11px] sm:text-xs text-white/95">{w.caption}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="sm:hidden mt-6 text-center"><TextLink href="/gallery/">View Wedding Gallery</TextLink></div>
      </div>
    </section>
  );
}

export function ImpactStats({ stats }: { stats: HomeContent['stats'] }) {
  const icons = [CalendarCheck, Star, Landmark, Gem, Users, Flower2];
  return (
    <section aria-label="Rasm Weddings in numbers" className="py-12 sm:py-16 bg-ivory-200 border-b border-gold/15">
      <div className="rasm-container grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
        <div>
          <Eyebrow>Our Impact</Eyebrow>
          <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight">Memories Beyond Numbers</h2>
          <p className="mt-2 text-sm text-charcoal-600 font-light">A journey of trust, celebrations and memorable experiences.</p>
        </div>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.slice(0, 4).map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={s.label} className="text-center">
                <Icon className="w-7 h-7 mx-auto text-gold-dark mb-2" strokeWidth={1.4} />
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-manrope text-3xl sm:text-4xl font-medium text-charcoal-900">{s.value}</dd>
                <p aria-hidden="true" className="mt-1 text-xs text-charcoal-600">{s.label}</p>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function VenueTile({ v, className = '', sizes, priority = false }: { v: (typeof HOME_IMAGES.venues)[number]; className?: string; sizes: string; priority?: boolean }) {
  return (
    <li className={`relative overflow-hidden rounded-2xl bg-stone-100 group ${className}`}>
      <Image src={v.src} alt={v.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute left-3 bottom-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] sm:text-xs text-charcoal-800 shadow-sm">{v.label}</span>
    </li>
  );
}

export function VenuesShowcase() {
  const [big, ...rest] = HOME_IMAGES.venues;
  const top = rest.slice(0, 2);
  const bottom = rest.slice(2, 5);
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gold/15">
      <div className="rasm-container">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <Eyebrow>Famous Venues</Eyebrow>
            <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              The <span className="gold-gradient-text italic">Royal Venues</span> Showcase
            </h2>
            <p className="mt-2 text-sm text-charcoal-600 font-light max-w-xl">Step into a world of classic beauty. Explore palaces, forts and lakefront venues for your wedding in Udaipur and across Rajasthan.</p>
          </div>
          <div className="hidden sm:block shrink-0"><TextLink href="/wedding-destination/">Explore All Venues</TextLink></div>
        </div>

        {/* Desktop bento: one large tile on the left, 2 + 3 tiles on the right */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          <ul className="col-span-2 grid"><VenueTile v={big} className="min-h-[420px]" sizes="40vw" /></ul>
          <div className="col-span-3 grid grid-rows-2 gap-4">
            <ul className="grid grid-cols-2 gap-4">
              {top.map((v) => <VenueTile key={v.src} v={v} className="h-[200px]" sizes="30vw" />)}
            </ul>
            <ul className="grid grid-cols-3 gap-4">
              {bottom.map((v) => <VenueTile key={v.src} v={v} className="h-[200px]" sizes="20vw" />)}
            </ul>
          </div>
        </div>

        {/* Mobile: simple 2-column grid */}
        <ul className="md:hidden grid grid-cols-2 gap-3">
          {HOME_IMAGES.venues.map((v, i) => (
            <VenueTile key={v.src} v={v} className={i === 0 ? 'col-span-2 h-[220px]' : 'h-[150px]'} sizes="50vw" />
          ))}
        </ul>
        <div className="sm:hidden mt-6 text-center"><TextLink href="/wedding-destination/">Explore All Venues</TextLink></div>
      </div>
    </section>
  );
}

export function CuratedExperiences() {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFCFA] border-b border-gold/15">
      <div className="rasm-container grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-14 items-center">
        <div>
          <Eyebrow>More Than a Wedding</Eyebrow>
          <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-[1.2] mb-4">
            Selected Experiences <span className="gold-gradient-text italic">for Every Celebration</span>
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-7">
            From traditional ceremonies to modern celebrations, our wedding decorators, caterers and entertainers create experiences that are uniquely yours.
          </p>
          <GoldButton href="/services/">Explore Experiences</GoldButton>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HOME_IMAGES.experiences.map((e) => (
            <li key={e.src} className="rounded-2xl overflow-hidden bg-white border border-gold/15 shadow-[0_8px_30px_rgba(197,160,89,0.10)]">
              <div className="relative aspect-[3/4]">
                <Image src={e.src} alt={e.alt} fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-cover" />
              </div>
              <p className="px-3 py-3 text-xs sm:text-[13px] text-charcoal-800 text-center">{e.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function InstagramStrip() {
  return (
    <section className="py-14 sm:py-16 bg-white border-b border-gold/15">
      <div className="rasm-container">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <Eyebrow>Follow Our Journey</Eyebrow>
            <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight">On Instagram</h2>
            <p className="mt-1 text-sm text-charcoal-600 font-light">Real weddings, behind the scenes and moments of joy.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline text-sm text-charcoal-700">@rasmwed</span>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2 text-sm text-charcoal-900 hover:bg-ivory-200 transition-colors">
              Follow Us <ArrowRight className="w-4 h-4 text-gold-dark" />
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {HOME_IMAGES.instagram.map((p, i) => (
            <li key={p.src} className={`relative aspect-square overflow-hidden rounded-xl bg-stone-100 ${i > 5 ? 'hidden lg:block' : ''}`}>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Open Rasm Weddings on Instagram">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 14vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
