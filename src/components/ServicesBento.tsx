import React, { useRef, useState, useEffect } from 'react';
import { Crown, HeartHandshake, Utensils, Music, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesBentoProps {
  onOpenInquiry?: () => void;
}

const services = [
  {
    id: 'decor',
    title: 'Palatial Décor & Lakeview Mandaps',
    category: 'Scenography & Artistry',
    description: 'Transforming Rajputana courtyards, floating lake pavilions, and grand darbar halls into breathtaking floral wonderlands with handcrafted royal fabrics, crystal chandeliers, and night illumination.',
    icon: Crown,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    features: ['Floating Lake Pichola Mandap', 'Royal Rajasthani Thematic Sets', 'Exotic Floral Architecture'],
    accentColor: '#C5A059',
  },
  {
    id: 'hospitality',
    title: 'White-Glove Guest Hospitality',
    category: 'Concierge & VIP Care',
    description: 'Dedicated airport receptions, traditional Rajasthani dhol greetings, luxury fleet escorts, personalized guest gifting hampers, and 24/7 guest concierges for foreign and local guests.',
    icon: HeartHandshake,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
    features: ['VIP Airport Chauffeurs & Transfers', 'Royal Bespoke Gifting Suites', '24/7 Dedicated Guest Desk'],
    accentColor: '#A88434',
  },
  {
    id: 'culinary',
    title: 'Royal Mewari Feasts & Mixology',
    category: 'Gourmet Culinary',
    description: 'Bespoke culinary journeys orchestrated with royal khansamas — authentic Mewari thalis, live royal barbecue, molecular cocktail bars, and Michelin-inspired fine dining for international palates.',
    icon: Utensils,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/PTIG5387.webp',
    features: ['Royal Mewari Banquets', 'Signature Cocktail Lounges', 'Global Gourmet Buffets'],
    accentColor: '#D4AF37',
  },
  {
    id: 'entertainment',
    title: 'Royal Baraat & Sufi Sangeet Nights',
    category: 'Procession & Entertainment',
    description: 'From vintage Rolls Royce cavalcade entries and royal horses to soulful riverside Sufi soirees, Bollywood artist management, and synchronized royal pyrotechnics.',
    icon: Music,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
    features: ['Vintage Royal Car Processions', 'Celebrity Artists & Live Sufi', 'Pyrotechnics & Laser Displays'],
    accentColor: '#997316',
  },
];

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenInquiry }) => {
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(headRef.current, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
    });
  }, []);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const cardWidth = el.scrollWidth / services.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  };

  const scrollTo = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? el.clientWidth * 0.75 : -(el.clientWidth * 0.75), behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.srv-slide-card');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(idx);
    }
  };

  return (
    <section id="services" className="py-28 bg-[#FAFAF9] relative border-b border-stone-100 overflow-hidden">

      {/* Header */}
      <div ref={headRef} className="rasm-container mb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#997316] font-manrope block mb-4">
              ✦ Complete Orchestration
            </span>
            <h2 className="font-cinzel font-normal text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-[1.15]">
              Curated{' '}
              <span className="gold-gradient-text italic">Wedding Experiences</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="max-w-xs text-sm text-[#777] font-manrope font-light leading-relaxed lg:text-right">
              Every celebration is designed with imperial precision so you and your loved ones celebrate freely.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft ? 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white' : 'border-stone-200 text-stone-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canScrollRight ? 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white' : 'border-stone-200 text-stone-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto scrollbar-hide pl-[10px] md:pl-0 pr-0 pb-4 cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={(e) => {
          const el = trackRef.current;
          if (!el) return;
          const startX = e.pageX;
          const scrollLeft = el.scrollLeft;
          const onMove = (ev: MouseEvent) => { el.scrollLeft = scrollLeft - (ev.pageX - startX); };
          const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
          document.addEventListener('mousemove', onMove);
          document.addEventListener('mouseup', onUp);
        }}
      >

        {services.map((srv, idx) => (
          <ServiceCard key={srv.id} srv={srv} index={idx} onInquire={onOpenInquiry} />
        ))}


      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === idx ? 'w-6 h-2 bg-[#C5A059]' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

/* ─── Service Slide Card ─── */
interface ServiceCardProps {
  srv: typeof services[0];
  index: number;
  onInquire?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ srv, index, onInquire }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = srv.icon;

  return (
    <motion.div
      className="srv-slide-card shrink-0 relative rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm card-glow flex flex-col"
      style={{ width: '360px', height: '500px', scrollSnapAlign: 'start' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image section — top 55% */}
      <div className="relative h-[55%] overflow-hidden bg-stone-200 shrink-0">
        <motion.img
          src={srv.imageUrl}
          alt={srv.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-semibold font-manrope uppercase tracking-[0.18em] text-white px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15">
            {srv.category}
          </span>
        </div>

        {/* Icon badge — bottom right */}
        <motion.div
          className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-5 h-5 text-[#997316]" />
        </motion.div>

        {/* Gold accent bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${srv.accentColor}, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
          initial={{ opacity: 0, scaleX: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content section — bottom 45% */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          {/* Index + Title */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-cinzel font-normal text-[1.05rem] text-[#1a1a1a] leading-snug pr-3 group-hover:text-[#997316] transition-colors">
              {srv.title}
            </h3>
            <span className="font-cinzel text-[11px] text-[#bbb] shrink-0 mt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <p className="text-[13px] text-[#777] font-manrope font-light leading-relaxed line-clamp-2 mb-4">
            {srv.description}
          </p>

          {/* Features list */}
          <ul className="space-y-1.5">
            {srv.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px] text-[#555] font-manrope">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: srv.accentColor }}
                  animate={{ scale: hovered ? 1.3 : 1 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <motion.button
          onClick={onInquire}
          className="mt-5 w-full flex items-center justify-between px-5 py-3 rounded-2xl border border-stone-200 text-[#1a1a1a] text-sm font-semibold font-manrope group/btn overflow-hidden relative"
          animate={{
            borderColor: hovered ? srv.accentColor : '#e7e5e4',
            backgroundColor: hovered ? '#fafaf9' : '#ffffff',
          }}
          transition={{ duration: 0.3 }}
        >
          <span>Enquire Service</span>
          <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
            <ArrowRight className="w-4 h-4" style={{ color: hovered ? srv.accentColor : '#888' }} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};
