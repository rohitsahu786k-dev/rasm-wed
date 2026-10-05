import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Landmark,
  HeartHandshake,
  Hotel,
  MapPin,
  MessageCircle,
  Music,
  PartyPopper,
  Phone,
  Plane,
  ReceiptText,
  ShieldCheck,
  Flower2,
  Train,
  UtensilsCrossed,
  Wine,
} from 'lucide-react';
import type { Destination } from '@/types';
import type { WPPage, WPPost } from '@/lib/wp';
import { InquiryAnimatedButton } from '@/components/InquiryClient';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand, ExploreLinks, Facts } from '@/components/PageParts';
import { NearbyDestinations, RelatedGuides } from '@/components/CityParts';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { FACTS } from '@/data/pages-content';
import { SITE } from '@/lib/site';

interface JodhpurWeddingPageProps {
  nearby: Destination[];
  posts: WPPost[];
  wpPage?: WPPage | null;
}

const JODHPUR_VENUES = [
  {
    id: 'umaid-bhawan-palace',
    name: 'Umaid Bhawan Palace (Taj Hotels)',
    category: 'Ultra-Luxury Heritage Palace',
    capacity: '150 – 1,000+ Guests',
    tagline: 'World’s Leading Royal Residence & Global Celebrity Wedding Landmark',
    image: '/images/jodhpur/umaid-bhawan-hero.jpg',
    costRange: '₹2.0 Cr – ₹4.5 Cr+ (Buyout & Royal Extravaganza)',
    description:
      'Perched majestically atop Chittar Hill, Umaid Bhawan Palace is one of the world’s largest private royal residences and a globally celebrated destination wedding venue. Built with golden-yellow Chittar sandstone and featuring 26 acres of manicured Baradari lawns and grand Art Deco ballrooms, it famously hosted the high-profile wedding of Priyanka Chopra & Nick Jonas. With world-class Taj hospitality, antique royal suites, and dramatic evening lighting, Umaid Bhawan Palace represents the pinnacle of royal celebrations in India.',
    highlights: [
      '26 acres of sprawling lush Baradari & Marwar lawns for grand vows and receptions',
      'Art Deco ballrooms and grand banquets with Michelin-calibre Taj culinary curation',
      'Fine presidential suites with authentic royal family heirlooms and butler service',
      'Complete private palace buyout options available for exclusive VIP & celebrity weddings',
    ],
    bestFor: 'Grand Sangeet Galas, Grand Pheras, & Multi-Day Royal Buyout Weddings',
  },
  {
    id: 'mehrangarh-fort',
    name: 'Mehrangarh Fort (The Citadel of the Sun)',
    category: '15th-Century Medieval Fortress',
    capacity: '100 – 800 Guests',
    tagline: 'Towering 400 Feet Above the Blue City with Illuminated Battlement Galas',
    image: '/images/jodhpur/mehrangarh-fort.jpg',
    costRange: '₹35 Lakhs – ₹75 Lakhs (Evening Venue & Trust Permitting)',
    description:
      'Rising 400 feet above Jodhpur’s skyline, Mehrangarh Fort offers the most dramatic, awe-inspiring wedding backdrop in the world. While sacred pheras are typically hosted in adjacent palace hotels, the fort’s historic courtyards—including the Zenana Deodi, Jaipol, and high ramparts—host the most legendary pre-wedding Sangeet galas, Sufi nights, and royal welcome dinners in Asia. At night, golden floodlights illuminate the colossal sandstone walls against starry desert skies.',
    highlights: [
      'Unmatched panoramic nighttime views overlooking the illuminated Blue City of Jodhpur',
      'Intricate sandstone latticework (jaalis), historic courtyards, and torchlit entryways',
      'Complete liaison with the Mehrangarh Museum Trust for VIP access and sound permissions',
      'Specialized engineering required for sound, illumination, and uphill guest logistics',
    ],
    bestFor: 'Illuminated Fort Sangeets, Sufi Dinners, & Torchlit Royal Welcome Galas',
  },
  {
    id: 'ajit-bhawan',
    name: 'Ajit Bhawan Palace',
    category: 'India’s Pioneer Heritage Hotel',
    capacity: '80 – 350 Guests',
    tagline: 'Intimate Vintage Rajput Elegance & Secluded Garden Courtyards',
    image: '/images/jodhpur/mehrangarh-courtyard.jpg',
    costRange: '₹50 Lakhs – ₹95 Lakhs (Full Heritage Property Buyout)',
    description:
      'Constructed in 1927 for Maharaja Sir Ajit Singh, Ajit Bhawan is revered as India’s very first heritage hotel. Brimming with vintage royal Rajput elegance, stone-carved gazebos, a famous vintage car collection, and tranquil swimming pool courtyards, it offers an exclusive, intimate setting where families can book out the entire property for a private, authentic Marwari royal celebration.',
    highlights: [
      'Boutique scale allowing complete royal family property buyout and total privacy',
      'Enchanting poolside courtyard ideal for vibrant daytime Mehndi and evening cocktails',
      'Vintage Rolls Royce and antique convertibles available for the groom’s royal Baraat',
      'Authentic Rajput stone architecture, hand-painted murals, and lush heritage suites',
    ],
    bestFor: 'Intimate Palace Buyouts, Poolside Shahi Mehndi, & Heritage Welcome Soirees',
  },
  {
    id: 'bal-samand-lake-palace',
    name: 'Bal Samand Lake Palace',
    category: '17th-Century Lakeside Palace Retreat',
    capacity: '150 – 500 Guests',
    tagline: 'Red Sandstone Beauty by Historic Waterways & Pomegranate Orchards',
    image: '/images/jodhpur/mandore-gardens.jpg',
    costRange: '₹65 Lakhs – ₹1.3 Cr (Multi-Day Destination Wedding)',
    description:
      'Situated on the shores of a 12th-century lake and encircled by private pomegranate, lime, and mango orchards, Bal Samand Lake Palace was the legendary summer retreat of Jodhpur’s royal family. Built in ornate red sandstone, it provides a cooling, tranquil oasis with expansive lawns, peacock retreats, and romantic waterfront terraces ideal for sunset pheras.',
    highlights: [
      'Waterfront lawns and manicured gardens overlooking the historic royal lake',
      'Red sandstone architectural pavilions designed for scenic open-air wedding rituals',
      'Peaceful natural bird retreat ambience with peacocks roaming the royal grounds',
      'Expansive outdoor layout accommodating multi-themed carnival and dinner setups',
    ],
    bestFor: 'Sunset Lakeside Pheras, Haldi Carnivals, & Beautiful Garden Banquets',
  },
  {
    id: 'raas-jodhpur',
    name: 'RAAS Jodhpur (Heritage Stepwell Haveli)',
    category: 'Luxury Boutique Design Haveli',
    capacity: '60 – 200 Guests',
    tagline: 'Modern Architectural Luxury Overlooking Toorji Ka Jhalra Stepwell',
    image: '/images/jodhpur/blue-city-jodhpur.jpg',
    costRange: '₹45 Lakhs – ₹85 Lakhs (Boutique Luxury Buyout)',
    description:
      'Nestled right at the base of Mehrangarh Fort and overlooking the 18th-century Toorji Ka Jhalra stepwell, RAAS Jodhpur smoothly merges four historic 18th-century Rajput sandstone havelis with sleek contemporary luxury. Highly favored by international, NRI, and careful design-forward couples, RAAS offers an intimate, ultra-chic setting with unmatched views looking straight up at the colossal fort.',
    highlights: [
      'Direct, theatrical views looking straight up at the towering Mehrangarh Fort battlements',
      'Stepwell-facing sunset cocktail terraces and tranquil heated courtyard swimming pool',
      'Internationally acclaimed boutique architecture and award-winning farm-to-table dining',
      'Chic atmosphere tailored for modern cocktail parties, welcome soirees, and after-parties',
    ],
    bestFor: 'Pre-Wedding Cocktails, Western-Style Receptions, & Chic Boutique Gatherings',
  },
  {
    id: 'osian-desert-dunes',
    name: 'Royal Dunes of Osian (Thar Desert Retreats)',
    category: 'Thar Desert Oasis & Luxury Glamping',
    capacity: '100 – 400 Guests',
    tagline: 'Golden Sand Dune Sunsets, Camel Caravans & Star-Lit Bonfire Nights',
    image: 'https://rasmwed.com/wp-content/uploads/2026/10/golden_desert_wedding_lounge_at_sunset.webp',
    costRange: '₹40 Lakhs – ₹75 Lakhs (Desert Experience & Luxury Tents)',
    description:
      'Located just a 60-minute drive outside Jodhpur, Osian offers the untamed romance of the Thar Desert. Couples and guests can celebrate under millions of stars surrounded by shimmering golden dunes, luxury air-conditioned Swiss tent villages, camel caravan processions, and acoustic folk performances by famed desert Manganiyars around crackling royal bonfires.',
    highlights: [
      'Golden hour camel and vintage open-top jeep safari processions for the groom’s Baraat',
      'Open-air desert banquets with live Manganiyar vocalists and Kalbelia fire dancers',
      'Luxury air-conditioned Swiss tent settlements with private en-suite bathrooms for guests',
      'Complete creative freedom with sound timings, fireworks, and desert laser projections',
    ],
    bestFor: 'Desert Sangeet Extravaganzas, Bohemian Haldi, & Star-Lit Campfire Galas',
  },
];

