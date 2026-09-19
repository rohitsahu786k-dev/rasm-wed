import React, { useRef, useState, useEffect } from 'react';
import { 
  Crown, 
  HeartHandshake, 
  Utensils, 
  Music, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Layers3
} from 'lucide-react';
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
    category: 'Scenography & Artistry',
    title: 'Palatial Décor & Lakeview Mandaps',
    description: 'Transforming Rajputana courtyards, floating lake pavilions, and grand darbar halls into breathtaking floral wonderlands with handcrafted royal fabrics, crystal chandeliers, and night illumination.',
    icon: Crown,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    features: ['Floating Lake Pichola Mandap', 'Royal Rajasthani Thematic Sets', 'Exotic Floral Architecture'],
  },
  {
    id: 'hospitality',
    category: 'Concierge & VIP Care',
    title: 'White-Glove Guest Hospitality',
    description: 'Dedicated airport receptions, traditional Rajasthani dhol greetings, luxury fleet escorts, personalized guest gifting hampers, and 24/7 guest concierges for foreign and local guests.',
    icon: HeartHandshake,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
    features: ['VIP Airport Chauffeurs & Transfers', 'Royal Bespoke Gifting Suites', '24/7 Dedicated Guest Desk'],
  },
  {
    id: 'culinary',
    category: 'Gourmet Culinary',
    title: 'Royal Mewari Feasts & Mixology',
    description: 'Bespoke culinary journeys orchestrated with royal khansamas — authentic Mewari thalis, live royal barbecue, molecular cocktail bars, and Michelin-inspired fine dining for international palates.',
    icon: Utensils,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/PTIG5387.webp',
    features: ['Royal Mewari Banquets', 'Signature Cocktail Lounges', 'Global Gourmet Buffets'],
  },
  {
    id: 'entertainment',
    category: 'Procession & Music',
    title: 'Royal Baraat & Sufi Sangeet Nights',
    description: 'From vintage Rolls Royce cavalcade entries and royal horses to soulful riverside Sufi soirees, Bollywood artist management, and synchronized royal pyrotechnics.',
    icon: Music,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
    features: ['Vintage Royal Car Processions', 'Celebrity Artists & Live Sufi', 'Pyrotechnics & Laser Displays'],
  },
  {
    id: 'vedic',
    category: 'Sacred Rituals',
    title: 'Vedic Ceremonies & Sacred Pheras',
    description: 'Authentic Vedic rituals choreographed with venerated Mewari priests, sacred fire pit sanctification, traditional shehnai symphonies, and spiritual ambiance on holy lakefronts.',
    icon: Flame,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/P1013723-scaled.webp',
    features: ['Authentic Vedic Priest Panel', 'Sacred Pichola Sunset Pheras', 'Royal Shehnai & Sitar Ensemble'],
  },
  {
    id: 'spatial',
    category: 'Spatial Design & 3D',
    title: '3D Mandap & Spatial Simulations',
    description: 'Experience your wedding venue in photorealistic 3D months before you fly in — mandap spatial physics, floral arches, acoustic zones, and lighting cues rendered to millimeter perfection.',
    icon: Layers3,
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG-20240707-WA0009.webp',
    features: ['Photorealistic 3D Renders', 'Acoustic & Lighting Calibration', 'Zero-Surprise Execution'],
  },
];

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenInquiry }) => {
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(headRef.current, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
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

  const filterServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="services" className="py-24 sm:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] relative overflow-hidden z-10 font-manrope">
      
      {/* Golden Ambient Glows */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[350px] bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-gradient-to-tl from-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div ref={headRef} className="rasm-container mb-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-200 border border-gold/35 shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] font-medium uppercase tracking-normal gold-gradient-text">
                Complete Orchestration
              </span>
            </div>

            <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-charcoal-900 leading-[1.2] tracking-tight">
              Curated <span className="gold-gradient-text italic font-normal">Wedding Experiences</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="max-w-sm text-sm text-charcoal-600 font-light leading-relaxed lg:text-right tracking-normal">
              Every celebration is designed with imperial precision so you and your loved ones celebrate freely.
            </p>
            
            {/* Circular Navigation Controls with Light Shadow, No Harsh Borders */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo('left')}
                disabled={!canScrollLeft}
                aria-label="Previous service"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  canScrollLeft
                    ? 'bg-white text-charcoal-900 hover:bg-gradient-to-r hover:from-[#C5A059] hover:via-[#E2C785] hover:to-[#B38E3C] hover:text-charcoal-950 hover:scale-105'
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed shadow-none'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('right')}
                disabled={!canScrollRight}
                aria-label="Next service"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  canScrollRight
                    ? 'bg-white text-charcoal-900 hover:bg-gradient-to-r hover:from-[#C5A059] hover:via-[#E2C785] hover:to-[#B38E3C] hover:text-charcoal-950 hover:scale-105'
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed shadow-none'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills (Refined Quiet Luxury) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-6 pb-2">
          {[
            { id: 'all', label: 'All Orchestrations' },
            { id: 'scenography', label: 'Scenography & Mandaps' },
            { id: 'concierge', label: 'VIP Hospitality' },
            { id: 'gourmet', label: 'Royal Banquets' },
            { id: 'procession', label: 'Baraat & Sufi' },
            { id: 'sacred', label: 'Vedic Pheras' },
            { id: 'spatial', label: '3D Simulations' },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-normal transition-all duration-300 whitespace-nowrap ${
                  isSelected
                    ? 'bg-charcoal-900 text-white shadow-sm'
                    : 'bg-white text-charcoal-600 hover:text-charcoal-950 shadow-xs hover:shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Carousel Track with generous bottom padding so cards and shadows NEVER clip */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-12 pt-3 pb-14 cursor-grab active:cursor-grabbing relative z-10"
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
        {filterServices.map((srv, idx) => (
          <ServiceCard key={srv.id} srv={srv} index={idx} onInquire={onOpenInquiry} />
        ))}
      </div>

      {/* Bottom Pagination & Progress */}
      <div className="flex items-center justify-center gap-2 mt-4 relative z-10">
        {filterServices.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-8 h-2 bg-charcoal-900 shadow-xs' 
                : 'w-2 h-2 bg-stone-200 hover:bg-stone-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

/* ─── Service Card (No Border, Light Shadow, Perfectly Padded Content) ─── */
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
      className="srv-slide-card shrink-0 relative rounded-[28px] sm:rounded-[32px] bg-white overflow-hidden shadow-[0_10px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.11)] transition-all duration-500 flex flex-col group border-0"
      style={{ width: '360px', height: '540px', scrollSnapAlign: 'start' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Top Image Section — 46% height */}
      <div className="relative h-[46%] overflow-hidden bg-stone-100 shrink-0">
        <motion.img
          src={srv.imageUrl}
          alt={srv.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[11px] font-medium font-manrope uppercase tracking-normal text-white px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md shadow-xs">
            {srv.category}
          </span>
        </div>

        {/* Floating Index Counter */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] font-medium font-manrope px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-charcoal-600 shadow-xs">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Luxury Icon Badge */}
        <motion.div
          className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md z-10 text-charcoal-800"
          animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-4.5 h-4.5 text-charcoal-800" />
        </motion.div>

        {/* Subtle Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-80" />
      </div>

      {/* Content Section — 54% height with proper flex spacing and no cut-off */}
      <div className="flex-1 flex flex-col justify-between p-6 pb-6 bg-gradient-to-b from-white to-[#FDFCFA]">
        <div>
          {/* Title */}
          <h3 className="font-manrope font-medium text-[1.12rem] text-charcoal-900 leading-snug tracking-tight mb-2 group-hover:text-charcoal-950 transition-colors">
            {srv.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-charcoal-600 font-light leading-relaxed line-clamp-2 mb-3 tracking-normal">
            {srv.description}
          </p>

          {/* Key Features List — Clean & Refined */}
          <ul className="space-y-2">
            {srv.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[12px] text-charcoal-700 font-manrope font-normal tracking-normal">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sophisticated Editorial CTA Button */}
        <div className="pt-3 mt-auto">
          <motion.button
            onClick={onInquire}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-charcoal-900 text-white hover:bg-black text-xs font-medium uppercase tracking-normal shadow-xs hover:shadow-md transition-all group/btn overflow-hidden relative"
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium text-white">Enquire Service</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-[#E2C785]" />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesBento;
