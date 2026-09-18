export interface SiteSettings {
  title: string;
  description: string;
  url: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroHeadline: string;
  heroSubheadline: string;
  instagramUrl: string;
  stats: {
    experience: string;
    weddings: string;
    destinations: string;
    satisfaction: string;
  };
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  slug?: string;
  parent?: number;
}

export interface WPPage {
  id: number;
  title: string;
  slug: string;
  link: string;
  content?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  sourceUrl: string;
  altText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string;
  author?: string;
  readTime?: string;
  category?: string;
  featuredImageUrl?: string;
}

export interface Destination {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  season: string;
  venues: string;
  imageUrl: string;
}
