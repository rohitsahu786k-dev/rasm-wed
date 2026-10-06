import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/metadata';
import { PILLAR_BY_SLUG } from '@/data/pillars';
import { JsonLd } from '@/components/JsonLd';
import { PillarPage } from '@/components/PillarPage';
import { articleSchema, breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/schema';

/**
 * Shared metadata + schema for the pillar routes, so each route file stays a three-line wrapper.
 * `preferOpts: true` keeps these titles out of the seo-live.json pinning: pillars are new pages with no
 * WordPress history to preserve.
 */
export function pillarMetadata(slug: string): Metadata {
  const p = PILLAR_BY_SLUG[slug];
  if (!p) return { title: 'Page not found', robots: { index: false, follow: false } };
  return buildMetadata({ title: p.title, description: p.description, path: `/${slug}/`, type: 'article', preferOpts: true });
}

export function PillarRoute({ slug }: { slug: string }) {
  const p = PILLAR_BY_SLUG[slug];
  if (!p) notFound();
  const path = `/${slug}/`;
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path, name: p.title, description: p.description }),
          // webPageSchema points `breadcrumb` at #breadcrumb, so the BreadcrumbList must actually be emitted
          // or that @id reference dangles.
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/blog/' },
            { name: p.title, path },
          ]),
          // A pillar is a reference guide, so Article is the honest type (BlogPosting is for the dated blog).
          articleSchema({
            path,
            title: p.h1.replace(/:$/, ''),
            description: p.description,
            section: 'Wedding planning guides',
            wordCount: p.sections.reduce((n, s) => n + s.body.join(' ').split(/\s+/).length, 0),
          }),
          itemListSchema(
            `${p.title}: destinations`,
            p.cities.map((c) => ({ name: c.label, path: c.href })),
          ),
        ]}
      />
      <PillarPage pillar={p} />
    </>
  );
}
