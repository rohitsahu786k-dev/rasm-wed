export interface DestinationVenue {
  id: string;
  name: string;
  category: string;
  capacity: string;
  tagline: string;
  image: string;
  costRange: string;
  description: string;
  highlights: string[];
  bestFor: string;
}

export interface DestinationItineraryDay {
  day: string;
  theme: string;
  sub: string;
  events: { time: string; title: string; desc: string }[];
}

export interface DestinationBudgetTier {
  category: string;
  venues: string;
  guests: string;
  range: string;
  highlight: string;
}

export interface DestinationDetail {
  slug: string;
  city: string;
  stateOrRegion: string;
  eyebrow: string;
  h1Title: string;
  h1Accent: string;
  heroImage: string;
  heroAlt: string;
  leadCopy: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  facts: {
    bestMonths: string;
    nearestAirport: string;
    railAccess: string;
    culinary: string;
    landmarks: string;
  };
  venues: DestinationVenue[];
  itinerary: DestinationItineraryDay[];
  budgetTiers: DestinationBudgetTier[];
  faqs: { q: string; a: string }[];
}

export const CITY_DESTINATIONS: Record<string, DestinationDetail> = {
  udaipur: {
    slug: 'wedding-planner-in-udaipur',
    city: 'Udaipur',
    stateOrRegion: 'Rajasthan',
    eyebrow: '★ RANKED #1 LUXURY WEDDING PLANNER IN UDAIPUR',
    h1Title: 'Best Wedding Planner in Udaipur:',
    h1Accent: 'Lake Palaces & Island Celebrations',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2026/10/golden_palace_wedding_mandap_at_sunset.webp',
    heroAlt: 'Best Wedding Planner in Udaipur - Royal Island Palace Destination Wedding on Lake Pichola',
    leadCopy:
      'Planning a fairytale palace wedding in the Venice of the East? At RASM Weddings & Events, our Udaipur headquarters orchestrates magical celebrations amidst the waters of Lake Pichola. From private boat processions to Jagmandir Island Palace and sunset vows at The Oberoi Udaivilas, to romantic evenings at Taj Lake Palace and The Leela Palace—we handle end-to-end palace bookings, floating mandaps, luxury decor, and international guest hospitality with total transparency and zero vendor markups.',
    primaryKeyword: 'Best Wedding Planner in Udaipur',
    secondaryKeywords: [
      'destination wedding in Udaipur',
      'Lake Pichola palace wedding cost',
      'Jagmandir Island Palace wedding planner',
      'The Oberoi Udaivilas wedding packages',
      'luxury wedding planner in Rajasthan',
    ],
    facts: {
      bestMonths: 'September to March (Pleasant daytime 22°C–27°C, romantic breezy lake evenings)',
      nearestAirport: 'Maharana Pratap Airport, Udaipur (UDR) - 35 mins from city center',
      railAccess: 'Udaipur City Railway Station (UDZ) with direct superfast train connectivity',
      culinary: 'Mewari Royal Shahi Thali: Dal Baati Churma, Gatte ki Subzi, Laal Maas, & Ghevar',
      landmarks: 'Lake Pichola, City Palace, Jagmandir Island, Fateh Sagar Lake, Monsoon Palace',
    },
    venues: [
      {
        id: 'jagmandir-island-palace',
        name: 'Jagmandir Island Palace (HRH Group)',
        category: 'Private Island Palace',
        capacity: '200 – 1,200 Guests',
        tagline: 'The Legendary Floating Island Palace of Lake Pichola',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/golden_hour_palace_lake_wedding_mandap.webp',
        costRange: '₹1.5 Cr – ₹3.5 Cr+ (Island Venue Hire & Royal Decor)',
        description:
          'Accessible exclusively via royal motorized boat transfers across Lake Pichola, Jagmandir Island Palace is a 17th-century marble marvel. With colossal stone elephants, Kunwar Pada courtyards, and illuminated palace domes reflecting on black waters, it is world-renowned for hosting the most glamorous VIP and NRI weddings in India.',
        highlights: [
          'Exclusive royal boat arrival across Lake Pichola for the Baraat and guests',
          'Historic 17th-century marble dome architecture and lake-facing courtyards',
          'Vast capacity for multi-tier concert Sangeets, royal pheras, and fireworks',
          'Complete private island buyout ensuring maximum security and prestige',
        ],
        bestFor: 'High-Impact Sangeet Galas, Island Pheras, & Imperial Receptions',
      },
      {
        id: 'the-oberoi-udaivilas',
        name: 'The Oberoi Udaivilas',
        category: 'Ultra-Luxury Lakeside Resort',
        capacity: '150 – 450 Guests',
        tagline: 'Architectural Masterpiece of Domes, Corridors & Private Pools',
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
        costRange: '₹2.5 Cr – ₹5.0 Cr+ (Complete Luxury Resort Buyout)',
        description:
          'Consistently ranked among the best luxury hotels in the world, The Oberoi Udaivilas features sweeping Mewari courtyards, reflection pools, and manicured lawns directly overlooking City Palace. A favorite for discerning couples seeking unparalleled personalized hospitality and architectural refinement.',
        highlights: [
          'Premier lakeside setting with uninterrupted views of City Palace and Lake Pichola',
          'Private moat-like swimming pools connecting luxury heritage suites',
          'Michelin-standard culinary team offering bespoke menus from around the globe',
          'Flawless operational standards with world-renowned Oberoi hospitality',
        ],
        bestFor: 'Palace Buyouts, Intimate Royal Pheras, & Sophisticated Cocktail Galas',
      },
      {
        id: 'taj-lake-palace',
        name: 'Taj Lake Palace, Udaipur',
        category: 'Historic Floating Marble Palace',
        capacity: '80 – 200 Guests',
        tagline: '18th-Century White Marble Sanctuary Floating on Lake Pichola',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/sunset_palace_wedding_by_the_lake.webp',
        costRange: '₹2.0 Cr – ₹4.0 Cr+ (Exclusive Island Buyout)',
        description:
          'Built in 1746 as a pleasure palace by Maharana Jagat Singh II, Taj Lake Palace floats like a white marble jewel on Lake Pichola. Offering private lily ponds, carved marble arches, and royal butlers, it is the ultimate romantic setting for intimate luxury destination weddings.',
        highlights: [
          'Complete island seclusion with 360-degree panoramic lake and hill views',
          'Exquisite heritage suites with stained glass, antique frescoes, and swing balconies',
          'Legendary Taj royal hospitality with bespoke silver-service dinners',
          'Perfect for high-net-worth couples hosting an ultra-exclusive gathering',
        ],
        bestFor: 'Intimate Royal Vows, Lakeside High Teas, & Private Candlelit Banquets',
      },
      {
        id: 'the-leela-palace-udaipur',
        name: 'The Leela Palace Udaipur',
        category: 'Modern Royal Palatial Luxury',
        capacity: '100 – 350 Guests',
        tagline: 'Contemporary Rajasthani Grandeur with Pichola Shoreline Lawns',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/sunset_palace_terrace_by_the_lake.webp',
        costRange: '₹1.8 Cr – ₹3.5 Cr+ (Shoreline Buyout & Banqueting)',
        description:
          'Set right on the banks of Lake Pichola with majestic views of the Aravalli hills, The Leela Palace Udaipur seamlessly combines regal Mewari aesthetics with contemporary state-of-the-art wedding amenities. Its Guava Garden and outer courtyards host spectacular waterfront ceremonies.',
        highlights: [
          'Lake-facing wedding lawns framed by traditional stone jaali pavilions',
          'Lavish spa and heritage wellness suites for the wedding couple and VIP guests',
          'Grand royal arrival via decorated Mewari wooden boats',
          'Superb indoor and outdoor banquet spaces with seamless weather backups',
        ],
        bestFor: 'Sundowner Mehndi, Poolside Cocktails, & Waterfront Pheras',
      },
      {
        id: 'fateh-garh-palace',
        name: 'Fateh Garh Palace, Udaipur',
        category: 'Hilltop Heritage Sanctuary',
        capacity: '150 – 500 Guests',
        tagline: 'Panoramic Aravalli Hilltop Views & Authentic Mewari Architecture',
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
        costRange: '₹60 Lakhs – ₹1.2 Cr (Multi-Day Destination Wedding)',
        description:
          'Perched high on the western hills overlooking Udaipur and its lakes, Fateh Garh is a heritage Renaissance sanctuary built through historic reassembly. Offering vintage car collections, hillside infinity pools, and expansive wedding terraces, it provides incredible sunset vistas.',
        highlights: [
          'Dramatic elevated hillside location offering cooler breezes and panoramic views',
          'Sprawling Dari-Khana and poolside terraces for high-energy Sangeet nights',
          'Authentic Mewari stone domes, heritage suites, and vintage car Baraat fleet',
          'Excellent value for grand celebrations seeking five-star heritage ambiance',
        ],
        bestFor: 'Sunset Hilltop Pheras, Sangeet Nights, & Royal Family Buyouts',
      },
    ],
    itinerary: [
      {
        day: 'Day 01',
        theme: 'Jheel Kinare: The Royal Lake Welcome & Shahi Mehndi',
        sub: 'Private Boat Transfers · Shehnai Melodies · Waterfront Cabanas',
        events: [
          {
            time: '12:00 PM – 02:00 PM',
            title: 'Royal Jetty Boat Arrival',
            desc: 'Guests board private decorated boats across Lake Pichola with Shehnai fanfare, rose petal showers, and saffron thandai cocktails.',
          },
          {
            time: '03:30 PM – 06:30 PM',
            title: 'Lakeview Shahi Mehndi',
            desc: 'Lakeside cabanas draped in pastels and marigolds, live Mewari miniature painting artists, lac bangles, and organic herbal henna.',
          },
          {
            time: '07:30 PM – 11:30 PM',
            title: 'Courtyard Sufi Soiree',
            desc: 'Under glittering chandeliers by the water, guests enjoy soulful acoustic Sufi music and a royal Mewari barbecue banquet.',
          },
        ],
      },
      {
        day: 'Day 02',
        theme: 'Phoolon Ki Holi & The Grand Jagmandir Sangeet Gala',
        sub: 'Yellow Marigold Baths · Island Boat Cruise · High-Voltage Musical Night',
        events: [
          {
            time: '10:30 AM – 01:00 PM',
            title: 'Phoolon Ki Holi & Haldi Carnival',
            desc: 'Brass urli baths, yellow marigold petals, organic herbal gulal, lively dhol drummers, and fresh coconut water bars.',
          },
          {
            time: '01:00 PM – 03:00 PM',
            title: 'Authentic Mewari Shahi Lunch',
            desc: 'Traditional silver-thali dawat featuring authentic Dal Baati Churma, Gatte ki Subzi, Ker Sangri, and live sweet jalebis.',
          },
          {
            time: '07:30 PM – 02:00 AM',
            title: 'The Grand Island Sangeet Gala',
            desc: 'Private chartered boats take guests to an illuminated island stage for choreographed family dances, celebrity DJs, and fireworks.',
          },
        ],
      },
      {
        day: 'Day 03',
        theme: 'The Royal Baraat, Sunset Lake Vows & Imperial Reception',
        sub: 'Decorated Steeds · Floating Floral Mandap · Black-Tie Banquet',
        events: [
          {
            time: '04:00 PM – 05:30 PM',
            title: 'The Royal Mewari Baraat',
            desc: 'Vintage open-top convertibles, ornamented royal horses, traditional brass band, floral velvet umbrellas, and dhol players leading the procession.',
          },
          {
            time: '05:45 PM – 07:30 PM',
            title: 'Sunset Pheras by the Lake',
            desc: 'Sacred Vedic hymns recited beneath a floral dome of avalanche roses and rajnigandha, silhouetted against the glowing Lake Pichola at dusk.',
          },
          {
            time: '08:30 PM – Midnight',
            title: 'The Grand Imperial Reception & Fireworks',
            desc: 'Black-tie sit-down royal silver thali banquet, champagne toasts, family speeches, and a synchronized aerial fireworks display lighting up the lake.',
          },
        ],
      },
    ],
    budgetTiers: [
      {
        category: 'Boutique Heritage & Hilltop Resorts',
        venues: 'Fateh Garh Palace, Chunda Palace, Labh Garh Palace Resort',
        guests: '100 – 200 Guests (2–3 Days)',
        range: '₹55 Lakhs – ₹95 Lakhs',
        highlight: 'Intimate royal palace ambience, full family property buyouts, personalized Mewari hospitality, and bespoke floral decor.',
      },
      {
        category: 'Grand Palatial Shoreline Resorts',
        venues: 'The Leela Palace Udaipur, Radisson Blu Udaipur, Aurika by Lemon Tree',
        guests: '150 – 350 Guests (3 Days)',
        range: '₹95 Lakhs – ₹2.0 Crore',
        highlight: 'Expansive banquets, lakeside wedding lawns, multi-day guest room blocks, concert-grade Sangeet production, and royal Baraat.',
      },
      {
        category: 'Ultra-Luxury Island Palaces & Iconic Buyouts',
        venues: 'Jagmandir Island Palace, The Oberoi Udaivilas, Taj Lake Palace',
        guests: '200 – 600+ Guests (3 Days)',
        range: '₹2.5 Crore – ₹5.5 Crore+',
        highlight: 'The pinnacle of destination weddings globally: private island boat fleets, Michelin-calibre catering, and celebrity entertainment.',
      },
    ],
    faqs: [
      {
        q: 'Why is Udaipur known as the top destination wedding city in India?',
        a: 'Udaipur, the "City of Lakes," offers unmatched romantic water palaces, 16th-century Mewari architecture, and serene Aravalli hill backdrops. Venues like Jagmandir Island Palace and The Oberoi Udaivilas allow couples to host floating ceremonies and private boat processions found nowhere else in the world.',
      },
      {
        q: 'How much does a luxury destination wedding in Udaipur cost?',
        a: 'A destination wedding in Udaipur generally costs between ₹55 Lakhs to ₹95 Lakhs for a boutique heritage palace (100–150 guests). Grand lakeside five-star celebrations range between ₹95 Lakhs to ₹2.0 Crore, while ultra-luxury celebrations at iconic island palaces like Jagmandir or Udaivilas range from ₹2.5 Crore to ₹5.5 Crore+. RASM turnkey planning packages start transparently from ₹30,00,000.',
      },
      {
        q: 'How are guest boat transfers managed for Lake Pichola venues?',
        a: 'RASM coordinates dedicated private chartered boat fleets with safety life-jackets, floral adornments, VIP queue management, and onboard acoustic musicians. We oversee jetty logistics at City Palace Bansi Ghat so guests experience seamless, enchanting transit.',
      },
      {
        q: 'What is the best season for an outdoor wedding in Udaipur?',
        a: 'The ideal wedding window in Udaipur spans from October to March. During these months, the city enjoys sunny, mild daytime temperatures (22°C to 27°C) and romantic, cool lake breezes in the evening (12°C to 16°C), ideal for open-air lawn pheras and island dinners.',
      },
      {
        q: 'How far in advance should we book venues and planners in Udaipur?',
        a: 'Given Udaipur’s global fame and limited inventory of luxury lake palaces, top winter wedding dates book out 9 to 12 months ahead. Finalizing your wedding planner and venue early guarantees prime dates and the best room rates.',
      },
    ],
  },

  jaipur: {
    slug: 'wedding-planner-in-jaipur',
    city: 'Jaipur',
    stateOrRegion: 'Rajasthan',
    eyebrow: '★ RANKED #1 LUXURY WEDDING PLANNER IN JAIPUR',
    h1Title: 'Best Wedding Planner in Jaipur:',
    h1Accent: 'Imperial Fortresses & Royal Palaces',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2026/10/opulent_palace_courtyard_at_dusk.webp',
    heroAlt: 'Best Wedding Planner in Jaipur - Royal Palace Destination Wedding in the Pink City',
    leadCopy:
      'Looking for a grand royal wedding in the historic Pink City? At RASM Weddings & Events, we curate extraordinary celebrations across Jaipur’s iconic palatial landmarks. From the royal Mughal gardens of Rambagh Palace and the palatial fortress grandeur of Fairmont Jaipur, to heritage havelis like Jai Mahal Palace and Samode Palace—our expert team delivers bespoke Rajput decor, elephant Baraat processions, high-fashion Sangeet galas, and seamless on-ground guest management.',
    primaryKeyword: 'Best Wedding Planner in Jaipur',
    secondaryKeywords: [
      'destination wedding in Jaipur',
      'Rambagh Palace wedding cost',
      'Fairmont Jaipur wedding planner',
      'Jai Mahal Palace wedding packages',
      'Pink City luxury wedding planner',
    ],
    facts: {
      bestMonths: 'October to March (Crisp sunny days 23°C–28°C, pleasant cool royal evenings)',
      nearestAirport: 'Jaipur International Airport (JAI) with global flights & connections',
      railAccess: 'Jaipur Junction (JP) with high-speed express trains from Delhi, Mumbai & Gujarat',
      culinary: 'Royal Rajputana Dawat: Dal Baati Churma, Mohan Maas, Ker Sangri, & Mawa Kachori',
      landmarks: 'Amer Fort, City Palace, Hawa Mahal, Jal Mahal, Nahargarh Fort, Albert Hall',
    },
    venues: [
      {
        id: 'rambagh-palace',
        name: 'Rambagh Palace (Taj Hotels)',
        category: 'Former Royal Residence of Maharaja of Jaipur',
        capacity: '150 – 1,000+ Guests',
        tagline: 'The Jewel of the Pink City & Former Royal Residence',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/opulent_palace_courtyard_at_dusk.webp',
        costRange: '₹2.5 Cr – ₹5.0 Cr+ (Royal Palace Buyout & Grand Lawn Hire)',
        description:
          'Spread across 47 acres of tranquil landscaped gardens, Rambagh Palace is the former residence of the Maharaja of Jaipur. Adorned with hand-carved marble jharokhas, sandstone balustrades, and sprawling Mughal gardens, it is consistently voted among the premier luxury heritage hotels on the planet.',
        highlights: [
          '47 acres of royal Mughal gardens including the grand Mubarak and Jaigarh Lawns',
          'Palatial dining halls, peacock-dotted courtyards, and royal polo grounds',
          'Unrivaled Taj royal heritage hospitality with horse carriage welcomes',
          'Private royal suites with antique Rajput furnishings and heirloom artwork',
        ],
        bestFor: 'Grand Imperial Pheras, High-Stakes Receptions, & Palatial Buyouts',
      },
      {
        id: 'fairmont-jaipur',
        name: 'Fairmont Jaipur',
        category: 'Palatial Fortress Resort',
        capacity: '300 – 1,500+ Guests',
        tagline: 'Mughal-Rajput Fortress Scale for Large-Scale Royal Extravaganzas',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/palace_wedding_under_blooming_chandeliers.webp',
        costRange: '₹1.5 Cr – ₹3.5 Cr+ (Large-Scale Buyout & Banqueting)',
        description:
          'Nestled against the Aravalli hills, Fairmont Jaipur is custom-designed as an imperial fortress palace. Boasting 245+ luxury rooms, massive pillar-less ballrooms, and expansive outdoor wedding lawns, it is the premier choice for large 400+ guest destination weddings in Rajasthan.',
        highlights: [
          'Massive inventory of 245+ rooms to house all your wedding guests under one roof',
          'Vast Charbagh lawns and opulent pillarless Grand Ballroom with towering ceilings',
          'Dramatic fortress facade offering an imposing backdrop for lighting and fireworks',
          'Exceptional banqueting infrastructure designed specifically for multi-day weddings',
        ],
        bestFor: 'Large-Scale Destination Weddings (400–1000+ guests) & Concert Sangeets',
      },
      {
        id: 'jai-mahal-palace',
        name: 'Jai Mahal Palace (Taj Hotels)',
        category: '18th-Century Indo-Saracenic Palace',
        capacity: '200 – 800 Guests',
        tagline: 'Historic Indo-Saracenic Palace Surrounded by 18 Acres of Mughal Lawns',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/golden_palace_courtyard_at_dusk.webp',
        costRange: '₹1.2 Cr – ₹2.5 Cr+ (Mughal Lawns & Palace Buyout)',
        description:
          'Dating back to 1745, Jai Mahal Palace is an authentic Indo-Saracenic masterpiece nestled in the heart of Jaipur. Featuring 18 acres of geometric Mughal gardens, stone pavilions, and royal suites, it blends heritage authenticity with five-star Taj hospitality.',
        highlights: [
          'Authentic 18th-century palace architecture right within Jaipur city limits',
          'Sprawling Lotus Pond, Palace Lawns, and fountain courtyards for colorful setups',
          'World-class Taj culinary teams curating bespoke regional and international spreads',
          'Stunning evening lighting illuminating traditional arches and sandstone jaalis',
        ],
        bestFor: 'Outdoor Garden Pheras, Poolside Mehndi Carnivals, & Shahi Banquets',
      },
      {
        id: 'samode-palace',
        name: 'Samode Palace & Haveli',
        category: 'Intimate Royal Heritage Palace',
        capacity: '80 – 300 Guests',
        tagline: 'Centuries-Old Royal Heritage with Sheesh Mahal Mirror Artistry',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/royal_blue_fort_wedding_at_night.webp',
        costRange: '₹70 Lakhs – ₹1.4 Cr (Exclusive Heritage Buyout)',
        description:
          'Located in a tranquil village at the foot of the Aravalli range, Samode Palace is a 475-year-old jewel famous for its hand-painted Sheesh Mahal (Hall of Mirrors). Ideal for boutique luxury weddings where couples desire an enchanting, deeply artistic heritage setting.',
        highlights: [
          'World-famous hand-painted fresco halls and mirror-worked Sheesh Mahal courtyards',
          'Complete private village buyout offering total intimacy and rustic royal charm',
          'Rooftop swimming pools and hill-facing terraces for atmospheric sunset cocktails',
          'Rich artistic backdrop that requires minimal additional decor to look majestic',
        ],
        bestFor: 'Boutique Heritage Buyouts, Royal Mehndi Baithaks, & Artistic Vows',
      },
    ],
    itinerary: [
      {
        day: 'Day 01',
        theme: 'Padharo Mhare Gulabi Shehar: The Royal Welcome & Shahi Mehndi',
        sub: 'Elephant Fanfare · Live Folk Music · Vibrant Bazaar Cabanas',
        events: [
          {
            time: '12:00 PM – 02:00 PM',
            title: 'Imperial Rajputana Welcome',
            desc: 'Dhol drummers, Shehnai fanfare, garland welcomes by liveried royal staff, and cooling badam thandai drinks.',
          },
          {
            time: '03:30 PM – 06:30 PM',
            title: 'Shahi Mehndi & Jaipuri Craft Fair',
            desc: 'Garden pavilions draped in Pink City bandhani, live lac bangle making, block-print ateliers, and organic henna.',
          },
          {
            time: '07:30 PM – 11:30 PM',
            title: 'Courtyard Sufi Night & Rajput Dawat',
            desc: 'Acoustic Sufi artists perform under chandeliers as guests indulge in live sigri kebabs and royal curries.',
          },
        ],
      },
      {
        day: 'Day 02',
        theme: 'Phoolon Ki Holi & The Grand Palace Sangeet Gala',
        sub: 'Yellow Marigold Showers · Street Chaat · Concert-Grade Sangeet',
        events: [
          {
            time: '10:30 AM – 01:00 PM',
            title: 'Phoolon Ki Holi Haldi',
            desc: 'Brass urli baths, yellow marigold petals, herbal organic gulal, live dhol beats, and refreshing thandai counters.',
          },
          {
            time: '01:00 PM – 03:00 PM',
            title: 'Jaipuri Chaat Street & Shahi Lunch',
            desc: 'Authentic local chaat, Pyaaz Kachori, Mawa Kachori, Dal Baati Churma, and fresh lassi bars.',
          },
          {
            time: '07:30 PM – 02:00 AM',
            title: 'The Grand Fort Sangeet Gala',
            desc: 'High-voltage stage production with moving lights, celebrity anchors, Kalbelia fire dancers, and DJ after-party.',
          },
        ],
      },
      {
        day: 'Day 03',
        theme: 'The Imperial Elephant Baraat, Sunset Pheras & Royal Reception',
        sub: 'Vintage Convertibles · Floral Mandap · Black-Tie Banquet',
        events: [
          {
            time: '04:00 PM – 05:30 PM',
            title: 'The Grand Royal Baraat',
            desc: 'Caparisoned royal horses, vintage cars, brass band, floral velvet umbrellas, and dhol players leading the procession.',
          },
          {
            time: '05:45 PM – 07:30 PM',
            title: 'Sunset Pheras at the Palace Lawns',
            desc: 'Vedic hymns recited beneath an opulent floral mandap glowing against the illuminated palace facade at twilight.',
          },
          {
            time: '08:30 PM – Midnight',
            title: 'The Imperial Gala Reception & Fireworks',
            desc: 'Silver thali banquet, champagne toasts, family speeches, and aerial fireworks illuminating the Pink City sky.',
          },
        ],
      },
    ],
    budgetTiers: [
      {
        category: 'Heritage Havelis & Boutique Palaces',
        venues: 'Samode Palace, Alsisar Haveli, Diggi Palace, Heritage Resorts',
        guests: '100 – 200 Guests (2–3 Days)',
        range: '₹50 Lakhs – ₹90 Lakhs',
        highlight: 'Intimate royal ambience, full property buyout privacy, authentic Rajput architecture, and personalized hospitality.',
      },
      {
        category: 'Grand Palatial Resorts & Fort Hotels',
        venues: 'Fairmont Jaipur, Le Meridien, JW Marriott Resort, Shiv Vilas',
        guests: '200 – 450 Guests (3 Days)',
        range: '₹90 Lakhs – ₹2.2 Crore',
        highlight: 'Expansive banquets, large guest room blocks under one roof, grand Sangeet production, and royal Baraat.',
      },
      {
        category: 'Ultra-Luxury Imperial Palaces & Iconic Buyouts',
        venues: 'Rambagh Palace (Taj), Jai Mahal Palace, Alila Fort Bishangarh',
        guests: '200 – 600+ Guests (3 Days)',
        range: '₹2.2 Crore – ₹5.0 Crore+',
        highlight: 'The pinnacle of luxury in Rajasthan: royal residence suites, Michelin-grade Taj culinary curation, and global celebrity prestige.',
      },
    ],
    faqs: [
      {
        q: 'Why choose Jaipur for a destination wedding?',
        a: 'Jaipur, the Pink City, blends imperial Rajput history with premier luxury hospitality. Unlike smaller heritage towns, Jaipur boasts large-capacity fortress resorts like Fairmont Jaipur alongside legendary authentic royal palaces like Rambagh Palace, all within convenient reach of an international airport.',
      },
      {
        q: 'What is the average cost of a destination wedding in Jaipur?',
        a: 'A destination wedding in Jaipur typically ranges from ₹50 Lakhs to ₹90 Lakhs at a boutique heritage property (100–200 guests). Grand celebrations at fortress resorts like Fairmont range from ₹90 Lakhs to ₹2.2 Crore, while ultra-luxury celebrations at Rambagh Palace start at ₹2.2 Crore and can exceed ₹5 Crore. RASM planning packages start from ₹30,00,000.',
      },
      {
        q: 'How well-connected is Jaipur for outstation & international guests?',
        a: 'Jaipur International Airport (JAI) connects with direct domestic flights from Mumbai, Delhi, Bengaluru, Hyderabad, and Kolkata, as well as direct international flights from Dubai, Sharjah, and Muscat. Delhi is also just a 3.5-hour drive via the new expressway.',
      },
      {
        q: 'What is the best time of year to get married in Jaipur?',
        a: 'The prime wedding season spans from October through March when days are sunny and pleasant (23°C to 28°C) and evenings are comfortably crisp (11°C to 16°C). Outdoor daytime and evening functions are ideal during these months.',
      },
      {
        q: 'Can we hold an elephant or vintage car Baraat in Jaipur?',
        a: 'Yes! Jaipur is famous for its grand royal Baraat processions. RASM arranges permitted caparisoned elephants, decorated royal horses, vintage convertibles, and full brass bands with all necessary local permissions.',
      },
    ],
  },

  jaisalmer: {
    slug: 'wedding-planner-in-jaisalmer',
    city: 'Jaisalmer',
    stateOrRegion: 'Rajasthan',
    eyebrow: '★ RANKED #1 LUXURY WEDDING PLANNER IN JAISALMER',
    h1Title: 'Best Wedding Planner in Jaisalmer:',
    h1Accent: 'Golden Fortresses & Thar Sand Dunes',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2026/09/wedding-planner-in-jaisalmer-featured.webp',
    heroAlt: 'Best Wedding Planner in Jaisalmer - Golden Sandstone Fortress & Thar Desert Wedding',
    leadCopy:
      'Envisioning a golden desert fairytale in Rajasthan’s Golden City? At RASM Weddings & Events, we transform the breathtaking golden sandstone forts and rolling Thar dunes of Jaisalmer into royal wedding spectacles. From palatial celebrations at Suryagarh and Fort Rajwada to starry bonfire Sangeets in the Sam sand dunes—we manage desert logistics, luxury glamping, royal folk entertainment, and bespoke golden-hued decor with precision and zero hidden markups.',
    primaryKeyword: 'Best Wedding Planner in Jaisalmer',
    secondaryKeywords: [
      'destination wedding in Jaisalmer',
      'Suryagarh Jaisalmer wedding cost',
      'Thar desert wedding planner',
      'Fort Rajwada wedding packages',
      'Golden City royal wedding planner',
    ],
    facts: {
      bestMonths: 'October to March (Warm golden daytime 24°C–28°C, crisp starry desert evenings 10°C–14°C)',
      nearestAirport: 'Jaisalmer Airport (JSA) seasonal flights; Jodhpur Airport (JDH) with road transfer',
      railAccess: 'Jaisalmer Railway Station (JSM) with direct express trains',
      culinary: 'Desert Marwari Specialties: Ker Sangri, Bajre ki Roti, Gatte ki Khichdi, & Laal Maas',
      landmarks: 'Jaisalmer Fort (Sonar Qila), Patwon Ki Haveli, Sam Sand Dunes, Gadisar Lake',
    },
    venues: [
      {
        id: 'suryagarh-jaisalmer',
        name: 'Suryagarh Jaisalmer',
        category: 'Fortress Luxury Resort',
        capacity: '150 – 600+ Guests',
        tagline: 'The Pinnacle of Desert Luxury & Celebrity Wedding Landmark',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/golden_desert_wedding_lounge_at_sunset.webp',
        costRange: '₹1.8 Cr – ₹4.0 Cr+ (Full Desert Fortress Buyout)',
        description:
          'Constructed from radiant yellow Jaisalmer sandstone to resemble an ancient medieval desert fortress, Suryagarh is globally famous for hosting Kiara Advani & Sidharth Malhotra’s celebrity wedding. With expansive courtyards, subterranean pools, and desert dune setups, it is the benchmark of desert luxury.',
        highlights: [
          'Iconic celebrity wedding venue built with authentic golden yellow Jaisalmer sandstone',
          'Vast courtyards, Baoli stepwells, and sunset dunes for multi-themed ceremonies',
          'World-class culinary and spa services tailored for high-profile international guests',
          'Complete property buyout options providing total privacy amidst the Thar Desert',
        ],
        bestFor: 'Celebrity Desert Weddings, Luxury Fortress Buyouts, & Starry Sandstone Pheras',
      },
      {
        id: 'fort-rajwada',
        name: 'Fort Rajwada Jaisalmer',
        category: 'Heritage Sandstone Palace',
        capacity: '100 – 400 Guests',
        tagline: 'Traditional Rajput Architecture & Stone-Carved Courtyards',
        image: 'https://rasmwed.com/wp-content/uploads/2026/09/wedding-planner-in-jaisalmer-featured.webp',
        costRange: '₹55 Lakhs – ₹1.1 Cr (Heritage Buyout & Banqueting)',
        description:
          'Spread over 6 acres of serene grounds, Fort Rajwada reflects authentic Rajput stone-carving traditions designed by opera set designer Stephanie Kohn. Its tranquil courtyards, poolside terraces, and heritage suites provide an authentic royal experience.',
        highlights: [
          'Exquisite stone jharokha craftsmanship and museum-quality antique furnishings',
          'Spacious banquet lawns and poolside terraces for colorful Haldi and Mehndi setups',
          'Warm local Rajasthani hospitality with rich regional Marwari culinary curation',
          'Convenient central location close to Jaisalmer city landmarks and airport',
        ],
        bestFor: 'Heritage Family Buyouts, Poolside Mehndi Carnivals, & Sandstone Pheras',
      },
      {
        id: 'jaisalmer-marriott',
        name: 'Jaisalmer Marriott Resort & Spa',
        category: 'Modern Five-Star Palatial Resort',
        capacity: '150 – 500 Guests',
        tagline: 'Five-Star Luxury Resort Overlooking the Golden Sonar Qila',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/opulent_palace_courtyard_at_dusk.webp',
        costRange: '₹80 Lakhs – ₹1.6 Cr (Five-Star Resort Wedding)',
        description:
          'Blending contemporary five-star Marriott luxury with traditional golden sandstone architecture, Jaisalmer Marriott overlooks the historic Golden Fort. Offering expansive wedding lawns, grand ballrooms, and 135+ guest rooms, it delivers seamless modern destination weddings.',
        highlights: [
          '135+ spacious guest rooms and suites to accommodate large wedding guest lists',
          'Direct scenic views of Jaisalmer Fort (Sonar Qila) from sunset rooftop terraces',
          'State-of-the-art pillar-less ballroom and expansive outdoor wedding lawns',
          'Global Marriott Bonvoy service standards and multi-cuisine culinary mastery',
        ],
        bestFor: 'Five-Star Guest Comfort, Grand Sangeet Productions, & Modern Receptions',
      },
    ],
    itinerary: [
      {
        day: 'Day 01',
        theme: 'Padharo Mhare Thar: Desert Welcome & Sandstone Mehndi',
        sub: 'Camel Fanfare · Langa Folk Melodies · Golden Courtyard Bazaar',
        events: [
          {
            time: '12:00 PM – 02:00 PM',
            title: 'Royal Desert Welcome',
            desc: 'Caparisoned camels, Shehnai fanfare, garland welcomes by liveried royal staff, and cooling badam thandai drinks.',
          },
          {
            time: '03:30 PM – 06:30 PM',
            title: 'Shahi Mehndi & Craft Fair',
            desc: 'Courtyard pavilions draped in golden yellow bandhani, live lac bangle making, block-print ateliers, and organic henna.',
          },
          {
            time: '07:30 PM – 11:30 PM',
            title: 'Courtyard Sufi Night & Rajput Dawat',
            desc: 'Acoustic Sufi artists perform under chandeliers as guests indulge in live sigri kebabs and royal curries.',
          },
        ],
      },
      {
        day: 'Day 02',
        theme: 'Golden Haldi & The Sam Desert Dunes Sangeet Gala',
        sub: 'Yellow Marigold Showers · Dune Sunset · Desert Fire Dancers',
        events: [
          {
            time: '10:30 AM – 01:00 PM',
            title: 'Phoolon Ki Holi Haldi',
            desc: 'Brass urli baths, yellow marigold petals, herbal organic gulal, live dhol beats, and refreshing thandai counters.',
          },
          {
            time: '04:30 PM – 06:30 PM',
            title: 'Sunset Camel Caravan on the Dunes',
            desc: 'Guests journey to private Thar sand dunes for a golden hour camel caravan, sundowner cocktails, and desert photography.',
          },
          {
            time: '07:30 PM – 02:00 AM',
            title: 'The Great Thar Sangeet Extravaganza',
            desc: 'Concert stage on the dunes with Kalbelia fire dancers, Manganiyar vocalists, bonfire banquets, and high-energy DJ music.',
          },
        ],
      },
      {
        day: 'Day 03',
        theme: 'The Royal Baraat, Sunset Vows & Sandstone Reception',
        sub: 'Decorated Steeds · Golden Sandstone Mandap · Black-Tie Banquet',
        events: [
          {
            time: '04:00 PM – 05:30 PM',
            title: 'The Grand Royal Baraat',
            desc: 'Caparisoned royal horses, vintage open-top cars, brass band, floral velvet umbrellas, and dhol players leading the procession.',
          },
          {
            time: '05:45 PM – 07:30 PM',
            title: 'Sunset Pheras at the Sandstone Courtyard',
            desc: 'Vedic hymns recited beneath an opulent floral mandap glowing against the illuminated fortress facade at twilight.',
          },
          {
            time: '08:30 PM – Midnight',
            title: 'The Imperial Gala Reception & Fireworks',
            desc: 'Silver thali banquet, champagne toasts, family speeches, and aerial fireworks illuminating the Golden City desert sky.',
          },
        ],
      },
    ],
    budgetTiers: [
      {
        category: 'Heritage Havelis & Desert Fort Hotels',
        venues: 'Fort Rajwada, Gorbandh Palace, Rang Mahal Jaisalmer',
        guests: '80 – 150 Guests (2–3 Days)',
        range: '₹45 Lakhs – ₹85 Lakhs',
        highlight: 'Intimate golden sandstone fortress ambience, full family property buyouts, and personalized Marwari hospitality.',
      },
      {
        category: 'Five-Star Luxury Resorts & Dunes',
        venues: 'Jaisalmer Marriott Resort & Spa, Desert Luxury Camps',
        guests: '150 – 350 Guests (3 Days)',
        range: '₹80 Lakhs – ₹1.6 Crore',
        highlight: 'Five-star room blocks, large banquet lawns, desert sunset dune excursions, and concert-grade Sangeet production.',
      },
      {
        category: 'Ultra-Luxury Fortress Buyouts',
        venues: 'Suryagarh Jaisalmer (Full Property Buyout)',
        guests: '150 – 450+ Guests (3 Days)',
        range: '₹1.8 Crore – ₹4.0 Crore+',
        highlight: 'The ultimate desert luxury statement: full fortress buyout, celebrity-level production, and starry desert glamping.',
      },
    ],
    faqs: [
      {
        q: 'Why choose Jaisalmer for a luxury destination wedding?',
        a: 'Jaisalmer offers a magical desert landscape found nowhere else in India. The radiant golden yellow sandstone architecture, intimate fortress seclusion, and the option to host functions on untouched desert dunes make it completely unique for high-end celebrations.',
      },
      {
        q: 'How much does a destination wedding in Jaisalmer cost?',
        a: 'A destination wedding in Jaisalmer ranges between ₹45 Lakhs to ₹85 Lakhs for a heritage palace hotel (80–150 guests). Five-star celebrations at Jaisalmer Marriott range from ₹80 Lakhs to ₹1.6 Crore, while full luxury fortress buyouts at Suryagarh range from ₹1.8 Crore to ₹4.0 Crore+. RASM turnkey planning packages start from ₹30,00,000.',
      },
      {
        q: 'How do guests travel to Jaisalmer?',
        a: 'Jaisalmer Airport (JSA) operates scheduled commercial flights during the winter wedding season from Delhi and Mumbai. Alternatively, guests fly into Jodhpur Airport (JDH), followed by a scenic 4-hour highway transfer in luxury AC coaches arranged by RASM.',
      },
      {
        q: 'Is it cold in Jaisalmer during the winter wedding season?',
        a: 'During October to March, daytime temperatures are sunny and pleasant (24°C to 28°C), while nights can be crisp and cool (10°C to 14°C). RASM arranges outdoor patio heaters, bonfire pits, and warm pashmina wraps for evening functions on the dunes.',
      },
    ],
  },

  goa: {
    slug: 'wedding-planner-in-goa',
    city: 'Goa',
    stateOrRegion: 'Goa',
    eyebrow: '★ RANKED #1 LUXURY DESTINATION WEDDING PLANNER IN GOA',
    h1Title: 'Best Wedding Planner in Goa:',
    h1Accent: 'Beachfront Mandaps & Oceanfront Luxury',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp',
    heroAlt: 'Best Wedding Planner in Goa - Sunset Beachfront Mandap & Luxury Ocean Resort Wedding',
    leadCopy:
      'Dreaming of an oceanfront sunset wedding with sea breezes and golden sands? At RASM Weddings & Events, we bring five-star luxury and flawless execution to Goa’s finest beachfront resorts and heritage Portuguese estates. From beachfront pheras at Taj Exotica and barefoot luxury sundowners at W Goa, to grand ballroom galas at ITC Grand Goa and The Leela—our team delivers bespoke floral canopies, cocktail production, international DJ bookings, and stress-free guest logistics.',
    primaryKeyword: 'Best Wedding Planner in Goa',
    secondaryKeywords: [
      'destination wedding in Goa',
      'beach wedding in Goa cost',
      'Taj Exotica Goa wedding planner',
      'ITC Grand Goa wedding packages',
      'luxury beach wedding planner India',
    ],
    facts: {
      bestMonths: 'November to February (Dry, sunny coastal days 28°C–31°C, balmy sunset ocean breezes 20°C–23°C)',
      nearestAirport: 'Dabolim Airport (GOI) in South Goa & Manohar International Airport, Mopa (GOX) in North Goa',
      railAccess: 'Madgaon Junction (MAO) and Thivim (THVM) railway stations',
      culinary: 'Goan Coastal & Global Feast: Fresh Seafood, Goan Fish Curry, Bebinca, & Global Multi-Cuisine',
      landmarks: 'Benaulim Beach, Vagator Cliffs, Old Goa Churches, Chapora Fort, Mandovi River',
    },
    venues: [
      {
        id: 'taj-exotica-goa',
        name: 'Taj Exotica Resort & Spa, Goa',
        category: 'Mediterranean-Style Beachfront Resort',
        capacity: '150 – 800+ Guests',
        tagline: '56 Acres of Tropical Lawns Fronting Benaulim Beach',
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp',
        costRange: '₹1.8 Cr – ₹3.8 Cr+ (Five-Star Beachfront Wedding)',
        description:
          'Spanning 56 acres of lush gardens along a private stretch of Benaulim Beach in South Goa, Taj Exotica is the benchmark of luxury beach weddings in India. Its Mediterranean villa architecture, palm-fringed lawns, and direct beach access create a breathtaking coastal paradise.',
        highlights: [
          '56 acres of manicured tropical gardens with direct access to private Benaulim Beach',
          'Sprawling oceanfront wedding lawns for sunset pheras under coconut palms',
          'World-renowned Taj culinary excellence with live grills and international seafood spreads',
          'Spacious luxury villas with private plunge pools for VIP family accommodation',
        ],
        bestFor: 'Sunset Beachfront Pheras, Oceanview Cocktails, & Ultra-Luxury Receptions',
      },
      {
        id: 'itc-grand-goa',
        name: 'ITC Grand Goa Resort & Spa',
        category: 'Village-Style Oceanfront Sanctuary',
        capacity: '200 – 1,000+ Guests',
        tagline: 'Direct Arossim Beach Access with 45 Acres of Lagoons & Coconut Groves',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/sunset_palace_resort_retreat.webp',
        costRange: '₹1.5 Cr – ₹3.2 Cr+ (Luxury Coastal Wedding)',
        description:
          'Set amidst 45 acres of lush landscaped gardens with shimmering lagoons and direct access to pristine Arossim Beach, ITC Grand Goa is designed in traditional Indo-Portuguese village architecture. Offering one of Goa’s largest multi-level outdoor pools and multiple seaside lawns, it is built for grand celebrations.',
        highlights: [
          'Direct access to serene, white-sand Arossim Beach with breathtaking sunset views',
          'Expansive Seaside Lawns accommodating up to 1,000 guests comfortably',
          'Celebrated ITC culinary pedigree with authentic coastal and international banqueting',
          '252 luxurious rooms and suites nestled among private waterways and gardens',
        ],
        bestFor: 'Large Beach Weddings (300–800 guests), Poolside Haldi Carnivals, & Sangeet Nights',
      },
      {
        id: 'w-goa',
        name: 'W Goa (Vagator Beach)',
        category: 'Ultra-Chic Contemporary Luxury',
        capacity: '100 – 450 Guests',
        tagline: 'Trendy Bohemian Luxury Overlooking the Cliffs of Vagator Beach',
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/glamorous_indian_wedding_dance_performance.webp',
        costRange: '₹1.6 Cr – ₹3.5 Cr+ (Chic Luxury Beach Wedding)',
        description:
          'Situated at the foot of historic Chapora Fort overlooking Vagator Beach, W Goa brings high-energy luxury and contemporary style to destination celebrations. With its iconic Rockpool terrace, vibrant design, and world-class sound systems, it is the top choice for couples wanting an electrifying party atmosphere.',
        highlights: [
          'Iconic Rockpool sunset amphitheater overlooking the Arabian Sea for cocktails and Sangeet',
          'Chic, modern bohemian design that appeals strongly to international and NRI couples',
          'Exceptional technical acoustic capabilities for high-energy music and DJ performances',
          'World-class mixology and avant-garde global cuisine stations',
        ],
        bestFor: 'High-Energy Sangeet Galas, Bohemian Haldi Carnivals, & Sunset Sundowners',
      },
    ],
    itinerary: [
      {
        day: 'Day 01',
        theme: 'Susegad Welcome & Sunset White-Party Soiree',
        sub: 'Tropical Cocktails · Acoustic Calypso & Saxophone · Beach Cabanas',
        events: [
          {
            time: '12:00 PM – 02:00 PM',
            title: 'Tropical Goan Welcome',
            desc: 'Chilled tender coconut water, floral lei welcomes, acoustic guitars, and oceanfront check-in.',
          },
          {
            time: '04:00 PM – 07:00 PM',
            title: 'Boho Beachside Mehndi',
            desc: 'Pastel cabanas by the sand, organic henna artists, floral hair stylists, and chilled sangria bars.',
          },
          {
            time: '08:00 PM – 01:00 AM',
            title: 'The All-White Oceanfront Welcome Soiree',
            desc: 'Live coastal seafood grills, fire performers on the beach, and live acoustic bands under palm trees.',
          },
        ],
      },
      {
        day: 'Day 02',
        theme: 'Tropical Poolside Haldi & The Grand Neon Sangeet',
        sub: 'Yellow Marigold Showers · Foam & Sun Dance · Concert Sangeet',
        events: [
          {
            time: '10:30 AM – 01:30 PM',
            title: 'Poolside Haldi & Rain Carnival',
            desc: 'Brass urli baths, floral showers, upbeat live dhol and tropical deep house music, and beer buckets.',
          },
          {
            time: '02:00 PM – 03:30 PM',
            title: 'Goan Coastal & Continental Buffet',
            desc: 'Fresh coastal curries, wood-fired pizzas, global live counters, and refreshing mocktail bars.',
          },
          {
            time: '07:30 PM – 03:00 AM',
            title: 'The Grand Electric Sangeet Gala',
            desc: 'High-end concert stage with LED visual walls, choreographed dances, international DJ, and late-night afterparty.',
          },
        ],
      },
      {
        day: 'Day 03',
        theme: 'The Sunset Beach Baraat, Ocean Vows & Gala Reception',
        sub: 'Vintage Jeep / Convertible · Floral Mandap by the Waves · Gala Dinner',
        events: [
          {
            time: '04:30 PM – 05:45 PM',
            title: 'The Sunset Beach Baraat',
            desc: 'Open-top vintage jeeps, brass band, floral umbrellas, and dhol players dancing along the palm avenue.',
          },
          {
            time: '06:00 PM – 07:30 PM',
            title: 'Sunset Pheras by the Waves',
            desc: 'Vows taken under a floral mandap framing the golden sunset over the Arabian Sea with live flute melodies.',
          },
          {
            time: '08:30 PM – Midnight',
            title: 'The Grand Oceanview Reception & Fireworks',
            desc: 'Sit-down banquet dinner, champagne tower toasts, speeches, and an aerial fireworks spectacle over the sea.',
          },
        ],
      },
    ],
    budgetTiers: [
      {
        category: 'Boutique Coastal & Heritage Resorts',
        venues: 'Heritage Portuguese Villas, Riva Beach Resort, Caravela Beach Resort',
        guests: '100 – 200 Guests (2–3 Days)',
        range: '₹50 Lakhs – ₹95 Lakhs',
        highlight: 'Intimate barefoot beach vibe, lush tropical lawns, personalized hospitality, and bespoke floral decor.',
      },
      {
        category: 'Five-Star Beachfront Luxury Resorts',
        venues: 'ITC Grand Goa, Alila Diwa Goa, Grand Hyatt Goa',
        guests: '150 – 350 Guests (3 Days)',
        range: '₹95 Lakhs – ₹2.2 Crore',
        highlight: 'Sprawling oceanfront lawns, large room blocks under one roof, grand Sangeet production, and beach wedding permits.',
      },
      {
        category: 'Ultra-Luxury Iconic Beachfront Buyouts',
        venues: 'Taj Exotica Resort & Spa, W Goa, The Leela Goa',
        guests: '200 – 600+ Guests (3 Days)',
        range: '₹2.2 Crore – ₹4.5 Crore+',
        highlight: 'The ultimate coastal wedding statement: private beach lawns, Michelin-grade catering, and world-class entertainment.',
      },
    ],
    faqs: [
      {
        q: 'Can we get married directly on the beach in Goa?',
        a: 'CRZ (Coastal Regulation Zone) laws in Goa prohibit permanent structures directly on public sand, but top luxury resorts (like Taj Exotica and ITC Grand Goa) have private oceanfront lawns that sit directly adjacent to the sand, offering an authentic barefoot beach experience with all necessary approvals.',
      },
      {
        q: 'How much does a destination wedding in Goa cost?',
        a: 'A destination wedding in Goa ranges between ₹50 Lakhs to ₹95 Lakhs for a boutique beach resort (100–200 guests). Five-star beachfront celebrations at properties like ITC Grand Goa range from ₹95 Lakhs to ₹2.2 Crore, while ultra-luxury celebrations at Taj Exotica or W Goa range from ₹2.2 Crore to ₹4.5 Crore+. RASM turnkey planning packages start from ₹30,00,000.',
      },
      {
        q: 'Which is better for weddings: North Goa or South Goa?',
        a: 'South Goa is preferred for grand, peaceful, five-star luxury weddings with expansive private beach lawns and tranquil resorts (Taj Exotica, ITC Grand Goa). North Goa is preferred for high-energy, boutique, nightlife-focused weddings with cliffside sunset views and club afterparties (W Goa, Vagator).',
      },
      {
        q: 'What are the music and sound curfew rules in Goa?',
        a: 'Outdoor music in Goa is strictly permitted until 10:00 PM by law. After 10:00 PM, all celebrations seamlessly transition indoors into the resort’s soundproof luxury ballrooms or nightclubs, where parties can continue until the early morning hours.',
      },
    ],
  },
};

