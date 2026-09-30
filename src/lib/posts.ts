import type { BlogPost } from '@/types';
import type { WPPost, WPPostFull } from './wp';

const DEFAULT_IMAGE = 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg';

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Adapts a WordPress post to the shape the article template expects. */
export function toBlogPost(p: WPPost | WPPostFull): BlogPost {
  const content = 'content' in p ? p.content : undefined;
  const words = (content ?? p.excerpt).replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return {
    id: p.slug,
    title: p.title,
    slug: p.slug,
    date: fmt(p.date),
    excerpt: p.excerpt,
    content: content?.replace(/<script[\s\S]*?<\/script>/gi, ''),
    author: 'Rasm Editorial · Senior Wedding Architect',
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    category: 'Royal Palaces & Destination Guides',
    featuredImageUrl: p.image ?? DEFAULT_IMAGE,
  };
}