const SIGNATURE_ITINERARY = [
  {
    day: 'Day 01',
    theme: 'Padharo Mhare Desh: The Royal Welcome & Shahi Mehndi',
    sub: 'Heritage Courtyards · Live Folk Melodies · Vibrant Marwari Baithak',
    events: [
      {
        time: '12:00 PM – 02:00 PM',
        title: 'Grand Rajput Welcome Fanfare',
        desc: 'Traditional Nagada and Shehnai fanfare, rose petal showers from palace jharokhas, Aarti tikka by royal attendants, and chilled saffron-pistachio thandai welcome drinks.',
      },
      {
        time: '03:30 PM – 06:30 PM',
        title: 'Shahi Mehndi & Marwari Craft Bazaar',
        desc: 'Poolside cabanas draped in vibrant Leheriya and Bandhej textiles, live local lac bangle craftsmen, block-printing ateliers, and organic herbal henna artists.',
      },
      {
        time: '07:30 PM – 11:30 PM',
        title: 'Courtyard Sufi Night & Royal Rajput Banquet',
        desc: 'Under glittering vintage crystal chandeliers, guests enjoy acoustic Sufi vocalists and a selected multi-course royal Rajasthani dawat with live sigri kebabs.',
      },
    ],
  },
  {
    day: 'Day 02',
    theme: 'Phoolon Ki Holi, Royal Haldi & The Grand Fort Sangeet Gala',
    sub: 'Yellow Marigold Showers · Marwari Street Chaat · High-Voltage Musical Sangeet',
    events: [
      {
        time: '10:30 AM – 01:00 PM',
        title: 'Phoolon Ki Holi & Citrus Haldi Carnival',
        desc: 'Traditional brass urli floral baths, organic herbal gulal, fragrant marigold showers, energetic live dhol players, and refreshing coconut water stations.',
      },
      {
        time: '01:00 PM – 03:00 PM',
        title: 'Live Jodhpur Chaat Street & Shahi Lunch',
        desc: 'Authentic local live counters serving steaming Jodhpuri Pyaaz Kachori, Mirchi Vada, Dal Baati Churma, Ker Sangri, and freshly hand-churned Makhaniya Lassi.',
      },
      {
        time: '07:30 PM – 02:00 AM',
        title: 'The Grand Mehrangarh Sangeet Extravaganza',
        desc: 'Concert-grade intelligent lighting and acoustic sound framed against medieval ramparts, celebrity wedding anchors, Kalbelia fire dancers, family performances, and DJ after-party.',
      },
    ],
  },
  {
    day: 'Day 03',
    theme: 'The Grand Baraat, Sunset Vedic Pheras & Gala Reception',
    sub: 'Caparisoned Horses · Floral Sandstone Mandap · Black-Tie Banquet',
    events: [
      {
        time: '04:00 PM – 05:30 PM',
        title: 'The Royal Baraat Procession',
        desc: 'Vintage open-top convertibles, decorated royal Rajput horses, traditional brass band, floral velvet umbrellas, and dhol players leading the joyous procession.',
      },
      {
        time: '05:45 PM – 07:30 PM',
        title: 'Sunset Pheras at the Baradari Lawns',
        desc: 'Sacred Vedic hymns recited beneath a floral mandap adorned with rajnigandha and avalanche roses, glowing against the golden sandstone palace facade at dusk.',
      },
      {
        time: '08:30 PM – Midnight',
        title: 'The Grand Grand Reception & Fireworks',
        desc: 'Black-tie sit-down royal silver thali banquet, champagne toasts, family speeches, and a synchronized aerial fireworks display lighting up the Jodhpur night sky.',
      },
    ],
  },
];

