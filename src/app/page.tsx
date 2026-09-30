import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import { getDestinations, getPosts, getServices } from '@/lib/wp';
import { Hero } from '@/components/Hero';
import { DestinationsSection } from '@/components/DestinationsSection';
import { LuxuryTextMarquee } from '@/components/LuxuryTextMarquee';
import { PackagesBlock } from '@/components/PackagesBlock';
import { ServicesGrid, WhyRasm } from '@/components/WpPages';
import { RoyalHarmonicWaveSection } from '@/components/RoyalHarmonicWaveSection';
import { HomeGallerySection } from '@/components/HomeGallerySection';
import { BlogFeed } from '@/components/BlogFeed';
import { InstagramFeedSection } from '@/components/InstagramFeedSection';
import { ContactSection } from '@/components/ContactSection';

export const revalidate = 3600;

const HOME_TITLE = 'Rasm Weddings & Events | Luxury Destination Wedding Planner in Udaipur, India';

export const metadata: Metadata = buildMetadata({ title: HOME_TITLE, description: SITE.description, path: "/" });

export default async function Home() {
  const [posts, destinations, services] = await Promise.all([getPosts(), getDestinations(), getServices()]);
  return (
    <>
      <Hero />
      <DestinationsSection destinations={destinations} />
      <LuxuryTextMarquee />
      <WhyRasm />
      <section className="py-20 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight text-center mb-12">
            Our Wedding <span className="gold-gradient-text italic">Services</span>
          </h2>
          <ServicesGrid services={services} headingAs="h3" />
        </div>
      </section>
      <PackagesBlock />
      <RoyalHarmonicWaveSection />
      <HomeGallerySection />
      <BlogFeed posts={posts} />
      <InstagramFeedSection />
      <ContactSection />
    </>
  );
}
