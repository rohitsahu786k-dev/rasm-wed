import React from 'react';
import { Heart, Star, CheckCircle2, ArrowRight } from 'lucide-react';

interface TestimonialCard {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  weddingLocation: string;
  venue: string;
  rating: number;
  review: string;
  tag: string;
}

const TESTIMONIALS_COL1: TestimonialCard[] = [
  {
    id: 't1',
    name: 'Ananya & Siddharth',
    handle: '@ananya_sid',
    avatar: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'The Oberoi Udaivilas',
    rating: 5,
    review: 'Rasm turned Lake Pichola into our royal kingdom. The private jetty arrivals and sunset floating mandap pheras left our international guests in absolute awe.',
    tag: 'Palace Mandap'
  },
  {
    id: 't2',
    name: 'Rhea & Vikram',
    handle: '@rhea.kapoor',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'Taj Lake Palace & Jagmandir',
    rating: 5,
    review: 'Planning our wedding from London was effortless with Rasm\'s 24/7 NRI liaison. Every floral canopy and lighting cue matched their 3D render down to the millimeter.',
    tag: 'Island Buyout'
  },
  {
    id: 't3',
    name: 'Tara & Kabir',
    handle: '@tarakabir',
    avatar: 'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg',
    weddingLocation: 'Jodhpur, Rajasthan',
    venue: 'Umaid Bhawan Palace',
    rating: 5,
    review: 'The vintage car procession and royal Mewari dhol welcome set a regal benchmark. Zero vendor fees, completely transparent budgeting, and stellar execution.',
    tag: 'Royal Baraat'
  },
];

const TESTIMONIALS_COL2: TestimonialCard[] = [
  {
    id: 't4',
    name: 'Pooja & Dev',
    handle: '@pooja.dev',
    avatar: 'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
    weddingLocation: 'Jaipur, Rajasthan',
    venue: 'Rambagh Palace Courtyard',
    rating: 5,
    review: 'Securing GM-level approvals and palace buyouts felt like magic. Rasm took away 100% of our planning anxiety. Unparalleled 5-star white-glove hospitality.',
    tag: 'Heritage Court'
  },
  {
    id: 't5',
    name: 'Suhani & Aditya',
    handle: '@suhani.adi',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'City Palace Complex',
    rating: 5,
    review: 'When unseasonal rain threatened our open terrace sangeet, their 30-minute contingency plan activated flawlessly. The ballroom setup was even more stunning.',
    tag: 'Contingency Guarantee'
  },
  {
    id: 't6',
    name: 'Mira & Arjun',
    handle: '@mira_arjun',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/07/PTIG5387.webp',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'Fateh Garh Heritage Fort',
    rating: 5,
    review: 'Hilltop sunsets, bespoke royal Mewari gastronomy by generational khansamas, and curated mixology. Our guests from New York still call it the wedding of the decade.',
    tag: 'Fort Celebration'
  },
];

const TESTIMONIALS_COL3: TestimonialCard[] = [
  {
    id: 't7',
    name: 'Natasha & Kunal',
    handle: '@natashakunal',
    avatar: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
    weddingLocation: 'Goa Coastal Luxury',
    venue: 'Grand Hyatt Goa',
    rating: 5,
    review: 'The beach sunset mandap was ethereal. The team managed multi-city airport liaisons and chartered arrivals for all 220 guests without a single glitch.',
    tag: 'Coastal Sunset'
  },
  {
    id: 't8',
    name: 'Tanvi & Harsh',
    handle: '@tanvi.harsh',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'The Leela Palace Udaipur',
    rating: 5,
    review: 'From VIP boat escorts to Vedic scholars conducting the pheras with translated English liturgy, every single detail was thoughtful and deeply meaningful.',
    tag: 'Vedic Pheras'
  },
  {
    id: 't9',
    name: 'Lavanya & Sameer',
    handle: '@lavanya_s',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
    weddingLocation: 'Jaipur, Rajasthan',
    venue: 'Fairmont Jaipur',
    rating: 5,
    review: 'The royal welcome with rose petal showers from balconies and ceremonial trumpets created memories of a lifetime. The Rasm team is in a league of their own.',
    tag: 'Palatial Sangeet'
  },
];

const TESTIMONIALS_COL4: TestimonialCard[] = [
  {
    id: 't10',
    name: 'Nisha & Rohan',
    handle: '@nisharohan',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'Jagmandir Island Palace',
    rating: 5,
    review: 'An island buyout wedding on Lake Pichola felt like an impossible dream until Rasm handled the permits, barge logistics, and luxury sound grids seamlessly.',
    tag: 'Island Palace'
  },
  {
    id: 't11',
    name: 'Divya & Nikhil',
    handle: '@divyanikhil',
    avatar: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'The Ananta Udaipur',
    rating: 5,
    review: 'Their 3D spatial pre-visualization gave our parents total peace of mind. On the wedding night, the mandap was an exact replica of the render. True artistry.',
    tag: '3D Spatial Design'
  },
  {
    id: 't12',
    name: 'Priyanka & Gautam',
    handle: '@priyagautam',
    avatar: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    weddingLocation: 'Udaipur, Rajasthan',
    venue: 'Zenana Mahal City Palace',
    rating: 5,
    review: 'Five-star catering curation, custom fireworks over the lake, and flawless hospitality. Rasm gave us a royal celebration worthy of Mewari kings.',
    tag: 'Royal Heritage'
  },
];

