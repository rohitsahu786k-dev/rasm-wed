import React from 'react';

const MARQUEE_ITEMS = [
  'BESPOKE PALACE WEDDINGS',
  'LAKE PICHOLA SUNSET PHERAS',
  'JAGMANDIR ISLAND PALACE BUYOUTS',
  '3D SPATIAL MANDAP SIMULATIONS',
  'THE OBEROI UDAIVILAS & THE LEELA',
  '24/7 NRI WHITE-GLOVE CONCIERGE',
  'ROYAL MEWARI KHANSAMA FEASTS',
  'ZERO BROKER MARKUPS',
  'RAJPUTANA VINTAGE BARAATS',
  'PRIVATE JET & LAKE BARGE LOGISTICS',
];

export const LuxuryTextMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-y border-gold/20 py-4 sm:py-5 select-none z-10">
      <style>{`
        @keyframes luxury-marquee-horizontal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Subtle edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />

      {/* Infinite scrolling track */}
      <div
        className="flex items-center gap-8 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
        style={{
          animation: 'luxury-marquee-horizontal 40s linear infinite',
          width: 'max-content',
        }}
      >
        {/* Repeating 3 times for completely uninterrupted loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div key={index} className="inline-flex items-center gap-6">
            <span className="font-manrope font-normal text-xs sm:text-sm tracking-[0.22em] text-charcoal-800 uppercase hover:text-charcoal-950 transition-colors">
              {item}
            </span>
            <span className="text-[#C5A059] text-xs opacity-70">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryTextMarquee;
