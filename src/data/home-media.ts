import { WP_ORIGIN } from '@/lib/site';

export interface HomeImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const up = (path: string, width: number, height: number, alt: string): HomeImage => ({ src: `${WP_ORIGIN}/wp-content/uploads/${path}`, width, height, alt });

/**
 * Photographs from the WordPress media library that carry no text/watermarks, picked per slot of the homepage layout.
 * Replace a path here to swap a picture; sizes only reserve space (no layout shift).
 */
export const HOME_IMAGES = {
  hero: up('2026/09/best-wedding-venues-in-kumbhalgarh-featured.webp', 1536, 1024, 'Floral wedding mandap in front of the Aravalli hills at sunset, destination wedding in Udaipur'),
  heroTwo: up('2024/07/ELLQ1553-scaled.jpg', 2560, 1536, 'Golden heritage-style wedding backdrop lit at night, palace wedding decor in Udaipur'),
  heroThree: up('2023/10/15.jpg', 1920, 888, 'Decorated wedding stage and courtyard lit in warm red and gold, wedding planner in Udaipur'),
  weddings: [
    { ...up('2024/07/MLVR0388-scaled.webp', 1920, 1440, 'Royal pink and gold wedding stage designed by Rasm Weddings in Udaipur'), caption: 'A Regal Celebration in Udaipur' },
    { ...up('2024/07/c6e90772-65c1-49ea-af0e-58620a88c7bd.jpg', 1024, 855, 'Floral wedding stage in a garden venue, wedding decorators in Udaipur'), caption: 'Garden Wedding, Rajasthan' },
    { ...up('2024/07/IMG_20190207_093652-scaled.jpg', 2560, 1920, 'Colourful draped wedding pavilion and lounge, destination wedding decor'), caption: 'Draped Pavilion Celebration' },
    { ...up('2024/07/DYPT5102.jpg', 960, 540, 'White and gold floral wedding setup, luxury wedding in Rajasthan'), caption: 'Floral Mandap Setup' },
  ],
  venues: [
    { ...up('2024/07/ELLQ1553-scaled.jpg', 2560, 1536, 'Palace wedding venue backdrop in Udaipur, wedding venues in Udaipur'), label: 'Historic Palaces' },
    { ...up('2024/08/Jagmandir-Island-Palace.webp', 500, 500, 'Jagmandir Island Palace on Lake Pichola, lake palace wedding in Udaipur'), label: 'Lakeview Palaces' },
    { ...up('2024/09/Alwar-Rasm-Wedding-1.jpg', 1200, 500, 'Aerial view of a Rajasthan heritage fort wedding venue'), label: 'Heritage Forts' },
    { ...up('2026/09/best-wedding-venues-in-kumbhalgarh-2.webp', 1200, 800, 'Luxury hotel banquet hall with arched windows overlooking the Aravalli hills'), label: 'Luxury Hotels' },
    { ...up('2026/09/best-wedding-venues-in-kumbhalgarh-1.webp', 1200, 800, 'Hillside heritage resort among the Aravalli hills, garden wedding venue'), label: 'Garden & Hill Venues' },
    { ...up('2024/08/The-Ananta-Udaipur.webp', 500, 500, 'The Ananta Udaipur resort, boutique wedding resort in Udaipur'), label: 'Boutique Resorts' },
  ],
  experiences: [
    { ...up('2024/07/IMG_E5018.jpg', 1125, 1344, 'Bride with marigold floral decor at a haldi and mehndi ceremony'), label: 'Mehndi & Sangeet' },
    { ...up('2024/07/MJLW5633.webp', 960, 720, 'Chandelier wedding mandap with floral canopy'), label: 'Wedding Decor' },
    { ...up('2024/07/IMG_E5060.jpg', 1125, 1103, 'Long banquet table with floral centrepieces for a wedding dinner'), label: 'Gourmet Catering' },
    { ...up('2024/07/IMG_E5199.jpg', 1125, 1098, 'Stage with lighting for a wedding sangeet and live entertainment'), label: 'Entertainment & Artists' },
  ],
  instagram: [
    up('2024/07/IMG_E5022.jpg', 1125, 841, 'Floral mandap with chandeliers, wedding photography in Udaipur'),
    up('2024/07/IMG_E5025.jpg', 1125, 1286, 'Bride on a floral lounge at a pre-wedding function'),
    up('2024/07/IMG_E5098.jpg', 1125, 981, 'Red wedding mandap in front of a palace courtyard'),
    up('2024/07/IMG_E5089.jpg', 1125, 734, 'Lakeside pavilion with red drapes, lake wedding decor'),
    up('2024/07/IMG_E5077.jpg', 1125, 816, 'White and pink floral wedding stage'),
    up('2024/07/IMG_E5092.jpg', 1125, 861, 'Floral wedding stage with sofa seating'),
    up('2024/07/IMG_E5084.jpg', 1125, 810, 'Red and gold wedding stage with floral backdrop'),
  ],
  contact: up('2024/07/IMG_E5020.jpg', 1125, 1323, 'Bride at a flower-covered arch, plan your destination wedding with Rasm Weddings'),
} as const;
