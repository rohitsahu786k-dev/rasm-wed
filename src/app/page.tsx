import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import { getDestinations } from '@/lib/wp';
import { getHomeContent } from '@/lib/acf';
import { HeroCarousel } from '@/components/HeroCarousel';
import { CuratedExperiences, FeaturedWeddings, HeroFeatures, ImpactStats, InstagramStrip, VenuesShowcase, WhyChoose } from '@/components/HomeLanding';
import { DestinationsSection } from '@/components/DestinationsSection';
import { HomeContact } from '@/components/HomeContact';
import { HomeSeoContent } from '@/components/HomeSeoContent';

export const revalidate = 300;

// The title/description already ranking on the live site are pinned in seo-live.json (see buildMetadata); these are the fallback.
const HOME_TITLE = 'Rasm Weddings & Events | Luxury Destination Wedding Planner in Udaipur, India';

export const metadata: Metadata = buildMetadata({ title: HOME_TITLE, description: SITE.description, path: '/' });

export default async function Home() {
  const [home, destinations] = await Promise.all([getHomeContent(), getDestinations()]);
  return (
    <>
      <HeroCarousel slides={home.slides} autoplaySeconds={home.autoplaySeconds} />
      <HeroFeatures />
      <DestinationsSection destinations={destinations} />
      <WhyChoose />
      <FeaturedWeddings />
      <ImpactStats stats={home.stats} />
      <VenuesShowcase />
      <CuratedExperiences />
      <InstagramStrip />
      <HomeContact />
      <HomeSeoContent />
    </>
  );
}
