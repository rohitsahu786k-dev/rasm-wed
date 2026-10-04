import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { WPPost, WPPostFull } from '@/lib/wp';
import { WpBody } from '@/components/WpBody';
import { InquiryAnimatedButton } from '@/components/InquiryClient';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { WithSidebar } from '@/components/PageParts';

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/**
 * Blog article page. Renders ONLY what is in WordPress (title, featured image, body) plus related posts.
 * Replaces the old template that injected identical made-up venue spaces and FAQs into every post.
 */
export function ArticleView({ post, related }: { post: WPPostFull; related: WPPost[] }) {
  const words = post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return (
    <div className="bg-white min-h-screen text-charcoal-900">
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog/' }, { name: post.title, path: `/${post.slug}/` }])} />
      <header className="pt-32 pb-10 bg-[#FDFCFA] border-b border-gold/20">
        <div className="rasm-container">
         <div>
          <nav aria-label="Breadcrumb" className="text-xs text-charcoal-500 mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-charcoal-900">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog/" className="hover:text-charcoal-900">Journal</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal-700 line-clamp-1">{post.title}</li>
            </ol>
          </nav>
          <h1 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2] mb-5">{post.title}</h1>
          <p className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-charcoal-500">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold-dark" /><time dateTime={post.date}>{fmt(post.date)}</time></span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold-dark" />{minutes} min read</span>
            <span>By Rasm Weddings &amp; Events</span>
          </p>
         </div>
        </div>
      </header>

      {post.image && (
        <div className="rasm-container pt-10">
          <Image src={post.image} alt={post.imageAlt ?? post.title} width={post.imageWidth ?? 1536} height={post.imageHeight ?? 1024} priority sizes="(min-width: 1024px) 896px, 100vw" className="w-full h-auto max-h-[560px] object-cover rounded-3xl border border-gold/20" />
        </div>
      )}

      <article className="rasm-container py-12">
        <WithSidebar context={post.title}><WpBody content={post.content} /></WithSidebar>
      </article>

      <section className="py-14 bg-gradient-to-b from-[#FAF8F5] to-white text-center border-t border-gold/15">
        <div className="rasm-container max-w-3xl space-y-5">
          <h2 className="font-manrope font-medium text-2xl sm:text-3xl tracking-tight">Planning your wedding with Rasm?</h2>
          <p className="text-charcoal-600 font-light">Tell us about your dates, guests and destination and our Udaipur team will get back to you.</p>
          <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={post.title} icon={<ArrowRight className="w-4 h-4" />}>
            Request a Private Consultation
          </InquiryAnimatedButton>
        </div>
      </section>

      {related.length > 0 && (
        <aside className="py-14 border-t border-gold/15" aria-labelledby="related">
          <div className="rasm-container">
            <h2 id="related" className="font-manrope font-medium text-2xl sm:text-3xl tracking-tight mb-8 text-center">More from the Journal</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <li key={p.slug} className="rounded-2xl border border-gold/20 overflow-hidden bg-white">
                  <Link href={`/${p.slug}/`} className="block group">
                    {p.image && (
                      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                        <Image src={p.image} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      </div>
                    )}
                    <h3 className="p-4 font-manrope font-medium text-base leading-snug text-charcoal-900 group-hover:text-gold-dark transition-colors">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