interface TestimonialCardItemProps {
  card: TestimonialCard;
}

const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({ card }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)] hover:border-gold/40 transition-all duration-300">
      <div>
        {/* Author Header */}
        <div className="flex items-center gap-3 mb-3.5">
          <div className="relative">
            <img
              src={card.avatar}
              alt={card.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-gold/30 shadow-2xs group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/20" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-manrope font-medium text-sm text-charcoal-900 truncate">
                {card.name}
              </h4>
            </div>
            <p className="text-xs text-charcoal-500 truncate font-light">
              {card.venue}
            </p>
          </div>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(card.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
          ))}
          <span className="text-[11px] text-charcoal-400 ml-1.5 font-light">5.0 Verified</span>
        </div>

        {/* Quote */}
        <p className="text-charcoal-700 text-xs sm:text-[13px] leading-relaxed font-normal">
          "{card.review}"
        </p>
      </div>

      {/* Footer Tag */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider">
          {card.tag}
        </span>
        <span className="text-[11px] text-charcoal-400 font-light">
          {card.weddingLocation.split(',')[0]}
        </span>
      </div>
    </div>
  );
};

interface MarqueeColumnProps {
  cards: TestimonialCard[];
  duration?: string;
  reverse?: boolean;
}

const MarqueeColumn: React.FC<MarqueeColumnProps> = ({ cards, duration = '35s', reverse = false }) => {
  return (
    <div className="flex flex-col overflow-hidden h-[620px] relative">
      <div
        className={`flex flex-col gap-4 py-2 hover:[animation-play-state:paused]`}
        style={{
          animation: `${reverse ? 'marquee-vertical-reverse' : 'marquee-vertical'} ${duration} linear infinite`,
        }}
      >
        {/* Double array for seamless vertical loop */}
        {[...cards, ...cards].map((card, idx) => (
          <TestimonialCardItem key={`${card.id}-${idx}`} card={card} />
        ))}
      </div>
    </div>
  );
};

interface RealCouplesStoriesProps {
  onOpenInquiry?: (context?: string) => void;
}

export const RealCouplesStories: React.FC<RealCouplesStoriesProps> = ({ onOpenInquiry }) => {
  return (
    <section className="py-24 bg-[#FAF8F5] relative border-b border-gold/15 overflow-hidden">
      {/* Inject Keyframe Animation Styles for Vertical Marquee (marquee-03) */}
      <style>{`
        @keyframes marquee-vertical {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-vertical-reverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
      `}</style>

      {/* Subtle Golden Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold/10 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="w-[90%] max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-ivory-200 to-amber-50/60 border border-gold/35 shadow-2xs mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs uppercase font-medium gold-gradient-text tracking-normal">
              Real Royal Testimonials
            </span>
          </div>

          <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
            Love Stories, <span className="gold-gradient-text italic font-normal">Imperial Memories</span>
          </h2>

          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Discerning couples from New York, London, Dubai & India who entrusted their once-in-a-lifetime palace wedding vision to Rasm.
          </p>
        </div>

        {/* 4 Grid Vertical Testimonials Marquee (21st.dev @shadcnspace/components/marquee-03) */}
        <div className="relative">
          {/* Top Edge Fade Mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-20" />
          
          {/* Bottom Edge Fade Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-20" />

          {/* 4 Grid Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Column 1 - Normal */}
            <MarqueeColumn cards={TESTIMONIALS_COL1} duration="32s" reverse={false} />
            
            {/* Column 2 - Reverse */}
            <MarqueeColumn cards={TESTIMONIALS_COL2} duration="38s" reverse={true} />
            
            {/* Column 3 - Normal */}
            <MarqueeColumn cards={TESTIMONIALS_COL3} duration="34s" reverse={false} />
            
            {/* Column 4 - Reverse */}
            <MarqueeColumn cards={TESTIMONIALS_COL4} duration="40s" reverse={true} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenInquiry?.('Palace Wedding Experience')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F1012] text-white hover:bg-black font-manrope font-medium text-sm tracking-normal shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_35px_rgba(197,160,89,0.25)] transition-all duration-300 group"
          >
            <span className="text-white">Begin Your Royal Journey</span>
            <ArrowRight className="w-4 h-4 text-[#E2C785] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RealCouplesStories;
