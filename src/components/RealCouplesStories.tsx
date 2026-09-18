import React, { useState } from 'react';
import { Sparkles, MapPin, Heart, ArrowRight, Star, Quote, CheckCircle2, Grid3X3, LayoutGrid } from 'lucide-react';

interface CoupleStory {
  id: string;
  names: string;
  origin: string;
  city: string;
  venue: string;
  guestCount: string;
  image: string;
  quote: string;
  tag: string;
}

interface RealCouplesStoriesProps {
  onOpenInquiry?: (context?: string) => void;
}

const STORIES: CoupleStory[] = [
  {
    id: 'c1',
    names: 'Ananya & Siddharth',
    origin: 'New York & London',
    city: 'Udaipur, Rajasthan',
    venue: 'The Oberoi Udaivilas',
    guestCount: '220 Guests',
    image: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    quote: 'Rasm turned Lake Pichola into our royal kingdom. The private boat arrivals and sunset floating mandap pheras left our international guests speechless.',
    tag: 'Lake Mandap & Royal Pheras'
  },
  {
    id: 'c2',
    names: 'Pooja & Dev',
    origin: 'California & Mumbai',
    city: 'Jaipur, Rajasthan',
    venue: 'Rambagh Palace & Fairmont',
    guestCount: '350 Guests',
    image: 'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
    quote: 'From getting GM buyouts to 3D spatial simulations before we landed in India, Rasm took away every ounce of stress. Utter 5-star perfection.',
    tag: 'Rajputana Vintage Baraat'
  },
  {
    id: 'c3',
    names: 'Natasha & Kabir',
    origin: 'Dubai & Singapore',
    city: 'Goa Coastal Luxury',
    venue: 'Grand Hyatt Goa',
    guestCount: '180 Guests',
    image: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
    quote: 'The beach sunset mandap was ethereal. The team managed multi-city airport liaisons and chartered arrivals for all 180 guests without a hiccup.',
    tag: 'Coastal Sunset Mandap'
  },
  {
    id: 'c4',
    names: 'Meera & Arjun',
    origin: 'Toronto & New Delhi',
    city: 'Jodhpur, Rajasthan',
    venue: 'Umaid Bhawan Palace',
    guestCount: '280 Guests',
    image: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    quote: 'A grand imperial palace wedding executed with clockwork precision. The Mewari welcome and royal dhol troupe set the tone for three unforgettable days.',
    tag: 'Heritage Fort Celebration'
  },
  {
    id: 'c5',
    names: 'Rhea & Vikram',
    origin: 'London & Sydney',
    city: 'Udaipur, Rajasthan',
    venue: 'Taj Lake Palace & Jagmandir',
    guestCount: '160 Guests',
    image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    quote: 'Planning our wedding from London was so easy with their 24/7 NRI liaison. Every floral arrangement and lighting cue was exact to the 3D model.',
    tag: 'Island Palace Buyout'
  },
];

export const RealCouplesStories: React.FC<RealCouplesStoriesProps> = ({ onOpenInquiry }) => {
  const [columns, setColumns] = useState<4 | 5>(5);

  return (
    <section className="py-24 bg-[#FAF8F5] relative border-b border-gold/15">
      <div className="rasm-container relative z-10">
        
        {/* Header with 4 / 5 Grid Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              <Heart className="w-3.5 h-3.5 text-gold-dark fill-gold-light/40" />
              <span>Real Royal Testimonials</span>
            </div>
            <h2 className="font-cinzel font-normal text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-[0.02em]">
              Love Stories, <span className="gold-gradient-text italic font-normal">Imperial Memories</span>
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mt-2 max-w-2xl">
              Discerning couples from New York, London, Dubai & across India who entrusted their royal wedding vision to Rasm.
            </p>
          </div>

          {/* 4 or 5 Grid Toggle */}
          <div className="flex items-center gap-2 self-start md:self-end bg-white p-1.5 rounded-2xl border border-gold/25 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-medium px-2 hidden sm:inline">
              Layout:
            </span>
            <button
              onClick={() => setColumns(4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                columns === 4
                  ? 'bg-charcoal-900 text-gold shadow-xs'
                  : 'text-charcoal-600 hover:text-gold-dark'
              }`}
              title="View 4 Column Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>4 Grid</span>
            </button>
            <button
              onClick={() => setColumns(5)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                columns === 5
                  ? 'bg-charcoal-900 text-gold shadow-xs'
                  : 'text-charcoal-600 hover:text-gold-dark'
              }`}
              title="View 5 Column Grid"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>5 Grid</span>
            </button>
          </div>
        </div>

        {/* 4 or 5 Testimonials Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 ${
            columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
          }`}
        >
          {STORIES.slice(0, columns === 5 ? 5 : 4).map((story) => (
            <div
              key={story.id}
              className="editorial-card rounded-2xl overflow-hidden bg-white border border-gold/25 shadow-md flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Couple Visual Card Top */}
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img
                  src={story.image}
                  alt={story.names}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Location Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-charcoal-900 border border-gold/30 flex items-center gap-1 shadow-xs">
                  <MapPin className="w-2.5 h-2.5 text-gold-dark" />
                  <span>{story.city.split(',')[0]}</span>
                </div>

                {/* Couple Names & Venue */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-gold block font-medium">
                    {story.origin}
                  </span>
                  <h3 className="font-cinzel font-normal text-lg sm:text-xl text-white leading-tight">
                    {story.names}
                  </h3>
                  <span className="text-[10.5px] text-white/80 block truncate font-light mt-0.5">
                    {story.venue}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* 5-Star Rating & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-charcoal-700 text-xs font-light leading-relaxed italic line-clamp-5">
                    "{story.quote}"
                  </p>
                </div>

                {/* Highlight Tag & Action */}
                <div className="pt-3 border-t border-gold/15 space-y-3">
                  <div className="text-[10.5px] font-medium text-gold-dark bg-ivory-200 px-2.5 py-1 rounded-lg border border-gold/25 truncate text-center">
                    ✦ {story.tag}
                  </div>

                  {onOpenInquiry && (
                    <button
                      onClick={() => onOpenInquiry(`Inspired by ${story.names} at ${story.venue}`)}
                      className="w-full py-2 rounded-lg border border-gold/30 hover:border-gold hover:bg-gold hover:text-charcoal-900 text-charcoal-800 text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 group/btn"
                    >
                      <span>Inquire Vision</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default RealCouplesStories;
