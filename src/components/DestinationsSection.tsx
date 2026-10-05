'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Destination } from '@/types';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, PanInfo, MotionValue } from 'framer-motion';
import { WP_ORIGIN } from '@/lib/site';

interface DestinationsSectionProps {
  destinations: Destination[];
}

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: 'udaipur',
    title: 'Udaipur, Rajasthan',
    slug: 'wedding-planner-in-udaipur',
    tagline: 'The City of Lakes · Famous Royal Palaces & Floating Mandaps',
    season: 'October to March',
    venues: 'The Oberoi Udaivilas, Taj Lake Palace, Jagmandir Island, The Leela Palace, Fateh Garh',
    imageUrl: `${WP_ORIGIN}/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp`,
  },
  {
    id: 'jaipur',
    title: 'Jaipur, Rajasthan',
    slug: 'wedding-planner-in-jaipur',
    tagline: 'The Pink City · Grand Fortresses, Royal Havelis & Palace Lawns',
    season: 'October to March',
    venues: 'Rambagh Palace, Fairmont Jaipur, Jai Mahal Palace, Samode Palace',
    imageUrl: `${WP_ORIGIN}/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp`,
  },
  {
    id: 'jodhpur',
    title: 'Jodhpur, Rajasthan',
    slug: 'wedding-planner-in-jodhpur',
    tagline: 'Sun City Style & Historic Mehrangarh Fort Ramparts',
    season: 'October to March',
    venues: 'Umaid Bhawan Palace, Mehrangarh Fort, Ajit Bhawan, Bal Samand Lake Palace',
    imageUrl: '/images/jodhpur/umaid-bhawan-hero.jpg',
  },
  {
    id: 'jaisalmer',
    title: 'Jaisalmer, Rajasthan',
    slug: 'wedding-planner-in-jaisalmer',
    tagline: 'Golden Thar Sand Dunes & Suryagarh Desert Luxury',
    season: 'November to February',
    venues: 'Suryagarh, Jaisalmer Marriott, Fort Rajwada, Desert Tents',
    imageUrl: `${WP_ORIGIN}/wp-content/uploads/2024/07/IMG_E5217.webp`,
  },
  {
    id: 'goa',
    title: 'Goa Coastal Luxury',
    slug: 'wedding-planner-in-goa',
    tagline: 'Sun-kissed Coastal Mandaps & Oceanfront Luxury Soirees',
    season: 'November to February',
    venues: 'Grand Hyatt, W Goa, Alila Diwa, ITC Grand Goa, Caravela Beach Resort',
    imageUrl: `${WP_ORIGIN}/wp-content/uploads/2024/08/Goa.webp`,
  },
  {
    id: 'kumbhalgarh',
    title: 'Kumbhalgarh & Mount Abu',
    slug: 'wedding-planner-in-kumbhalgarh',
    tagline: 'Serene Aravalli Hills & Ancient Mewar Fortress Solitude',
    season: 'Year-round Pleasant',
    venues: 'The Kumbha Bagh, Fateh Safari Lodge, Heritage Havelis Mount Abu',
    imageUrl: `${WP_ORIGIN}/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp`,
  },
  {
    id: 'thailand',
    title: 'Thailand International',
    slug: 'wedding-planner-in-thailand',
    tagline: 'Tropical Luxury Palaces & Beachfront Private Island Resorts',
    season: 'November to April',
    venues: 'Sri Panwa Phuket, The Sarojin Khao Lak, Four Seasons Koh Samui',
    imageUrl: `${WP_ORIGIN}/wp-content/uploads/2024/08/Thailand.webp`,
  },
];

