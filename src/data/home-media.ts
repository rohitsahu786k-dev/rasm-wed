import { WP_ORIGIN } from '@/lib/site';

export interface HomeImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const up = (path: string, width: number, height: number, alt: string): HomeImage => ({ src: `${WP_ORIGIN}/wp-content/uploads/${path}`, width, height, alt });
const n = (file: string, width: number, height: number, alt: string) => up(`2026/10/${file}.webp`, width, height, alt);

/**
 * Homepage pictures from the WordPress media library (2026/10 upload set), placed by slot:
 * hero 16:9, featured weddings 4:3, venues mixed, experiences 3:4 portrait, Instagram 1:1, contact portrait.
 * Replace a file name to swap a picture; sizes only reserve space (no layout shift).
 */
export const HOME_IMAGES = {
  hero: n('golden_hour_palace_lake_wedding_mandap', 1672, 941, 'Floral wedding mandap on a lakeside palace terrace at golden hour, wedding in Udaipur'),
  heroTwo: n('sunset_palace_wedding_by_the_lake', 1672, 941, 'Lake palace wedding setup at sunset, destination wedding in Udaipur'),
  heroThree: n('opulent_palace_courtyard_at_dusk', 1672, 941, 'Palace courtyard at dusk lit for a wedding celebration in Rajasthan'),
  weddings: [
    { ...n('golden_palace_wedding_mandap_at_sunset', 1448, 1086, 'Palace wedding mandap at sunset, wedding planner in Udaipur'), caption: 'Palace Mandap at Sunset' },
    { ...n('royal_blue_fort_wedding_at_night', 1448, 1086, 'Fort wedding with blue drapes lit at night in Rajasthan'), caption: 'Fort Wedding at Night' },
    { ...n('opulent_indian_wedding_under_palace_lights', 1448, 1086, 'Pink and gold sangeet stage under palace lights'), caption: 'Palace Sangeet Evening' },
    { ...n('golden_lakeside_indian_wedding', 1448, 1086, 'Lakeside Indian wedding ceremony with floral mandap and guests'), caption: 'Lakeside Mandap Ceremony' },
  ],
  venues: [
    { ...n('golden_hour_palace_wedding_by_the_lake', 1672, 941, 'Historic palace and fort by the lake at golden hour, palace wedding venue in Udaipur'), label: 'Historic Palaces' },
    { ...n('sunset_palace_terrace_by_the_lake', 1448, 1086, 'Floral palace terrace overlooking the lake, lakeview wedding venue'), label: 'Lakeview Palaces' },
    { ...n('golden_fort_reflected_at_sunset', 1122, 1402, 'Fort reflected in the lake at sunset, heritage fort wedding venue'), label: 'Heritage Forts' },
    { ...n('sunset_safari_lodge_wedding_reception', 1448, 1086, 'Poolside wedding reception dinner at sunset, luxury hotel wedding venue'), label: 'Luxury Hotels' },
    { ...n('golden_hour_lake_palace_wedding_garden', 1672, 941, 'Garden wedding arch above the lake, garden wedding venue in Udaipur'), label: 'Garden Venues' },
    { ...n('sunset_palace_resort_retreat', 1122, 1402, 'Palace resort terrace and pool at sunset, boutique wedding resort'), label: 'Boutique Resorts' },
  ],
  experiences: [
    { ...n('golden_hour_mehendi_celebration', 1122, 1402, 'Women celebrating a mehendi function with flowers by the lake'), label: 'Mehndi & Sangeet' },
    { ...n('royal_baraat_at_golden_hour', 1122, 1402, 'Groom arriving on a decorated horse with dhol players, royal baraat'), label: 'Royal Baraat' },
    { ...n('royal_lakefront_indian_banquet', 1122, 1402, 'Indian wedding banquet plates on a lakefront table, wedding catering'), label: 'Gourmet Catering' },
    { ...n('glamorous_indian_wedding_dance_performance', 1122, 1402, 'Dancers performing on a pink stage at a wedding sangeet'), label: 'Entertainment & Artists' },
  ],
  instagram: [
    n('royal_sunset_palace_wedding_portrait', 1254, 1254, 'Wedding couple on a lakeside palace terrace, wedding photography in Udaipur'),
    n('golden_sunset_palace_wedding_portrait', 1254, 1254, 'Couple portrait at golden hour with the lake palace behind'),
    n('golden_hour_palace_wedding_portrait', 1254, 1254, 'Wedding couple embracing among flowers at a palace'),
    n('golden_palace_lake_wedding', 1254, 1254, 'Couple dancing on a floral palace terrace by the lake'),
    n('golden_hour_palace_bride', 1254, 1254, 'Bride walking along a palace terrace at sunset'),
    n('lakeside_palace_wedding_celebration', 1254, 1254, 'Lakeside palace wedding celebration with fireworks'),
    n('sunset_lake_palace_wedding_terrace', 1254, 1254, 'Lantern-lit palace terrace set for a wedding at sunset'),
  ],
  contact: n('golden_hour_palace_lake_wedding', 1254, 1254, 'Bride in a floral arch looking at the lake palace, plan your wedding with Rasm Weddings'),
} as const;
