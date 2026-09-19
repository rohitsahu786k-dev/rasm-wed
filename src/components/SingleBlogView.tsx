import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Castle, 
  Users, 
  BedDouble, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Heart, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Crown, 
  Compass, 
  Building2, 
  Plane, 
  Sparkle,
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import { BlogPost, SiteSettings } from '../types';

interface SingleBlogViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  settings: SiteSettings;
  onOpenInquiry: (venueOrTopic?: string) => void;
  onNavigate: (path: string) => void;
}

export const SingleBlogView: React.FC<SingleBlogViewProps> = ({
  post,
  allPosts,
  settings,
  onOpenInquiry,
  onNavigate,
}) => {
  const [activeSpaceTab, setActiveSpaceTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Quick inquiry form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formGuests, setFormGuests] = useState('200 - 400 Guests');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      onOpenInquiry(`${post.title} (Guests: ${formGuests}, Date: ${formDate || 'TBD'})`);
    }, 400);
  };

  // Curated event spaces for this venue / destination
  const spaces = [
    {
      name: 'Lakeside Mandap Promenade',
      type: 'Open-Air Waterfront Lawn',
      capacity: 'Up to 500 Guests',
      seated: '350 Seated',
      idealFor: 'Sacred Sunset Pheras & Vows',
      surface: 'Polished Marble & Lush Grass',
      soundPermit: 'Amplified sound until 10:00 PM',
      highlight: 'Direct reflection on Lake Pichola with lit palace backdrop'
    },
    {
      name: 'Zenana Royal Courtyard',
      type: '18th-Century Rajputana Courtyard',
      capacity: 'Up to 350 Guests',
      seated: '220 Seated',
      idealFor: 'Floral Haldi & Daytime Mehendi',
      surface: 'Hand-carved Sandstone & Domes',
      soundPermit: 'Traditional folk & acoustic permissible all day',
      highlight: 'Centuries-old stone jaali arches and fragrant frangipani trees'
    },
    {
      name: 'Darbar Pillarless Grand Ballroom',
      type: 'Acoustic Sound-Insulated Ballroom',
      capacity: 'Up to 600 Guests',
      seated: '400 Banquet Seating',
      idealFor: 'High-Energy Sangeet & Late-Night Afterparty',
      surface: 'Imported Hardwood & Crystal Chandeliers',
      soundPermit: 'Indoor late-night party permit until 4:00 AM',
      highlight: 'Massive rigging truss support for celebrity artists and LED stages'
    },
    {
      name: 'Aravali Horizon Sky Terrace',
      type: 'Elevated Clifftop Terrace',
      capacity: 'Up to 250 Guests',
      seated: '180 Seated',
      idealFor: 'Welcome Cocktails & Sufi Twilight Mehfil',
      surface: 'Terracotta Flagstone',
      soundPermit: 'Lounge music allowed until 11:00 PM',
      highlight: 'Panoramic 360-degree sunset over the Aravali mountain ridges'
    }
  ];

  // Why we love this venue / destination
  const whyWeLove = [
    {
      title: 'Direct Palatial Access',
      desc: 'Direct partnerships with palace general managers ensuring priority dates and zero broker markups.',
      icon: <Crown className="w-5 h-5 text-gold-dark" />
    },
    {
      title: 'Waterfront & Hilltop Vistas',
      desc: 'Unmatched 360-degree lake and mountain horizons designed for iconic sunset wedding photographs.',
      icon: <Compass className="w-5 h-5 text-gold-dark" />
    },
    {
      title: 'Segregated Jain & Khansama Feasts',
      desc: 'Exclusive Maharaj-led culinary brigades with separate kitchens for Jain and multi-cuisine banquets.',
      icon: <CheckCircle2 className="w-5 h-5 text-gold-dark" />
    },
    {
      title: 'Seamless All-Night Celebrations',
      desc: 'Sound-insulated royal darbars allowing high-energy Bollywood sangeet afterparties until dawn.',
      icon: <Building2 className="w-5 h-5 text-gold-dark" />
    }
  ];

  // Curated gallery images (All text-free, pure real wedding / venue photography)
  const galleryImages = [
    post.featuredImageUrl || 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
  ];

  // Destination / Venue FAQs
  const faqs = [
    {
      q: 'How far in advance should we reserve this venue for a destination wedding?',
      a: 'We recommend initiating discussions 8 to 14 months prior, particularly for peak winter wedding dates between November and March. However, Rasm maintains priority relationships with venue directors to secure prime dates on shorter notice.'
    },
    {
      q: 'Can outside royal khansamas and catering teams be brought in?',
      a: 'Yes. While 5-star properties have executive chefs, Rasm coordinates special Maharaj and Jain kitchen teams to oversee traditional wedding rituals and multi-course royal thalis in segregated kitchen bays.'
    },
    {
      q: 'How does Rasm assist NRI couples who cannot visit India prior to the wedding?',
      a: 'Our Udaipur architecture desk provides photorealistic 3D spatial simulations, scale floorplans, and live FaceTime walk-throughs of every lawn and suite, so you can finalize decor and mandap alignments from London, New York, or Dubai.'
    },
    {
      q: 'What are the music and sound curfew regulations?',
      a: 'In accordance with local regulations, outdoor acoustic music on open palace lawns continues until 10:00 PM. Following 10:00 PM, celebrations transition seamlessly into sound-insulated indoor palatial ballrooms for afterparties until the early morning hours.'
    },
    {
      q: 'Does Rasm handle airport transfers and guest hospitality?',
      a: 'Yes. We orchestrate white-glove hospitality from airport tarmac arrival, chartered luggage vehicles, and traditional royal dhol welcomes to 24/7 guest concierges throughout the wedding festivities.'
    }
  ];

  // Related posts (excluding current)
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-20 bg-white min-h-screen text-charcoal-900 font-sans w-full md:w-[90%] md:max-w-none pl-[10px] pr-0 md:pl-0 md:pr-0 ml-0 mr-0">
      
      {/* 1. TOP BREADCRUMB & BACK BAR */}
      <div className="bg-[#FAF8F5] border-b border-gold/20 py-3.5 w-full pl-0 pr-0 ml-0 mr-0">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('/wedding-destination')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-charcoal-700 hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gold-dark" />
            <span>Back to Royal Venues & Journal</span>
          </button>

          <div className="flex items-center gap-3 pr-2 sm:pr-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/30 bg-white text-charcoal-700 hover:bg-gold/10 hover:border-gold transition-colors text-xs font-medium"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Share Guide</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-1.5 rounded-full border transition-colors ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-gold/30 text-charcoal-600 hover:text-rose-500'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. IMMERSIVE HERO SECTION (Meragi Style, Royal Elevated) */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[640px] w-full overflow-hidden bg-charcoal-900 pl-0 pr-0 ml-0 mr-0 rounded-2xl my-2">
        <img
          src={post.featuredImageUrl || 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85 scale-105 animate-subtle-zoom"
        />
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-transparent to-transparent" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end w-full pl-4 sm:pl-8 pr-4 pb-28 sm:pb-32">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-gold text-xs uppercase tracking-[0.25em] font-medium">
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>{post.category || 'Royal Palaces & Destination Guides'}</span>
            </div>

            <h1 className="font-manrope text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 font-light pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{post.date}</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{post.readTime || '6 min read'}</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Curated by Rasm Senior Wedding Architects</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLOATING GLASSMORPHIC INFO CARD (Exact Meragi -mt-36 Glass Banner) */}
      <div className="relative z-20 -mt-20 sm:-mt-24 w-full pl-0 pr-0 ml-0 mr-0">
        <div className="rounded-3xl border border-gold/30 bg-white/95 backdrop-blur-xl shadow-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* 4 Info Pills */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-charcoal-400 text-[10px] uppercase tracking-wider block font-medium">
                  Region
                </span>
                <div className="flex items-center gap-1.5 font-bold text-charcoal-900">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  <span>Rajasthan, India</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-charcoal-400 text-[10px] uppercase tracking-wider block font-medium">
                  Guest Capacity
                </span>
                <div className="flex items-center gap-1.5 font-bold text-charcoal-900">
                  <Users className="w-4 h-4 text-gold-dark" />
                  <span>Up to 800 Pax</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-charcoal-400 text-[10px] uppercase tracking-wider block font-medium">
                  Venue Category
                </span>
                <div className="flex items-center gap-1.5 font-bold text-charcoal-900">
                  <Castle className="w-4 h-4 text-gold-dark" />
                  <span>Royal Heritage</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-charcoal-400 text-[10px] uppercase tracking-wider block font-medium">
                  Direct Buyout
                </span>
                <div className="flex items-center gap-1.5 font-bold text-charcoal-900">
                  <Crown className="w-4 h-4 text-gold-dark" />
                  <span>GM Priority Access</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <button
                onClick={() => onOpenInquiry(post.title)}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38E3C] text-charcoal-900 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center"
              >
                Inquire Dates & Buyout
              </button>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-gold/40 text-charcoal-800 text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-gold-dark" />
                <span>WhatsApp Royal Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. IN-PAGE STICKY NAVIGATION ANCHOR BAR */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gold/20 shadow-2xs mt-8 w-full pl-0 pr-0 ml-0 mr-0">
        <div className="w-full pl-0 pr-0 ml-0 mr-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-6 sm:gap-8 py-3.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap">
            <a href="#overview" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              Overview
            </a>
            <a href="#why-we-love" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              Why We Love It
            </a>
            <a href="#ceremony-spaces" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              Ceremony Spaces
            </a>
            <a href="#accommodation" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              Suites & Stay
            </a>
            <a href="#logistics" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              Logistics
            </a>
            <a href="#real-weddings" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              Gallery
            </a>
            <a href="#faqs" className="text-charcoal-700 hover:text-gold-dark transition-colors">
              FAQs
            </a>
          </div>
        </div>
      </div>

      {/* 5. MAIN EDITORIAL CONTENT (2 Columns: 70% Left Editorial + 30% Right Sticky Sidebar) */}
      <div className="w-full pl-0 pr-0 ml-0 mr-0 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT EDITORIAL COLUMN (70%) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* A. MULTI-IMAGE MOSAIC SHOWCASE */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-2xl overflow-hidden">
              <div 
                onClick={() => setLightboxImage(galleryImages[0])}
                className="sm:col-span-8 h-72 sm:h-96 relative group cursor-pointer overflow-hidden rounded-xl bg-charcoal-100"
              >
                <img
                  src={galleryImages[0]}
                  alt="Venue Primary Showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
                  <span>Click to view full size</span>
                </div>
              </div>

              <div className="sm:col-span-4 grid grid-cols-2 sm:grid-cols-1 gap-3">
                {galleryImages.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxImage(img)}
                    className="h-34 sm:h-[186px] relative group cursor-pointer overflow-hidden rounded-xl bg-charcoal-100"
                  >
                    <img
                      src={img}
                      alt={`Gallery thumbnail ${i}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* B. OVERVIEW & EDITORIAL ARTICLE BODY */}
            <section id="overview" className="prose prose-stone max-w-none">
              <div className="border-l-2 border-gold pl-5 mb-8">
                <p className="font-manrope text-lg sm:text-xl text-charcoal-900 italic font-medium leading-relaxed">
                  "{post.excerpt || 'An imperial destination where centuries of royal Rajputana heritage harmonize with contemporary luxury hospitality, creating unforgettable memories for discerning families from across the globe.'}"
                </p>
              </div>

              {post.content ? (
                <div
                  className="text-charcoal-700 text-sm sm:text-base leading-relaxed font-light space-y-6 [&_h2]:font-manrope [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-2xl [&_h2]:text-charcoal-900 [&_h3]:font-manrope [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-xl [&_p]:leading-relaxed [&_img]:rounded-2xl [&_img]:my-6 [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="text-charcoal-700 text-sm sm:text-base leading-relaxed font-light space-y-5">
                  <p>
                    Nestled in the imperial heartlands of Rajasthan, this magnificent property stands as an emblem of architectural majesty. Built according to timeless principles of royal palace design, the estate offers an immersive setting for couples seeking a wedding celebration that blends sacred traditions with five-star contemporary opulence.
                  </p>
                  <p>
                    From the moment your guests arrive greeted by traditional Rajasthani nagada drums and rose petal showers, every detail is orchestrated to perfection. The property features sprawling manicured lawns overlooking historic water bodies, hand-carved stone pillared pavilions for the sacred pheras, and sound-insulated indoor darbar ballrooms for vibrant sangeet galas that extend into the twilight hours.
                  </p>
                </div>
              )}
            </section>

            {/* C. WHY WE LOVE THIS VENUE / DESTINATION (Meragi Bento Style) */}
            <section id="why-we-love" className="pt-6 border-t border-gold/20">
              <div className="mb-6">
                <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                  Architectural Distinction
                </span>
                <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                  Why We Love This Setting
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                  Handpicked architectural and logistical features verified by Rasm planners.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyWeLove.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-gold/25 hover:border-gold transition-all duration-300 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white border border-gold/30 flex items-center justify-center mb-4 shadow-2xs">
                        {item.icon}
                      </div>
                      <h3 className="font-manrope text-lg text-charcoal-900 font-medium mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* D. CEREMONY SPACES DESIGNED FOR CELEBRATION (Interactive Tabs) */}
            <section id="ceremony-spaces" className="pt-6 border-t border-gold/20">
              <div className="mb-6">
                <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                  Event Layouts
                </span>
                <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                  Spaces Designed for Celebration
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                  Versatile palatial lawns and indoor darbars tailored for each ceremony.
                </p>
              </div>

              {/* Space Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {spaces.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSpaceTab(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border ${
                      activeSpaceTab === idx
                        ? 'bg-charcoal-900 text-gold border-charcoal-900 shadow-md'
                        : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-gold/40'
                    }`}
                  >
                    {sp.name}
                  </button>
                ))}
              </div>

              {/* Active Space Detail Card */}
              {spaces[activeSpaceTab] && (
                <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-white border border-gold/30 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold/15 pb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                        {spaces[activeSpaceTab].type}
                      </span>
                      <h3 className="font-manrope text-xl sm:text-2xl text-charcoal-900 font-medium mt-0.5 tracking-tight">
                        {spaces[activeSpaceTab].name}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-ivory-200 border border-gold/40 text-gold-dark text-xs font-semibold w-fit">
                      {spaces[activeSpaceTab].capacity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-charcoal-400 text-[10px] uppercase font-medium block">Seating Setup</span>
                      <span className="font-bold text-charcoal-900">{spaces[activeSpaceTab].seated}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-400 text-[10px] uppercase font-medium block">Ideal Ritual</span>
                      <span className="font-bold text-charcoal-900">{spaces[activeSpaceTab].idealFor}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-400 text-[10px] uppercase font-medium block">Surface Type</span>
                      <span className="font-bold text-charcoal-900">{spaces[activeSpaceTab].surface}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-400 text-[10px] uppercase font-medium block">Audio Curfew</span>
                      <span className="font-bold text-charcoal-900">{spaces[activeSpaceTab].soundPermit}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gold/20 flex items-start gap-3 text-xs">
                    <Sparkles className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                    <p className="text-charcoal-700 font-light leading-relaxed">
                      <strong className="font-semibold text-charcoal-900">Rasm Architect Note: </strong>
                      {spaces[activeSpaceTab].highlight}. Our in-house technical crew provides custom 3D spatial simulations for mandap orientation and guest flow.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* E. PALATIAL ACCOMMODATION & SUITES */}
            <section id="accommodation" className="pt-6 border-t border-gold/20">
              <div className="mb-6">
                <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                  Guest Experience
                </span>
                <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                  Accommodation & Palatial Suites
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                  Luxury room inventory, VIP bridal suites, and white-glove check-in management.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-gold/25 shadow-2xs">
                  <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-1">
                    Grand Presidential Suite
                  </span>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    Designed for bridal glam and family portraits, featuring private plunge pools, dressing parlours, and lake views.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-gold/25 shadow-2xs">
                  <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-1">
                    Heritage Room Blocks
                  </span>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    Direct wholesale group allocations for 150 - 450 guests without retail rate markups.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-gold/25 shadow-2xs">
                  <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-1">
                    Custom Welcome Desks
                  </span>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    Dedicated Rasm hospitality team stationed at the lobby for key distribution, luggage tags, and itinerary cards.
                  </p>
                </div>
              </div>
            </section>

            {/* F. LOGISTICS & GETTING THERE */}
            <section id="logistics" className="pt-6 border-t border-gold/20">
              <div className="mb-6">
                <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                  Seamless Connectivity
                </span>
                <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                  Getting There & VIP Logistics
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                  Connecting international and domestic guests directly to the palace grounds.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gold/20 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-gold-dark flex-shrink-0" />
                    <div>
                      <span className="font-bold text-charcoal-900 block">Nearest Airport</span>
                      <span className="text-charcoal-600 font-light">30-45 mins direct luxury escort</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gold-dark flex-shrink-0" />
                    <div>
                      <span className="font-bold text-charcoal-900 block">Flight Connectivity</span>
                      <span className="text-charcoal-600 font-light">Direct daily flights from Delhi, Mumbai, Bengaluru</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-gold-dark flex-shrink-0" />
                    <div>
                      <span className="font-bold text-charcoal-900 block">Private Charter & Helipad</span>
                      <span className="text-charcoal-600 font-light">Helipad clearances available on site</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* G. REAL WEDDINGS GALLERY (Executed by Rasm) */}
            <section id="real-weddings" className="pt-6 border-t border-gold/20">
              <div className="mb-6">
                <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                  Scenography & Moments
                </span>
                <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                  Real Celebrations Executed
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                  Authentic mandaps, floral cascades, and night lighting orchestrated by Rasm.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImage(img)}
                    className="h-44 sm:h-52 rounded-xl overflow-hidden cursor-pointer group relative bg-charcoal-100"
                  >
                    <img
                      src={img}
                      alt={`Real wedding ${idx}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase font-medium">
                      <span>Zoom Photo</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* H. CURATED FAQS (Meragi Accordion Style) */}
            <section id="faqs" className="pt-6 border-t border-gold/20">
              <div className="mb-6">
                <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                  Clarity For Couples
                </span>
                <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gold/25 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left py-4 px-5 flex justify-between items-center font-medium text-charcoal-900 hover:bg-[#FAF8F5] transition-colors"
                      >
                        <span className="pr-4 text-xs sm:text-sm font-semibold tracking-wide">
                          {faq.q}
                        </span>
                        <span className="text-gold-dark text-lg font-bold flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed border-t border-gold/10 bg-[#FCFBF9]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT STICKY LUXURY SIDEBAR (30%) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              {/* Quick Royal Inquiry Card */}
              <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-white to-[#FAF8F5] p-6 shadow-xl relative overflow-hidden">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold/15 text-gold-dark text-[10px] uppercase font-bold tracking-wider mb-2">
                    <Crown className="w-3 h-3 text-gold-dark" />
                    <span>Direct Royal Desk</span>
                  </div>
                  <h3 className="font-manrope text-xl text-charcoal-900 font-medium tracking-tight">
                    Inquire Venue Dates & Terms
                  </h3>
                  <p className="text-xs text-charcoal-500 font-light mt-1">
                    Receive unlisted palace date availability and bespoke buyout estimates.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-semibold text-emerald-900 text-sm">Inquiry Received</h4>
                    <p className="text-xs text-emerald-700 font-light">
                      Our senior wedding architect will connect with you via WhatsApp within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickInquiry} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-charcoal-600 mb-1 tracking-wider">
                        Couple's Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Radhika Sharma & Siddharth"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-charcoal-600 mb-1 tracking-wider">
                        Phone / WhatsApp (with country code) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+44 7911 123456 / +91"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-charcoal-600 mb-1 tracking-wider">
                          Preferred Month/Date
                        </label>
                        <input
                          type="text"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          placeholder="e.g. Dec 2026"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-charcoal-600 mb-1 tracking-wider">
                          Guest Count
                        </label>
                        <select
                          value={formGuests}
                          onChange={(e) => setFormGuests(e.target.value)}
                          className="w-full px-2.5 py-2 text-xs rounded-lg border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                        >
                          <option>50 - 150 Guests</option>
                          <option>150 - 350 Guests</option>
                          <option>350 - 600 Guests</option>
                          <option>600+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38E3C] text-charcoal-900 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center relative overflow-hidden group"
                    >
                      <span className="relative z-10">Request Private Curation</span>
                      <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000" />
                    </button>

                    <div className="text-center pt-1">
                      <span className="text-[10px] text-charcoal-400 font-light">
                        🔒 Direct GM access · Zero broker fee · 100% confidential
                      </span>
                    </div>
                  </form>
                )}
              </div>

              {/* Rasm Planner Inclusions Card */}
              <div className="rounded-2xl border border-gold/25 bg-[#FAF8F5] p-5 space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-charcoal-900 block">
                  The Rasm Commitment
                </span>
                <ul className="space-y-2 text-xs text-charcoal-600 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                    <span>Direct GM room block priority</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                    <span>3D photorealistic mandap pre-visuals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                    <span>24/7 UK/USA/UAE timezone coordination</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                    <span>Airport tarmac & luggage liaison desk</span>
                  </li>
                </ul>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center space-y-2">
                <span className="text-xs font-semibold text-emerald-900 block">
                  Need Immediate Palace Guidance?
                </span>
                <p className="text-[11px] text-emerald-700 font-light">
                  Speak directly with our senior wedding architects on WhatsApp.
                </p>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. SIMILAR ROYAL VENUES & STORIES (Exact Meragi Related Section) */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#FAF8F5] border-t border-gold/20 w-full pl-0 pr-0 ml-0 mr-0 rounded-2xl my-6">
          <div className="w-full pl-0 pr-0 ml-0 mr-0">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                Curated Recommendations
              </span>
              <h2 className="font-manrope text-2xl sm:text-3xl text-charcoal-900 font-medium tracking-tight leading-snug">
                Similar Royal Venues & Guides
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(p => (
                <article
                  key={p.id}
                  onClick={() => onNavigate(`/${p.slug}`)}
                  className="rounded-2xl overflow-hidden bg-white border border-gold/20 hover:border-gold shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="h-48 overflow-hidden bg-charcoal-100 relative">
                    <img
                      src={p.featuredImageUrl || 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-charcoal-900 border border-gold/30">
                      {p.date}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-manrope text-base text-charcoal-900 font-medium group-hover:text-gold-dark transition-colors line-clamp-2 mb-2 tracking-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs text-charcoal-600 font-light line-clamp-2 leading-relaxed">
                        {p.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-gold-dark">
                      <span>Explore Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Expanded view"
            referrerPolicy="no-referrer"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 8. MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gold/30 p-3 flex items-center justify-between shadow-lg">
        <div className="truncate max-w-[60%] pr-2">
          <span className="text-[10px] text-gold-dark uppercase tracking-wider font-semibold block">
            Royal Venue Guide
          </span>
          <span className="text-xs font-bold text-charcoal-900 truncate block">
            {post.title}
          </span>
        </div>
        <button
          onClick={() => onOpenInquiry(post.title)}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-charcoal-900 font-bold text-xs uppercase tracking-wider shadow-md whitespace-nowrap"
        >
          Inquire Dates
        </button>
      </div>
    </div>
  );
};
