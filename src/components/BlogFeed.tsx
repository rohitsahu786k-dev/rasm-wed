import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BookOpen, Calendar, ArrowRight, X } from 'lucide-react';

interface BlogFeedProps {
  posts: BlogPost[];
  onNavigate?: (path: string) => void;
}

export const BlogFeed: React.FC<BlogFeedProps> = ({ posts, onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section id="journal" className="py-24 bg-[#FDFCFA] relative border-b border-gold/15">
      <div className="rasm-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-200 border border-gold/35 shadow-2xs mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] font-medium uppercase tracking-normal gold-gradient-text">The Wedding Journal</span>
          </div>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
            Destination Guides & <span className="gold-gradient-text italic">Editorial Insights</span>
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
            In-depth guides on royal Udaipur venues, realistic destination budgets, and bridal planning from Rajasthan’s leading consultants.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 6).map((post) => (
            <article
              key={post.id}
              className="editorial-card rounded-2xl overflow-hidden flex flex-col group bg-white"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img
                  src={
                    post.featuredImageUrl ||
                    'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg'
                  }
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-charcoal-800 border border-gold/30 flex items-center gap-1.5 shadow-xs">
                  <Calendar className="w-3 h-3 text-gold-dark" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onNavigate ? onNavigate(`/${post.slug}`) : setActiveArticle(post)}
                    className="font-manrope font-medium text-xl text-charcoal-900 mb-3 group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug cursor-pointer tracking-tight"
                  >
                    {post.title}
                  </h3>
                  <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate ? onNavigate(`/${post.slug}`) : setActiveArticle(post)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-charcoal-900 hover:text-gold-dark transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-dark group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://rasmwed.com/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-charcoal-500 hover:text-charcoal-900"
                  >
                    WordPress Link ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white border border-gold/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 text-charcoal-700 hover:bg-stone-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {activeArticle.featuredImageUrl && (
              <img
                src={activeArticle.featuredImageUrl}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover rounded-2xl mb-6 border border-gold/25"
              />
            )}

            <div className="flex items-center gap-2 text-gold-dark text-xs font-medium uppercase tracking-widest mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {activeArticle.date}</span>
            </div>

            <h3 className="font-manrope font-bold text-2xl sm:text-3xl text-charcoal-900 mb-4 tracking-tight">
              {activeArticle.title}
            </h3>

            <div className="text-charcoal-700 text-sm leading-relaxed space-y-4 font-light">
              <p>{activeArticle.excerpt}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <a
                href={`https://rasmwed.com/${activeArticle.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-charcoal-900 bg-gold hover:bg-gold-light transition-all"
              >
                Read on Full Website ↗
              </a>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-charcoal-600 border border-stone-300 hover:border-stone-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
