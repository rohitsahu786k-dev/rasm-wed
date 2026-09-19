import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Destination } from '../types';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Calendar, Sparkles, Crown } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, PanInfo, MotionValue } from 'framer-motion';

interface DestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
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
    tagline: 'The City of Lakes · Iconic Royal Palaces & Floating Mandaps',
    season: 'October to March',
    venues: 'The Oberoi Udaivilas, Taj Lake Palace, Jagmandir Island, The Leela Palace, Fateh Garh',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
  },
  {
    id: 'jaipur',
    title: 'Jaipur, Rajasthan',
    slug: 'wedding-planner-in-jaipur',
    tagline: 'The Pink City · Imperial Fortresses, Royal Havelis & Palatial Lawns',
    season: 'October to March',
    venues: 'Rambagh Palace, Fairmont Jaipur, Jai Mahal Palace, Samode Palace',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
  },
  {
    id: 'jodhpur-jaisalmer',
    title: 'Jodhpur & Jaisalmer',
    slug: 'wedding-planner-in-jodhpur',
    tagline: 'Sun City Grandeur & Golden Thar Sand Dunes',
    season: 'November to February',
    venues: 'Umaid Bhawan Palace, Suryagarh, Ajit Bhawan, Fort Rajwada',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp'
  },
  {
    id: 'rishikesh',
    title: 'Rishikesh, Uttarakhand',
    slug: 'why-rishikesh-is-new-destination-wedding-hotspot',
    tagline: 'Soulful Riverside Vows on Sacred Ganga Ghats',
    season: 'September to April',
    venues: 'Taj Rishikesh, Aloha on the Ganges, Roseate Ganges, Divine Resort',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg'
  },
  {
    id: 'goa',
    title: 'Goa Coastal Luxury',
    slug: 'wedding-planner-in-goa',
    tagline: 'Sun-kissed Coastal Mandaps & Oceanfront Soirees',
    season: 'November to February',
    venues: 'Grand Hyatt, W Goa, Alila Diwa, ITC Grand Goa, Caravela Beach Resort',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp'
  },
  {
    id: 'kumbhalgarh',
    title: 'Kumbhalgarh & Mount Abu',
    slug: 'wedding-planner-in-kumbhalgarh',
    tagline: 'Serene Aravali Hills & Ancient Mewar Fortress Solitude',
    season: 'Year-round Pleasant',
    venues: 'The Kumbha Bagh, Fateh Safari Lodge, Heritage Havelis Mount Abu',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp'
  },
  {
    id: 'thailand',
    title: 'Thailand International',
    slug: 'wedding-planner-in-thailand',
    tagline: 'Tropical Luxury Palaces & Beachfront Private Villas',
    season: 'November to April',
    venues: 'Sri Panwa Phuket, The Sarojin Khao Lak, Four Seasons Koh Samui',
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp'
  }
];

