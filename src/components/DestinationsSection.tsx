import React, { useRef, useState, useEffect } from 'react';
import { Destination } from '../types';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // GSAP header entrance
  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(
      headRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
      }
    );
  }, []);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    // Update active index based on scroll position
    const cardWidth = el.scrollWidth / destinations.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  };

  const scrollTo = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.dest-slide-card');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(idx);
    }
  };

  return (
    <section id="destinations" className="py-28 bg-white relative overflow-hidden border-b border-stone-100">

      {/* Section header */}
      <div ref={headRef} className="rasm-container mb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#997316] font-manrope block mb-4">
              ✦ Regal Destinations
            </span>
            <h2 className="font-cinzel font-normal text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-[1.15]">
              Iconic Palaces &{' '}
              <span className="gold-gradient-text italic">Lake Retreats</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="max-w-sm text-sm text-[#777] font-manrope font-light leading-relaxed lg:text-right">
              From world-renowned lake palaces in Udaipur to sunlit coastal mandaps in Goa — choose where your royal journey begins.
            </p>
            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
                    : 'border-stone-200 text-stone-300 cursor-not-allowed'
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
                    : 'border-stone-200 text-stone-300 cursor-not-allowed'
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto scrollbar-hide pl-[10px] md:pl-0 pr-0 pb-6 cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={(e) => {
          const el = trackRef.current;
          if (!el) return;
          let startX = e.pageX;
          let scrollLeft = el.scrollLeft;
          const onMove = (ev: MouseEvent) => {
            el.scrollLeft = scrollLeft - (ev.pageX - startX);
          };
          const onUp = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
          };
          document.addEventListener('mousemove', onMove);
          document.addEventListener('mouseup', onUp);
        }}
      >

        {destinations.map((dest, idx) => (
          <PremiumDestCard
            key={dest.id}
            dest={dest}
            index={idx}
            isFirst={idx === 0}
            onSelect={() => onSelectDestination(dest.title)}
          />
        ))}


      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {destinations.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'w-6 h-2 bg-[#C5A059]'
                : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Premium Individual Card
───────────────────────────────────────────────────────────── */
interface PremiumDestCardProps {
  dest: Destination;
  index: number;
  isFirst: boolean;
  onSelect: () => void;
}

const PremiumDestCard: React.FC<PremiumDestCardProps> = ({ dest, index, isFirst, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="dest-slide-card shrink-0 relative group cursor-pointer overflow-hidden rounded-3xl"
      style={{
        width: isFirst ? '420px' : '360px',
        height: '520px',
        scrollSnapAlign: 'start',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onSelect}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-stone-200"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={dest.imageUrl}
          alt={dest.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top: location badge */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <MapPin className="w-3 h-3 text-white/80" />
          <span className="text-[10px] font-semibold font-manrope text-white uppercase tracking-wider">
            {dest.title}
          </span>
        </div>
        {isFirst && (
          <div className="bg-[#C5A059] text-white text-[10px] font-semibold font-manrope uppercase tracking-wider px-3 py-1.5 rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Bottom: info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {/* Season pill */}
        {dest.season && (
          <div className="flex items-center gap-1.5 mb-3">
            <Calendar className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[10px] font-manrope font-medium text-white/60 uppercase tracking-wide">
              Best: {dest.season}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-cinzel font-normal text-2xl text-white leading-tight mb-2">
          {dest.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm font-manrope font-light text-white/65 leading-relaxed line-clamp-2 mb-5">
          {dest.tagline}
        </p>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={(e) => { e.stopPropagation(); }}
            className="inline-flex items-center gap-2 text-sm font-semibold font-manrope text-white group/btn"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="border-b border-white/40 pb-0.5">Enquire Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* Index number */}
          <span className="font-cinzel text-[11px] text-white/30 font-normal">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Animated gold underline bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Corner accent — top right gold ring */}
      <motion.div
        className="absolute top-4 right-4 w-20 h-20 rounded-full border border-[#C5A059]/30 pointer-events-none"
        animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 0.6 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};
