import Image from 'next/image';
import { InquiryButton } from '@/components/InquiryClient';
import React from 'react';
import { SiteSettings } from '@/types';
import { ArrowRight, Crown, ChevronDown } from 'lucide-react';


const heroImages = [
  {
    src: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    label: 'Jagmandir Island Palace',
    sub: 'Udaipur',
  },
  {
    src: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    label: 'Sacred Vedic Vows',
    sub: 'Lake Pichola',
  },
  {
    src: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    label: 'The Oberoi Udaivilas',
    sub: 'Rajasthan',
  },
];

const stats = [
  { value: '450+', label: 'Royal Celebrations' },
  { value: '12+', label: 'Years of Heritage' },
  { value: '15+', label: 'Palace Venues' },
  { value: '40+', label: 'Global Countries' },
];

export const Hero: React.FC = () => {

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-0 bg-white overflow-hidden">
      {/* Ambient gold background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[45vw] h-[70vh] bg-gradient-to-bl from-amber-50 via-amber-100/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[35vw] h-[40vh] bg-gradient-to-tr from-stone-100/60 to-transparent" />
      </div>

      <div className="rasm-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[85vh] py-12">

          {/* LEFT: Content */}
          <div className="flex flex-col justify-center">

            {/* Label pill */}
            <div className="inline-flex items-center gap-2 mb-8 self-start">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ivory-200 border border-gold/35 shadow-2xs">
                <Crown className="w-3 h-3 text-[#C5A059]" />
                <span className="text-[11px] font-medium uppercase tracking-normal gold-gradient-text font-manrope">
                  Royal Wedding Architects
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              style={{ animation: "hero-rise 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
              className="font-manrope font-medium text-[2.5rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem] text-[#1a1a1a] leading-[1.18] tracking-tight mb-6"
            >
              Your Palace
              <br />
              <span className="gold-gradient-text italic">Wedding</span>
              <br />
              Begins Here.
            </h1>

            {/* Sub Headline */}
            <p
              style={{ animation: "hero-fade 0.8s ease-out 0.25s both" }}
              className="text-[#4a4a4a] text-base sm:text-lg leading-relaxed font-manrope font-light max-w-md mb-10"
            >
              India's premier luxury destination wedding studio — crafting bespoke royal celebrations for NRI & international couples at the most iconic palace venues of Udaipur, Rajasthan & beyond.
            </p>

            {/* CTAs */}
            <div style={{ animation: "hero-fade 0.6s ease-out 0.45s both" }} className="flex flex-wrap gap-3 mb-12">
              <InquiryButton
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium font-manrope tracking-wide hover:bg-[#2a2a2a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Plan Your Wedding
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </InquiryButton>
              <a href="#destinations" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#C5A059]/60 text-[#1a1a1a] text-sm font-medium font-manrope tracking-wide hover:border-[#C5A059] hover:bg-amber-50/50 transition-all duration-300">
                <span className="gold-gradient-text">Explore Venues</span>
              </a>
            </div>

            {/* Stats Row */}
            <div
              style={{ animation: "hero-fade 0.7s ease-out 0.6s both" }}
              className="grid grid-cols-4 gap-3 pt-8 border-t border-stone-100"
            >
              {stats.map((s) => (
                <div key={s.value} className="text-center">
                  <div className="font-manrope font-medium text-xl sm:text-2xl text-[#1a1a1a] leading-none mb-1.5 gold-gradient-text">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#6b6b6b] font-manrope font-medium uppercase tracking-wide leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Editorial Image Stack */}
          <div style={{ animation: "hero-fade 1s ease-out 0.2s both" }} className="relative flex items-center justify-center lg:justify-end h-full min-h-[520px]">
            {/* Main large image */}
            <div className="absolute right-0 top-6 w-[70%] h-[460px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImages[0].src}
                alt={heroImages[0].label}
                className="w-full h-full object-cover"
               width={900} height={600} priority sizes="(min-width: 1024px) 40vw, 90vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 inline-flex items-center gap-2">
                  <Crown className="w-3.5 h-3.5 text-[#997316]" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a1a1a] font-manrope leading-none">{heroImages[0].label}</p>
                    <p className="text-[10px] text-[#6b6b6b] font-manrope">{heroImages[0].sub}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary image - top left overlap */}
            <div className="absolute left-0 top-0 w-[44%] h-[220px] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-10">
              <Image
                src={heroImages[1].src}
                alt={heroImages[1].label}
                className="w-full h-full object-cover"
               width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] text-white font-manrope font-medium leading-tight">{heroImages[1].label}</p>
                <p className="text-[9px] text-white/70 font-manrope">{heroImages[1].sub}</p>
              </div>
            </div>

            {/* Third image - bottom left */}
            <div className="absolute left-4 bottom-0 w-[42%] h-[200px] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-10">
              <Image
                src={heroImages[2].src}
                alt={heroImages[2].label}
                className="w-full h-full object-cover"
               width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] text-white font-manrope font-medium leading-tight">{heroImages[2].label}</p>
                <p className="text-[9px] text-white/70 font-manrope">{heroImages[2].sub}</p>
              </div>
            </div>

            {/* Floating gold badge */}
            <div className="absolute top-3 left-[38%] z-20 bg-[#1a1a1a] text-white px-3 py-1.5 rounded-full shadow-lg">
              <p className="text-[10px] font-manrope font-semibold tracking-wider uppercase">
                ✦ Since 2012
              </p>
            </div>

            {/* Decorative gold ring */}
            <div className="absolute -bottom-8 right-8 w-24 h-24 rounded-full border-2 border-[#C5A059]/30 pointer-events-none" />
            <div className="absolute -bottom-4 right-4 w-16 h-16 rounded-full border border-[#C5A059]/20 pointer-events-none" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-6 animate-bounce">
          <div className="flex flex-col items-center gap-1.5 text-[#767676]">
            <span className="text-[10px] font-manrope uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
