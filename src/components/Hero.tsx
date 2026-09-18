import React, { useEffect, useRef } from 'react';
import { SiteSettings } from '../types';
import { ArrowRight, Crown, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  settings: SiteSettings;
  onOpenInquiry: () => void;
}

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

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(statsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.3')
      .fromTo(imagesRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1 }, '-=0.8');
  }, []);

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
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80">
                <Crown className="w-3 h-3 text-[#997316]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#997316] font-manrope">
                  Royal Wedding Architects
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-cinzel font-normal text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4rem] xl:text-[4.5rem] text-[#1a1a1a] leading-[1.12] tracking-[-0.01em] mb-6"
            >
              Your Palace
              <br />
              <span className="gold-gradient-text italic">Wedding</span>
              <br />
              Begins Here.
            </h1>

            {/* Sub Headline */}
            <p
              ref={subRef}
              className="text-[#4a4a4a] text-base sm:text-lg leading-relaxed font-manrope font-light max-w-md mb-10"
            >
              India's premier luxury destination wedding studio — crafting bespoke royal celebrations for NRI & international couples at the most iconic palace venues of Udaipur, Rajasthan & beyond.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={onOpenInquiry}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white text-sm font-semibold font-manrope tracking-wide hover:bg-[#2a2a2a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Plan Your Wedding
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('destinations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#C5A059]/60 text-[#1a1a1a] text-sm font-semibold font-manrope tracking-wide hover:border-[#C5A059] hover:bg-amber-50/50 transition-all duration-300"
              >
                <span className="gold-gradient-text">Explore Venues</span>
              </button>
            </div>

            {/* Stats Row */}
            <div
              ref={statsRef}
              className="grid grid-cols-4 gap-3 pt-8 border-t border-stone-100"
            >
              {stats.map((s) => (
                <div key={s.value} className="text-center">
                  <div className="font-cinzel font-normal text-xl sm:text-2xl text-[#1a1a1a] leading-none mb-1.5 gold-gradient-text">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#888] font-manrope font-medium uppercase tracking-wide leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Editorial Image Stack */}
          <div ref={imagesRef} className="relative flex items-center justify-center lg:justify-end h-full min-h-[520px]">
            {/* Main large image */}
            <div className="absolute right-0 top-6 w-[70%] h-[460px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImages[0].src}
                alt={heroImages[0].label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 inline-flex items-center gap-2">
                  <Crown className="w-3.5 h-3.5 text-[#997316]" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a1a1a] font-manrope leading-none">{heroImages[0].label}</p>
                    <p className="text-[10px] text-[#888] font-manrope">{heroImages[0].sub}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary image - top left overlap */}
            <div className="absolute left-0 top-0 w-[44%] h-[220px] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-10">
              <img
                src={heroImages[1].src}
                alt={heroImages[1].label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] text-white font-manrope font-medium leading-tight">{heroImages[1].label}</p>
                <p className="text-[9px] text-white/70 font-manrope">{heroImages[1].sub}</p>
              </div>
            </div>

            {/* Third image - bottom left */}
            <div className="absolute left-4 bottom-0 w-[42%] h-[200px] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-10">
              <img
                src={heroImages[2].src}
                alt={heroImages[2].label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
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
          <div className="flex flex-col items-center gap-1.5 text-[#aaa]">
            <span className="text-[10px] font-manrope uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
