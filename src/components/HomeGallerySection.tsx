import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GalleryPhoto {
  id: number;
  url: string;
  category: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    url: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    category: 'Vedic Pheras',
  },
  {
    id: 2,
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    category: 'Heritage Palaces',
  },
  {
    id: 3,
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    category: 'Lakeview Mandaps',
  },
  {
    id: 4,
    url: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    category: 'Lakeview Mandaps',
  },
  {
    id: 5,
    url: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
    category: 'Royal Baraats',
  },
  {
    id: 6,
    url: 'https://rasmwed.com/wp-content/uploads/2024/07/PTIG5387.webp',
    category: 'Heritage Palaces',
  },
  {
    id: 7,
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    category: 'Heritage Palaces',
  },
  {
    id: 8,
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp',
    category: 'Heritage Palaces',
  },
  {
    id: 9,
    url: 'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
    category: 'Vedic Pheras',
  },
];

interface HomeGallerySectionProps {
  onNavigate?: (path: string) => void;
}

export const HomeGallerySection: React.FC<HomeGallerySectionProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (selectedIndex === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % GALLERY_PHOTOS.length);
    }
  };

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] relative border-b border-gold/15 overflow-hidden">
      {/* Golden Ambient Blur Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-gold/10 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="w-[92%] max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-ivory-200 to-amber-50/60 border border-gold/35 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs uppercase font-medium gold-gradient-text tracking-normal">
              Palatial Visual Archives
            </span>
          </div>

          <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
            Imperial Celebrations in <span className="gold-gradient-text italic font-normal">Authentic Frames</span>
          </h2>

          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Glimpses of real royal weddings planned by Rasm across The Oberoi Udaivilas, Jagmandir Island, Lake Pichola, and Rambagh Palace. Click any image for full-screen view.
          </p>
        </div>

        {/* Clean 3 Grid Layout (As explicitly requested: 3 ke bdle 3 grid lo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(197,160,89,0.18)] hover:border-gold/60 transition-all duration-500"
            >
              {/* Pure image without ANY text superimposed on top */}
              <img
                src={photo.url}
                alt="Rasm Wedding Archive"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
                decoding="async"
              />

              {/* Clean hover icon overlay - ZERO text on image */}
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-charcoal-900" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Full Archives Button */}
        {onNavigate && (
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('/gallery')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-black font-manrope font-medium text-sm tracking-normal shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(197,160,89,0.2)] transition-all duration-300 group"
            >
              <span>Explore Complete Archives (200+ Photos)</span>
              <ArrowRight className="w-4 h-4 text-[#E2C785] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Royal Lightbox Modal mounted directly to document.body via createPortal */}
      {selectedIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar: Counter & Close */}
            <div className="absolute top-5 inset-x-6 flex items-center justify-between text-white z-60 pointer-events-none">
              <span className="text-xs font-mono tracking-widest text-stone-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                {selectedIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all pointer-events-auto shadow-lg"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Photo Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-60 shadow-lg active:scale-95"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Photo Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-60 shadow-lg active:scale-95"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* High-Resolution Photo Display */}
            <div
              className="relative max-w-5xl max-h-[85vh] w-auto h-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_PHOTOS[selectedIndex].url}
                alt="Rasm Wedding Lightbox View"
                className="max-h-[82vh] max-w-[90vw] object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default HomeGallerySection;