/** Fallback generator for other destinations (Kumbhalgarh, Pushkar, Mount Abu, Nathdwara, Kota, Ranakpur, Ahmedabad, Gandhinagar, Thailand) */
export function getDestinationData(citySlug: string): DestinationDetail {
  const key = citySlug.replace(/^wedding-planner-in-/, '').toLowerCase();
  if (CITY_DESTINATIONS[key]) {
    return CITY_DESTINATIONS[key];
  }

  // Proper Capitalization of city name
  const cityName = key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    slug: citySlug,
    city: cityName,
    stateOrRegion: 'Rajasthan & Beyond',
    eyebrow: `★ RANKED #1 LUXURY WEDDING PLANNER IN ${cityName.toUpperCase()}`,
    h1Title: `Best Wedding Planner in ${cityName}:`,
    h1Accent: 'Heritage Palaces, Resorts & Lawns',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2026/10/golden_palace_courtyard_at_dusk.webp',
    heroAlt: `Best Wedding Planner in ${cityName} - Destination Wedding by RASM Weddings`,
    leadCopy: `Planning a royal destination wedding in ${cityName}? At RASM Weddings & Events, our expert Rajasthan planners coordinate end-to-end celebrations. From handpicked heritage venue selections and custom floral decor, to royal catering, NRI guest hospitality, and on-ground logistics with complete budget transparency and zero vendor markups.`,
    primaryKeyword: `Best Wedding Planner in ${cityName}`,
    secondaryKeywords: [
      `destination wedding in ${cityName}`,
      `wedding venues in ${cityName} cost`,
      `${cityName} wedding packages`,
      `luxury wedding planner in Rajasthan`,
    ],
    facts: {
      bestMonths: 'October to March (Pleasant sunny days, cool evenings ideal for celebrations)',
      nearestAirport: 'Regional air connectivity with luxury road transfers managed by RASM',
      railAccess: 'Major regional railway junction with direct express trains',
      culinary: 'Royal Regional & Multi-Cuisine Banqueting: Authentic regional flavors & global live stations',
      landmarks: `Historic Palaces, Heritage Havelis, and Scenic Garden Lawns across ${cityName}`,
    },
    venues: [
      {
        id: `${key}-heritage-palace`,
        name: `Heritage Palace & Resort ${cityName}`,
        category: 'Heritage Luxury Venue',
        capacity: '150 – 600+ Guests',
        tagline: `Authentic Regional Heritage with Sprawling Wedding Lawns`,
        image: 'https://rasmwed.com/wp-content/uploads/2026/10/opulent_palace_courtyard_at_dusk.webp',
        costRange: '₹50 Lakhs – ₹1.2 Cr+ (Full Destination Wedding)',
        description: `Offering panoramic regional views, grand banquet halls, and lush outdoor lawns, this premier venue provides an enchanting setting for destination weddings in ${cityName}.`,
        highlights: [
          'Spacious outdoor wedding lawns and grand banqueting spaces',
          'Authentic regional architecture, stone carvings, and evening illumination',
          'Delightful regional catering with dedicated vegetarian and Jain arrangements',
          'Comprehensive room blocks to host all outstation family members comfortably',
        ],
        bestFor: 'Grand Sangeet Galas, Sunset Vows, & Family Receptions',
      },
    ],
    itinerary: [
      {
        day: 'Day 01',
        theme: `Welcome to ${cityName}: Shahi Mehndi & Folk Soiree`,
        sub: 'Traditional Fanfare · Folk Music · Vibrant Courtyard Cabanas',
        events: [
          {
            time: '12:00 PM – 02:00 PM',
            title: 'Royal Welcome Ceremony',
            desc: 'Traditional dhol welcome, fresh flower garlands, Aarti tikka, and chilled welcome drinks.',
          },
          {
            time: '04:00 PM – 07:00 PM',
            title: 'Shahi Mehndi & Craft Fair',
            desc: 'Poolside pavilions, live folk bangle artisans, and organic herbal henna artists.',
          },
          {
            time: '07:30 PM – 11:30 PM',
            title: 'Courtyard Welcome Dinner',
            desc: 'Candlelit dinner with live acoustic folk performances and curated regional delicacies.',
          },
        ],
      },
      {
        day: 'Day 02',
        theme: 'Phoolon Ki Holi & The Grand Sangeet Gala',
        sub: 'Yellow Marigold Showers · Chaat Counters · Concert-Grade Sangeet',
        events: [
          {
            time: '10:30 AM – 01:00 PM',
            title: 'Phoolon Ki Holi Haldi',
            desc: 'Brass urli baths, yellow marigold petals, organic herbal gulal, and energetic dhol beats.',
          },
          {
            time: '01:00 PM – 03:00 PM',
            title: 'Authentic Regional Shahi Lunch',
            desc: 'Live chaat counters, regional specialties, and refreshing dessert counters.',
          },
          {
            time: '07:30 PM – 02:00 AM',
            title: 'The Grand Musical Sangeet Gala',
            desc: 'Concert-grade sound and lighting, family dance performances, and late-night DJ party.',
          },
        ],
      },
      {
        day: 'Day 03',
        theme: 'The Royal Baraat, Sunset Vows & Grand Reception',
        sub: 'Decorated Steeds · Floral Mandap · Black-Tie Banquet',
        events: [
          {
            time: '04:00 PM – 05:30 PM',
            title: 'The Grand Royal Baraat',
            desc: 'Caparisoned royal horses, brass band, floral velvet umbrellas, and dhol players.',
          },
          {
            time: '05:45 PM – 07:30 PM',
            title: 'Sunset Pheras at the Lawns',
            desc: 'Vedic hymns recited beneath an opulent floral mandap in the warm evening light.',
          },
          {
            time: '08:30 PM – Midnight',
            title: 'The Imperial Gala Reception & Fireworks',
            desc: 'Silver thali banquet, champagne toasts, family speeches, and aerial fireworks.',
          },
        ],
      },
    ],
    budgetTiers: [
      {
        category: 'Heritage Resorts & Lawns',
        venues: `Heritage Resorts & Palatial Hotels in ${cityName}`,
        guests: '100 – 250 Guests (2–3 Days)',
        range: '₹40 Lakhs – ₹85 Lakhs',
        highlight: 'Intimate royal ambience, full property privacy, and personalized regional hospitality.',
      },
      {
        category: 'Luxury Destination Resorts',
        venues: `Premier Five-Star & Luxury Venues in ${cityName}`,
        guests: '200 – 400 Guests (3 Days)',
        range: '₹85 Lakhs – ₹1.8 Crore',
        highlight: 'Expansive banquets, large room blocks under one roof, and grand Sangeet production.',
      },
    ],
    faqs: [
      {
        q: `Why choose ${cityName} for a destination wedding?`,
        a: `${cityName} offers an authentic, unhurried cultural charm with historic heritage properties, beautiful outdoor lawns, and serene natural settings ideal for memorable celebrations.`,
      },
      {
        q: `How much does a destination wedding in ${cityName} cost?`,
        a: `A destination wedding in ${cityName} typically ranges between ₹40 Lakhs to ₹85 Lakhs for heritage resorts (100–250 guests), and ₹85 Lakhs to ₹1.8 Crore for luxury five-star properties. RASM turnkey planning packages start from ₹30,00,000.`,
      },
      {
        q: `How does RASM manage logistics in ${cityName}?`,
        a: `Operating across Rajasthan, RASM provides full-service fleet coordination, airport and railway pickups, vendor contract negotiations, and dedicated on-ground event managers.`,
      },
    ],
  };
}
