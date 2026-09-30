import { InquiryAnimatedButton, InquiryButton } from '@/components/InquiryClient';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Sparkles, MapPin, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Heart, Crown, Clock, Plane, Compass, MessageCircle, Building2, ChevronDown } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { settings } from '@/data/settings';
import { CITY_DATABASE } from '@/data/cities';

export const CityPageView: React.FC<{ cityKey: string }> = ({ cityKey }) => {
  const data = CITY_DATABASE[cityKey] ?? CITY_DATABASE.udaipur;

  return (
    <div className="bg-white min-h-screen text-charcoal-900">
      {/* 1. Grand City Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-36 pb-20 bg-[#FDFCFA] border-b border-gold/20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage}
            alt={data.city}
            className="w-full h-full object-cover opacity-25"
           width={1600} height={900} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        <div className="rasm-container text-center relative z-10 w-full">
          {/* Official Royal Seal Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-200 border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.28em] font-medium mb-6 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-gold-dark" />
            <span>Royal Destination Blueprint · {data.city}</span>
          </div>

          <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal-900 tracking-tight mb-6 leading-[1.2]">
            Luxury Destination Wedding Planner in <br />
            <span className="gold-gradient-text italic font-normal">{data.city}</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-charcoal-600 font-light leading-relaxed mb-10">
            {data.tagline}. Curated by Rasm Wedding & Events with direct palatial partnerships, white-glove hospitality, and generational royal Mewari feasts.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gold/25 shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-medium block">
                Ideal Season
              </span>
              <span className="font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold mt-1 block">
                {data.season.split('(')[0]}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gold/25 shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-medium block">
                Palace Access
              </span>
              <span className="font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold mt-1 block">
                Direct GM Holds
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gold/25 shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-medium block">
                NRI Concierge
              </span>
              <span className="font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold mt-1 block">
                24/7 Global Desk
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gold/25 shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-medium block">
                Celebration Scale
              </span>
              <span className="font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold mt-1 block">
                Bespoke & Private
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <InquiryAnimatedButton
              variant="gold-shimmer"
              size="lg"
               context={`${data.city}, ${data.state}`}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Plan Your {data.city} Wedding
            </InquiryAnimatedButton>

            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello Rasm, I am planning a luxury destination wedding in ${data.city} and would like to discuss venues and dates.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-emerald-600/30 text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 text-xs uppercase tracking-wider font-semibold shadow-2xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Destination Overview & Editorial */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gold/15">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
            The Imperial Destination
          </span>
          <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-snug">
            Why Marry in <span className="gold-gradient-text italic">{data.city}</span>?
          </h2>
        </div>
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-gold/25 shadow-xs space-y-6">
          <p className="text-charcoal-700 text-sm sm:text-base font-light leading-relaxed">
            {data.overview}
          </p>
          <div className="pt-6 border-t border-gold/20 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-charcoal-700">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <strong className="block text-charcoal-900 font-medium">Recommended Wedding Season:</strong>
                <span className="text-charcoal-600 font-light">{data.season}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Plane className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <strong className="block text-charcoal-900 font-medium">Flight & Travel Access:</strong>
                <span className="text-charcoal-600 font-light">{data.connectivity}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Iconic Palatial Venues in This City (Pure Photos, Zero Text on Images) */}
      <section className="py-24 rasm-container border-b border-gold/15">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
            Curated Palaces & Estates
          </span>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
            Iconic Wedding Venues in <span className="gold-gradient-text italic">{data.city}</span>
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
            Every property below is vetted for architectural heritage, guest security, and culinary mastery with direct Rasm general manager holds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.venues.map((venue, idx) => (
            <div
              key={idx}
              className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between bg-white border border-gold/20 group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden bg-stone-100">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                 width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-charcoal-800 border border-gold/30 shadow-xs">
                  {venue.tag}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-manrope font-medium text-xl text-white tracking-tight">
                    {venue.name}
                  </h3>
                  <span className="text-[11px] text-stone-200 font-light block mt-0.5">
                    Capacity: {venue.capacity}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed mb-4">
                  {venue.description}
                </p>

                <div className="pt-4 border-t border-gold/15 space-y-2">
                  {venue.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-charcoal-700 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  <div className="pt-4 mt-2">
                    <InquiryButton
                       context={`${venue.name}, ${data.city}`}
                      className="w-full py-2.5 rounded-xl border border-gold/30 hover:border-gold hover:bg-ivory-200 text-charcoal-900 text-xs uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire {venue.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
                    </InquiryButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Curated 3-Day Royal Itinerary */}
      <section className="py-24 bg-[#FAF8F5] border-b border-gold/15">
        <div className="rasm-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
              Timeline of Celebrations
            </span>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
              Curated 3-Day <span className="gold-gradient-text italic">Wedding Experience</span>
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
              Designed so you and your international guests experience effortless transition between Vedic sacred rituals, high-energy sangeet nights, and imperial banquets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.itinerary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gold/25 shadow-md flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-manrope text-lg font-bold text-gold-dark tracking-tight">
                      {item.day}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-charcoal-500 bg-ivory-200 px-3 py-1 rounded-full border border-gold/20">
                      {item.time}
                    </span>
                  </div>

                  <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-medium block">
                    Signature Highlights
                  </span>
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-charcoal-700 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Rasm in this City */}
      <section className="py-24 rasm-container border-b border-gold/15">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
            The Rasm Privilege
          </span>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
            Why Discerning Couples Choose Us in <span className="gold-gradient-text italic">{data.city}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.advantages.map((adv, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-gold/20 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ivory-200 border border-gold/30 flex items-center justify-center shrink-0">
                <Crown className="w-6 h-6 text-gold-dark" />
              </div>
              <div>
                <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2 tracking-tight">
                  {adv.title}
                </h3>
                <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. City Specific FAQs */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gold/15">
        <div className="text-center mb-14">
          <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
            Essential Guidance
          </span>
          <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-snug">
            Frequently Asked Questions for <span className="gold-gradient-text italic">{data.city}</span> Weddings
          </h2>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, fIdx) => (
            <details
              key={fIdx}
              open={fIdx === 0}
              className="group rounded-2xl border border-gold/25 overflow-hidden transition-all bg-white"
            >
              <summary className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-ivory-100 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-manrope font-semibold text-base sm:text-lg text-charcoal-900 tracking-tight">
                  {faq.q}
                </span>
                <ChevronDown className="w-5 h-5 text-gold-dark shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 pt-2 border-t border-gold/15 text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* 7. Dedicated City Consultation CTA */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Direct Palatial Consultation</span>
          </div>

          <h2 className="font-manrope font-bold text-3xl sm:text-5xl text-charcoal-900 leading-snug tracking-tight">
            Ready to Begin Your Royal Story in <span className="gold-gradient-text italic">{data.city}</span>?
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Speak directly with our senior destination architects in Udaipur. We review dates, guest capacities, room blocks, and venue shortlists in our initial 1-on-1 private consultation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <InquiryAnimatedButton
              variant="gold-shimmer"
              size="lg"
               context={`${data.city}, ${data.state}`}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book Private {data.city} Consultation
            </InquiryAnimatedButton>

            <Link href={'/'}
              
              className="px-6 py-3.5 rounded-full text-xs uppercase tracking-widest text-charcoal-700 bg-white border border-gold/30 hover:border-gold shadow-2xs transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
