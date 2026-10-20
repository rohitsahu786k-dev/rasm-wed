import { SITE, SITE_URL } from '@/lib/site';
import { getDestinations, getPosts } from '@/lib/wp';
import { PILLARS } from '@/data/pillars';

export const revalidate = 3600;

/**
 * llms.txt: a plain-text, link-first summary of the site for AI answer engines (see robots.ts for the crawler policy).
 * Every fact here comes from the same config the site uses (SITE), so it cannot drift from the published contact details.
 */
export async function GET() {
  const [destinations, posts] = await Promise.all([getDestinations(), getPosts()]);
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Office: ${SITE.address}. Phone and WhatsApp: ${SITE.phone}. Email: ${SITE.email}.`,
    `Services: venue selection, wedding decor, catering, entertainment, guest hospitality, logistics, vendor and budget management, corporate events.`,
    '',
    '## Key pages',
    `- [Wedding destinations](${SITE_URL}/wedding-destination/): the destinations we plan weddings in`,
    `- [Wedding planning services](${SITE_URL}/services/): what we manage, from venue to farewell`,
    `- [Wedding decoration in Udaipur](${SITE_URL}/traditional-decoration/)`,
    `- [Corporate event management in Udaipur](${SITE_URL}/corporate-events/)`,
    `- [About](${SITE_URL}/about-us/) and [Contact](${SITE_URL}/contact-us/)`,
    '',
    '## Planning guides',
    ...PILLARS.map((p) => `- [${p.title}](${SITE_URL}/${p.slug}/)`),
    '',
    '## Destination pages',
    ...destinations.map((d) => `- [Wedding planner in ${d.title}](${SITE_URL}/${d.slug}/)`),
    '',
    '## Blog',
    ...posts.slice(0, 20).map((p) => `- [${p.title}](${SITE_URL}/${p.slug}/)`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
