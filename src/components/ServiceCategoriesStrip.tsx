import React from 'react';
import { Crown, Sparkles, Camera, Music, Utensils, HeartHandshake, ArrowRight } from 'lucide-react';

interface ServiceCategoriesStripProps {
  onSelectService: (serviceName: string) => void;
}

export const ServiceCategoriesStrip: React.FC<ServiceCategoriesStripProps> = ({ onSelectService }) => {
  const categories = [
    {
      title: 'Palatial Venues',
      desc: 'Lake Palaces & Fortresses',
      icon: Crown,
      image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
      badge: 'Direct GM Access',
    },
    {
      title: 'Mandap Scenography',
      desc: 'Floating Lake Mandaps',
      icon: Sparkles,
      image: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
      badge: '3D Simulations',
    },
    {
      title: 'Haute-Couture Cinema',
      desc: 'Royal Wedding Photography',
      icon: Camera,
      image: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
      badge: 'Editorial Grade',
    },
    {
      title: 'Royal Baraat & Sufi',
      desc: 'Vintage Fleets & Artists',
      icon: Music,
      image: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
      badge: 'Royalty Processions',
    },
    {
      title: 'Royal Khansama Feasts',
      desc: 'Mewari & Global Banquets',
      icon: Utensils,
      image: 'https://rasmwed.com/wp-content/uploads/2024/07/PTIG5387.webp',
      badge: 'Generational Chefs',
    },
    {
      title: 'White-Glove Concierge',
      desc: '24/7 Global NRI Care',
      icon: HeartHandshake,
      image: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
      badge: 'Airport Charters',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gold/15 relative">
      <div className="rasm-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
            The Complete Royal Ecosystem
          </span>
          <h2 className="font-cinzel font-normal text-3xl sm:text-4xl text-charcoal-900">
            Explore Wedding <span className="gold-gradient-text italic font-normal">Specializations</span>
          </h2>
          <p className="text-charcoal-600 text-sm font-light leading-relaxed mt-2">
            Everything your celebration demands, orchestrated under a singular royal standard with zero intermediaries.
          </p>
        </div>

        {/* 6-Card Category Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => onSelectService(cat.title)}
                className="group text-left p-3 rounded-2xl bg-[#FAF8F5] border border-gold/20 hover:border-gold hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs">
                    <Icon className="w-3.5 h-3.5 text-gold-dark" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                      {cat.badge}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-cinzel font-normal text-sm text-charcoal-900 group-hover:text-gold-dark transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-charcoal-500 font-light mt-0.5 line-clamp-1">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-gold/10 flex items-center justify-between text-[10px] uppercase tracking-wider text-gold-dark font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
