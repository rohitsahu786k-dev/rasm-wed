export interface CityData {
  city: string;
  state: string;
  tagline: string;
  heroImage: string;
  season: string;
  connectivity: string;
  overview: string;
  venues: {
    name: string;
    tag: string;
    description: string;
    capacity: string;
    features: string[];
    image: string;
  }[];
  itinerary: {
    day: string;
    title: string;
    time: string;
    description: string;
    highlights: string[];
  }[];
  advantages: {
    title: string;
    desc: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const CITY_DATABASE: Record<string, CityData> = {
  udaipur: {
    city: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'The Venice of the East · Iconic Lake Palaces & Floating Mandaps',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    season: 'October to March (Crisp 20°C-28°C, romantic lake breezes)',
    connectivity: 'Maharana Pratap Airport (UDR) · 35 mins from City Center · Private charter access',
    overview: 'Globally celebrated as the crown jewel of destination weddings, Udaipur offers an ethereal landscape where majestic Mewar fortresses float above shimmering waters. With direct general manager partnerships across all marquee palaces, Rasm curates royal celebrations that blend centuries of Rajputana elegance with world-class hospitality.',
    venues: [
      {
        name: 'The Oberoi Udaivilas',
        tag: 'Palatial Royalty',
        description: 'Set on the banks of Lake Pichola with 50 acres of sprawling royal gardens, Mewari dome courtyards, and handcrafted stone archways.',
        capacity: '150 - 450 Guests',
        features: ['Private lakeside mandap lawns', 'Mewar heritage suites', 'Lakeside dinner pavilions'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
      },
      {
        name: 'Jagmandir Island Palace',
        tag: 'Island Fortress',
        description: 'An exclusive 17th-century marble palace surrounded by the tranquil waters of Lake Pichola, accessible only by private royal boats.',
        capacity: '200 - 600 Guests',
        features: ['360° Lake Pichola vistas', 'Historical darbar courtyard', 'Midnight pyrotechnic permits'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp'
      },
      {
        name: 'The Leela Palace Udaipur',
        tag: 'Contemporary Luxury',
        description: 'A modern Rajputana wonder facing the City Palace, offering gold-leafed ballrooms, private plunge pool suites, and lakeside dining.',
        capacity: '120 - 300 Guests',
        features: ['Sheesh Mahal terrace dining', 'Grand Guava Garden sangeet', 'Luxury arrival boats'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp'
      },
      {
        name: 'Fateh Garh Palace',
        tag: 'Hilltop Fortress',
        description: 'Perched on the Aravali hilltop overlooking the entire lake valley, featuring sustainable heritage architecture and vintage car museums.',
        capacity: '100 - 350 Guests',
        features: ['Panoramic valley sunset mandap', 'Rooftop amphitheatre', 'Heritage banquet halls'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
      },
      {
        name: 'The Ananta Resort & Spa',
        tag: 'Valley Sanctuary',
        description: 'Nestled in the lush Aravali foothills with sprawling open-air wedding lawns and luxury balinese-styled pool villas.',
        capacity: '250 - 1000 Guests',
        features: ['Largest banqueting lawns in Udaipur', 'Sprawling villa clusters', 'Open amphitheatre'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp'
      },
      {
        name: 'Radisson Blu Udaipur Palace',
        tag: 'Lakefront Resort',
        description: 'Overlooking the serene waters of Fateh Sagar Lake, combining palatial Rajput architecture with high-capacity banquet facilities.',
        capacity: '200 - 700 Guests',
        features: ['Fateh Sagar lakefront deck', 'Grand pillarless ballrooms', 'Multiple breakout lawns'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Radisson-Udaipur.webp'
      }
    ],
    itinerary: [
      {
        day: 'Day 01',
        title: 'The Royal Arrival & Twilight Mehfil',
        time: 'Afternoon & Evening',
        description: 'Guests arrive via private chauffeurs and are greeted with traditional Rajasthani dhol, fresh rose petal showers, and signature Mewari refreshments. Twilight opens with a Sufi musical night under fairy-lit palace arches.',
        highlights: ['Traditional Royal Aarti & Tikka Welcome', 'Lakefront Cocktail Lounge', 'Live Sufi Troupe Performance']
      },
      {
        day: 'Day 02',
        title: 'Floral Haldi & The Imperial Sangeet',
        time: 'Morning to Late Night',
        description: 'Morning awakens with a fragrant marigold Haldi and Phoolon ki Holi ceremony by the pool. Evening transitions into a high-energy Sangeet gala with celebrity choreography, LED stage scenography, and royal barbecue feasts.',
        highlights: ['Organic Yellow Marigold Scenography', 'Celebrity DJ & Live Bollywood Ensemble', 'Molecular Mewari Bar & Global Cuisine']
      },
      {
        day: 'Day 03',
        title: 'The Grand Baraat & Lake Mandap Vows',
        time: 'Sunset & Grand Reception',
        description: 'The Groom arrives with a vintage car cavalcade and royal brass band. As twilight sets over Lake Pichola, the couple exchanges sacred Vedic vows at the floating mandap, followed by a black-tie royal banquet gala.',
        highlights: ['Vintage Rolls Royce Procession', 'Floating Lotus Floral Mandap', 'Royal Mewari Khansama 7-Course Banquet']
      }
    ],
    advantages: [
      {
        title: 'Direct Palace GM Connections',
        desc: 'Zero intermediary brokers. We secure preferred room blocks, priority date holds, and direct wholesale pricing across Oberoi, Taj, Leela, and City Palace.'
      },
      {
        title: 'Full Heritage Permissions & Clearances',
        desc: 'Complete government permits for drone videography, waterfront pyrotechnics, boat transfers, and indoor late-night acoustic music extensions.'
      },
      {
        title: 'In-House Production & 3D Pre-Visuals',
        desc: 'Our architectural team creates photorealistic 3D spatial renders of your mandap and stages months before you land in Udaipur.'
      },
      {
        title: '24/7 Global NRI Concierge Desk',
        desc: 'Dedicated flight tracking, Delhi/Mumbai airport liaisons, VIP luggage handling, and multilingual Vedic priests for foreign guests.'
      }
    ],
    faqs: [
      {
        q: 'How far in advance should we book palace venues in Udaipur?',
        a: 'Due to global demand for royal weddings, we advise reserving your marquee venue 8 to 12 months ahead for peak winter dates (November to February). However, Rasm maintains direct GM connections to unlock priority dates on shorter notice.'
      },
      {
        q: 'Can Rasm arrange boat transfers for island palace venues like Jagmandir?',
        a: 'Yes. We orchestrate private royal jetty charters from Bansi Ghat to Jagmandir Island Palace with dedicated safety escorts, welcome flutes, and luggage logistics.'
      },
      {
        q: 'Are dietary preferences like Pure Vegetarian, Vegan, and Jain menus accommodated?',
        a: 'Absolutely. We collaborate with royal khansamas and 5-star executive culinary teams to establish completely segregated kitchens for Jain, Maharaj-style vegan, and international dietary preferences.'
      },
      {
        q: 'What are the music curfew guidelines for outdoor palace lawns?',
        a: 'Outdoor amplified sound in Rajasthan is regulated until 10:00 PM. Following 10:00 PM, Rasm seamlessly transitions your party into sound-insulated palatial ballrooms and darbar halls for after-parties until dawn.'
      }
    ]
  },
  jaipur: {
    city: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City · Imperial Fortresses, Royal Havelis & Rasm Grandeur',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    season: 'October to March (Pleasant sunshine, cool royal evenings)',
    connectivity: 'Jaipur International Airport (JAI) · Direct flights from Dubai, Delhi, Mumbai, Bengaluru',
    overview: 'As the historic capital of Rajasthan, Jaipur boasts the highest concentration of restored royal palaces in India. From the Maharaja residence at Rambagh to the hilltop warriors forts of Bishangarh, Rasm crafts majestic celebrations characterized by royal elephant processions, Mewari court music, and grand architectural scenography.',
    venues: [
      {
        name: 'Rambagh Palace Jaipur',
        tag: 'The Jewel of Jaipur',
        description: 'The former official residence of the Maharaja of Jaipur, featuring 47 acres of tranquil gardens and ornate marble colonnades.',
        capacity: '200 - 800 Guests',
        features: ['Historical Mughal gardens', 'Ornate Sheesh Mahal suites', 'Royal peacock lawns'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
      },
      {
        name: 'Fairmont Jaipur',
        tag: 'Imperial Mughal Palace',
        description: 'A grand luxury palace built in the tradition of Rajput and Mughal architecture, tucked amidst the rugged Aravali hills of Kukas.',
        capacity: '300 - 1200 Guests',
        features: ['Massive pillarless grand ballroom', 'Aangan outdoor courtyard', 'Rooftop celebration terraces'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
      },
      {
        name: 'Jai Mahal Palace',
        tag: 'Indo-Saracenic Marvel',
        description: 'A stunning 270-year-old Indo-Saracenic palace set amidst 18 acres of landscaped Mughal gardens in the heart of the Pink City.',
        capacity: '150 - 600 Guests',
        features: ['Baradari marble pavilion', 'Lotus pond mandap setting', 'Heritage royal suites'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp'
      },
      {
        name: 'Samode Palace & Haveli',
        tag: 'Aristocratic Haveli',
        description: 'An exclusive 475-year-old aristocratic palace carved directly into the hills, featuring world-famous hand-painted fresco halls.',
        capacity: '80 - 250 Guests',
        features: ['Intimate celebrity privacy', 'Historic Sheesh Mahal hall', 'Infinity pool terrace'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp'
      }
    ],
    itinerary: [
      {
        day: 'Day 01',
        title: 'Imperial Pink City Welcome & Royal Darbar',
        time: 'Afternoon & Evening',
        description: 'Guests are welcomed with Rajasthani trumpets, ghoomar dancers, and fragrant sandalwood garlands. The evening features an aristocratic darbar feast under fairy-lit haveli arches.',
        highlights: ['Rajasthani Royal Brass Welcome', 'Courtyard Folk & Sufi Ensemble', 'Imperial Rajputana Banquet']
      },
      {
        day: 'Day 02',
        title: 'Vibrant Palace Mehendi & Sangeet Extravaganza',
        time: 'Day to Midnight',
        description: 'Colourful bageecha mehendi with gota patti artisans and lac bangle makers. Evening transforms into a dazzling Sangeet with Bollywood performers and royal barbecue.',
        highlights: ['Artisanal Jaipur Bangle & Mehendi Bazaars', 'Grand LED Scenography & Dance Stage', 'Live Tandoor & Molecular Cocktail Bar']
      },
      {
        day: 'Day 03',
        title: 'The Maharaja Baraat & Sacred Vedic Pheras',
        time: 'Sunset & Grand Reception',
        description: 'A majestic baraat featuring decorated royal horses, vintage cars, and traditional dhol. Sacred pheras occur in a grand royal mandap followed by a fireworks salute.',
        highlights: ['Vintage Fleet & Royal Horse Cavalcade', 'Heritage Carved Floral Mandap', 'Royal Reception Gala']
      }
    ],
    advantages: [
      {
        title: 'Direct Access to Marquee Heritage Properties',
        desc: 'Direct priority holds at Rambagh, Fairmont, Jai Mahal, and Samode with exclusive venue privileges.'
      },
      {
        title: 'Generational Rajasthani Crafts & Florists',
        desc: 'In-house access to traditional Jaipur floral artisans, royal tentmakers, and heritage brass bands.'
      },
      {
        title: 'Bespoke Airport & VIP Fleet Logistics',
        desc: 'Dedicated private luxury coaches, Mercedes/BMW fleet escorts, and airport welcome lounges.'
      },
      {
        title: 'Full Production Rigging & Sound Grid',
        desc: 'End-to-end sound, intelligent lighting arrays, and generator backup grids managed in-house.'
      }
    ],
    faqs: [
      {
        q: 'Can international flights land directly in Jaipur?',
        a: 'Yes, Jaipur International Airport (JAI) operates direct international flights to Dubai, Sharjah, and Muscat, along with seamless 45-minute connecting flights from New Delhi and Mumbai.'
      },
      {
        q: 'Are royal elephant or vintage car baraats permitted in Jaipur?',
        a: 'Yes, Rasm secures official municipal and heritage clearances for vintage open-top Rolls-Royce car entries, caparisoned royal horses, and traditional bagghis.'
      },
      {
        q: 'What is the guest capacity for weddings in Jaipur?',
        a: 'Jaipur offers venues ranging from intimate 80-guest heritage havelis (Samode) to grand 1,500+ guest palatial properties (Fairmont Jaipur, JECC, and Rambagh lawns).'
      },
      {
        q: 'Does Rasm manage hotel room bookings and guest gifting?',
        a: 'Yes, our concierge team handles end-to-end room blocks, personalized Rajasthani welcome hampers, itinerary booklets, and 24/7 guest support desks.'
      }
    ]
  },
  jodhpur: {
    city: 'Jodhpur & Jaisalmer',
    state: 'Rajasthan',
    tagline: 'Sun City Grandeur & The Golden Sand Dunes of the Thar Desert',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp',
    season: 'November to February (Cool desert winds, starry night skies)',
    connectivity: 'Jodhpur Airport (JDH) · Jaisalmer Airport (JSA) · Private chartered aircraft connections',
    overview: 'Nowhere on earth rivals the golden romantic mysticism of western Rajasthan. From the Art Deco grandeur of Umaid Bhawan Palace in Jodhpur to the fairy-tale sandstone fortress of Suryagarh in Jaisalmer, Rasm designs celebrations where golden sand dunes meet imperial royal processions.',
    venues: [
      {
        name: 'Umaid Bhawan Palace Jodhpur',
        tag: 'World Icon',
        description: 'One of the world’s largest private royal residences, built with golden-yellow sandstone and set across 26 acres of lush palace grounds.',
        capacity: '150 - 500 Guests',
        features: ['Baradari marble banquet lawn', 'Private royal museum access', 'Art Deco heritage suites'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp'
      },
      {
        name: 'Suryagarh Jaisalmer',
        tag: 'Thar Desert Fortress',
        description: 'A magnificent boutique luxury fort rising out of the Thar Desert, renowned for unforgettable desert sangeets and dune celebrations.',
        capacity: '100 - 450 Guests',
        features: ['Sunset dune wedding setups', 'Central open-sky courtyards', 'Heritage stepwell dinners'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
      },
      {
        name: 'Ajit Bhawan Palace Jodhpur',
        tag: 'India’s First Heritage Hotel',
        description: 'An enchanting sandstone palace offering intimate Rajputana courtyards, antique royal suites, and vintage car collections.',
        capacity: '80 - 300 Guests',
        features: ['Intimate royal haveli atmosphere', 'Heritage poolside lawns', 'Authentic Marwari feasts'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
      }
    ],
    itinerary: [
      {
        day: 'Day 01',
        title: 'Desert Mirage Welcome & Royal Sunderbans Gala',
        time: 'Evening',
        description: 'Guests arrive to a candlelit fortress with desert folk manganiyar musicians and royal camel greetings, followed by an open-air welcome feast.',
        highlights: ['Thar Desert Camel Welcome', 'Manganiyar & Kalbeliya Ensembles', 'Royal Marwari Thali Feast']
      },
      {
        day: 'Day 02',
        title: 'Oasis Pool Soiree & Desert Dune Sangeet',
        time: 'Morning & Night',
        description: 'Sun-drenched pool party followed by an extraordinary twilight caravan journey into the golden sand dunes for a midnight Sangeet under stars.',
        highlights: ['Thar Sand Dune Luxury Lounge', 'Campfire Pyrotechnics & Barbecue', 'Global DJ & Desert Lighting Grid']
      },
      {
        day: 'Day 03',
        title: 'The Sandstone Fort Baraat & Royal Pheras',
        time: 'Dusk',
        description: 'The royal procession enters the sandstone palace courtyard. The couple exchanges sacred vows surrounded by thousands of flickering clay diyas.',
        highlights: ['Golden Sandstone Mandap Architecture', 'Royal Dhol & Bugle Cavalcade', 'Celebration Gala Dinner']
      }
    ],
    advantages: [
      {
        title: 'Exclusive Desert Dune Logistics Mastery',
        desc: 'We construct full luxury desert camps, generator sound grids, luxury restrooms, and lighting arrays amidst the Thar dunes.'
      },
      {
        title: 'Private Charter Aircraft Facilitation',
        desc: 'Coordinating private group charters from Delhi, Mumbai, and Dubai directly into Jodhpur and Jaisalmer airstrips.'
      },
      {
        title: 'Authentic Marwari Royal Khansamas',
        desc: 'Traditional dal baati churma, ker sangri, and royal game barbecue prepared by lineage chefs.'
      },
      {
        title: 'Total Discretion & Privacy',
        desc: 'Complete protocol management for high-profile couples, celebrities, and global business families.'
      }
    ],
    faqs: [
      {
        q: 'Is it possible to host a wedding ceremony on the Thar sand dunes?',
        a: 'Yes! Rasm specializes in erecting bespoke luxury mandaps, desert seating, ambient fairy lighting, and dining lounges directly amidst the pristine Jaisalmer dunes.'
      },
      {
        q: 'What is the best time for weddings in Jodhpur and Jaisalmer?',
        a: 'November to February offers idyllic weather with pleasant sunny days (22°C) and crisp starlit evenings ideal for outdoor desert celebrations.'
      },
      {
        q: 'How do guests travel to Jaisalmer?',
        a: 'Guests can fly directly into Jodhpur Airport (JDH) with luxury chauffeured expressway transfers, or land directly at Jaisalmer Airport (JSA) via seasonal and chartered flights.'
      }
    ]
  },
  goa: {
    city: 'Goa',
    state: 'Goa',
    tagline: 'Sun-Kissed Coastal Mandaps, Oceanfront Lawns & Sunset Soirees',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp',
    season: 'November to March (Pleasant ocean breeze, clear skies)',
    connectivity: 'Dabolim International Airport (GOI) · Manohar International Airport Mopa (GOX)',
    overview: 'For couples seeking barefoot luxury combined with high-energy coastal celebrations, Goa offers sun-drenched private beaches, Portuguese colonial estates, and sprawling 5-star oceanfront lawns. Rasm infuses coastal romance with royal Indian grandeur.',
    venues: [
      {
        name: 'Grand Hyatt Goa',
        tag: 'Bambolim Waterfront',
        description: 'Sprawling 28-acre luxury resort overlooking Bambolim Bay, featuring manicured seaside lawns and Indo-Portuguese architecture.',
        capacity: '200 - 1000 Guests',
        features: ['Seaside sunset mandap lawns', 'Pillarless grand ballroom', 'Private beach access'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp'
      },
      {
        name: 'W Goa',
        tag: 'Chic Clifftop',
        description: 'Perched on the cliffs of Vagator Beach, offering cutting-edge design, vibrant pool party venues, and high-energy nightlife spaces.',
        capacity: '100 - 450 Guests',
        features: ['Rockpool cliffside venue', 'Sunset beach lawns', 'VIP celebrity villas'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
      },
      {
        name: 'Alila Diwa Goa',
        tag: 'Paddy & Palm Serenity',
        description: 'Tucked amidst the peaceful paddy fields and coconut groves of South Goa, offering tranquil beauty and bespoke five-star service.',
        capacity: '150 - 500 Guests',
        features: ['Infinity pool deck', 'Banyan tree courtyard', 'Pristine South Goa beaches'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp'
      }
    ],
    itinerary: [
      {
        day: 'Day 01',
        title: 'Tropical Sunset Sundowner & Bohemian Welcome',
        time: 'Evening',
        description: 'Guests arrive to oceanfront cocktails, acoustic live music, and fire dancers by the Arabian Sea.',
        highlights: ['Beachfront Coconut Welcome', 'Sunset Live Saxophone & Percussion', 'Goan-Continental Seafood Barbecue']
      },
      {
        day: 'Day 02',
        title: 'Vibrant Poolside Haldi & Neon After-Hours Sangeet',
        time: 'Morning & Night',
        description: 'Sunlit pool party with floral splash zones followed by a glittering Sangeet ballroom party.',
        highlights: ['Boho Tropical Decor', 'Celebrity DJ Sets & Electronic Percussion', 'Craft Cocktail Lounges']
      },
      {
        day: 'Day 03',
        title: 'Golden Sunset Beach Mandap & Coastal Gala',
        time: 'Sunset',
        description: 'Sacred pheras as the sun dips beneath the horizon of the Arabian Sea, followed by an elegant white-and-gold gala dinner.',
        highlights: ['Oceanfront Driftwood & Floral Mandap', 'Barefoot Beach Vows', 'Grand Seaside Gala Banquet']
      }
    ],
    advantages: [
      {
        title: 'Exclusive Beachfront Property Accords',
        desc: 'Direct preferred contracts with Grand Hyatt, W, Alila Diwa, and Taj Exotica across North and South Goa.'
      },
      {
        title: 'Coastal Weather & CRZ Permissions',
        desc: 'Complete Coastal Regulation Zone (CRZ) municipal permissions, sound permits, and weather redundancy.'
      },
      {
        title: 'Gourmet Coastal & Continental Mixology',
        desc: 'Award-winning cocktail architects, fresh seafood grills, and authentic regional Indian catering.'
      },
      {
        title: 'Seamless Dual-Airport Transfers',
        desc: 'Coordinating smooth arrivals across both Dabolim (South) and Mopa (North) international terminals.'
      }
    ],
    faqs: [
      {
        q: 'Are beach wedding permits required in Goa?',
        a: 'Yes, setting up a mandap on the sand requires Coastal Regulation Zone (CRZ) and local panchayat clearances. Rasm handles all legal permissions seamlessly.'
      },
      {
        q: 'Which part of Goa is best for a destination wedding?',
        a: 'South Goa (Cavelossim, Benaulim) is ideal for peaceful, private 5-star beach weddings, while North Goa (Vagator, Morjim) is favored for energetic, nightlife-infused celebrations.'
      },
      {
        q: 'Can late-night parties continue outdoors on the beach?',
        a: 'Outdoor music in Goa is permitted until 10:00 PM. Following this, celebrations move to sound-proofed indoor nightclubs and luxury resort ballrooms until early morning.'
      }
    ]
  },
  kumbhalgarh: {
    city: 'Kumbhalgarh & Mount Abu',
    state: 'Rajasthan',
    tagline: 'Ancient Mewar Fortress Solitude & Serene Aravali Mountain Sanctuaries',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp',
    season: 'Year-Round Pleasant · Cool mountain breeze even during spring',
    connectivity: '2 hours scenic drive from Maharana Pratap Airport Udaipur (UDR)',
    overview: 'Framed by the world’s second-longest ancient wall and the misty peaks of the Aravali range, Kumbhalgarh and Mount Abu offer sanctuary away from bustling cities. Here, Rasm orchestrates intimate, majestic celebrations amidst cloud-kissed mountain fortresses.',
    venues: [
      {
        name: 'The Kumbha Bagh',
        tag: 'Cloud-Kissed Fortress',
        description: 'Perched 3,500 feet above sea level near Kumbhalgarh Fort, featuring panoramic valley vistas and grand stone amphitheaters.',
        capacity: '100 - 400 Guests',
        features: ['Great Wall backdrop', 'Cliffside infinity pool', 'Open valley mandap lawns'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp'
      },
      {
        name: 'Fateh Safari Lodge',
        tag: 'Wilderness Luxury',
        description: 'Sitting on the edge of Kumbhalgarh Wildlife Sanctuary, offering wild rustic elegance and pristine private mountain exclusivity.',
        capacity: '80 - 250 Guests',
        features: ['Wilderness sunset terraces', 'Private forest villas', 'Starlit haveli dining'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
      }
    ],
    itinerary: [
      {
        day: 'Day 01',
        title: 'Mountain Oasis Welcome & Campfire Mehfil',
        time: 'Evening',
        description: 'Guests arrive to crisp mountain air and traditional folk aarti, followed by an intimate haveli bonfire dinner.',
        highlights: ['Bonfire Acoustic Guitars & Folk Singers', 'Aravali Mountain Views', 'Royal Mewari Stews & Breads']
      },
      {
        day: 'Day 02',
        title: 'Terrace Haldi & Hillside Sangeet Gala',
        time: 'Day to Night',
        description: 'Sunlit terrace haldi followed by an electrifying amphitheater sangeet under starry mountain skies.',
        highlights: ['Panoramic Ridge Haldi', 'Mountain Amphitheatre Dance Stage', 'Live Tandoor & Barbecue']
      },
      {
        day: 'Day 03',
        title: 'Fortress Sunset Mandap & Royal Feast',
        time: 'Sunset',
        description: 'Sacred pheras overlooking the ancient fortress walls as dusk paints the valley in gold.',
        highlights: ['Cliffside Sunset Mandap', 'Grand Procession with Royal Horses', 'Traditional Mewar Banquet']
      }
    ],
    advantages: [
      {
        title: 'Unrivaled Mountain Privacy',
        desc: 'Escape commercial wedding bustle with completely sequestered private hill resort takeovers.'
      },
      {
        title: 'Year-Round Pleasant Temperatures',
        desc: 'Enjoy cooler mountain climates that remain comfortable even when the plains grow warm.'
      },
      {
        title: 'Scenic Convoy Logistics',
        desc: 'We coordinate luxury SUV fleets and chauffeured transfers smoothly from Udaipur airport.'
      },
      {
        title: 'Authentic Mewar Heritage Hospitality',
        desc: 'Generational Rajputana recipes, personalized royal gifting, and deeply attentive service.'
      }
    ],
    faqs: [
      {
        q: 'How far is Kumbhalgarh from Udaipur Airport?',
        a: 'Kumbhalgarh is a scenic 85 km (approximately 2 hours) drive through smooth highways and picturesque Aravali valley roads.'
      },
      {
        q: 'Can entire resorts be booked exclusively for our wedding party?',
        a: 'Yes, boutique mountain resorts like The Kumbha Bagh are perfect for full buyouts, providing your family with 100% private sanctuary.'
      }
    ]
  },
  thailand: {
    city: 'Thailand',
    state: 'International',
    tagline: 'Phuket Oceanfront Estates, Koh Samui Palm Groves & Five-Star Hospitality',
    heroImage: 'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp',
    season: 'November to April (Dry tropical weather, turquoise seas)',
    connectivity: 'Phuket International Airport (HKT) · Koh Samui (USM) · Direct flights from India & worldwide',
    overview: 'For couples seeking international palatial opulence, Thailand seamlessly blends world-class luxury resort infrastructure with warm Asian hospitality. Rasm manages full cross-border Indian wedding logistics, including flying in specialized Vedic pundits, royal maharaj chefs, and Indian decor artisans.',
    venues: [
      {
        name: 'Sri Panwa Phuket',
        tag: 'Ultra-Luxury Cape Estate',
        description: 'Perched high atop Cape Panwa with breathtaking 360° views of the Andaman Sea and private luxury pool villas.',
        capacity: '100 - 350 Guests',
        features: ['Baba Nest rooftop lounge', 'Private oceanfront pier', 'Infinity pool estates'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp'
      },
      {
        name: 'The Sarojin Khao Lak',
        tag: 'Secluded Beach Haven',
        description: 'Surrounded by national parks and 11 km of pristine white sandy beaches, famed for bespoke romantic dinners.',
        capacity: '80 - 250 Guests',
        features: ['Pristine beachfront lawns', 'Waterfall dining experiences', 'Boutique five-star service'],
        image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
      }
    ],
    itinerary: [
      {
        day: 'Day 01',
        title: 'Tropical Welcome & Andaman Sea Sundowner',
        time: 'Evening',
        description: 'Guests are received with fresh orchids and cold young coconuts, leading to a sunset cocktail soiree on the private pier.',
        highlights: ['Orchid & Fresh Coconut Welcome', 'Sunset Saxophone on Private Pier', 'Thai-Indian Fusion Gourmet Barbecue']
      },
      {
        day: 'Day 02',
        title: 'Poolside Mehendi & Neon Sangeet Ballroom',
        time: 'Day to Late Night',
        description: 'Tropical pool party with floating cocktail bars followed by an energetic ballroom Sangeet with international lighting arrays.',
        highlights: ['Floating Bar & Flower Pools', 'Bollywood DJ & Thai Fire Dancers', 'Michelin-Inspired Indian Banqueting']
      },
      {
        day: 'Day 03',
        title: 'Ocean Beachfront Mandap & Starlit Gala',
        time: 'Sunset',
        description: 'A floating transparent glass mandap above the turquoise Andaman waters for sacred Vedic pheras at dusk.',
        highlights: ['Glass Water-Mandap Above Andaman Sea', 'Vedic Rituals with English Commentary', 'Black-Tie Beachfront Gala']
      }
    ],
    advantages: [
      {
        title: 'Complete Cross-Border Indian Wedding Mastery',
        desc: 'We fly in seasoned Hindu priests, royal Indian maharaj chefs, and master mehendi artists seamlessly.'
      },
      {
        title: 'Direct Wholesale Hotel Contracts in Thailand',
        desc: 'Direct corporate partnerships with luxury Thai hospitality groups without currency markups.'
      },
      {
        title: 'Guest Visa & Airport Concierge Fast-Track',
        desc: 'Fast-track airport immigration, luggage logistics, and dedicated group charter liaisons.'
      },
      {
        title: 'Flawless Dual-Timezone Planning Desk',
        desc: 'Our planning team coordinates in real-time across India, Thailand, UK, and US timezones.'
      }
    ],
    faqs: [
      {
        q: 'Can Indian vegetarian and Jain food be prepared authentically in Thailand?',
        a: 'Yes. Rasm brings specialized Indian maharaj teams who take over dedicated kitchens in Thailand to prepare authentic vegetarian, Jain, and regional Indian feasts.'
      },
      {
        q: 'Do Indian passport holders require a visa for Thailand?',
        a: 'Thailand frequently offers visa-exempt or quick Visa-on-Arrival access for Indian passport holders. Our team provides complete documentation support for wedding guests.'
      }
    ]
  }
};


/** Only slugs with dedicated, unique content. Other WP city pages render their own WordPress body instead of borrowed copy. */
export const CITY_SLUGS: Record<string, string> = {
  'wedding-planner-in-udaipur': 'udaipur',
  'wedding-planner-in-jaipur': 'jaipur',
  'wedding-planner-in-jodhpur': 'jodhpur',
  'wedding-planner-in-goa': 'goa',
  'wedding-planner-in-kumbhalgarh': 'kumbhalgarh',
  'wedding-planner-in-thailand': 'thailand',
};
