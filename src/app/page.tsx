import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import { getDestinations, getPosts, getServices } from '@/lib/wp';
import { getHomeContent } from '@/lib/acf';
import { getGalleryMedia } from '@/lib/media';
import { HeroCarousel } from '@/components/HeroCarousel';
import { AboutIntro, GalleryPreview, TrustBar } from '@/components/HomeSections';
import { DestinationsSection } from '@/components/DestinationsSection';
import { PackagesBlock } from '@/components/PackagesBlock';
import { ServicesGrid } from '@/components/WpPages';
import { BlogFeed } from '@/components/BlogFeed';
import { InstagramFeedSection } from '@/components/InstagramFeedSection';
import { ContactSection } from '@/components/ContactSection';

export const revalidate = 300;

const HOME_TITLE = 'Rasm Weddings & Events | Luxury Destination Wedding Planner in Udaipur, India';

export const metadata: Metadata = buildMetadata({ title: HOME_TITLE, description: SITE.description, path: '/' });

export default async function Home() {
  const [home, posts, destinations, services, gallery] = await Promise.all([getHomeContent(), getPosts(), getDestinations(), getServices(), getGalleryMedia(12)]);
  return (
    <>
      <HeroCarousel slides={home.slides} autoplaySeconds={home.autoplaySeconds} />
      <TrustBar stats={home.stats} />
      <AboutIntro intro={home.intro} />
      <DestinationsSection destinations={destinations} />
      <section className="py-20 sm:py-28 bg-[#FDFCFA] border-b border-gold/15">
        <div className="rasm-container max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">What We Do</p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15]">
              Our Wedding <span className="gold-gradient-text italic">Services</span>
            </h2>
          </div>
          <ServicesGrid services={services} headingAs="h3" />
        </div>
      </section>
      <PackagesBlock />
      <GalleryPreview items={gallery} />
      <BlogFeed posts={posts} />
      <InstagramFeedSection />
      <ContactSection />
    </>
  );
}
