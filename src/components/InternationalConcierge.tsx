import React from 'react';
import { Globe, Plane, Clock, FileCheck, Languages, ArrowRight } from 'lucide-react';

interface InternationalConciergeProps {
  onOpenInquiry: () => void;
}

const perks = [
  {
    icon: Clock,
    title: 'Global Timezone Coordination',
    desc: 'Dedicated managers working across US (EST/PST), UK (GMT), and UAE (GST) hours — no awkward calls at 3 AM.',
  },
  {
    icon: Plane,
    title: 'International Guest Logistics',
    desc: 'Charter fleet coordination, airport transfers from Delhi/Mumbai to Udaipur, luxury palace room blocks and VIP welcome kits.',
  },
  {
    icon: Languages,
    title: 'Multilingual Vedic Ceremonies',
    desc: 'Vedic rituals with live English translation so cross-cultural families and your global guest list feel deeply present.',
  },
  {
    icon: FileCheck,
    title: 'Transparent Global Contracts',
    desc: 'Fixed multi-currency invoicing in USD, GBP, or EUR — absolute commercial clarity with no hidden fees.',
  },
];

const countries = ['🇬🇧 United Kingdom', '🇺🇸 United States', '🇦🇪 UAE / Dubai', '🇨🇦 Canada', '🇦🇺 Australia', '🇸🇬 Singapore'];

export const InternationalConcierge: React.FC<InternationalConciergeProps> = ({ onOpenInquiry }) => {
  return (
    <section id="international" className="py-28 bg-white border-b border-stone-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[50vw] h-full bg-gradient-to-r from-[#FAFAF9] to-transparent pointer-events-none" />

      <div className="rasm-container relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Content */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#997316] font-manrope block mb-5">
              ✦ Worldwide NRI & Destination Desk
            </span>
            <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-[1.22] mb-6 tracking-tight">
              Planning from London,
              <br />
              New York or Dubai?
              <br />
              <span className="gold-gradient-text italic">We Handle Everything.</span>
            </h2>
            <p className="text-base text-[#666] font-manrope font-light leading-relaxed mb-8 max-w-md">
              Over 40% of our couples reside in the US, UK, Canada & UAE. We eliminate the distance with 3D virtual palace walkthroughs, express tasting & linen shipments, and a dedicated 24/7 planning liaison.
            </p>

            {/* Country pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {countries.map((c) => (
                <span
                  key={c}
                  className="text-[11px] font-manrope font-medium px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-[#1a1a1a]"
                >
                  {c}
                </span>
              ))}
            </div>

            <button
              onClick={onOpenInquiry}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white text-sm font-semibold font-manrope hover:bg-[#2a2a2a] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Book Virtual NRI Planning Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* RIGHT: 4 Perk cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white border border-stone-200 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#997316]" />
                  </div>
                  <h3 className="font-manrope font-medium text-base text-[#1a1a1a] mb-2 group-hover:text-[#997316] transition-colors tracking-tight">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-[#777] font-manrope font-light leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}

            {/* Stats card */}
            <div className="sm:col-span-2 p-6 rounded-2xl bg-[#1a1a1a] flex items-center justify-between gap-4">
              <div className="text-center flex-1">
                <p className="font-manrope font-bold text-2xl text-white mb-1 tracking-tight">40%+</p>
                <p className="text-[10px] font-manrope uppercase tracking-wide text-white/50">International Couples</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center flex-1">
                <p className="font-manrope font-bold text-2xl text-white mb-1 tracking-tight">24/7</p>
                <p className="text-[10px] font-manrope uppercase tracking-wide text-white/50">Global Support</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center flex-1">
                <p className="font-manrope font-bold text-2xl text-white mb-1 tracking-tight">3</p>
                <p className="text-[10px] font-manrope uppercase tracking-wide text-white/50">Major Currencies</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