const BADGES: Record<string, string> = {
  udaipur: 'LAKE PALACE',
  jaipur: 'HERITAGE FORT',
  jodhpur: 'SUN CITY PALACE',
  jaisalmer: 'DESERT OASIS',
  goa: 'COASTAL MANDAP',
  kumbhalgarh: 'ARAVALI RETREAT',
  thailand: 'TROPICAL HAVEN',
};

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 100,
      velocityDivisor: 450,
      sensitivity: 150,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 6,
      scaleReduction: 0.08,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 150,
      velocityDivisor: 600,
      sensitivity: 200,
      xMultiplier: 140,
      yMultiplier: 26,
      rotationMultiplier: 7.5,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 190,
    velocityDivisor: 750,
    sensitivity: 240,
    xMultiplier: 185,
    yMultiplier: 32,
    rotationMultiplier: 8.5,
    scaleReduction: 0.10,
  };
};

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ destinations }) => {
  const displayDestinations = destinations && destinations.length > 0 ? destinations : FALLBACK_DESTINATIONS;
  const total = displayDestinations.length;

  const scrollProgress = useMotionValue(0);
  const startProgress = useRef(0);
  const isDraggingRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      const positiveProgress = Math.round(latest);
      const normalized = ((positiveProgress % total) + total) % total;
      setActiveSlideIndex(normalized);
    });
    return () => unsubscribe();
  }, [scrollProgress, total]);

  const config = useMemo(() => getCarouselConfig(windowWidth), [windowWidth]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 70);

    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-2, Math.min(2, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      mass: 0.8,
    });
  };

  const slideTo = useCallback(
    (direction: 'left' | 'right') => {
      const current = Math.round(scrollProgress.get());
      const target = direction === 'left' ? current - 1 : current + 1;
      animate(scrollProgress, target, {
        type: 'spring',
        stiffness: 260,
        damping: 30,
        mass: 0.8,
      });
    },
    [scrollProgress],
  );

  const jumpToSlide = useCallback(
    (idx: number) => {
      const current = Math.round(scrollProgress.get());
      let diff = (idx - current) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const target = current + diff;
      animate(scrollProgress, target, {
        type: 'spring',
        stiffness: 260,
        damping: 30,
        mass: 0.8,
      });
    },
    [scrollProgress, total],
  );

  const handleCardClick = (idx: number) => {
    if (isDraggingRef.current) return;
    jumpToSlide(idx);
  };

  return (
    <section
      id="destinations"
      className="py-20 sm:py-24 bg-[#FDFCFA] relative isolate overflow-hidden border-b border-gold/15 select-none"
    >
      {/* Soft warm ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold/10 via-ivory-300 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Section Header (90% width container) */}
      <div className="w-[90%] max-w-4xl mx-auto mb-10 md:mb-12 relative z-10 text-center">
        <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-semibold mb-3">
          Wedding Destinations
        </p>

        <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-900 leading-[1.2] tracking-tight max-w-4xl mx-auto">
          Famous Palaces &amp; <span className="gold-gradient-text italic">Lake Retreats</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal-600 font-light leading-relaxed mt-4">
          Explore grand Mewari courtyards, sunlit desert fortresses, and private coastal retreats
          handpicked for special Rasm wedding celebrations.
        </p>
      </div>

      {/* 90% Width Deck Carousel Container */}
      <div className="w-[90%] max-w-[1520px] mx-auto relative overflow-hidden flex flex-col items-center justify-center py-4">
        <div className="relative w-full h-[470px] sm:h-[530px] md:h-[570px] lg:h-[610px] flex items-center justify-center">
          {/* Fanned cards deck: the pan gesture lives on the deck, cards stay clickable */}
          <motion.div
            onPanStart={handleDragStart}
            onPan={(_, info) => {
              const delta = -info.delta.x / config.sensitivity;
              scrollProgress.set(scrollProgress.get() + delta);
            }}
            onPanEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          >
          {displayDestinations.map((dest, i) => (
            <FannedCard
              key={dest.id || i}
              dest={dest}
              index={i}
              total={total}
              progress={scrollProgress}
              config={config}
              isActive={i === activeSlideIndex}
              onCardClick={() => handleCardClick(i)}
            />
          ))}
          </motion.div>
        </div>

        {/* Carousel Navigation Controls & Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-6 z-10 relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => slideTo('left')}
            className="w-11 h-11 rounded-full border border-gold/40 bg-white/95 text-charcoal-800 shadow-sm flex items-center justify-center hover:bg-charcoal-900 hover:text-gold hover:border-charcoal-900 active:scale-95 transition-all duration-200"
            aria-label="Previous Destination"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-3">
            {displayDestinations.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToSlide(i)}
                className={`relative before:absolute before:-inset-2 before:content-[''] h-2 rounded-full transition-all duration-300 ${
                  i === activeSlideIndex
                    ? 'w-8 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] shadow-xs'
                    : 'w-2 bg-stone-300 hover:bg-gold/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => slideTo('right')}
            className="w-11 h-11 rounded-full border border-gold/40 bg-white/95 text-charcoal-800 shadow-sm flex items-center justify-center hover:bg-charcoal-900 hover:text-gold hover:border-charcoal-900 active:scale-95 transition-all duration-200"
            aria-label="Next Destination"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links to Destination Pages */}
        <nav
          aria-label="Wedding destinations"
          className="mt-8 flex flex-wrap justify-center gap-2 px-4 relative z-40 max-w-4xl mx-auto"
        >
          {displayDestinations.map((d) => (
            <Link
              key={d.id}
              href={`/${d.slug}/`}
              className="px-3.5 py-1.5 rounded-full border border-gold/25 bg-white text-xs tracking-wide text-charcoal-700 hover:border-gold hover:text-gold-dark hover:bg-gold/5 transition-all shadow-2xs"
            >
              Wedding in {d.title.split(',')[0]}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA to View All Venues */}
        <div className="mt-6 text-center z-40">
          <Link
            href="/wedding-destination/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-charcoal-800 hover:text-gold-dark transition-colors border-b border-gold/40 pb-1"
          >
            <span>See All Wedding Destinations</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Individual 3D Fanned Card Component
   - Black overlay removed completely.
   - Shadow/gradient merged strictly in bottom 38% (top 62% clean).
   - Text converted to rich black/charcoal with gold accents.
───────────────────────────────────────────────────────────── */
interface FannedCardProps {
  dest: Destination;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  isActive: boolean;
  onCardClick: () => void;
}

const FannedCard: React.FC<FannedCardProps> = ({
  dest,
  index,
  total,
  progress,
  config,
  isActive,
  onCardClick,
}) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);

  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.04) return 0;
    return o * config.rotationMultiplier;
  });

  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.04) return 0;
    return absO * config.yMultiplier;
  });

  const scale = useTransform(offset, (o) => 1 - Math.abs(o) * config.scaleReduction);

  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.4, 0, total / 2 - 0.4, total / 2],
    [0, 1, 1, 1, 0],
  );

  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10));

  const badgeText = BADGES[dest.id] || 'ROYAL PALACE';

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className="absolute rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white cursor-pointer group shadow-[0_16px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_24px_50px_rgba(197,160,89,0.22)] border border-gold/25 w-64 h-[420px] sm:w-72 sm:h-[470px] md:w-[310px] md:h-[510px] lg:w-[335px] lg:h-[530px]"
    >
      {/* Whole card is a real link to the destination page; side cards first slide to the centre. */}
      <Link
        href={`/${dest.slug}/`}
        aria-label={`${dest.title} wedding planner`}
        tabIndex={isActive ? 0 : -1}
        draggable={false}
        onClick={(e) => {
          if (!isActive) {
            e.preventDefault();
            onCardClick();
          }
        }}
        className="absolute inset-0 z-30 rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      />

      {/* 1. Destination Image (Natural, Bright & Crisp - NO full black overlay) */}
      <Image
        src={dest.imageUrl}
        alt={dest.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
        width={1200}
        height={800}
        sizes="(min-width: 1024px) 33vw, 100vw"
      />

      {/* 
        2. BOTTOM 38% SHADOW / GRADIENT MERGE:
        The shadow ONLY exists in the bottom 38% portion to guarantee crystal-clear black text 
        contrast, leaving the top 62% of the palace image 100% natural and unshaded.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[38%] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.55) 75%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* 3. Top Pill Badge */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm border border-gold/30">
          <span>{badgeText}</span>
        </span>
      </div>

      {/* 4. Bottom Content Info (TEXT IS RICH BLACK / CHARCOAL - NO WHITE TEXT) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 pointer-events-none text-charcoal-950">
        {/* Season Indicator */}
        {dest.season && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3 h-3 text-gold-dark" aria-hidden="true" />
            <span className="text-[10px] font-manrope font-semibold text-gold-dark uppercase tracking-wider">
              {dest.season.split('(')[0]}
            </span>
          </div>
        )}

        {/* Title in Deep Black */}
        <h3 className="font-manrope font-semibold text-xl sm:text-2xl text-charcoal-950 leading-snug mb-1 tracking-tight">
          {dest.title}
        </h3>

        {/* Tagline in Clean Dark Charcoal */}
        <p className="text-xs sm:text-[12.5px] font-manrope font-normal text-charcoal-700 leading-relaxed line-clamp-2 mb-3">
          {dest.tagline}
        </p>

        {/* Bottom CTA Row */}
        <div className="pt-2.5 border-t border-charcoal-200/80 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-dark group-hover:text-charcoal-950 transition-colors">
            <span>View {dest.title.split(',')[0]} Weddings</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>

          <span className="text-[11px] font-semibold text-charcoal-400 tracking-wider">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationsSection;
