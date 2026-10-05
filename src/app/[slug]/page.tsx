import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, clip } from '@/lib/metadata';
import { getDestinations, getPage, getPages, getPost, getPosts, getRankMathMeta, getServices } from '@/lib/wp';
import { NEARBY, cityKeyFromSlug } from '@/lib/city';
import { getGalleryMedia } from '@/lib/media';
import { blogPostingSchema, itemListSchema, serviceSchema, webPageSchema, type WebPageKind } from '@/lib/schema';
import { NOINDEX_SLUGS, STATIC_PAGES } from '@/data/routes';
import { JsonLd } from '@/components/JsonLd';
import { CityLanding } from '@/components/CityLanding';
import { ArticleView } from '@/components/ArticleView';
import { JodhpurWeddingPage } from '@/components/JodhpurWeddingPage';
import { AboutPage, BlogIndex, ContactPage, CorporatePage, DecorationPage, DestinationsPage, GalleryPage, InfoPage, ServicesPage } from '@/components/InnerPages';

export const revalidate = 3600;

const PAGE_KIND: Record<string, WebPageKind> = {
  'about-us': 'AboutPage',
  'contact-us': 'ContactPage',
  blog: 'CollectionPage',
  gallery: 'ImageGallery',
  'wedding-destination': 'CollectionPage',
  services: 'CollectionPage',
};


type Resolved =
  | { kind: 'static'; slug: string }
  | { kind: 'post'; slug: string; post: NonNullable<Awaited<ReturnType<typeof getPost>>> }
  | { kind: 'page'; slug: string; page: NonNullable<Awaited<ReturnType<typeof getPage>>> };

/** Exact-match routing only. Anything unknown is a genuine 404 (no fuzzy `includes()` matching). */
const resolve = cache(async (slug: string): Promise<Resolved | null> => {
  if (slug in STATIC_PAGES) return { kind: 'static', slug };
  const post = await getPost(slug);
  if (post) return { kind: 'post', slug, post };
  if (slug === 'new-home') return null;
  const page = await getPage(slug);
  if (page) return { kind: 'page', slug, page };
  return null;
});

export async function generateStaticParams() {
  const [pages, posts] = await Promise.all([getPages(), getPosts()]);
  const slugs = new Set<string>(Object.keys(STATIC_PAGES));
  for (const p of [...pages, ...posts]) if (p.slug !== 'new-home') slugs.add(p.slug);
  return [...slugs].map((slug) => ({ slug }));
}