const JODHPUR_PILLARS = [
  {
    icon: Landmark,
    title: 'Palace Bookings & Trust Liaison',
    desc: 'Direct negotiation with palace owners and the Mehrangarh Museum Trust. We secure premier winter dates, ASI heritage clearances, and private venue buyouts at net negotiated rates.',
  },
  {
    icon: Flower2,
    title: 'Custom Royal Decor & Production',
    desc: 'Custom 3D-designed floral mandaps, handcrafted brass installations, vintage crystal chandeliers, and precision lighting that complements Jodhpur’s architectural sandstone beauty.',
  },
  {
    icon: Plane,
    title: 'Airport Fleet & VIP Guest Logistics',
    desc: 'Smooth arrivals at Jodhpur Airport (JDH) and Railway Station (JU). Luxury AC coaches, vintage Baraat convertibles, luggage coordination, and 24/7 dedicated hotel help desks.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Royal Marwari & Global Culinary Curation',
    desc: 'Selected royal Rajasthani banquet menus alongside high-end international culinary stations, with strict adherence to Jain, vegetarian, vegan, and global dietary preferences.',
  },
  {
    icon: Music,
    title: 'Folk Maestros & Celebrity Entertainment',
    desc: 'Direct booking of world-renowned Manganiyar & Langa folk troupes, desert fire dancers, celebrity wedding anchors, Bollywood choreographers, and high-energy club DJs.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Vendor Markups & Budget Control',
    desc: 'Every vendor contract and hotel bill is transparent, signed directly with vendors at wholesale rates. Detailed itemized budgets with zero hidden kickbacks or surprise costs.',
  },
];

const JODHPUR_BUDGET_GUIDE = [
  {
    category: 'Heritage Havelis & Boutique Palaces',
    venues: 'Ajit Bhawan Palace, RAAS Jodhpur, Heritage Haveli properties',
    guests: '80 – 150 Guests (2 Days)',
    range: '₹45 Lakhs – ₹85 Lakhs',
    highlight: 'Intimate royal ambience, full property buyout privacy, personalized heritage hospitality, and custom floral decor.',
  },
  {
    category: 'Grand Palace Resorts & Lake Retreats',
    venues: 'Bal Samand Lake Palace, Indana Palace, Welcomhotel by ITC Jodhpur',
    guests: '150 – 350 Guests (3 Days)',
    range: '₹85 Lakhs – ₹1.8 Crore',
    highlight: 'Expansive banquets, sprawling wedding lawns, multi-day guest room blocks, concert-grade Sangeet production, and royal Baraat.',
  },
  {
    category: 'Ultra-Luxury Royal Palaces & Fort Galas',
    venues: 'Umaid Bhawan Palace (Taj) + Mehrangarh Fort Evening Gala',
    guests: '200 – 600+ Guests (3 Days)',
    range: '₹2.2 Crore – ₹5.0 Crore+',
    highlight: 'The pinnacle of destination weddings globally: royal palace suites, Michelin-grade Taj catering, fort rampart permissions, and celebrity entertainment.',
  },
];

