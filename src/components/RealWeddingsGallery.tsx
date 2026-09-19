import React, { useState } from 'react';
import { MediaItem } from '../types';
import { Sparkles, Maximize2, X, Crown, MapPin } from 'lucide-react';

interface RealWeddingsGalleryProps {
  media: MediaItem[];
}

export const RealWeddingsGallery: React.FC<RealWeddingsGalleryProps> = ({ media }) => {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'mandap' | 'rituals' | 'palaces' | 'portraits'>('all');

  // 100% Clean, Text-Free Authentic Wedding & Palace Venue Photographs from WordPress Media
  const curatedGallery: (MediaItem & { category: 'mandap' | 'rituals' | 'palaces' | 'portraits'; location: string })[] = [
    {
      id: 'g1',
      title: 'Sacred Vows by Lake Pichola',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
      altText: 'Vedic wedding vows by Lake Pichola at sunset',
      category: 'mandap',
      location: 'Lake Pichola, Udaipur',
    },
    {
      id: 'g2',
      title: 'Forever Bond - Sacred Pheras',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
      altText: 'Bride and groom completing pheras symbolizing lifelong commitment',
      category: 'rituals',
      location: 'The Leela Palace, Udaipur',
    },
    {
      id: 'g3',
      title: 'The Oberoi Udaivilas Grandeur',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
      altText: 'Mewar royal architecture and lakeside reflections',
      category: 'palaces',
      location: 'The Oberoi Udaivilas',
    },
    {
      id: 'g4',
      title: 'Jagmandir Island Palace Mandap',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
      altText: 'Island palace wedding setup illuminated at twilight',
      category: 'mandap',
      location: 'Jagmandir Island Palace',
    },
    {
      id: 'g5',
      title: 'Palatial Floral Architecture',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
      altText: 'Bespoke royal mandap florals and crystal chandeliers',
      category: 'mandap',
      location: 'City Palace Courtyard',
    },
    {
      id: 'g6',
      title: 'Royal Procession & Baraat Cavalcade',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
      altText: 'Rajputana wedding procession with royal pomp and dhol',
      category: 'rituals',
      location: 'Palace Forecourt',
    },
    {
      id: 'g7',
      title: 'Royal Couple Portrait at Dusk',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
      altText: 'Bride and groom palatial celebration portrait',
      category: 'portraits',
      location: 'Fateh Garh Palace',
    },
    {
      id: 'g8',
      title: 'Hilltop Mewar Heritage Sanctuary',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
      altText: 'Heritage palace overlooking Udaipur lake valley',
      category: 'palaces',
      location: 'Fateh Garh, Udaipur',
    },
    {
      id: 'g9',
      title: 'Sacred Rituals & Vedic Blessings',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg',
      altText: 'Traditional Indian wedding ceremony moments',
      category: 'rituals',
      location: 'Ganga Ghats, Rishikesh',
    },
  ];

  const filteredItems = curatedGallery.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="gallery" className="py-24 bg-[#FDFCFA] relative border-b border-gold/15">
      <div className="rasm-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Visual Archives</span>
          </div>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
            The <span className="gold-gradient-text italic font-normal">Royal Gallery</span>
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
            Real moments of majestic heritage, emotional vows, and vibrant family celebrations orchestrated across India’s most coveted palace venues.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {[
              { id: 'all', label: 'All Celebrations' },
              { id: 'mandap', label: 'Lake Mandaps' },
              { id: 'rituals', label: 'Vedic Rituals' },
              { id: 'palaces', label: 'Palatial Venues' },
              { id: 'portraits', label: 'Royal Portraits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-charcoal-900 text-gold-light shadow-md border border-gold/40'
                    : 'bg-white text-charcoal-600 hover:text-charcoal-900 border border-gold/20 hover:border-gold/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (Pure Real Photos, NO Text on Images) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="editorial-card rounded-2xl overflow-hidden cursor-pointer group relative h-80 bg-stone-100 border border-gold/20"
            >
              <img
                src={item.sourceUrl}
                alt={item.altText || item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <MapPin className="w-3 h-3 text-gold-light" />
                  <span>{item.location}</span>
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="font-manrope font-medium text-xl text-white group-hover:text-gold-light transition-colors line-clamp-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1 line-clamp-1">
                  {item.altText || 'Rasm Luxury Wedding Celebration'}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-4 h-4 text-charcoal-900" />
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="max-w-5xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-gold/40 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-2/3 h-80 md:h-auto relative bg-black flex items-center justify-center">
                <img
                  src={selectedImage.sourceUrl}
                  alt={selectedImage.altText || selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="md:w-1/3 p-8 flex flex-col justify-between bg-stone-900 text-white">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-gold-light text-xs uppercase tracking-[0.25em]">
                    <Crown className="w-4 h-4 text-gold" />
                    <span>Real Celebration Archive</span>
                  </div>

                  <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                    {selectedImage.title}
                  </h3>

                  <div className="h-px w-16 bg-gold/40 my-3" />

                  <p className="text-sm text-stone-300 font-light leading-relaxed">
                    {selectedImage.altText}
                  </p>

                  <div className="p-4 rounded-xl bg-white/5 border border-gold/20 text-xs space-y-1.5">
                    <span className="text-gold-light block uppercase tracking-wider text-[10px]">
                      Authentic Curation
                    </span>
                    <p className="text-stone-300 font-light">
                      Orchestrated by Rasm Wedding & Events across premier heritage properties of Rajasthan.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest text-charcoal-900 bg-gradient-to-r from-gold via-gold-light to-gold hover:opacity-95 font-semibold transition-all shadow-md"
                  >
                    Inquire Similar Celebration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
