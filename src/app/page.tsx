import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import { getPosts } from '@/lib/wp';
import { destinations } from '@/data/destinations';
import { Hero } from '@/components/Hero';
import { DestinationsSection } from '@/components/DestinationsSection';
import { LuxuryTextMarquee } from '@/components/LuxuryTextMarquee';
import { USPSection } from '@/components/USPSection';
import { ServicesBento } from '@/components/ServicesBento';
import { RoyalCommunityOrbitSection } from '@/components/RoyalCommunityOrbitSection';
import { RoyalHarmonicWaveSection } from '@/components/RoyalHarmonicWaveSection';
import { HomeGallerySection } from '@/components/HomeGallerySection';
import { RealCouplesStories } from '@/components/RealCouplesStories';
import { BlogFeed } from '@/components/BlogFeed';
import { InstagramFeedSection } from '@/components/InstagramFeedSection';
import { ContactSection } from '@/components/ContactSection';

export const revalidate = 3600;

const HOME_TITLE = 'Rasm Weddings & Events | Luxury Destination Wedding Planner in Udaipur, India';

export const metadata: Metadata = buildMetadata({ title: HOME_TITLE, description: SITE.description, path: "/" });

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Hero />
      <DestinationsSection destinations={destinations} />
      <LuxuryTextMarquee />
      <USPSection />
      <ServicesBento />
      <RoyalCommunityOrbitSection />
      <RoyalHarmonicWaveSection />
      <HomeGallerySection />
      <RealCouplesStories />
      <BlogFeed posts={posts} />
      <InstagramFeedSection />
      <ContactSection />
    </>
  );
}