/** Snippet-length description from the page itself (excerpt, else the opening text), with a brand sentence as the floor. */
function pageDescription(p: { title: string; excerpt?: string; content: string }) {
  const plain = p.content
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const text = (p.excerpt || plain).trim();
  const tail = ' Rasm Weddings & Events, wedding planners in Udaipur, Rajasthan.';
  const body = text.length >= 50 ? text : `${p.title}.`;
  return clip(body.length < 110 ? `${body}${tail}` : body);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await resolve(slug);
  if (!r) return { title: 'Page not found', robots: { index: false, follow: false } };
  const path = `/${slug}/`;
  // Rank Math on WordPress is the source of truth for SEO title/description (so auto-fixes and editor changes apply live).
  const rm = await getRankMathMeta(slug);
  const meta = (o: Parameters<typeof buildMetadata>[0]) =>
    buildMetadata({
      ...o,
      ...(rm?.title ? { title: rm.title, titleIsFinal: true, preferOpts: true } : {}),
      // Rank Math descriptions that are empty or too short for a search snippet are ignored (our page copy is used instead).
      ...(rm?.description && rm.description.length >= 70 ? { description: rm.description, preferOpts: true } : {}),
    });
  switch (r.kind) {
    case 'static': {
      const s = STATIC_PAGES[slug];
      return meta({
        title: s.title,
        description: s.description,
        path,
        image: slug === 'wedding-planner-in-jodhpur' ? '/images/jodhpur/umaid-bhawan-palace.jpg' : undefined,
      });
    }
    case 'post': {
      return meta({
        title: r.post.title,
        description: r.post.excerpt,
        path,
        image: r.post.image,
        type: 'article',
        publishedTime: r.post.date,
        modifiedTime: r.post.modified,
      });
    }
    case 'page':
      return meta({
        title: r.page.title,
        description: pageDescription(r.page),
        path,
        noindex: NOINDEX_SLUGS.has(slug),
      });
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await resolve(slug);
  if (!r) notFound();

  switch (r.kind) {
    case 'static': {
      const s = STATIC_PAGES[slug];
      const base = webPageSchema({ kind: PAGE_KIND[slug], path: `/${slug}/`, name: s.title, description: s.description });
      if (slug === 'wedding-planner-in-jodhpur') {
        const [nearby, posts, wpPage] = await Promise.all([
          getDestinations(NEARBY['jodhpur'] ?? []),
          getPosts(),
          getPage('wedding-planner-in-jodhpur'),
        ]);
        return <JodhpurWeddingPage nearby={nearby} posts={posts} wpPage={wpPage} />;
      }
      if (slug === 'wedding-destination') {
        const destinations = await getDestinations();
        return (
          <>
            <JsonLd data={[base, itemListSchema('Wedding destinations', destinations.map((d) => ({ name: `Wedding planner in ${d.title}`, path: `/${d.slug}/`, image: d.imageUrl || undefined })))]} />
            <DestinationsPage destinations={destinations} />
          </>
        );
      }
      if (slug === 'services') {
        const [wpPage, services] = await Promise.all([getPage('services'), getServices()]);
        return (
          <>
            <JsonLd data={[base, ...services.map((x) => serviceSchema({ name: x.title, description: `${x.title} for weddings in Udaipur and across Rajasthan by Rasm Weddings & Events.`, area: 'Udaipur, Rajasthan', path: '/services/' }))]} />
            <ServicesPage wpPage={wpPage} />
          </>
        );
      }
      if (slug === 'gallery') return (<><JsonLd data={base} /><GalleryPage media={await getGalleryMedia()} /></>);
      if (slug === 'blog') {
        const posts = await getPosts();
        return (
          <>
            <JsonLd data={[base, itemListSchema('Wedding planning blogs', posts.slice(0, 50).map((p) => ({ name: p.title, path: `/${p.slug}/`, image: p.image })))]} />
            <BlogIndex posts={posts} />
          </>
        );
      }
      if (slug === 'about-us') return (<><JsonLd data={base} /><AboutPage /></>);
      if (slug === 'contact-us') return (<><JsonLd data={base} /><ContactPage /></>);
      if (slug === 'traditional-decoration') return (<><JsonLd data={base} /><DecorationPage wpPage={await getPage('traditional-decoration')} /></>);
      if (slug === 'corporate-events') return (<><JsonLd data={base} /><CorporatePage wpPage={await getPage('corporate-events')} /></>);
      return notFound();
    }
    case 'post': {
      const all = await getPosts();
      return (
        <>
          <JsonLd
            data={[
              webPageSchema({ path: `/${slug}/`, name: r.post.title, description: clip(r.post.excerpt), image: r.post.image, modified: r.post.modified }),
              blogPostingSchema({
              path: `/${slug}/`,
              title: r.post.title,
              description: clip(r.post.excerpt),
              image: r.post.image,
              datePublished: r.post.date,
              dateModified: r.post.modified,
              section: r.post.categories?.[0],
              wordCount: r.post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
              }),
            ]}
          />
          <ArticleView post={r.post} related={all.filter((p) => p.slug !== r.post.slug).slice(0, 3)} />
        </>
      );
    }
    case 'page':
      if (slug.startsWith('wedding-planner-in-')) {
        const [nearby, posts, services] = await Promise.all([getDestinations(NEARBY[cityKeyFromSlug(slug)] ?? []), getPosts(), getServices()]);
        return (
          <>
            <JsonLd data={webPageSchema({ path: `/${slug}/`, name: r.page.title, description: r.page.excerpt || r.page.title, image: r.page.image, modified: r.page.modified })} />
            <CityLanding page={r.page} nearby={nearby} posts={posts} services={services.map((s) => s.title)} />
          </>
        );
      }
      return (
        <>
          <JsonLd data={webPageSchema({ path: `/${slug}/`, name: r.page.title, description: r.page.excerpt || r.page.title, modified: r.page.modified })} />
          <InfoPage slug={slug} wpPage={r.page} />
        </>
      );
  }
}