const JODHPUR_FAQS = [
  {
    q: 'Why hire RASM as your destination wedding planner in Jodhpur?',
    a: 'As Rajasthan’s premier luxury wedding planning firm headquartered in Udaipur with extensive operations across Jodhpur, RASM brings over 10 years of heritage wedding experience and 500+ successful celebrations. We have direct, established relationships with Jodhpur’s royal trusts, palace managers, and local authorities. Crucially, we work on a transparent fixed-fee model with 100% direct vendor billing and zero hidden markups, saving our clients millions in unnecessary commissions.',
  },
  {
    q: 'How much does a luxury destination wedding in Jodhpur typically cost?',
    a: 'Total wedding expenses in Jodhpur depend on your venue choice, guest count, and decor scale. An intimate celebration at a boutique heritage palace (80–150 guests at Ajit Bhawan or RAAS) ranges between ₹45 Lakhs and ₹85 Lakhs. A grand celebration at a luxury palace resort (150–350 guests at Bal Samand Lake Palace or Indana Palace) typically costs between ₹85 Lakhs and ₹1.8 Crore. Ultra-luxury royal weddings at Umaid Bhawan Palace start at ₹2.2 Crore and can exceed ₹5 Crore for complete palace buyouts. Our full planning packages start from ₹30,00,000.',
  },
  {
    q: 'Can we host wedding functions inside Mehrangarh Fort?',
    a: 'Yes, Mehrangarh Fort is world-famous for hosting memorable pre-wedding Sangeet galas, Sufi nights, and royal welcome dinners. While sacred fire (pheras) ceremonies have strict monument preservation rules, the fort’s historic courtyards (such as the Zenana Deodi and ramparts) offer an unmatched nighttime spectacle. RASM manages all permissions with the Mehrangarh Museum Trust, sound restrictions, ambient lighting, security, and private guest shuttles up the fortress ramparts.',
  },
  {
    q: 'What is the best month to plan a wedding in Jodhpur?',
    a: 'The peak wedding window in Jodhpur is from October to late March. During this period, the Sun City enjoys crisp, sunny daytime temperatures (22°C to 28°C) and pleasantly cool desert evenings (10°C to 16°C)—ideal for outdoor garden pheras, poolside mehendi, and starry fort galas. April to June experiences intense desert heat and is not recommended for outdoor celebrations.',
  },
  {
    q: 'How do our outstation and international guests travel to Jodhpur?',
    a: 'Jodhpur Airport (JDH) operates daily direct flights from major Indian aviation hubs including New Delhi, Mumbai, Ahmedabad, and Jaipur, allowing international NRI guests to connect smoothly with just one transit stop. Jodhpur Junction is also connected by high-speed trains like the Vande Bharat Express. RASM manages complete airport reception, VIP luggage handling, and luxury air-conditioned coaches directly to your wedding hotels.',
  },
  {
    q: 'How far in advance should we book venues and wedding planners in Jodhpur?',
    a: 'Because Jodhpur has a select handful of famous royal heritage venues and high global demand during winter wedding dates (November through February), we strongly advise finalizing your wedding planner and locking in palace venues 9 to 12 months in advance. This guarantees preferred dates, prime palace suites, and the best available group rates.',
  },
  {
    q: 'Can RASM manage international NRI couples with dietary preferences & time zones?',
    a: 'Over 60% of RASM’s clientele consists of NRI and international couples living across the United States, United Kingdom, United Arab Emirates, Canada, and Australia. We bridge time zones smoothly with scheduled virtual design presentations, 3D floor plans, digital tasting reviews, guest RSVP portals, and bilingual hospitality teams on the ground in Jodhpur.',
  },
];

