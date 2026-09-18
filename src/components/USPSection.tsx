import React, { useEffect, useRef } from 'react';
import { Crown, Eye, Users, Award, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface USPSectionProps {
  onOpenInquiry: () => void;
}

const usps = [
  {
    id: 'palaces',
    icon: Crown,
    tag: 'Exclusive Access',
    title: 'Direct Palace Partnerships',
    body: 'Priority access to Taj Lake Palace, Jagmandir Island Palace, Oberoi Udaivilas, The Leela, and City Palace complexes — without broker commissions or third-party markups.',
    badge: 'Zero Vendor Fees',
    image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    wide: true,
  },
  {
    id: '3d',
    icon: Eye,
    tag: 'Couture Design',
    title: '3D Mandap Simulations',
    body: 'Experience your venue in photorealistic 3D months before you fly in — mandap, floral arches, sangeet lighting, all rendered to perfection.',
    badge: 'Zero Guesswork',
    wide: false,
  },
  {
    id: 'nri',
    icon: Users,
    tag: 'Global Standards',
    title: '24/7 NRI & International Concierge',
    body: 'Dedicated timezone-aware coordination, VIP airport transfers, multilingual pundits, and luxury welcome experiences for your global guest list.',
    badge: 'Multilingual Team',
    wide: false,
  },
  {
    id: 'cuisine',
    icon: Award,
    tag: 'Heritage Gastronomy',
    title: 'Royal Mewari Feasts',
    body: 'Generational royal khansamas crafting authentic Mewari thalis, molecular mixology, and bespoke menus for international dietary needs.',
    badge: 'Authentic Royal Recipes',
    wide: false,
    image: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
  },
  {
    id: 'contingency',
    icon: ShieldCheck,
    tag: 'Flawless Execution',
    title: '100% Weather & Logistics Redundancy',
    body: 'Full indoor backup venues, generator grids, rapid decor teams and zero-risk contingency protocols ensuring an uninterrupted celebration.',
    badge: 'Zero-Risk Guarantee',
    wide: false,
  },
];

export const USPSection: React.FC<USPSectionProps> = ({ onOpenInquiry }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(
      headRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
      }
    );

    const cards = sectionRef.current?.querySelectorAll('.usp-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }
  }, []);

  return (
    <section className="py-28 bg-white relative overflow-hidden border-b border-stone-100" ref={sectionRef}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[40vw] h-[50vh] bg-gradient-to-bl from-amber-50/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-gradient-to-tr from-stone-50/80 to-transparent pointer-events-none" />

      <div className="rasm-container relative z-10">

        {/* Header */}
        <div ref={headRef} className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#997316] font-manrope block mb-4">
              ✦ The Rasm Distinction
            </span>
            <h2 className="font-cinzel font-normal text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-[1.15] tracking-[0.01em]">
              Why Discerning Couples
              <br />
              <span className="gold-gradient-text italic">Choose Rasm</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm text-[#777] font-manrope font-light leading-relaxed mb-4">
              We blend imperial heritage access, architectural precision, and intuitive hospitality to deliver weddings that are effortlessly sublime.
            </p>
            <button
              onClick={onOpenInquiry}
              className="group inline-flex items-center gap-2 text-sm font-semibold font-manrope text-[#1a1a1a] hover:text-[#997316] transition-colors"
            >
              Book a consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* USP Grid — Masonry-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Feature card 1 — Large with image */}
          <div className="usp-card lg:col-span-2 group relative rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm">
            {usps[0].image && (
              <div className="relative h-52 overflow-hidden">
                <img
                  src={usps[0].image}
                  alt={usps[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
              </div>
            )}
            <div className="p-7">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#997316] font-manrope px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200/60">
                  {usps[0].tag}
                </span>
                <Crown className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="font-cinzel font-normal text-xl sm:text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#997316] transition-colors">
                {usps[0].title}
              </h3>
              <p className="text-sm text-[#666] font-manrope font-light leading-relaxed mb-5">{usps[0].body}</p>
              <div className="flex items-center gap-1.5 text-[#997316]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-manrope font-semibold">{usps[0].badge}</span>
              </div>
            </div>
          </div>

          {/* Cards 2 & 3 */}
          {[usps[1], usps[2]].map((usp) => {
            const Icon = usp.icon;
            return (
              <div key={usp.id} className="usp-card group rounded-2xl bg-white border border-stone-200 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#997316] font-manrope px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200/60">
                      {usp.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4.5 h-4.5 text-[#997316]" />
                    </div>
                  </div>
                  <h3 className="font-cinzel font-normal text-lg sm:text-xl text-[#1a1a1a] mb-3 group-hover:text-[#997316] transition-colors">
                    {usp.title}
                  </h3>
                  <p className="text-sm text-[#666] font-manrope font-light leading-relaxed mb-6">{usp.body}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[#997316] pt-4 border-t border-stone-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-xs font-manrope font-semibold">{usp.badge}</span>
                </div>
              </div>
            );
          })}

          {/* Cards 4 & 5 */}
          {[usps[3], usps[4]].map((usp) => {
            const Icon = usp.icon;
            return (
              <div key={usp.id} className="usp-card group rounded-2xl bg-white border border-stone-200 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm overflow-hidden">
                {usp.image && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={usp.image}
                      alt={usp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#997316] font-manrope px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200/60">
                      {usp.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4.5 h-4.5 text-[#997316]" />
                    </div>
                  </div>
                  <h3 className="font-cinzel font-normal text-lg sm:text-xl text-[#1a1a1a] mb-3 group-hover:text-[#997316] transition-colors">
                    {usp.title}
                  </h3>
                  <p className="text-sm text-[#666] font-manrope font-light leading-relaxed mb-5">{usp.body}</p>
                  <div className="flex items-center gap-1.5 text-[#997316] pt-4 border-t border-stone-100">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-manrope font-semibold">{usp.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA Banner Card */}
          <div className="usp-card lg:col-span-2 rounded-2xl bg-[#1a1a1a] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <p className="text-xs font-manrope font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-2">
                ✦ Begin Your Journey
              </p>
              <h4 className="font-cinzel font-normal text-xl sm:text-2xl text-white mb-1">
                Want a palace availability audit for your dates?
              </h4>
              <p className="text-sm font-manrope font-light text-white/60">
                Speak with our senior venue planners in Udaipur within 24 hours.
              </p>
            </div>
            <button
              onClick={onOpenInquiry}
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A059] text-white text-sm font-semibold font-manrope hover:bg-[#D4AF37] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Request Venue Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
