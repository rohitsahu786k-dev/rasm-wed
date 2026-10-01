import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';
import { InquiryAnimatedButton } from '@/components/InquiryClient';
import type { WPPage, WPPost } from '@/lib/wp';
import type { Destination } from '@/types';
import { WpBody, cleanBlocks } from '@/components/WpBody';
import { CityFacts, FaqAccordion, HowWeHelp, NearbyDestinations, RelatedGuides } from '@/components/CityParts';
import { JsonLd } from '@/components/JsonLd';
import { parseElementor } from '@/lib/elementor';
import { cityNameFromSlug, getCityProfile, parseFaqs, relatedPosts } from '@/lib/city';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : s);

/**
 * Complete destination landing page. Body text comes from WordPress (editor- or AI-authored). Around it:
 * breadcrumbs, quick facts, how Rasm helps (services + package price), an FAQ accordion (with FAQPage schema),
 * guides about the city, and nearby destinations, so every city page is a full, internally linked page.
 */
export function CityLanding({ page, nearby, posts, services }: { page: WPPage; nearby: Destination[]; posts: WPPost[]; services: string[] }) {
  const city = cityNameFromSlug(page.slug);
  const profile = getCityProfile(page.slug);
  const isElementor = /elementor/.test(page.content);

  // FAQs: the page's own FAQ section when it has one (AI pages), otherwise the reviewed profile FAQs.
  const parsed = isElementor ? { body: page.content, faqs: [], tail: '' } : parseFaqs(page.content);
  const faqs = parsed.faqs.length ? parsed.faqs : (profile?.faqs ?? []);

  const lead = isElementor
    ? (cleanBlocks(parseElementor(page.content)).find((b) => b.type === 'p' && b.text.length > 80) as { text: string } | undefined)?.text
    : page.excerpt || profile?.tagline;
  const path = `/${page.slug}/`;

  return (
    <div className="bg-white min-h-screen text-charcoal-900">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Wedding Destinations', path: '/wedding-destination/' }, { name: `Wedding in ${city}`, path }]),
          serviceSchema({ name: `Wedding planning in ${city}`, description: clip(lead ?? `Wedding planning services in ${city} by Rasm Weddings & Events.`, 300), area: city, path }),
          ...(faqs.length ? [faqSchema(faqs.map((f) => ({ q: f.q, a: f.a })))] : []),
        ]}
      />

      <section className="pt-28 pb-12 bg-[#FDFCFA] border-b border-gold/20">
        <div className="rasm-container max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="text-xs text-charcoal-500 mb-6">
            <ol className="flex flex-wrap justify-center items-center gap-1.5">
              <li><Link href="/" className="hover:text-charcoal-900">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/wedding-destination/" className="hover:text-charcoal-900">Wedding Destinations</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal-700">{city}</li>
            </ol>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-200 border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.28em] font-medium mb-6">
            <Crown className="w-3.5 h-3.5" />
            <span>Destination Weddings</span>
          </div>
          <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 tracking-tight leading-[1.2] mb-5">{page.title}</h1>
          {lead && <p className="text-charcoal-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">{clip(lead, 220)}</p>}
          <div className="mt-8 flex justify-center">
            <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={`${city} wedding`} icon={<ArrowRight className="w-4 h-4" />}>
              Plan Your {city} Wedding
            </InquiryAnimatedButton>
          </div>
        </div>
      </section>

      {profile && <CityFacts city={city} facts={profile.facts} />}

      {page.image && (
        <div className="rasm-container max-w-5xl pt-10">
          <Image
            src={page.image}
            alt={page.imageAlt ?? `Wedding setting in ${city}`}
            width={page.imageWidth ?? 1536}
            height={page.imageHeight ?? 1024}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="w-full h-auto rounded-3xl border border-gold/20 shadow-[0_16px_45px_rgba(197,160,89,0.15)]"
          />
        </div>
      )}

      <article className="rasm-container max-w-3xl py-14">
        <WpBody content={parsed.body} />
        {parsed.tail && <div className="wp-content mt-6" dangerouslySetInnerHTML={{ __html: parsed.tail }} />}
      </article>

      <HowWeHelp city={city} services={services} />
      <FaqAccordion city={city} faqs={faqs} />
      <RelatedGuides city={city} posts={relatedPosts(posts, city)} />
      <NearbyDestinations items={nearby} />
    </div>
  );
}