export function JodhpurWeddingPage({ nearby, posts, wpPage }: JodhpurWeddingPageProps) {
  const path = '/wedding-planner-in-jodhpur/';
  const leadDescription =
    'RASM Weddings & Events is the premier luxury destination wedding planner in Jodhpur. Award-winning wedding design, palace bookings, and smooth execution across Umaid Bhawan Palace, Mehrangarh Fort, Ajit Bhawan, Bal Samand Lake Palace, and Thar desert dunes.';

  const desktopBannerSrc = wpPage?.desktopBanner || '/images/jodhpur/umaid-bhawan-hero.jpg';
  const mobileBannerSrc = wpPage?.mobileBanner || desktopBannerSrc;
  const bannerAlt =
    wpPage?.bannerAlt ||
    'Best Wedding Planner in Jodhpur - Royal Palace Destination Wedding at Umaid Bhawan Palace';

  return (
    <div className="bg-white min-h-screen text-charcoal-900 selection:bg-gold selection:text-white">
      {/* Schema Markup */}
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Wedding Destinations', path: '/wedding-destination/' },
            { name: 'Wedding Planner in Jodhpur', path },
          ]),
          serviceSchema({
            name: 'Best Wedding Planner in Jodhpur - RASM Weddings & Events',
            description: leadDescription,
            area: 'Jodhpur, Rajasthan, India',
            path,
          }),
          faqSchema(JODHPUR_FAQS.map((f) => ({ q: f.q, a: f.a }))),
          {
            '@context': 'https://schema.org',
            '@type': 'Place',
            name: 'Jodhpur, Rajasthan',
            description:
              'The Sun City of Rajasthan, famous for royal destination weddings at Umaid Bhawan Palace and Mehrangarh Fort.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Jodhpur',
              addressRegion: 'Rajasthan',
              addressCountry: 'IN',
            },
          },
        ]}
      />

      {/* -------------------- 1. RESPONSIVE VISUAL BANNER (NO TEXT ON IMAGE) -------------------- */}
      {/* Desktop: 21:9 Aspect Ratio | Mobile: 1:1 Square Aspect Ratio */}
      <div className="w-full relative overflow-hidden bg-stone-100 border-b border-gold/20 shadow-xs">
        {/* Desktop Container: 21:9 Ratio */}
        <div className="hidden md:block relative w-full aspect-[21/9] max-h-[640px]">
          <Image
            src={desktopBannerSrc}
            alt={bannerAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Container: 1:1 Square Ratio */}
        <div className="block md:hidden relative w-full aspect-square">
          <Image
            src={mobileBannerSrc}
            alt={bannerAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* -------------------- 2. CONTENT SECTION (STARTS CLEANLY BELOW BANNER) -------------------- */}
      <section className="relative w-full bg-[#FDFCFA] border-b border-gold/20 py-10 sm:py-16">
        <div className="rasm-container">
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs text-charcoal-500 mb-5">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-charcoal-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/wedding-destination/" className="hover:text-charcoal-900 transition-colors">
                    Wedding Destinations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-charcoal-800 font-medium">
                  Jodhpur
                </li>
              </ol>
            </nav>

            {/* Keyword-Rich Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold mb-4 shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-gold-dark" />
              <span>Ranked #1 Luxury Wedding Planner in Jodhpur</span>
            </div>

            {/* Main H1 with Core SEO Keywords */}
            <h1 className="font-manrope font-medium text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12] mb-5">
              Best Wedding Planner in Jodhpur:{' '}
              <span className="gold-gradient-text italic">Royal Palaces &amp; Forts</span>
            </h1>

            {/* Authoritative, Keyword-Rich Lead Paragraph */}
            <p className="text-charcoal-700 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-3xl">
              Planning a royal destination wedding in the historic Sun City? At{' '}
              <strong className="font-medium text-charcoal-900">RASM Weddings &amp; Events</strong>, we turn palace dreams into
              flawless celebrations. From exchanging vows on the Baradari lawns of{' '}
              <strong className="font-medium text-charcoal-900">Umaid Bhawan Palace</strong> and hosting illuminated Sangeet galas
              at <strong className="font-medium text-charcoal-900">Mehrangarh Fort</strong>, to intimate heritage soirees at{' '}
              <strong className="font-medium text-charcoal-900">Ajit Bhawan</strong> and{' '}
              <strong className="font-medium text-charcoal-900">Bal Samand Lake Palace</strong>—our seasoned planners deliver
              custom royal decor, NRI guest hospitality, authentic Marwari catering, and transparent budget control with zero vendor markups.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <InquiryAnimatedButton
                variant="gold-shimmer"
                size="lg"
                context="Jodhpur Hero Wedding Planner Inquiry"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Plan Your Jodhpur Wedding
              </InquiryAnimatedButton>

              <a
                href="#venues"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gold/60 bg-white hover:bg-gold/5 text-sm font-medium text-charcoal-900 shadow-xs hover:border-gold transition-all"
              >
                Explore Royal Venues
              </a>

              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  'Hello Rasm Weddings! I am inquiring about planning a luxury wedding in Jodhpur.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-emerald-600/30 bg-emerald-50/80 hover:bg-emerald-50 text-xs sm:text-sm font-medium text-emerald-800 transition-colors shadow-xs"
                title="Chat with our Wedding Planning team on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-gold/25 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-charcoal-700 font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>500+ Luxury Weddings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Udaipur Headquartered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Zero Vendor Markups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>White-Glove NRI Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 2. AT A GLANCE: STATS -------------------- */}
      <section aria-label="Rasm Weddings at a glance" className="bg-white border-b border-gold/15 py-10">
        <div className="rasm-container max-w-5xl">
          <Facts items={FACTS} />
        </div>
      </section>

      {/* -------------------- 3. JODHPUR WEDDING ESSENTIALS & LOGISTICS -------------------- */}
      <section aria-label="Jodhpur destination wedding essentials" className="py-16 sm:py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-2">
              Sun City Wedding Insights
            </p>
            <h2 className="font-manrope font-medium text-2xl sm:text-4xl text-charcoal-900 tracking-tight leading-[1.2]">
              Why Choose Jodhpur for Your <span className="gold-gradient-text italic">Destination Wedding?</span>
            </h2>
            <p className="mt-3 text-charcoal-600 font-light text-base leading-relaxed">
              Where Udaipur offers peaceful lake romance and Jaipur features vast hotel banquets, Jodhpur delivers
              pure, untamed Rajput royalty. Golden-yellow Chittar sandstone architecture, colossal 15th-century cliffside
              fortresses, and unmatched Marwari hospitality make Jodhpur the ultimate royal wedding statement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <Calendar className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Prime Wedding Season
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                October to March
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Pleasant sunny days (22°C–28°C) and crisp desert evenings. Perfect for outdoor palace garden pheras,
                rooftop fort dinners, and bonfire desert soirees.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <Plane className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Airport &amp; Flights
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Jodhpur Airport (JDH)
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Frequent direct flights from New Delhi, Mumbai, Ahmedabad, and Jaipur. International NRI guests connect
                smoothly with just one short stopover.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <Train className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Rail &amp; Road Access
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Jodhpur Junction (JU)
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Served by Vande Bharat and superfast express trains. Excellent highway connectivity connecting Jaipur,
                Udaipur, and Jaisalmer for multi-city wedding tours.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark mb-4">
                <UtensilsCrossed className="w-6 h-6" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-1">
                Royal Culinary Heritage
              </p>
              <h3 className="font-manrope text-base font-semibold text-charcoal-900 mb-2">
                Authentic Shahi Dawat
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Celebrated for royal Marwari silver-thali banquets: Shahi Dal Baati Churma, Ker Sangri, Jodhpuri Pyaaz
                Kachori, Mirchi Vada, and handmade Ghevar live counters.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/20 bg-ivory-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-gold/15 text-gold-dark shrink-0">
                <Compass className="w-5 h-5" />
              </span>
              <p className="text-xs sm:text-sm text-charcoal-700 font-light">
                <strong className="font-semibold text-charcoal-900">Famous Settings Handled by RASM:</strong> Umaid
                Bhawan Palace, Mehrangarh Fort, Jaswant Thada, Bal Samand Lake Palace, Ajit Bhawan, RAAS Jodhpur, and Osian Desert Dunes.
              </p>
            </div>
            <InquiryAnimatedButton variant="gold-shimmer" size="sm" context="Jodhpur Venue Consultation Call">
              Get Custom Venue Proposal
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>

      {/* -------------------- 4. DETAILED VENUES SHOWCASE WITH COSTS & HIGHLIGHTS -------------------- */}
      <section id="venues" className="py-20 bg-white border-b border-gold/15 scroll-mt-24">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Selected Palace Portfolio
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Best Wedding Venues in <span className="gold-gradient-text italic">Jodhpur</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Explore Jodhpur&apos;s most prestigious palaces, heritage havelis, and desert resorts. We inspect venues in person,
              verify auspicious dates, negotiate direct contracts, and manage monument trust clearances.
            </p>
          </div>

          <div className="space-y-12">
            {JODHPUR_VENUES.map((v, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={v.id}
                  id={v.id}
                  className="rounded-3xl border border-gold/25 bg-[#FDFCFA] overflow-hidden shadow-[0_8px_30px_rgba(197,160,89,0.08)] hover:border-gold/50 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    <div
                      className={`relative min-h-[300px] sm:min-h-[380px] lg:min-h-full lg:col-span-5 bg-stone-100 ${
                        flip ? 'lg:order-2' : ''
                      }`}
                    >
                      <Image
                        src={v.image}
                        alt={`${v.name} - Destination wedding venue in Jodhpur, Rajasthan`}
                        fill
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 rounded-full bg-charcoal-900/85 text-gold-light text-xs font-medium backdrop-blur-xs tracking-wide border border-gold/30">
                          {v.category}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between ${flip ? 'lg:order-1' : ''}`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <p className="text-xs uppercase tracking-[0.2em] font-medium text-gold-dark">
                            Venue 0{i + 1} of 0{JODHPUR_VENUES.length}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-600 bg-ivory-200 px-3 py-1 rounded-full border border-gold/20">
                            <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                            Jodhpur, Rajasthan
                          </span>
                        </div>

                        <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-tight mb-1">
                          {v.name}
                        </h3>
                        <p className="text-sm font-medium gold-gradient-text italic mb-4">{v.tagline}</p>

                        <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                          {v.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal-900 mb-3">
                            Key Venue Highlights &amp; Inclusions:
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-charcoal-700 font-light">
                            {v.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-charcoal-500 font-light">
                            Capacity &amp; Estimated Budget:
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-charcoal-900">
                            {v.capacity} · <span className="text-gold-dark font-medium">{v.costRange}</span>
                          </p>
                        </div>
                        <InquiryAnimatedButton
                          variant="gold-shimmer"
                          size="sm"
                          context={`Inquire about ${v.name}`}
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Check Availability &amp; Rates
                        </InquiryAnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- 5. THE 3-DAY GRAND JODHPUR WEDDING ITINERARY -------------------- */}
      <section className="py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              The Celebration Roadmap
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              The 3-Day Signature <span className="gold-gradient-text italic">Jodhpur Wedding Itinerary</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Selected by RASM Weddings to balance royal ceremonial beauty, joyful guest hospitality, and effortless timing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {SIGNATURE_ITINERARY.map((day) => (
              <div
                key={day.day}
                className="rounded-3xl border border-gold/25 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(197,160,89,0.06)] hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold-dark font-manrope font-semibold text-xs tracking-wider uppercase mb-3">
                    {day.day}
                  </div>
                  <h3 className="font-manrope font-medium text-xl sm:text-2xl text-charcoal-900 tracking-tight mb-1">
                    {day.theme}
                  </h3>
                  <p className="text-xs text-gold-dark italic font-light mb-6">{day.sub}</p>

                  <div className="space-y-5">
                    {day.events.map((ev) => (
                      <div key={ev.title} className="relative pl-6 border-l border-gold/30">
                        <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-gold" />
                        <span className="text-[11px] font-medium text-gold-dark block tracking-wider uppercase">
                          {ev.time}
                        </span>
                        <h4 className="font-manrope font-semibold text-sm sm:text-base text-charcoal-900 mt-0.5">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-charcoal-600 font-light leading-relaxed mt-1">{ev.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gold/20 text-center">
                  <InquiryAnimatedButton
                    variant="gold-shimmer"
                    size="sm"
                    context={`Customise ${day.day} Itinerary for Jodhpur`}
                  >
                    Customise Your Timeline
                  </InquiryAnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 6. OUR 6 OPERATIONAL PILLARS IN JODHPUR -------------------- */}
      <section className="py-20 bg-white border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Flawless On-Ground Execution
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              How RASM Coordinates Your <span className="gold-gradient-text italic">Jodhpur Wedding</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              We act as your dedicated on-ground architects, designers, contract negotiators, and family concierges in Jodhpur—so
              you and your loved ones can focus entirely on celebrating.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JODHPUR_PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-7 hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-ivory-200 text-gold-dark">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="font-manrope text-sm font-semibold gold-gradient-text">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-manrope font-medium text-lg sm:text-xl text-charcoal-900 tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 font-light leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/60 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-charcoal-900 hover:bg-gold/10 transition-colors"
            >
              <span>Explore All 9 Wedding Planning Services</span>
              <ArrowRight className="w-4 h-4 text-gold-dark" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------- 7. JODHPUR WEDDING BUDGET & PACKAGES GUIDE -------------------- */}
      <section className="py-20 bg-gradient-to-b from-[#FDFCFA] to-white border-b border-gold/15">
        <div className="rasm-container max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Cost Transparency
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Jodhpur Wedding Cost &amp; <span className="gold-gradient-text italic">Budget Guide</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              We provide clear, honest financial projections from our very first consultation. Here is a realistic overview of
              estimated total wedding budgets across Jodhpur&apos;s venue tiers, including rooms, catering, decor, and full planning.
            </p>
          </div>

          <div className="space-y-5 mb-10">
            {JODHPUR_BUDGET_GUIDE.map((b) => (
              <div
                key={b.category}
                className="rounded-2xl border border-gold/25 bg-white p-6 sm:p-7 shadow-xs hover:border-gold/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <h3 className="font-manrope font-semibold text-lg sm:text-xl text-charcoal-900">
                      {b.category}
                    </h3>
                  </div>
                  <p className="text-xs text-charcoal-500 font-light mb-2">
                    <strong className="text-charcoal-700">Venues:</strong> {b.venues}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                    {b.highlight}
                  </p>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="text-[11px] uppercase tracking-wider text-gold-dark font-medium block">
                    Estimated Total Budget ({b.guests})
                  </span>
                  <span className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 gold-gradient-text block mt-0.5">
                    {b.range}
                  </span>
                  <span className="text-[11px] text-charcoal-400 font-light">Subject to dates &amp; custom scale</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gold/30 bg-ivory-100 p-6 text-center">
            <p className="text-sm text-charcoal-700 font-light max-w-2xl mx-auto mb-4">
              RASM’s turnkey destination wedding planning packages start from{' '}
              <strong className="font-semibold text-charcoal-900">₹30,00,000 (30 Lakhs)</strong>.
              All supplier and hotel contracts are signed directly with the vendors at negotiated net rates with zero commission markup.
            </p>
            <InquiryAnimatedButton variant="gold-shimmer" size="md" context="Jodhpur Custom Budget Proposal">
              Request a Tailored Written Estimate
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>

      {/* -------------------- 8. SELECTED PHOTO GALLERY: REAL INSPIRATION -------------------- */}
      <section className="py-20 bg-white border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Visual Beauty
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Jodhpur Weddings &amp; <span className="gold-gradient-text italic">Decor Inspiration</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Explore sandstone floral mandaps, illuminated fort ramparts, royal Rajasthani processions, and desert lounges designed by RASM.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2026/10/golden_palace_wedding_mandap_at_sunset.webp"
                alt="Floral royal mandap setup on a palace terrace at sunset in Rajasthan"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Sunset Pheras</p>
                <h3 className="text-white text-base font-medium font-manrope">Floral Sandstone Mandap</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2026/10/royal_blue_fort_wedding_at_night.webp"
                alt="Mehrangarh Fort ramparts illuminated in royal blue for a luxury wedding gala"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Fort Sangeet</p>
                <h3 className="text-white text-base font-medium font-manrope">Mehrangarh Fort Gala Night</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2026/10/royal_baraat_at_golden_hour.webp"
                alt="Royal Baraat procession with decorated horses and royal fanfare in Rajasthan"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">The Baraat</p>
                <h3 className="text-white text-base font-medium font-manrope">Grand Rajput Procession</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src="/images/jodhpur/mehrangarh-courtyard.jpg"
                alt="Intricate sandstone courtyard and jharokhas of Mehrangarh Fort for private dinner events"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Heritage Architecture</p>
                <h3 className="text-white text-base font-medium font-manrope">Jharokha Courtyard Baithak</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2026/10/palace_wedding_under_blooming_chandeliers.webp"
                alt="Beautiful chandeliers and blooms for a royal palace wedding reception dinner"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Grand Banquet</p>
                <h3 className="text-white text-base font-medium font-manrope">Canopy of Chandeliers &amp; Roses</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-stone-100 shadow-sm">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2026/10/golden_desert_wedding_lounge_at_sunset.webp"
                alt="Desert dunes wedding lounge in Osian Thar Desert near Jodhpur"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Desert Nights</p>
                <h3 className="text-white text-base font-medium font-manrope">Osian Sand Dunes Lounge</h3>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/gallery/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/50 bg-[#FDFCFA] text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-charcoal-800 hover:bg-gold/10 transition-colors"
            >
              <span>View Full Wedding Gallery</span>
              <ArrowRight className="w-4 h-4 text-gold-dark" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------- 9. WHY CHOOSE RASM FOR JODHPUR -------------------- */}
      <section className="py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              The RASM Advantage
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Why Couples Trust Us for <span className="gold-gradient-text italic">Jodhpur</span>
            </h2>
            <p className="mt-4 text-charcoal-600 font-light text-base sm:text-lg leading-relaxed">
              Historic fortress venues and royal heritage trusts require specialized operational mastery, legal trust liaison, and
              the highest standards of five-star luxury hospitality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">01</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                Rajasthan Regional Roots &amp; Trust Access
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Operating with headquarters in Udaipur and veteran operational crews stationed across Jodhpur and Jaisalmer,
                we hold longstanding relationships with the Mehrangarh Museum Trust, palace custodians, and local civic authorities.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">02</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                100% Direct Vendor Contracts &amp; Zero Markups
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                We practice total financial integrity. Every hotel booking, sound contract, and floral invoice is billed directly
                at wholesale rates with zero agency markups or hidden supplier commissions.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">03</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                Custom NRI &amp; International Couple Planning
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Over 60% of our couples reside abroad in the UK, USA, UAE, and Canada. We coordinate across time zones with
                interactive 3D design walk-throughs, digital menu planning, guest arrival portals, and bilingual airport escorts.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-7 shadow-xs">
              <span className="font-manrope text-2xl font-medium gold-gradient-text block mb-2">04</span>
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2">
                Rigorous Monument Care &amp; Production Safety
              </h3>
              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                Historic sandstone monuments demand specialized technical sensitivity—strict sound decibel calibration, zero
                surface drilling, and heavy-load generator power management handled with absolute precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 10. FAQS ACCORDION (WITH FAQPAGE SCHEMA) -------------------- */}
      <section id="faqs" className="py-20 bg-white border-b border-gold/15 scroll-mt-24">
        <div className="rasm-container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
              Clear Answers
            </p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
              Frequently Asked <span className="gold-gradient-text italic">Questions</span>
            </h2>
            <p className="mt-3 text-charcoal-600 font-light text-base leading-relaxed">
              Everything couples and families need to know when planning a luxury destination wedding in Jodhpur.
            </p>
          </div>

          <div className="space-y-3.5">
            {JODHPUR_FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-2xl border border-gold/25 bg-[#FDFCFA] overflow-hidden transition-all duration-200"
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-ivory-100 transition-colors">
                  <h3 className="font-manrope font-semibold text-base sm:text-lg text-charcoal-900 tracking-tight text-left">
                    {f.q}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gold-dark shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-charcoal-600 font-light leading-relaxed border-t border-gold/15">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 11. EMBEDDED INQUIRY & CONSULTATION BLOCK -------------------- */}
      <section className="py-20 bg-ivory-200 border-b border-gold/15">
        <div className="rasm-container max-w-4xl text-center">
          <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
            Begin Your Royal Journey
          </p>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2] mb-4">
            Plan Your Dream <span className="gold-gradient-text italic">Jodhpur Wedding</span>
          </h2>
          <p className="text-charcoal-600 font-light text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Share your tentative wedding dates, guest count, and royal vision. Our senior planning team will prepare a custom
            palace shortlist, date availability audit, and itemized written budget estimate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <InquiryAnimatedButton
              variant="gold-shimmer"
              size="lg"
              context="Jodhpur Dedicated Consultation Inquiry"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request Free Consultation
            </InquiryAnimatedButton>

            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                'Hello Rasm Weddings! I am inquiring about planning a luxury wedding in Jodhpur.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-emerald-600/30 bg-white hover:bg-emerald-50 text-sm font-medium text-emerald-800 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp ({SITE.phone})</span>
            </a>

            <a
              href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-gold/40 bg-white hover:bg-ivory-100 text-sm font-medium text-charcoal-800 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-gold-dark" />
              <span>Call Our Planners</span>
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-gold/25 bg-white inline-block text-left text-xs sm:text-sm text-charcoal-600 font-light space-y-1 shadow-2xs">
            <p>
              <strong className="text-charcoal-900 font-medium">Headquarters:</strong> {SITE.address}
            </p>
            <p>
              <strong className="text-charcoal-900 font-medium">Direct Inquiries:</strong> {SITE.email} · {SITE.phone}
            </p>
          </div>
        </div>
      </section>

      {/* -------------------- 12. NEARBY DESTINATIONS & RELATED GUIDES -------------------- */}
      <NearbyDestinations items={nearby} />
      <RelatedGuides city="Jodhpur" posts={posts} />

      {/* -------------------- 13. EXPLORE LINKS & CLOSING CTA -------------------- */}
      <ExploreLinks
        title="Explore More Royal Wedding Destinations with RASM"
        links={[
          { label: 'Wedding Planning Services', href: '/services/' },
          { label: 'Wedding Decoration & Mandaps', href: '/traditional-decoration/' },
          { label: 'Udaipur Palace Weddings', href: '/wedding-planner-in-udaipur/' },
          { label: 'Jaipur Fort Weddings', href: '/wedding-planner-in-jaipur/' },
          { label: 'Jaisalmer Desert Weddings', href: '/wedding-planner-in-jaisalmer/' },
          { label: 'Goa Beach Weddings', href: '/wedding-planner-in-goa/' },
          { label: 'All 12 Wedding Destinations', href: '/wedding-destination/' },
          { label: 'Wedding Portfolio & Gallery', href: '/gallery/' },
          { label: 'About Rasm Weddings', href: '/about-us/' },
          { label: 'Contact Our Planners', href: '/contact-us/' },
        ]}
      />

      <CtaBand
        title="Ready to explore royal palaces in Jodhpur?"
        text="Speak directly with our destination wedding architects. We will inspect venues, verify dates, and present a crystal-clear planning roadmap."
        context="Jodhpur wedding closing band"
      />
    </div>
  );
}
