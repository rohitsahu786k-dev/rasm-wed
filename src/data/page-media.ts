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
  venues: up('2026/09/best-wedding-venues-in-kumbhalgarh-2.webp', 1200, 800, 'Hotel banquet hall with arched windows, wedding venue selection in Udaipur'),
  decor: up('2024/07/MJLW5633.webp', 960, 720, 'Chandelier wedding mandap, wedding decor management in Udaipur'),
  food: up('2024/07/IMG_E5060.jpg', 1125, 1103, 'Wedding banquet table with floral centrepieces, wedding catering in Udaipur'),
  entertainment: up('2024/07/IMG_E5199.jpg', 1125, 1098, 'Stage with lights for wedding entertainment and sangeet'),
  hospitality: up('2024/07/IMG_E5070.jpg', 1123, 916, 'Red curtain welcome entrance with a chandelier for wedding guests'),
  logistics: up('2024/07/IMG_20190207_093652-scaled.jpg', 2560, 1920, 'Draped wedding pavilion setup, wedding logistics in Udaipur'),
  vendors: up('2024/07/IMG_E5020.jpg', 1125, 1323, 'Bride at a floral arch, wedding photography and vendor management'),
  budget: up('2024/07/IMG_E5087.jpg', 1125, 968, 'Wedding table setting in orange and gold, wedding budget planning'),
  invites: up('2024/07/IMG_E5037.jpg', 1125, 1371, 'Hanging decorative lamps for a wedding welcome area'),
};

export const PAGE_IMAGES = {
  heroDecor: up('2024/07/ELLQ1553-scaled.jpg', 2560, 1536, 'Golden heritage wedding stage lit at night, wedding decorators in Udaipur'),
  heroServices: up('2024/07/MLVR0388-scaled.webp', 1920, 1440, 'Pink and gold wedding stage planned by Rasm Weddings in Udaipur'),
  heroAbout: up('2024/07/IMG_20190207_093652-scaled.jpg', 2560, 1920, 'Draped wedding pavilion set up by the Rasm Weddings & Events team in Udaipur'),
  heroCorporate: up('2024/07/IMG_E5199.jpg', 1125, 1098, 'Stage with lighting for a corporate gala in Udaipur'),
  heroDestinations: up('2026/09/best-wedding-venues-in-kumbhalgarh-featured.webp', 1536, 1024, 'Floral mandap with the Aravalli hills behind it, destination wedding in Rajasthan'),
  heroBlog: up('2026/09/best-wedding-venues-in-kumbhalgarh-2.webp', 1200, 800, 'Banquet hall with arched windows overlooking the Aravalli hills'),
  heroGallery: up('2024/07/MLVR0388-scaled.webp', 1920, 1440, 'Royal pink and gold wedding stage in Udaipur'),
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
