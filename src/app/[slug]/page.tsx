import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, clip } from '@/lib/metadata';
import { getDestinations, getPage, getPages, getPost, getPosts, getRankMathMeta, getServices } from '@/lib/wp';
import { getGalleryMedia } from '@/lib/media';
import { blogPostingSchema } from '@/lib/schema';
import { NOINDEX_SLUGS, STATIC_PAGES } from '@/data/routes';
import { JsonLd } from '@/components/JsonLd';
import { PageView } from '@/components/PageView';
import { CityLanding } from '@/components/CityLanding';
import { ArticleView } from '@/components/ArticleView';
import { DestinationsPage, ServicesPage } from '@/components/WpPages';
import { BlogFeed } from '@/components/BlogFeed';

export const revalidate = 3600;

/** Designed pages that also render the copy written in WordPress underneath (real text for users and crawlers). */
const WP_COPY_PAGES = new Set(['about-us', 'traditional-decoration', 'corporate-events']);

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
      ...(rm?.description ? { description: rm.description, preferOpts: true } : {}),
    });
  switch (r.kind) {
    case 'static': {
      const s = STATIC_PAGES[slug];
      return meta({ title: s.title, description: s.description, path });
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
        description: `${r.page.title} – Rasm Weddings & Events, luxury destination wedding planners in Udaipur, Rajasthan.`,
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
      if (slug === 'wedding-destination') return <DestinationsPage destinations={await getDestinations()} />;
      if (slug === 'services') return <ServicesPage services={await getServices()} />;
      if (slug === 'gallery') return <PageView slug={slug} media={await getGalleryMedia()} />;
      if (slug === 'blog') {
        const posts = await getPosts();
        return (
          <div className="pt-24 bg-white min-h-screen">
            <BlogFeed posts={posts} limit={100} headingAs="h1" />
          </div>
        );
      }
      return <PageView slug={slug} wpPage={WP_COPY_PAGES.has(slug) ? await getPage(slug) : null} />;
    }
    case 'post': {
      const all = await getPosts();
      return (
        <>
          <JsonLd
            data={blogPostingSchema({
              path: `/${slug}/`,
              title: r.post.title,
              description: clip(r.post.excerpt),
              image: r.post.image,
              datePublished: r.post.date,
              dateModified: r.post.modified,
            })}
          />
          <ArticleView post={r.post} related={all.filter((p) => p.slug !== r.post.slug).slice(0, 3)} />
        </>
      );
    }
    case 'page':
      return slug.startsWith('wedding-planner-in-') ? <CityLanding page={r.page} /> : <PageView slug={slug} wpPage={r.page} />;
  }
}
