import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Castle, 
  Users, 
  BedDouble, 
  Building2, 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Phone, 
  Mail, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  Eye, 
  Share2, 
  Crown, 
  ExternalLink,
  Layers,
  Sparkle
} from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';
import { Destination, SiteSettings } from '../types';

export interface VenueItem {
  id: string;
  name: string;
  region: string;
  locality: string;
  venueType: string;
  setting: string;
  capacityMax: number;
  capacityRange: string;
  spacesCount: number;
  roomsCount: number;
  badge: string;
  royalHighlight: string;
  features: string[];
  imageUrl: string;
  gallery: string[];
  description: string;
  spacesDetail: { name: string; capacity: string; type: string }[];
}

const VENUES_DATABASE: VenueItem[] = [
  // UDAIPUR
  {
    id: 'oberoi-udaivilas',
    name: 'The Oberoi Udaivilas',
    region: 'udaipur',
    locality: 'Haridas Ji Ki Magri, Lake Pichola, Udaipur',
    venueType: 'Palace Heritage',
    setting: 'Lakeside',
    capacityMax: 450,
    capacityRange: 'Up to 450',
    spacesCount: 4,
    roomsCount: 87,
    badge: 'Rasm Preferred',
    royalHighlight: 'Direct GM Partnership · Private Lake Jetty',
    features: ['Lakeside Mandap Lawns', 'Mewari Domes & Archways', 'Vintage Boat Arrival', 'Pure Veg & Jain Feasts'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
      'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
      'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg'
    ],
    description: 'Set on the banks of Lake Pichola over 50 acres of historic Mewar hunting grounds, featuring handcrafted white stone domes, sprawling courtyards, and uninterrupted water views.',
    spacesDetail: [
      { name: 'Crescent Lake Lawn', capacity: '400 Guests', type: 'Open-Air Lawn' },
      { name: 'Chandra Mahal Courtyard', capacity: '180 Guests', type: 'Heritage Courtyard' },
      { name: 'Zenana Promenade', capacity: '120 Guests', type: 'Waterfront Terrace' }
    ]
  },
  {
    id: 'jagmandir-island',
    name: 'Jagmandir Island Palace',
    region: 'udaipur',
    locality: 'Lake Pichola, Udaipur (Boat Access Only)',
    venueType: 'Island Fortress',
    setting: 'Lakeside',
    capacityMax: 650,
    capacityRange: 'Up to 650',
    spacesCount: 3,
    roomsCount: 7,
    badge: 'Exclusive Island Buyout',
    royalHighlight: '360° Lake Pichola Vistas · Midnight Fireworks Permit',
    features: ['Private Royal Boat Jetty', '17th-Century Marble Carvings', 'Kunwar Pada Courtyard', 'Heritage Darbar'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
      'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
      'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp'
    ],
    description: 'An iconic 17th-century marble palace rising from the sapphire waters of Lake Pichola. Celebrated as the floating haven that inspired the Taj Mahal.',
    spacesDetail: [
      { name: 'Kunwar Pada Garden', capacity: '600 Guests', type: 'Palace Lawn' },
      { name: 'Courtyard of Elephants', capacity: '250 Guests', type: 'Marble Courtyard' }
    ]
  },
  {
    id: 'leela-palace-udaipur',
    name: 'The Leela Palace Udaipur',
    region: 'udaipur',
    locality: 'Lake Pichola, City Palace Vista, Udaipur',
    venueType: 'Contemporary Luxury Palace',
    setting: 'Lakeside',
    capacityMax: 300,
    capacityRange: 'Up to 300',
    spacesCount: 4,
    roomsCount: 80,
    badge: 'White-Glove NRI Verified',
    royalHighlight: 'Direct View of City Palace · Guava Garden Sangeet',
    features: ['Sheesh Mahal Terrace', 'Private Plunge Pool Suites', 'Royal Arrival Flotilla', 'Grand Ballrooms'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp',
      'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
    ],
    description: 'A modern jewel of Rajputana architecture offering gold-leafed domes, lakeside royal dining pavilions, and front-row vistas of the lit City Palace at night.',
    spacesDetail: [
      { name: 'Guava Garden & Pool Deck', capacity: '250 Guests', type: 'Open-Air Garden' },
      { name: 'Marwar Ballroom', capacity: '150 Guests', type: 'Pillarless Ballroom' }
    ]
  },
  {
    id: 'fateh-garh-palace',
    name: 'Fateh Garh Palace',
    region: 'udaipur',
    locality: 'Sisarma, Aravali Foothills, Udaipur',
    venueType: 'Hilltop Fortress',
    setting: 'Mountain Valley',
    capacityMax: 350,
    capacityRange: 'Up to 350',
    spacesCount: 3,
    roomsCount: 56,
    badge: 'Heritage Solitude',
    royalHighlight: 'Panoramic Valley Sunset · Vintage Car Museum',
    features: ['Aravali Valley Mandap', 'Rooftop Amphitheatre', 'Kelwa Rajput Architecture', 'Private Heritage Estates'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
      'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp'
    ],
    description: 'Perched high on the Aravali hills overlooking the entire lake basin, Fateh Garh offers an authentic Rajput heritage fortress atmosphere with breathtaking sunset views.',
    spacesDetail: [
      { name: 'Fateh Amphitheatre', capacity: '300 Guests', type: 'Valley Amphitheatre' },
      { name: 'Baradari Courtyard', capacity: '150 Guests', type: 'Heritage Terrace' }
    ]
  },
  {
    id: 'ananta-resort-spa',
    name: 'The Ananta Resort & Spa',
    region: 'udaipur',
    locality: 'Kodiyat Main Road, Udaipur',
    venueType: 'Luxury 5-Star Resort',
    setting: 'Mountain Valley',
    capacityMax: 1200,
    capacityRange: 'Up to 1,200',
    spacesCount: 5,
    roomsCount: 240,
    badge: 'Grand Capacity',
    royalHighlight: 'Largest Sprawling Banqueting Lawns in Udaipur',
    features: ['High-Capacity Guest Hosting', 'Balinese Pool Villas', 'Grand Aravali Ballroom', 'All-Night Sound Insulation'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp',
      'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp'
    ],
    description: 'Sprawled over 75 acres against the Aravali backdrop, offering luxury villa clusters, expansive lush wedding lawns, and contemporary resort comforts.',
    spacesDetail: [
      { name: 'Aravali Sprawling Lawn', capacity: '1000 Guests', type: 'Grand Open Lawn' },
      { name: 'Grand Ballroom', capacity: '600 Guests', type: 'Pillarless Hall' }
    ]
  },
  {
    id: 'radisson-blu-udaipur',
    name: 'Radisson Blu Udaipur Palace Resort',
    region: 'udaipur',
    locality: 'Fateh Sagar Lake, Mallatalai, Udaipur',
    venueType: 'Lakefront Palace Resort',
    setting: 'Lakeside',
    capacityMax: 700,
    capacityRange: 'Up to 700',
    spacesCount: 4,
    roomsCount: 245,
    badge: 'Lakeside Splendour',
    royalHighlight: 'Fateh Sagar Waterfront Deck · Two-Tier Pool Deck',
    features: ['Fateh Sagar Lake Promenade', 'Fateh Hall Pillarless Ballroom', 'Tiered Water Gardens', 'Segregated Jain Kitchen'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Radisson-Udaipur.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Radisson-Udaipur.webp',
      'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg'
    ],
    description: 'Combining Rajasthani palatial architecture with state-of-the-art wedding banquet infrastructure overlooking Fateh Sagar Lake.',
    spacesDetail: [
      { name: 'Fateh Sagar Lake Lawn', capacity: '500 Guests', type: 'Waterfront Lawn' },
      { name: 'Fateh Hall', capacity: '450 Guests', type: 'Grand Ballroom' }
    ]
  },

  // JAIPUR
  {
    id: 'rambagh-palace-jaipur',
    name: 'Rambagh Palace',
    region: 'jaipur',
    locality: 'Bhawani Singh Road, Jaipur',
    venueType: 'Palace Heritage',
    setting: 'Palace Courtyard',
    capacityMax: 800,
    capacityRange: 'Up to 800',
    spacesCount: 5,
    roomsCount: 78,
    badge: 'Imperial Grandeur',
    royalHighlight: 'Former Official Residence of the Maharaja of Jaipur',
    features: ['47 Acres of Mughal Gardens', 'Ornate Sheesh Mahal Suites', 'Royal Elephant Baraat Permits', 'Historic Marble Colonnades'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
      'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
    ],
    description: 'The undisputed jewel of Jaipur. Built in 1835, this living royal palace delivers an authentic regal experience with private royal gardens and marble pavilions.',
    spacesDetail: [
      { name: 'Mughal Sunken Garden', capacity: '700 Guests', type: 'Heritage Mughal Lawn' },
      { name: 'Jaigarh Hall', capacity: '300 Guests', type: 'Royal Banquet Hall' }
    ]
  },
  {
    id: 'fairmont-jaipur',
    name: 'Fairmont Jaipur',
    region: 'jaipur',
    locality: 'Riico Kukas, Aravali Hills, Jaipur',
    venueType: 'Imperial Mughal Palace',
    setting: 'Mountain Valley',
    capacityMax: 1200,
    capacityRange: 'Up to 1,200',
    spacesCount: 6,
    roomsCount: 245,
    badge: 'Celebrity Favorite',
    royalHighlight: 'Grand 10,000 sq ft Pillarless Ballroom · Aangan Courtyard',
    features: ['High-Ceiling Grand Ballroom', 'Central Aangan Folk Courtyard', 'Helipad Access', 'Traditional Rajput Welcome'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
      'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp'
    ],
    description: 'Inspired by the Mughal and Rajput architecture of Rajasthan, offering colossal celebration spaces, vaulted ceilings, and secluded foothill luxury.',
    spacesDetail: [
      { name: 'Grand Ballroom & Foyer', capacity: '1000 Guests', type: 'Pillarless Ballroom' },
      { name: 'Aangan Central Courtyard', capacity: '400 Guests', type: 'Heritage Courtyard' }
    ]
  },
  {
    id: 'jai-mahal-palace',
    name: 'Jai Mahal Palace',
    region: 'jaipur',
    locality: 'Jacob Road, Civil Lines, Jaipur',
    venueType: 'Palace Heritage',
    setting: 'Palace Courtyard',
    capacityMax: 600,
    capacityRange: 'Up to 600',
    spacesCount: 4,
    roomsCount: 100,
    badge: 'Heritage Oasis',
    royalHighlight: '270-Year-Old Indo-Saracenic Architecture · Lotus Pond',
    features: ['Baradari Marble Pavilion', 'Peacock & Lotus Gardens', 'Central City Convenience', 'Heritage Suites'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp'
    ],
    description: 'Set amidst 18 acres of landscaped Mughal gardens in the center of Jaipur, dating back to 1745 with pristine Rajput architecture.',
    spacesDetail: [
      { name: 'Baradari Palace Lawn', capacity: '500 Guests', type: 'Historical Lawn' },
      { name: 'Lotus Pond Terrace', capacity: '200 Guests', type: 'Courtyard Terrace' }
    ]
  },
  {
    id: 'samode-palace',
    name: 'Samode Palace & Haveli',
    region: 'jaipur',
    locality: 'Samode Village, Aravali Valley, Jaipur',
    venueType: 'Aristocratic Haveli',
    setting: 'Mountain Valley',
    capacityMax: 250,
    capacityRange: 'Up to 250',
    spacesCount: 3,
    roomsCount: 43,
    badge: 'Exclusive Aristocracy',
    royalHighlight: 'Fresco-Painted Sheesh Mahal · Complete Private Buyout',
    features: ['475-Year-Old Handpainted Murals', 'Dramatic Mountain Fortress Backdrop', 'Infinity Rooftop Pool', 'Bespoke Privacy'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp'
    ],
    description: 'A 475-year-old aristocratic palace carved into the Aravali cliffs, famous for its hand-painted Sheesh Mahal and ultra-exclusive celebrity celebrations.',
    spacesDetail: [
      { name: 'Sheesh Mahal Darbar', capacity: '120 Guests', type: 'Mirror Hall' },
      { name: 'Sultan Mahal Courtyard', capacity: '200 Guests', type: 'Intimate Courtyard' }
    ]
  },

  // JODHPUR & JAISALMER
  {
    id: 'umaid-bhawan-palace',
    name: 'Umaid Bhawan Palace',
    region: 'jodhpur',
    locality: 'Circuit House Road, Cantt Area, Jodhpur',
    venueType: 'Royal Palace Heritage',
    setting: 'Palace Courtyard',
    capacityMax: 1000,
    capacityRange: 'Up to 1,000',
    spacesCount: 5,
    roomsCount: 70,
    badge: 'The Imperial Crown',
    royalHighlight: 'World’s Sixth Largest Private Residence · Art Deco Marvel',
    features: ['Chittar Sandstone Dome', 'Baradari Wedding Grounds', 'Vintage Car Museum', 'Direct Royal Family Lineage'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp',
      'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg'
    ],
    description: 'One of the world’s grandest private palaces, home to the Jodhpur royal family. Featuring Art Deco interiors, palm court gardens, and sweeping city panoramas.',
    spacesDetail: [
      { name: 'Baradari Lawns', capacity: '900 Guests', type: 'Sprawling Palace Lawn' },
      { name: 'Marwar Hall', capacity: '350 Guests', type: 'Art Deco Ballroom' }
    ]
  },
  {
    id: 'suryagarh-jaisalmer',
    name: 'Suryagarh Jaisalmer',
    region: 'jodhpur',
    locality: 'Kahala Phata, Sam Road, Jaisalmer',
    venueType: 'Golden Sand Fortress',
    setting: 'Mountain Valley',
    capacityMax: 700,
    capacityRange: 'Up to 700',
    spacesCount: 6,
    roomsCount: 83,
    badge: 'Desert Splendour',
    royalHighlight: 'Golden Thar Sandstone Architecture · Dune Dinners',
    features: ['Dune Mandap Ceremonies', 'Bawdi Stepwell Courtyards', 'Camel & Falcon Welcomes', 'Folk Troupe Ensembles'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp'
    ],
    description: 'A romantic sun-drenched fortress in the Thar desert, providing ethereal desert sunsets, stepwell courtyards, and enchanting Rajasthani soirees.',
    spacesDetail: [
      { name: 'The Sunset Patio', capacity: '600 Guests', type: 'Desert Horizon Lawn' },
      { name: 'Central Bawdi Stepwell', capacity: '250 Guests', type: 'Stepwell Courtyard' }
    ]
  },

  // GOA
  {
    id: 'grand-hyatt-goa',
    name: 'Grand Hyatt Goa',
    region: 'goa',
    locality: 'Bambolim Bay, North Goa',
    venueType: 'Luxury Beachfront Resort',
    setting: 'Beachfront',
    capacityMax: 1200,
    capacityRange: 'Up to 1,200',
    spacesCount: 6,
    roomsCount: 313,
    badge: 'Coastal Grandeur',
    royalHighlight: '17th-Century Indo-Portuguese Palace Architecture · Bayfront',
    features: ['Waterfront Mandap Lawns', 'Grand Ballroom Pillarless', 'Private Bay Access', 'All-Night Sound Exemptions'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp'
    ],
    description: 'Sprawled across 28 acres of tropical gardens overlooking the serene waters of Bambolim Bay, combining 17th-century Portuguese palace charm with luxury amenities.',
    spacesDetail: [
      { name: 'Bambolim Bayfront Lawn', capacity: '1000 Guests', type: 'Oceanfront Lawn' },
      { name: 'Grand Ballroom', capacity: '800 Guests', type: 'Pillarless Ballroom' }
    ]
  },
  {
    id: 'w-goa',
    name: 'W Goa',
    region: 'goa',
    locality: 'Vagator Beach, Chapora Fort, North Goa',
    venueType: 'Luxury Beach Resort',
    setting: 'Beachfront',
    capacityMax: 500,
    capacityRange: 'Up to 500',
    spacesCount: 4,
    roomsCount: 160,
    badge: 'High-Fashion Luxe',
    royalHighlight: 'Vagator Cliffside Vistas · Rock Pool Sunset Mandap',
    features: ['Rock Pool Sunset Deck', 'Great Room Ballroom', 'Chapora Fort Clifftop Panorama', 'Celebrity DJ Acoustics'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp'
    ],
    description: 'A vibrant, chic coastal paradise nestled under the red cliffs of Vagator Beach, celebrated for trendy sunset pheras and high-energy after-parties.',
    spacesDetail: [
      { name: 'Rock Pool Deck', capacity: '450 Guests', type: 'Clifftop Pool Deck' },
      { name: 'Great Room', capacity: '350 Guests', type: 'Design Ballroom' }
    ]
  },

  // KUMBHALGARH & MOUNT ABU
  {
    id: 'kumbha-bagh',
    name: 'The Kumbha Bagh',
    region: 'kumbhalgarh',
    locality: 'Kumbhalgarh Fort Road, Rajsamand',
    venueType: 'Hilltop Fortress',
    setting: 'Mountain Valley',
    capacityMax: 350,
    capacityRange: 'Up to 350',
    spacesCount: 3,
    roomsCount: 45,
    badge: 'High Altitude Serenity',
    royalHighlight: 'Unobstructed View of the Great Wall of India',
    features: ['3,500 Ft Above Sea Level', 'Misty Mountain Mandap', 'Intimate Heritage Courtyard', 'Pure Himalayan Vibe'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp'
    ],
    description: 'Perched 3,500 feet above sea level with commanding views of the UNESCO World Heritage Kumbhalgarh Fort and lush forest reserves.',
    spacesDetail: [
      { name: 'Sky Fortress Terrace', capacity: '300 Guests', type: 'Open Cliff Lawn' }
    ]
  },

  // RISHIKESH
  {
    id: 'taj-rishikesh',
    name: 'Taj Rishikesh Resort & Spa',
    region: 'rishikesh',
    locality: 'Singthali, Sacred Ganga Valley, Rishikesh',
    venueType: 'Sacred Riverside Retreat',
    setting: 'Mountain Valley',
    capacityMax: 250,
    capacityRange: 'Up to 250',
    spacesCount: 3,
    roomsCount: 79,
    badge: 'Spiritual Grandeur',
    royalHighlight: 'Direct Ganga Beach Frontage · Private Riverfront Mandap',
    features: ['Sacred Ganga Ghat Pheras', 'Himalayan Ridge Vistas', 'Ayurvedic Wellness Spa', 'Eco-Luxury Haveli Architecture'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg'
    ],
    description: 'Terraced into the Himalayan slopes with direct access to a private sandy beach on the sacred river Ganga. Unsurpassed spiritual serenity and luxury.',
    spacesDetail: [
      { name: 'Ganga Riverside Ghat', capacity: '200 Guests', type: 'Sacred Riverbank' },
      { name: 'Devbhoomi Lawn', capacity: '220 Guests', type: 'Terraced Mountain Lawn' }
    ]
  },

  // THAILAND
  {
    id: 'sri-panwa-phuket',
    name: 'Sri Panwa Phuket',
    region: 'thailand',
    locality: 'Cape Panwa, Phuket, Thailand',
    venueType: 'Ultra-Luxury Tropical Resort',
    setting: 'Beachfront',
    capacityMax: 300,
    capacityRange: 'Up to 300',
    spacesCount: 4,
    roomsCount: 52,
    badge: 'International Royal Escape',
    royalHighlight: 'Baba Nest Rooftop 360° Ocean Views · Private Peninsula',
    features: ['Cape Panwa Ocean Peninsula', 'Baba Nest Clifftop Deck', 'Private Infinity Pool Villas', 'Authentic Indian Khansama Desk'],
    imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp',
    gallery: [
      'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp'
    ],
    description: 'An elite clifftop sanctuary perched on Cape Panwa, offering dramatic 360-degree ocean panoramas, private yacht arrivals, and celebrity wedding service.',
    spacesDetail: [
      { name: 'Baba Nest Sunset Deck', capacity: '180 Guests', type: 'Clifftop Ocean Deck' },
      { name: 'Beachside Coconut Grove', capacity: '250 Guests', type: 'Private Tropical Cove' }
    ]
  }
];

