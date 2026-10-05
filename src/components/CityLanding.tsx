import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  Landmark,
  MapPin,
  MessageCircle,
  Music,
  Phone,
  Plane,
  ShieldCheck,
  Flower2,
  Train,
  UtensilsCrossed,
} from 'lucide-react';
import type { WPPage, WPPost } from '@/lib/wp';
import type { Destination } from '@/types';
import { InquiryAnimatedButton } from '@/components/InquiryClient';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand, ExploreLinks, Facts } from '@/components/PageParts';
import { NearbyDestinations, RelatedGuides } from '@/components/CityParts';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { FACTS } from '@/data/pages-content';
import { SITE, WP_ORIGIN } from '@/lib/site';
import { getDestinationData } from '@/data/city-destinations';

interface CityLandingProps {
  page: WPPage;
  nearby: Destination[];
  posts: WPPost[];
  services: string[];
}

export function CityLanding({ page, nearby, posts }: CityLandingProps) {
  const data = getDestinationData(page.slug);
  const city = data.city;
  const path = `/${page.slug}/`;

  return (
    <div className="bg-white min-h-screen text-charcoal-900 selection:bg-gold selection:text-white">
      {/* Schema Markup for SEO */}
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Wedding Destinations', path: '/wedding-destination/' },
            { name: `Wedding Planner in ${city}`, path },
          ]),
          serviceSchema({
            name: `${data.primaryKeyword} - RASM Weddings & Events`,
            description: data.leadCopy,
            area: `${city}, ${data.stateOrRegion}, India`,
            path,
          }),
          faqSchema(data.faqs.map((f) => ({ q: f.q, a: f.a }))),
          {
            '@context': 'https://schema.org',
            '@type': 'Place',
            name: `${city}, ${data.stateOrRegion}`,
            description: `Destination wedding location in ${city}, famous for luxury palaces and resorts.`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: city,
              addressRegion: data.stateOrRegion,
              addressCountry: 'IN',
            },
          },
        ]}
      />

      {/* -------------------- 1. RESPONSIVE VISUAL BANNER (NO TEXT ON IMAGE) -------------------- */}
      {/* Desktop: 21:9 Aspect Ratio | Mobile: 1:1 Square Aspect Ratio */}
      <div className="w-[calc(100%-20px)] md:w-[90%] mx-auto mt-4 sm:mt-6 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-stone-100 border border-gold/20 shadow-xs">
        {/* Desktop Container: 21:9 Ratio */}
        <div className="hidden md:block relative w-full aspect-[21/9] max-h-[640px]">
          <Image
            src={page.desktopBanner || data.heroImage}
            alt={page.bannerAlt || data.heroAlt}
            fill
            priority
            sizes="(min-width: 768px) 90vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Container: 1:1 Square Ratio */}
        <div className="block md:hidden relative w-full aspect-square">
          <Image
            src={page.mobileBanner || page.desktopBanner || data.heroImage}
            alt={page.bannerAlt || data.heroAlt}
            fill
            priority
            sizes="(min-width: 768px) 90vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* -------------------- 2. CONTENT SECTION (STARTS CLEANLY BELOW BANNER) -------------------- */}
      <section className="relative w-full bg-[#FDFCFA] border-b border-gold/20 py-10 sm:py-16">
        <div className="rasm-container">
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs text-charcoal-500 mb-5">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-charcoal-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/wedding-destination/" className="hover:text-charcoal-900 transition-colors">
                    Wedding Destinations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-charcoal-800 font-medium">
                  {city}
                </li>
              </ol>
            </nav>

            {/* Keyword-Rich Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold mb-4 shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-gold-dark" />
              <span>{data.eyebrow}</span>
            </div>

            {/* Main H1 with Core SEO Keywords */}
            <h1 className="font-manrope font-medium text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12] mb-5">
              {data.h1Title} <span className="gold-gradient-text italic">{data.h1Accent}</span>
            </h1>

            {/* Authoritative, Keyword-Rich Lead Paragraph */}
            <p className="text-charcoal-700 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-3xl">
              {data.leadCopy}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <InquiryAnimatedButton
                variant="gold-shimmer"
                size="lg"
                context={`${city} Hero Wedding Planner Inquiry`}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Plan Your {city} Wedding
              </InquiryAnimatedButton>

              <a
                href="#venues"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gold/60 bg-white hover:bg-gold/5 text-sm font-medium text-charcoal-900 shadow-xs hover:border-gold transition-all"
              >
                Explore {city} Venues
              </a>

              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  `Hello Rasm Weddings! I am inquiring about planning a luxury wedding in ${city}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-emerald-600/30 bg-emerald-50/80 hover:bg-emerald-50 text-xs sm:text-sm font-medium text-emerald-800 transition-colors shadow-xs"
                title="Chat with our Wedding Planning team on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-gold/25 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-charcoal-700 font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>500+ Luxury Weddings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Udaipur Headquartered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Zero Vendor Markups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>White-Glove NRI Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 2. AT A GLANCE: STATS -------------------- */}
      <section aria-label="Rasm Weddings at a glance" className="bg-white border-b border-gold/15 py-10">
        <div className="rasm-container max-w-5xl">
          <Facts items={FACTS} />
        </div>
      </section>

      {/* -------------------- 3. DESTINATION ESSENTIALS & LOGISTICS -------------------- */}
      <section aria-label={`${city} destination wedding essentials`} className="py-16 sm:py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-2">
              {city} Wedding Insights
            </p>
            <h2 className="font-manrope font-medium text-2xl sm:text-4xl text-charcoal-900 tracking-tight leading-[1.2]">
              Why Choose {city} for Your <span className="gold-gradient-text italic">Destination Wedding?</span>
            </h2>
            <p className="mt-3 text-charcoal-600 font-light text-base leading-relaxed">
              Every destination carries its own distinct magic. From royal palace architecture and lush botanical gardens to
              picturesque lake and coastal horizons, {city} offers a memorable setting for your celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <Calendar className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Prime Wedding Season
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Ideal Climate Window
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                {data.facts.bestMonths}
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <Plane className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Airport &amp; Flights
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Flight Connectivity
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                {data.facts.nearestAirport}
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <Train className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Rail &amp; Highway Access
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Ground Transit
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                {data.facts.railAccess}
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <UtensilsCrossed className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Culinary Heritage
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Regional Dawat
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                {data.facts.culinary}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/20 bg-ivory-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-gold/15 text-gold-dark shrink-0">
                <Compass className="w-5 h-5" />
              </span>
              <p className="text-xs sm:text-sm text-charcoal-700 font-light">
                <strong className="font-semibold text-charcoal-900">Famous Landmarks:</strong> {data.facts.landmarks}
              </p>
            </div>
            <InquiryAnimatedButton variant="gold-shimmer" size="sm" context={`${city} Venue Consultation Call`}>
              Get Custom Venue Proposal
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>

      {/* -------------------- 4. DETAILED VENUES SHOWCASE WITH COSTS & HIGHLIGHTS -------------------- */}
      <section id="venues" className="py-20 bg-white border-b border-gold/15 scroll-mt-24">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Selected Palace &amp; Resort Portfolio
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Best Wedding Venues in <span className="gold-gradient-text italic">{city}</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Explore {city}&apos;s most prestigious palaces, heritage havelis, and luxury resorts. We inspect venues in person,
              verify auspicious dates, negotiate direct rates, and manage trust clearances.
            </p>
          </div>

          <div className="space-y-12">
            {data.venues.map((v, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={v.id}
                  id={v.id}
                  className="rounded-3xl border border-gold/25 bg-[#FDFCFA] overflow-hidden shadow-[0_8px_30px_rgba(197,160,89,0.08)] hover:border-gold/50 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    <div
                      className={`relative min-h-[300px] sm:min-h-[380px] lg:min-h-full lg:col-span-5 bg-stone-100 ${
                        flip ? 'lg:order-2' : ''
                      }`}
                    >
                      <Image
                        src={v.image}
                        alt={`${v.name} - Destination wedding venue in ${city}`}
                        fill
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 rounded-full bg-charcoal-900/85 text-gold-light text-xs font-medium backdrop-blur-xs tracking-wide border border-gold/30">
                          {v.category}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between ${flip ? 'lg:order-1' : ''}`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <p className="text-xs uppercase tracking-[0.2em] font-medium text-gold-dark">
                            Venue 0{i + 1} of 0{data.venues.length}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-600 bg-ivory-200 px-3 py-1 rounded-full border border-gold/20">
                            <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                            {city}, {data.stateOrRegion}
                          </span>
                        </div>

                        <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-tight mb-1">
                          {v.name}
                        </h3>
                        <p className="text-sm font-medium gold-gradient-text italic mb-4">{v.tagline}</p>

                        <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                          {v.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal-900 mb-3">
                            Key Venue Highlights &amp; Inclusions:
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-charcoal-700 font-light">
                            {v.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-charcoal-500 font-light">
                            Capacity &amp; Estimated Budget:
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-charcoal-900">
                            {v.capacity} · <span className="text-gold-dark font-medium">{v.costRange}</span>
                          </p>
                        </div>
                        <InquiryAnimatedButton
                          variant="gold-shimmer"
                          size="sm"
                          context={`Inquire about ${v.name}`}
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Check Availability &amp; Rates
                        </InquiryAnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- 5. SIGNATURE WEDDING ITINERARY -------------------- */}
      <section className="py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              The Celebration Roadmap
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              The 3-Day Signature <span className="gold-gradient-text italic">{city} Wedding Itinerary</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Selected by RASM Weddings to balance royal ceremonial beauty, joyful guest hospitality, and effortless timing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {data.itinerary.map((day) => (
              <div
                key={day.day}
                className="rounded-3xl border border-gold/25 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(197,160,89,0.06)] hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold-dark font-manrope font-semibold text-xs tracking-wider uppercase mb-3">
                    {day.day}
                  </div>
                  <h3 className="font-manrope font-medium text-xl sm:text-2xl text-charcoal-900 tracking-tight mb-1">
                    {day.theme}
                  </h3>
                  <p className="text-xs text-gold-dark italic font-light mb-6">{day.sub}</p>

                  <div className="space-y-5">
                    {day.events.map((ev) => (
                      <div key={ev.title} className="relative pl-6 border-l border-gold/30">
                        <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-gold" />
                        <span className="text-[11px] font-medium text-gold-dark block tracking-wider uppercase">
                          {ev.time}
                        </span>
                        <h4 className="font-manrope font-semibold text-sm sm:text-base text-charcoal-900 mt-0.5">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-charcoal-600 font-light leading-relaxed mt-1">{ev.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gold/20 text-center">
                  <InquiryAnimatedButton
                    variant="gold-shimmer"
                    size="sm"
                    context={`Customise ${day.day} Itinerary for ${city}`}
                  >
                    Customise Your Timeline
                  </InquiryAnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 6. OPERATIONAL PILLARS OF RASM -------------------- */}
      <section className="py-20 bg-white border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Flawless On-Ground Execution
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              How RASM Coordinates Your <span className="gold-gradient-text italic">{city} Wedding</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              We act as your dedicated on-ground architects, designers, contract negotiators, and family concierges—so
              you and your loved ones can focus entirely on celebrating.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                  <Landmark className="w-6 h-6" />
                </span>
                <span className="font-manrope text-sm font-semibold gold-gradient-text">01</span>
              </div>
              <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                Venue Bookings &amp; Trust Liaison
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Direct negotiation with venue owners and heritage trusts. We secure prime dates, ASI heritage clearances, and private venue buyouts at net negotiated rates.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                  <Flower2 className="w-6 h-6" />
                </span>
                <span className="font-manrope text-sm font-semibold gold-gradient-text">02</span>
              </div>
              <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                Custom Royal Decor &amp; Production
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Custom 3D-designed floral mandaps, handcrafted brass installations, vintage crystal chandeliers, and precision lighting tailored to the setting.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                  <Plane className="w-6 h-6" />
                </span>
                <span className="font-manrope text-sm font-semibold gold-gradient-text">03</span>
              </div>
              <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                Airport Fleet &amp; VIP Guest Logistics
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Smooth arrivals at airports and railway stations. Luxury AC coaches, vintage Baraat convertibles, luggage coordination, and 24/7 dedicated hotel help desks.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                  <UtensilsCrossed className="w-6 h-6" />
                </span>
                <span className="font-manrope text-sm font-semibold gold-gradient-text">04</span>
              </div>
              <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                Royal Culinary Curation &amp; Menus
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Selected regional banquet menus alongside high-end international culinary stations, with strict adherence to Jain, vegetarian, vegan, and global dietary preferences.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                  <Music className="w-6 h-6" />
                </span>
                <span className="font-manrope text-sm font-semibold gold-gradient-text">05</span>
              </div>
              <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                Folk Maestros &amp; Celebrity Artists
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Direct booking of acclaimed folk troupes, desert fire dancers, celebrity wedding anchors, Bollywood choreographers, and high-energy club DJs.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <span className="font-manrope text-sm font-semibold gold-gradient-text">06</span>
              </div>
              <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                Zero Vendor Markups &amp; Transparency
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Every vendor contract and hotel bill is transparent, signed directly with vendors at wholesale rates. Detailed itemized budgets with zero hidden kickbacks.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/60 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-charcoal-900 hover:bg-gold/10 transition-colors"
            >
              <span>Explore All 9 Wedding Planning Services</span>
              <ArrowRight className="w-4 h-4 text-gold-dark" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------- 7. BUDGET & PACKAGES GUIDE -------------------- */}
      <section className="py-20 bg-gradient-to-b from-[#FDFCFA] to-white border-b border-gold/15">
        <div className="rasm-container max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Cost Transparency
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              {city} Wedding Cost &amp; <span className="gold-gradient-text italic">Budget Guide</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              We provide clear, honest financial projections from our very first consultation. Here is a realistic overview of
              estimated total wedding budgets across {city}&apos;s venue tiers, including rooms, catering, decor, and full planning.
            </p>
          </div>

          <div className="space-y-5 mb-10">
            {data.budgetTiers.map((b) => (
              <div
                key={b.category}
                className="rounded-2xl border border-gold/25 bg-white p-6 sm:p-7 shadow-xs hover:border-gold/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <h3 className="font-manrope font-semibold text-lg sm:text-xl text-charcoal-900">
                      {b.category}
                    </h3>
                  </div>
                  <p className="text-xs text-charcoal-500 font-light mb-2">
                    <strong className="text-charcoal-700">Venues:</strong> {b.venues}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                    {b.highlight}
                  </p>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="text-[11px] uppercase tracking-wider text-gold-dark font-medium block">
                    Estimated Total Budget ({b.guests})
                  </span>
                  <span className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 gold-gradient-text block mt-0.5">
                    {b.range}
                  </span>
                  <span className="text-[11px] text-charcoal-400 font-light">Subject to dates &amp; custom scale</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gold/30 bg-ivory-100 p-6 text-center">
            <p className="text-sm text-charcoal-700 font-light max-w-2xl mx-auto mb-4">
              RASM’s turnkey destination wedding planning packages start from{' '}
              <strong className="font-semibold text-charcoal-900">₹30,00,000 (30 Lakhs)</strong>.
              All supplier and hotel contracts are signed directly with the vendors at negotiated net rates with zero commission markup.
            </p>
            <InquiryAnimatedButton variant="gold-shimmer" size="md" context={`${city} Custom Budget Proposal`}>
              Request a Tailored Written Estimate
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>

      {/* -------------------- 8. SELECTED PHOTO GALLERY: REAL INSPIRATION -------------------- */}
      <section className="py-20 bg-white border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Visual Beauty
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              {city} Weddings &amp; <span className="gold-gradient-text italic">Decor Inspiration</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Explore custom floral mandaps, illuminated evening galas, royal processions, and banquet settings designed by RASM.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src={`${WP_ORIGIN}/wp-content/uploads/2026/10/golden_palace_wedding_mandap_at_sunset.webp`}
                alt={`Floral royal mandap setup for wedding in ${city}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Sunset Pheras</p>
                <h3 className="text-white text-base font-medium font-manrope">Floral Royal Mandap</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src={`${WP_ORIGIN}/wp-content/uploads/2026/10/royal_blue_fort_wedding_at_night.webp`}
                alt={`Illuminated evening gala for wedding in ${city}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Evening Gala</p>
                <h3 className="text-white text-base font-medium font-manrope">Illuminated Sangeet Night</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src={`${WP_ORIGIN}/wp-content/uploads/2026/10/royal_baraat_at_golden_hour.webp`}
                alt={`Royal Baraat procession in ${city}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">The Baraat</p>
                <h3 className="text-white text-base font-medium font-manrope">Royal Rajputana Procession</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src={`${WP_ORIGIN}/wp-content/uploads/2026/10/opulent_palace_courtyard_at_dusk.webp`}
                alt={`Heritage courtyard baithak in ${city}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Heritage Architecture</p>
                <h3 className="text-white text-base font-medium font-manrope">Courtyard Sufi Baithak</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src={`${WP_ORIGIN}/wp-content/uploads/2026/10/palace_wedding_under_blooming_chandeliers.webp`}
                alt={`Beautiful chandeliers and blooms for wedding in ${city}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Grand Banquet</p>
                <h3 className="text-white text-base font-medium font-manrope">Canopy of Chandeliers &amp; Blooms</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src={`${WP_ORIGIN}/wp-content/uploads/2026/10/glamorous_indian_wedding_dance_performance.webp`}
                alt={`Glamorous Sangeet entertainment performance in ${city}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Entertainment</p>
                <h3 className="text-white text-base font-medium font-manrope">Celebrity Sangeet Stage</h3>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/gallery/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/50 bg-[#FDFCFA] text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-charcoal-800 hover:bg-gold/10 transition-colors"
            >
              <span>View Full Wedding Gallery</span>
              <ArrowRight className="w-4 h-4 text-gold-dark" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------- 9. WHY CHOOSE RASM FOR THIS DESTINATION -------------------- */}
      <section className="py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              The RASM Advantage
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Why Couples Trust Us for <span className="gold-gradient-text italic">{city}</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Destination weddings require deep regional relationships, logistical precision, and the highest standards of five-star luxury hospitality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">01</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                Rajasthan Regional Roots &amp; Trust Access
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Operating with headquarters in Udaipur and veteran operational crews stationed across Rajasthan,
                we hold longstanding relationships with palace custodians, luxury hoteliers, and local civic authorities.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">02</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                100% Direct Vendor Contracts &amp; Zero Markups
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                We practice total financial integrity. Every hotel booking, sound contract, and floral invoice is billed directly
                at wholesale rates with zero agency markups or hidden supplier commissions.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">03</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                Custom NRI &amp; International Couple Planning
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Over 60% of our couples reside abroad in the UK, USA, UAE, and Canada. We coordinate across time zones with
                interactive 3D design walk-throughs, digital menu planning, guest arrival portals, and bilingual airport escorts.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">04</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                Rigorous Production Safety &amp; Flawless Timing
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                From historical stone courtyards to open lawns and beach horizons, our technical crews manage strict sound calibration,
                power load backups, and weather-proof installations with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 10. FAQS ACCORDION (WITH FAQPAGE SCHEMA) -------------------- */}
      <section id="faqs" className="py-20 bg-white border-b border-gold/15 scroll-mt-24">
        <div className="rasm-container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Clear Answers
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Frequently Asked <span className="gold-gradient-text italic">Questions</span>
            </h2>
            <p className="mt-3 text-charcoal-600 font-light text-base leading-relaxed">
              Everything couples and families need to know when planning a luxury destination wedding in {city}.
            </p>
          </div>

          <div className="space-y-3.5">
            {data.faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-2xl border border-gold/25 bg-[#FDFCFA] overflow-hidden transition-all duration-200"
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-ivory-100 transition-colors">
                  <h3 className="font-manrope font-semibold text-base sm:text-lg text-charcoal-900 tracking-tight text-left">
                    {f.q}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gold-dark shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-charcoal-600 font-light leading-relaxed border-t border-gold/15">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 11. EMBEDDED INQUIRY & CONSULTATION BLOCK -------------------- */}
      <section className="py-20 bg-ivory-200 border-b border-gold/15">
        <div className="rasm-container max-w-4xl text-center">
          <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
            Begin Your Royal Journey
          </p>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2] mb-4">
            Plan Your Dream <span className="gold-gradient-text italic">{city} Wedding</span>
          </h2>
          <p className="text-charcoal-600 font-light text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Share your tentative wedding dates, guest count, and vision. Our senior planning team will prepare a custom
            venue shortlist, date availability audit, and itemized written budget estimate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <InquiryAnimatedButton
              variant="gold-shimmer"
              size="lg"
              context={`${city} Dedicated Consultation Inquiry`}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request Free Consultation
            </InquiryAnimatedButton>

            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                `Hello Rasm Weddings! I am inquiring about planning a luxury wedding in ${city}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-emerald-600/30 bg-white hover:bg-emerald-50 text-sm font-medium text-emerald-800 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp ({SITE.phone})</span>
            </a>

            <a
              href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-gold/40 bg-white hover:bg-ivory-100 text-sm font-medium text-charcoal-800 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-gold-dark" />
              <span>Call Our Planners</span>
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-gold/25 bg-white inline-block text-left text-xs sm:text-sm text-charcoal-600 font-light space-y-1 shadow-2xs">
            <p>
              <strong className="text-charcoal-900 font-medium">Headquarters:</strong> {SITE.address}
            </p>
            <p>
              <strong className="text-charcoal-900 font-medium">Direct Inquiries:</strong> {SITE.email} · {SITE.phone}
            </p>
          </div>
        </div>
      </section>

      {/* -------------------- 12. NEARBY DESTINATIONS & RELATED GUIDES -------------------- */}
      <NearbyDestinations items={nearby} />
      <RelatedGuides city={city} posts={posts} />

      {/* -------------------- 13. EXPLORE LINKS & CLOSING CTA -------------------- */}
      <ExploreLinks
        title="Explore More Royal Wedding Destinations with RASM"
        links={[
          { label: 'Wedding Planning Services', href: '/services/' },
          { label: 'Wedding Decoration & Mandaps', href: '/traditional-decoration/' },
          { label: 'Udaipur Palace Weddings', href: '/wedding-planner-in-udaipur/' },
          { label: 'Jaipur Fort Weddings', href: '/wedding-planner-in-jaipur/' },
          { label: 'Jodhpur Palaces & Forts', href: '/wedding-planner-in-jodhpur/' },
          { label: 'Jaisalmer Desert Dunes', href: '/wedding-planner-in-jaisalmer/' },
          { label: 'Goa Beachfront Weddings', href: '/wedding-planner-in-goa/' },
          { label: 'All 12 Wedding Destinations', href: '/wedding-destination/' },
          { label: 'Wedding Portfolio & Gallery', href: '/gallery/' },
          { label: 'About Rasm Weddings', href: '/about-us/' },
          { label: 'Contact Our Planners', href: '/contact-us/' },
        ]}
      />

      <CtaBand
        title={`Ready to explore royal venues in ${city}?`}
        text="Speak directly with our destination wedding architects. We will inspect venues, verify dates, and present a crystal-clear planning roadmap."
        context={`${city} wedding closing band`}
      />
    </div>
  );
}
