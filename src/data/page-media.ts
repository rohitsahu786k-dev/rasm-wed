import { WP_ORIGIN } from '@/lib/site';

export interface PageImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const up = (path: string, width: number, height: number, alt: string): PageImage => ({ src: `${WP_ORIGIN}/wp-content/uploads/${path}`, width, height, alt });

/** Text-free photographs from the WordPress media library, grouped by the page that uses them. */
/** One photograph per planning service card (keys match SERVICES in pages-content.ts). */
export const SERVICE_IMAGES: Record<string, PageImage> = {
  venues: up('2026/10/golden_palace_courtyard_at_dusk.webp', 1448, 1086, 'Palace terrace with set tables at dusk, wedding venue selection in Udaipur'),
  decor: up('2026/10/palace_wedding_under_blooming_chandeliers.webp', 1254, 1254, 'Floral mandap with chandeliers at night, wedding decor management in Udaipur'),
  food: up('2026/10/royal_lakeside_sunset_banquet.webp', 1254, 1254, 'Lakeside banquet table at sunset, wedding catering in Udaipur'),
  entertainment: up('2026/10/glamorous_indian_wedding_dance_performance.webp', 1122, 1402, 'Dance performance on a pink stage, wedding entertainment and artists'),
  hospitality: up('2026/10/sunset_safari_lodge_wedding_reception.webp', 1448, 1086, 'Poolside wedding reception, guest hospitality for destination weddings'),
  logistics: up('2026/10/royal_baraat_at_golden_hour.webp', 1122, 1402, 'Royal baraat with decorated horse, wedding logistics and transport in Udaipur'),
  vendors: up('2026/10/golden_hour_palace_wedding_portrait.webp', 1254, 1254, 'Wedding couple portrait, photographers and vendor management'),
  budget: up('2026/10/palace_lake_sunset_wedding_tablescape.webp', 1254, 1254, 'Wedding tablescape by the lake, wedding budget planning'),
  invites: up('2026/10/golden_hour_palace_wedding_details.webp', 1254, 1254, 'Bridal details with roses and bangles, wedding invitations and gifting'),
};

export const PAGE_IMAGES = {
  heroDecor: up('2026/10/golden_palace_wedding_mandap_at_sunset.webp', 1448, 1086, 'Palace wedding mandap at sunset, wedding decorators in Udaipur'),
  heroServices: up('2026/10/opulent_indian_wedding_under_palace_lights.webp', 1448, 1086, 'Pink and gold wedding stage under palace lights, wedding planning services in Udaipur'),
  heroAbout: up('2026/10/golden_lakeside_indian_wedding.webp', 1448, 1086, 'Lakeside wedding ceremony planned by the Rasm Weddings & Events team in Udaipur'),
  heroCorporate: up('2026/10/royal_blue_fort_wedding_at_night.webp', 1448, 1086, 'Fort venue lit at night for a gala event in Rajasthan'),
  heroDestinations: up('2026/10/sunset_palace_wedding_by_the_lake.webp', 1672, 941, 'Lake palace wedding setup at sunset, destination wedding in Rajasthan'),
  heroBlog: up('2026/10/golden_hour_palace_by_the_lake.webp', 1672, 941, 'Lake palace terrace at golden hour, wedding planning guides for Udaipur'),
  heroGallery: up('2026/10/golden_hour_palace_lake_wedding_mandap.webp', 1672, 941, 'Floral wedding mandap on a lakeside palace terrace, wedding gallery Udaipur'),
  heroContact: up('2024/07/IMG_E5020.jpg', 1125, 1323, 'Bride at a floral arch, contact Rasm Weddings in Udaipur'),
  decor: [
    { ...up('2024/07/MJLW5633.webp', 960, 720, 'Chandelier wedding mandap with a floral canopy'), label: 'Mandap design' },
    { ...up('2024/07/MLVR0388-scaled.webp', 1920, 1440, 'Pink and gold wedding stage with floral backdrop'), label: 'Stage and backdrop' },
    { ...up('2024/07/IMG_E5070.jpg', 1123, 916, 'Red curtain wedding entrance with a chandelier'), label: 'Entrances and pathways' },
    { ...up('2024/07/IMG_E5060.jpg', 1125, 1103, 'Long banquet table with floral centrepieces'), label: 'Table and banquet decor' },
    { ...up('2024/07/IMG_E5018.jpg', 1125, 1344, 'Marigold floral decor for a haldi function'), label: 'Haldi and mehndi decor' },
    { ...up('2024/07/IMG_E5091.jpg', 1125, 1102, 'Tree hung with lanterns for an evening wedding'), label: 'Lighting and lanterns' },
  ],
  corporate: [
    { ...up('2024/07/IMG_E5199.jpg', 1125, 1098, 'Stage with moving lights for a gala evening'), label: 'Gala evenings' },
    { ...up('2024/07/IMG_E5196.jpg', 1125, 1089, 'LED screen stage with floral columns'), label: 'Conferences and launches' },
    { ...up('2024/07/IMG_E5192.jpg', 1125, 943, 'Outdoor dinner under a truss with warm string lights'), label: 'Outdoor dinners' },
    { ...up('2024/07/IMG_E5082.jpg', 1125, 833, 'Pergola with chandeliers for a formal dinner'), label: 'Formal receptions' },
  ],
  about: [
    { ...up('2024/07/IMG_20190207_093652-scaled.jpg', 2560, 1920, 'Draped wedding pavilion with colourful fabrics'), label: 'Decor' },
    { ...up('2024/07/c6e90772-65c1-49ea-af0e-58620a88c7bd.jpg', 1024, 855, 'Garden wedding stage with flowers'), label: 'Venues' },
    { ...up('2024/07/IMG_E5098.jpg', 1125, 981, 'Red wedding mandap in a palace courtyard'), label: 'Ceremonies' },
  ],
} as const;
