import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';
import { itemListSchema, webPageSchema } from '@/lib/schema';
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
const HOME_TITLE = 'Wedding Planner in Udaipur | Rasm Weddings & Events';

export const metadata: Metadata = buildMetadata({ title: HOME_TITLE, description: SITE.description, path: '/' });

export default async function Home() {
  const [home, destinations] = await Promise.all([getHomeContent(), getDestinations()]);
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: '/', name: HOME_TITLE, description: SITE.description, image: SITE.ogImage }),
          itemListSchema('Wedding destinations', destinations.map((d) => ({ name: `Wedding planner in ${d.title}`, path: `/${d.slug}/`, image: d.imageUrl || undefined }))),
        ]}
      />
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