const POPULAR_REGIONS = [
  { id: 'all', label: 'All Regions', count: VENUES_DATABASE.length, image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp' },
  { id: 'udaipur', label: 'Udaipur', count: 6, image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp' },
  { id: 'jaipur', label: 'Jaipur', count: 4, image: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp' },
  { id: 'jodhpur', label: 'Jodhpur', count: 2, image: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp' },
  { id: 'goa', label: 'Goa', count: 2, image: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp' },
  { id: 'kumbhalgarh', label: 'Kumbhalgarh', count: 1, image: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp' },
  { id: 'rishikesh', label: 'Rishikesh', count: 1, image: 'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg' },
  { id: 'thailand', label: 'Thailand', count: 1, image: 'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp' }
];

const VENUE_TYPES = [
  'All Types',
  'Palace Heritage',
  'Island Fortress',
  'Contemporary Luxury Palace',
  'Hilltop Fortress',
  'Luxury 5-Star Resort',
  'Golden Sand Fortress',
  'Luxury Beachfront Resort',
  'Sacred Riverside Retreat',
  'Ultra-Luxury Tropical Resort'
];

const CAPACITY_FILTERS = [
  { label: 'All Capacities', min: 0, max: 99999 },
  { label: 'Intimate (Up to 250)', min: 0, max: 250 },
  { label: 'Medium (250 - 500)', min: 251, max: 500 },
  { label: 'Grand (500 - 800)', min: 501, max: 800 },
  { label: 'Colossal (800+)', min: 801, max: 99999 }
];

const FAQS = [
  {
    q: 'What services does Rasm provide for royal destination wedding venues?',
    a: 'Rasm provides end-to-end venue advisory and reservation management. We leverage direct relationships with General Managers across Oberoi, Taj, Leela, and City Palace complexes to secure priority dates, direct wholesale room blocks, drone permissions, sound permits, and custom mandap engineering without intermediary broker markups.'
  },
  {
    q: 'How far in advance should we reserve premier palace venues like Udaivilas or Rambagh?',
    a: 'Due to soaring global demand from luxury NRI couples, marquee palace venues book 9 to 14 months ahead for peak winter dates (November to February). However, through our direct GM connections in Udaipur and Jaipur, Rasm can frequently unlock priority slots, cancellation windows, or weekday royal dates on shorter timelines.'
  },
  {
    q: 'Can we inspect the venues virtually before flying to India?',
    a: 'Yes, absolutely. Our Udaipur headquarters hosts 3D photorealistic spatial simulations and live FaceTime/Zoom walk-throughs of every lawn, courtyard, and ballroom, allowing overseas couples from the USA, UK, and UAE to plan with total confidence before arriving in India.'
  },
  {
    q: 'Are dietary preferences such as Pure Vegetarian, Maharaj, and Jain menus accommodated?',
    a: '100% yes. We curate dedicated, completely segregated kitchens staffed by hereditary royal khansamas and master Maharaj chefs to honor Jain dietary laws, onion/garlic-free traditions, vegan choices, and multi-cuisine royal feasts.'
  },
  {
    q: 'How are outdoor music curfews handled at palace venues in Rajasthan?',
    a: 'Under Indian municipal law, outdoor amplified sound on open palace lawns must lower at 10:00 PM. Rasm seamlessly choreographs the celebration by moving guests from open lawns into sound-insulated, lavishly decorated indoor palatial ballrooms and heritage darbars, where the party can continue until dawn.'
  },
  {
    q: 'Does Rasm coordinate airport transfers and VIP logistics for international guests?',
    a: 'Yes. Our white-glove NRI Concierge desk manages private tarmac greetings, luxury Mercedes/BMW fleet escorts, luggage tags, chartered flights, and dedicated hospitality lounges at Udaipur (UDR), Jaipur (JAI), and Mumbai/Delhi transit hubs.'
  }
];

interface VenueCatalogueViewProps {
  destinations?: Destination[];
  settings: SiteSettings;
  onOpenInquiry: (venueName?: string) => void;
  onNavigate: (path: string) => void;
}

export const VenueCatalogueView: React.FC<VenueCatalogueViewProps> = ({
  settings,
  onOpenInquiry,
  onNavigate,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [capacityIndex, setCapacityIndex] = useState<number>(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewVenue, setQuickViewVenue] = useState<VenueItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredVenues = useMemo(() => {
    return VENUES_DATABASE.filter(venue => {
      // Region match
      if (selectedRegion !== 'all' && venue.region !== selectedRegion) {
        return false;
      }
      // Type match
      if (selectedType !== 'All Types' && venue.venueType !== selectedType) {
        return false;
      }
      // Capacity match
      const capRule = CAPACITY_FILTERS[capacityIndex];
      if (venue.capacityMax < capRule.min || venue.capacityMax > capRule.max) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = venue.name.toLowerCase().includes(query);
        const matchLoc = venue.locality.toLowerCase().includes(query);
        const matchFeat = venue.features.some(f => f.toLowerCase().includes(query));
        const matchType = venue.venueType.toLowerCase().includes(query);
        if (!matchName && !matchLoc && !matchFeat && !matchType) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, selectedType, capacityIndex, searchQuery]);

  const activeRegionName = useMemo(() => {
    if (selectedRegion === 'all') return 'India';
    const found = POPULAR_REGIONS.find(r => r.id === selectedRegion);
    return found ? found.label : 'India';
  }, [selectedRegion]);

  const hasActiveFilters = selectedRegion !== 'all' || selectedType !== 'All Types' || capacityIndex !== 0 || searchQuery !== '';

  const clearAllFilters = () => {
    setSelectedRegion('all');
    setSelectedType('All Types');
    setCapacityIndex(0);
    setSearchQuery('');
  };

  return (
    <div className="pt-24 bg-white min-h-screen text-charcoal-900 font-sans w-full md:w-[90%] md:max-w-none pl-[10px] pr-0 md:pl-0 md:pr-0 ml-0 mr-0">
      
      {/* 1. HERO HEADER SECTION (Exact Meragi Style, Elevated to Royal Luxury) */}
      <section className="relative py-12 md:py-16 bg-[#FDFCFA] border border-gold/20 rounded-2xl my-2 w-full pl-0 pr-0 ml-0 mr-0">
        <div className="w-full p-6 sm:p-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory-200 border border-gold/30 text-gold-dark text-[11px] uppercase tracking-[0.25em] font-semibold mb-4">
            <Crown className="w-3.5 h-3.5 text-gold-dark" />
            <span>Verified Royal Palaces & Heritage Venues</span>
          </div>
          
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-900 leading-tight">
            Discover best royal wedding venues in <span className="gold-gradient-text italic">{activeRegionName}</span>
          </h1>
          
          <p className="mt-4 text-charcoal-600 text-base md:text-lg max-w-3xl font-light leading-relaxed">
            From 18th-century Rajputana courtyards and floating island palaces to tranquil lakefront lawns and private fortresses, Rasm curates direct GM access to the finest venues for your celebration.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => onOpenInquiry('Royal Venue Catalogue Consultation')}
              className="px-8 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38E3C] text-charcoal-900 font-bold rounded-lg transition-all shadow-lg shadow-gold/25 hover:shadow-gold/45 hover:-translate-y-0.5 active:translate-y-0 text-sm uppercase tracking-wider"
            >
              Get Free Royal Venue Consultation
            </button>
            <p className="text-xs text-charcoal-500 max-w-xs font-light">
              Connect with senior royal architects to unlock unlisted palace dates & private buyouts.
            </p>
          </div>
        </div>
      </section>

      {/* 2. POPULAR REGIONS CAROUSEL / CIRCULAR SELECTOR (Identical to Meragi's Popular Regions) */}
      <section className="w-full pl-0 pr-0 ml-0 mr-0 pt-8">
        <div className="mb-6">
          <label className="block text-xs md:text-sm font-semibold mb-4 text-left uppercase tracking-[0.22em] text-gold-dark">
            Popular Regions
          </label>
          
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {POPULAR_REGIONS.map(region => {
              const isSelected = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`px-2 py-3 rounded-2xl text-center transition-all flex flex-col items-center justify-center border group ${
                    isSelected
                      ? 'bg-[#FAF8F5] text-gold-dark border-gold shadow-md shadow-gold/20 scale-102 ring-2 ring-gold/40'
                      : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-gold/50 hover:bg-[#FDFCFA]'
                  }`}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden p-0.5 transition-transform duration-300 group-hover:scale-105 ${
                    isSelected ? 'ring-2 ring-gold' : 'ring-1 ring-charcoal-200'
                  }`}>
                    <img
                      src={region.image}
                      alt={region.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className={`mt-2 text-[11px] sm:text-xs font-medium tracking-wider uppercase truncate max-w-full ${
                    isSelected ? 'font-bold text-gold-dark' : 'text-charcoal-700'
                  }`}>
                    {region.label}
                  </span>
                  <span className="text-[10px] text-charcoal-400 font-light mt-0.5">
                    {region.count} {region.count === 1 ? 'Venue' : 'Venues'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. AI / ROYAL VENUE RECOMMENDATION PROMO BANNER (Exact Meragi AI Banner Style) */}
      <section className="w-full pl-0 pr-0 ml-0 mr-0 my-6">
        <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-xs border border-gold/40 bg-gradient-to-r from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5] relative overflow-hidden">
          <div className="mb-6 md:mb-0 text-center md:text-left flex-1 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-gold-dark font-semibold tracking-widest text-xs uppercase mb-2">
              <Sparkle className="w-3.5 h-3.5 text-gold animate-spin" />
              <span>Bespoke Royal Venue Matchmaker</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-cinzel font-normal text-charcoal-900 leading-tight">
              Get 5 palace venues recommended in 60 seconds
            </h2>
            <p className="text-xs md:text-sm text-charcoal-600 mt-2 font-light max-w-2xl">
              Tell our wedding architects your ideal dates, guest count, and dream heritage aesthetic. Receive curated palace floor plans and priority availability instantly.
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto md:ml-8 relative z-10">
            <button
              onClick={() => onOpenInquiry('AI Royal Venue Matchmaker')}
              className="w-full md:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md transition-all duration-300 bg-charcoal-900 text-gold border border-gold/40 hover:bg-black hover:shadow-lg hover:border-gold relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Match My Palaces</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent -skew-x-20 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
            </button>
          </div>

          {/* Decorative gold background motif */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* 4. BREADCRUMB & SECTION TITLE (Exact Meragi Style) */}
      <main className="w-full pl-0 pr-0 ml-0 mr-0 pt-2 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold-dark font-medium">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-charcoal-900 transition-colors">
                  Home
                </button>
              </li>
              <li className="text-charcoal-400">/</li>
              <li>
                <span className="hover:text-charcoal-900 cursor-default">Destinations</span>
              </li>
              <li className="text-charcoal-400">/</li>
              <li className="text-charcoal-800 font-semibold truncate">
                Wedding Venues in {activeRegionName}
              </li>
            </ol>
          </nav>

          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gold/30 rounded-lg text-xs uppercase font-semibold text-charcoal-800 bg-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
            <span>Filter Venues ({filteredVenues.length})</span>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-charcoal-900 font-normal tracking-tight">
            Wedding Venues In {activeRegionName}
          </h2>
          <p className="leading-relaxed text-charcoal-600 text-xs sm:text-sm my-3 max-w-3xl font-light">
            Discover Rajasthan and India's finest royal wedding venues with Rasm’s hand-curated portfolio of marquee palaces, lakefront fortresses, and luxury wedding spaces. Explore verified venue details, guest capacities, room inventories, and direct booking terms without broker markups.
          </p>
        </div>

        {/* 5. SEARCH & FILTER CONTROLS BAR */}
        <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gold/20 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by palace, lawn, or landmark (e.g., Oberoi, Lake Pichola, Amer)..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gold/30 bg-white text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Region Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gold/30 bg-white text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                {POPULAR_REGIONS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.label} ({r.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Venue Type Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gold/30 bg-white text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                {VENUE_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Guest Capacity Dropdown */}
            <div className="md:col-span-2">
              <select
                value={capacityIndex}
                onChange={(e) => setCapacityIndex(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gold/30 bg-white text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                {CAPACITY_FILTERS.map((cap, idx) => (
                  <option key={cap.label} value={idx}>
                    {cap.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Status & Active Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gold/15 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-charcoal-800">
                Showing {filteredVenues.length} Handpicked {filteredVenues.length === 1 ? 'Venue' : 'Venues'}
              </span>
              {hasActiveFilters && (
                <span className="text-[11px] text-charcoal-500">
                  (Filtered from {VENUES_DATABASE.length} total)
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-gold-dark hover:underline font-medium text-xs flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 6. VENUE CARDS GRID (3 Columns, Exact Meragi Geometry, Royal & NO PRICING) */}
        {filteredVenues.length === 0 ? (
          <div className="text-center py-20 bg-[#FAF8F5] rounded-3xl border border-gold/20 p-8">
            <Castle className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
            <h3 className="font-cinzel text-xl text-charcoal-900 mb-2">
              No matching palace venues found
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mb-6 font-light">
              Try loosening your filters or search keywords, or connect with our royal concierge for bespoke unlisted estates.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-white border border-gold text-xs uppercase tracking-wider text-gold-dark rounded-full hover:bg-gold hover:text-white transition-colors"
            >
              View All Royal Venues
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredVenues.map(venue => {
              const isWishlisted = wishlist.includes(venue.id);

              return (
                <div
                  key={venue.id}
                  className="border border-[#F2E8DC] hover:border-gold/50 rounded-2xl overflow-hidden bg-white flex flex-col h-full shadow-xs hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Photo Container */}
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-charcoal-100">
                    <img
                      src={venue.imageUrl}
                      alt={venue.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                    {/* Badge Pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-gold/40 text-[10px] uppercase font-semibold tracking-wider text-charcoal-900 shadow-xs">
                      <Crown className="w-3 h-3 text-gold-dark" />
                      <span>{venue.badge}</span>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => toggleWishlist(venue.id, e)}
                      aria-label="Add to wishlist"
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                        isWishlisted 
                          ? 'bg-rose-500 text-white shadow-md' 
                          : 'bg-white/80 text-charcoal-700 hover:bg-white hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Region Pill */}
                    <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span className="capitalize">{venue.region}, Rajasthan</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex-grow">
                      {/* Venue Title */}
                      <h3
                        title={venue.name}
                        onClick={() => setQuickViewVenue(venue)}
                        className="font-cinzel text-xl font-normal text-charcoal-900 truncate hover:text-gold-dark cursor-pointer transition-colors"
                      >
                        {venue.name}
                      </h3>

                      {/* Locality & Type Rows (Meragi Structure) */}
                      <div className="flex justify-between items-center mt-1.5 gap-2 text-xs">
                        <div className="flex items-center gap-1 text-charcoal-500 overflow-hidden">
                          <MapPin className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                          <p className="truncate font-light">{venue.locality}</p>
                        </div>

                        <div className="flex items-center gap-1 font-medium text-charcoal-700 capitalize flex-shrink-0">
                          <Castle className="w-3.5 h-3.5 text-gold-dark" />
                          <p className="whitespace-nowrap text-[11px]">{venue.venueType}</p>
                        </div>
                      </div>

                      {/* ROYAL HIGHLIGHT IN PLACE OF PRICING (NO PRICING AS REQUESTED) */}
                      <div className="mt-3 p-2.5 rounded-lg bg-[#FAF8F5] border border-gold/25 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                        <span className="text-xs font-semibold text-charcoal-800 tracking-wide truncate">
                          {venue.royalHighlight}
                        </span>
                      </div>

                      {/* 3-Column Stats Grid (Guests / Spaces / Rooms - Identical to Meragi) */}
                      <div className="mt-4 grid grid-cols-3 gap-3 py-3 border-y border-gold/15 text-center">
                        <div className="flex flex-col border-r border-gold/15">
                          <span className="text-[10px] text-charcoal-400 tracking-wider uppercase font-medium">Guests</span>
                          <span className="text-xs font-bold text-charcoal-900">{venue.capacityRange}</span>
                        </div>
                        <div className="flex flex-col border-r border-gold/15">
                          <span className="text-[10px] text-charcoal-400 tracking-wider uppercase font-medium">Spaces</span>
                          <span className="text-xs font-bold text-charcoal-900">{venue.spacesCount} Royal Areas</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-charcoal-400 tracking-wider uppercase font-medium">Rooms</span>
                          <span className="text-xs font-bold text-charcoal-900">{venue.roomsCount} Suites</span>
                        </div>
                      </div>

                      {/* Features Chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {venue.features.slice(0, 3).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-ivory-100 text-[10px] font-light text-charcoal-600 border border-gold/15"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action Buttons (Like Meragi's CTA) */}
                    <div className="mt-5 flex items-center gap-2">
                      <button
                        onClick={() => onOpenInquiry(venue.name)}
                        className="w-[78%] py-2.5 px-3 font-semibold rounded-lg text-xs uppercase tracking-wider bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38E3C] hover:to-[#C5A059] text-charcoal-900 shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                      >
                        Inquire Royal Tour & Dates
                      </button>

                      <button
                        onClick={() => setQuickViewVenue(venue)}
                        title="View Full Venue Specifications"
                        className="w-[22%] py-2.5 flex items-center justify-center rounded-lg border border-gold/30 hover:border-gold hover:bg-[#FAF8F5] text-charcoal-700 transition-colors text-xs"
                      >
                        <Eye className="w-4 h-4 text-gold-dark" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 7. PAGINATION (Exact Meragi Style) */}
        {filteredVenues.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2 text-xs">
            <button 
              disabled 
              className="px-3 py-1.5 border rounded-lg disabled:text-charcoal-300 disabled:border-charcoal-200 cursor-not-allowed font-medium"
            >
              Prev
            </button>
            <button className="px-3.5 py-1.5 border rounded-lg bg-gold text-white border-gold font-bold shadow-xs">
              1
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="px-3.5 py-1.5 border rounded-lg border-gold/30 text-charcoal-700 hover:border-gold font-medium"
            >
              2
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="px-3 py-1.5 border rounded-lg border-gold/30 text-charcoal-700 hover:border-gold font-medium"
            >
              Next
            </button>
          </div>
        )}

        {/* 8. FAQS SECTION (Exact Meragi Style with Accordion) */}
        <div className="mt-20 pt-12 border-t border-gold/20">
          <div className="text-center mb-10">
            <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Essential Clarity
            </span>
            <h2 className="font-cinzel text-2xl md:text-3xl lg:text-4xl text-charcoal-900 font-normal">
              Palace Venue FAQs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 font-light">
              Common questions from couples & NRI families planning their celebrations in India.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-gold/20 rounded-xl overflow-hidden bg-white transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left py-4 px-6 flex justify-between items-center font-medium text-charcoal-900 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span className="pr-4 text-xs sm:text-sm font-semibold tracking-wide">
                      {faq.q}
                    </span>
                    <span className="text-gold-dark text-lg font-bold flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed border-t border-gold/10 bg-[#FCFBF9]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 9. BOTTOM ROYAL CONSULTATION CALLOUT (Matching Meragi Page Ending) */}
        <section className="mt-16 py-12 px-6 sm:px-10 rounded-3xl bg-gradient-to-b from-[#FAF8F5] to-white border border-gold/30 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <Crown className="w-10 h-10 text-gold mx-auto" />
            <h3 className="font-cinzel text-2xl sm:text-3xl text-charcoal-900 font-normal">
              Can't Decide on the Perfect Palace Venue?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-xl mx-auto">
              Our bespoke wedding architects in Udaipur will analyze your vision, guest logistics, and seasonality to negotiate direct private buyout terms on your behalf.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenInquiry('Custom Venue Curation Desk')}
                className="px-8 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38E3C] text-charcoal-900 font-bold rounded-lg shadow-md hover:shadow-lg text-xs uppercase tracking-wider"
              >
                Schedule Private Venue Consultation
              </button>
              
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-white border border-gold/40 text-charcoal-800 font-semibold rounded-lg hover:bg-ivory-100 transition-colors text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-gold-dark" />
                <span>WhatsApp Palace Desk</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 10. QUICK VIEW MODAL FOR VENUE SPECIFICATIONS */}
      {quickViewVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gold/40 shadow-2xl relative p-6 sm:p-8">
            <button
              onClick={() => setQuickViewVenue(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-charcoal-100 hover:bg-charcoal-200 flex items-center justify-center text-charcoal-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Quick View Header */}
            <div className="pr-10">
              <span className="text-[10px] text-gold-dark uppercase tracking-[0.25em] font-semibold block mb-1">
                {quickViewVenue.venueType} · {quickViewVenue.region.toUpperCase()}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-charcoal-900">
                {quickViewVenue.name}
              </h3>
              <p className="text-xs text-charcoal-500 mt-1 flex items-center gap-1 font-light">
                <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                <span>{quickViewVenue.locality}</span>
              </p>
            </div>

            {/* Image Preview */}
            <div className="mt-5 h-56 sm:h-64 rounded-2xl overflow-hidden relative">
              <img
                src={quickViewVenue.imageUrl}
                alt={quickViewVenue.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[10px] uppercase font-bold text-charcoal-900 border border-gold/40 shadow-xs">
                {quickViewVenue.badge}
              </div>
            </div>

            {/* Overview */}
            <div className="mt-5">
              <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
                {quickViewVenue.description}
              </p>
            </div>

            {/* Stats Row */}
            <div className="mt-5 grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF8F5] border border-gold/20 text-center">
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-wider block">Max Guests</span>
                <span className="text-sm font-bold text-charcoal-900">{quickViewVenue.capacityRange}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-wider block">Celebration Spaces</span>
                <span className="text-sm font-bold text-charcoal-900">{quickViewVenue.spacesCount} Areas</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-wider block">Inventory</span>
                <span className="text-sm font-bold text-charcoal-900">{quickViewVenue.roomsCount} Suites</span>
              </div>
            </div>

            {/* Celebration Spaces Breakdown */}
            {quickViewVenue.spacesDetail && quickViewVenue.spacesDetail.length > 0 && (
              <div className="mt-6">
                <h4 className="font-cinzel text-base text-charcoal-900 mb-3">
                  Event Lawns & Courtyards
                </h4>
                <div className="space-y-2">
                  {quickViewVenue.spacesDetail.map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-gold/15 bg-white text-xs"
                    >
                      <div>
                        <span className="font-semibold text-charcoal-900 block">{sp.name}</span>
                        <span className="text-charcoal-500 text-[11px] font-light">{sp.type}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold-dark font-medium text-[11px]">
                        {sp.capacity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Royal Features */}
            <div className="mt-6">
              <h4 className="font-cinzel text-base text-charcoal-900 mb-2">
                Palace Amenities & Clearances
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-700">
                {quickViewVenue.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                    <span className="font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-5 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setQuickViewVenue(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-charcoal-300 text-charcoal-700 text-xs uppercase font-medium hover:bg-charcoal-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const vName = quickViewVenue.name;
                  setQuickViewVenue(null);
                  onOpenInquiry(vName);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38E3C] text-charcoal-900 text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg"
              >
                Inquire This Venue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