const BADGES: Record<string, string> = {
  udaipur: 'LAKE PALACE',
  jaipur: 'HERITAGE FORT',
  'jodhpur-jaisalmer': 'DESERT OASIS',
  rishikesh: 'SACRED GHATS',
  goa: 'COASTAL MANDAP',
  'mount-abu-nathdwara': 'ARAVALI RETREAT',
  kumbhalgarh: 'ARAVALI RETREAT',
  thailand: 'TROPICAL HAVEN',
};

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 22,
      rotationMultiplier: 7,
      scaleReduction: 0.08,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 135,
      yMultiplier: 28,
      rotationMultiplier: 8.5,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 260,
    xMultiplier: 180,
    yMultiplier: 34,
    rotationMultiplier: 10,
    scaleReduction: 0.10,
  };
};

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const displayDestinations = destinations && destinations.length > 0 ? destinations : FALLBACK_DESTINATIONS;
  const total = displayDestinations.length;

  const scrollProgress = useMotionValue(0);
  const startProgress = useRef(0);
  const isDraggingRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
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
    }, 60);

    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 220,
      damping: 28,
      mass: 1,
    });
  };

  const slideTo = (direction: 'left' | 'right') => {
    const current = Math.round(scrollProgress.get());
    const target = direction === 'left' ? current - 1 : current + 1;
    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 240,
      damping: 28,
      mass: 0.9,
    });
  };

  const jumpToSlide = (idx: number) => {
    const current = Math.round(scrollProgress.get());
    let diff = (idx - current) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const target = current + diff;
    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 240,
      damping: 28,
      mass: 0.9,
    });
  };

  const handleCardClick = (idx: number, destTitle: string) => {
    if (isDraggingRef.current) return;
    const current = Math.round(scrollProgress.get());
    let diff = (idx - current) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (Math.abs(diff) === 0) {
      // Direct click on the focused center card
      onSelectDestination(destTitle);
    } else {
      // Bring clicked card to center
      jumpToSlide(idx);
    }
  };

  return (
    <section id="destinations" className="py-24 sm:py-28 bg-white relative overflow-hidden border-b border-stone-100 select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold/10 via-ivory-300 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="rasm-container mb-10 md:mb-14 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-200 border border-gold/35 text-gold-dark text-xs uppercase tracking-[0.28em] font-semibold mb-4 shadow-2xs">
          <Crown className="w-3.5 h-3.5 text-gold-dark" />
          <span>✦ Rasm Destinations</span>
        </div>

        <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-900 leading-[1.22] tracking-tight max-w-4xl mx-auto">
          Iconic Palaces & <span className="gold-gradient-text italic">Lake Retreats</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal-600 font-light leading-relaxed mt-4">
          Explore majestic Mewari courtyards, sunlit desert fortresses, and private coastal sanctuaries handpicked for extraordinary Rasm wedding celebrations.
        </p>
      </div>

      {/* 21st.dev 3D Stacked Card Fan Carousel */}
      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center py-6">
        <div className="relative w-full max-w-7xl h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center">
          
          {/* Transparent Pan/Drag Surface */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDrag={(_, info) => {
              const delta = -info.delta.x / config.sensitivity;
              scrollProgress.set(scrollProgress.get() + delta);
            }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing touch-pan-y"
          />

          {/* Fanned Cards Deck */}
          {displayDestinations.map((dest, i) => (
            <FannedCard
              key={dest.id || i}
              dest={dest}
              index={i}
              total={total}
              progress={scrollProgress}
              config={config}
              onCardClick={() => handleCardClick(i, dest.title)}
            />
          ))}
        </div>

        {/* Carousel Navigation Controls & Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-6 z-10 relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => slideTo('left')}
            className="w-11 h-11 rounded-full border border-gold/40 bg-white/90 backdrop-blur-md text-charcoal-800 shadow-sm flex items-center justify-center hover:bg-charcoal-900 hover:text-gold hover:border-charcoal-900 transition-all duration-300"
            aria-label="Previous Destination"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {displayDestinations.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlideIndex
                    ? 'w-8 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] shadow-sm'
                    : 'w-2 bg-stone-300 hover:bg-gold/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => slideTo('right')}
            className="w-11 h-11 rounded-full border border-gold/40 bg-white/90 backdrop-blur-md text-charcoal-800 shadow-sm flex items-center justify-center hover:bg-charcoal-900 hover:text-gold hover:border-charcoal-900 transition-all duration-300"
            aria-label="Next Destination"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom CTA to View All Venues */}
        <div className="mt-8 text-center z-40">
          <a
            href="/wedding-destination"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-charcoal-800 hover:text-gold-dark transition-colors border-b border-gold/40 pb-1"
          >
            <span>Explore All 18+ Rasm Palaces & Venues</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Individual 3D Fanned Card Component
───────────────────────────────────────────────────────────── */
interface FannedCardProps {
  dest: Destination;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  onCardClick: () => void;
}

const FannedCard: React.FC<FannedCardProps> = ({
  dest,
  index,
  total,
  progress,
  config,
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
    [0, 1, 1, 1, 0]
  );

  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10));

  const dimOpacity = useTransform(
    offset,
    [-2, -0.6, 0, 0.6, 2],
    [0.55, 0.25, 0, 0.25, 0.55]
  );

  const badgeText = BADGES[dest.id] || 'ROYAL ESTATE';

  return (
    <motion.div
      onClick={onCardClick}
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className="absolute rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-900 cursor-pointer group shadow-[0_16px_45px_rgba(0,0,0,0.16)] hover:shadow-[0_26px_55px_rgba(0,0,0,0.24)] border-0 w-64 h-[420px] sm:w-72 sm:h-[470px] md:w-[310px] md:h-[510px] lg:w-[335px] lg:h-[530px]"
    >
      {/* Destination Image */}
      <img
        src={dest.imageUrl}
        alt={dest.title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dim Overlay for Inactive/Side Cards */}
      <motion.div
        style={{ opacity: dimOpacity }}
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
      />

      {/* Dark Luxury Gradient for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

      {/* Top Pill Badge (Exact Hydroscope / 21st.dev Look) */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-charcoal-900 shadow-md border border-black/10">
          <Sparkles className="w-3 h-3 text-gold-dark" />
          <span>{badgeText}</span>
        </span>
      </div>

      {/* Bottom Content Card Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-20 pointer-events-none text-white">
        
        {/* Season Pill */}
        {dest.season && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <Calendar className="w-3 h-3 text-gold" />
            <span className="text-[10px] font-manrope font-medium text-stone-200 uppercase tracking-wider">
              {dest.season.split('(')[0]}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-manrope font-medium text-xl sm:text-2xl text-white leading-snug drop-shadow-md mb-2 tracking-tight">
          {dest.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-manrope font-light text-stone-300 leading-relaxed line-clamp-2 mb-4">
          {dest.tagline}
        </p>

        {/* CTA Link on Active Center Card */}
        <div className="pt-3 border-t border-white/20 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold group-hover:text-white transition-colors">
            <span>Explore Palaces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>

          <span className="text-[11px] font-semibold text-white/50 tracking-wider">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
