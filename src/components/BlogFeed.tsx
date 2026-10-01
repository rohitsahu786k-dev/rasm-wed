import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import type { WPPost } from '@/lib/wp';

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

interface BlogFeedProps {
  posts: WPPost[];
  limit?: number;
  /** Heading level for the section title: h2 on the homepage, h1 on the /blog/ index. */
  headingAs?: 'h1' | 'h2';
}

export const BlogFeed: React.FC<BlogFeedProps> = ({ posts, limit = 6, headingAs: Heading = 'h2' }) => (
  <section id="journal" className="py-24 bg-[#FDFCFA] relative border-b border-gold/15">
    <div className="rasm-container relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-200 border border-gold/35 shadow-2xs mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-medium uppercase tracking-normal gold-gradient-text">The Wedding Journal</span>
        </div>
        <Heading className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
          Destination Guides & <span className="gold-gradient-text italic">Editorial Insights</span>
        </Heading>
        <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
          In-depth guides on royal Udaipur venues, realistic destination budgets, and bridal planning from Rajasthan’s leading consultants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, limit).map((post) => (
          <article key={post.slug} className="editorial-card rounded-2xl overflow-hidden flex flex-col group bg-white">
            <Link href={`/${post.slug}/`} className="relative h-56 overflow-hidden bg-stone-100 block" tabIndex={-1} aria-hidden="true">
              {post.image && (
                <Image
                  src={post.image}
                  alt=""
                  width={800}
                  height={560}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-charcoal-800 border border-gold/30 flex items-center gap-1.5 shadow-xs">
                <Calendar className="w-3 h-3 text-gold-dark" />
                <time dateTime={post.date}>{fmt(post.date)}</time>
              </span>
            </Link>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-3 group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug tracking-tight">
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">{post.excerpt}</p>
              </div>
              <div className="pt-4 border-t border-gold/15">
                <Link
                  href={`/${post.slug}/`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-charcoal-900 hover:text-gold-dark transition-colors"
                  aria-label={`Read full guide: ${post.title}`}
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-dark group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
