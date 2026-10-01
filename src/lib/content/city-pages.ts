import kb from '../../data/knowledge-base.json' with { type: 'json' };
import { runAi } from '../ai/client.ts';
import { MIN_WORDS, type ArticleDraft } from './quality.ts';
import type { LinkTarget } from './article.ts';

/** City landing pages that previously held cloned/empty Elementor content. Slugs are existing WordPress pages. */
export const CITY_LANDINGS = [
  { slug: 'wedding-planner-in-mount-abu', city: 'Mount Abu', region: 'Rajasthan', nearby: ['wedding-planner-in-udaipur', 'wedding-planner-in-ranakpur', 'wedding-planner-in-kumbhalgarh'] },
  { slug: 'wedding-planner-in-nathdwara', city: 'Nathdwara', region: 'Rajasthan', nearby: ['wedding-planner-in-udaipur', 'wedding-planner-in-kumbhalgarh', 'wedding-planner-in-mount-abu'] },
  { slug: 'wedding-planner-in-jaisalmer', city: 'Jaisalmer', region: 'Rajasthan', nearby: ['wedding-planner-in-jodhpur', 'wedding-planner-in-pushkar', 'wedding-planner-in-jaipur'] },
  { slug: 'wedding-planner-in-pushkar', city: 'Pushkar', region: 'Rajasthan', nearby: ['wedding-planner-in-jaipur', 'wedding-planner-in-jodhpur', 'wedding-planner-in-kota'] },
  { slug: 'wedding-planner-in-kota', city: 'Kota', region: 'Rajasthan', nearby: ['wedding-planner-in-jaipur', 'wedding-planner-in-pushkar', 'wedding-planner-in-udaipur'] },
  { slug: 'wedding-planner-in-ranakpur', city: 'Ranakpur', region: 'Rajasthan', nearby: ['wedding-planner-in-kumbhalgarh', 'wedding-planner-in-udaipur', 'wedding-planner-in-mount-abu'] },
  { slug: 'wedding-planner-in-ahmedabad', city: 'Ahmedabad', region: 'Gujarat', nearby: ['wedding-planner-in-gandhinagar', 'wedding-planner-in-udaipur', 'wedding-planner-in-mount-abu'] },
  { slug: 'wedding-planner-in-gandhinagar', city: 'Gandhinagar', region: 'Gujarat', nearby: ['wedding-planner-in-ahmedabad', 'wedding-planner-in-udaipur', 'wedding-planner-in-mount-abu'] },
] as const;

const SYSTEM = (city: string, region: string, links: LinkTarget[]) =>
  [
    `You are a senior wedding-industry editor writing the landing page "Wedding Planner in ${city}" for ${kb.brand.name} (${kb.brand.positioning}). Tone: ${kb.tone}`,
    `This page must be genuinely specific to ${city}, ${region} and must NOT read like any other city page. Write at least ${MIN_WORDS + 250} words of original, practical, people-first content for couples and families considering a wedding in ${city}.`,
    'Suggested structure (adapt to what is true and useful for THIS city): an intro answering why/whether to hold a wedding in the city; best season and weather realities; the kinds of venues and settings that exist (named real venues only as neutral starting points to investigate); getting guests there and staying (nearest airport/rail/road, transfers, accommodation planning); local traditions, decor and food that shape the celebration; a realistic planning timeline and what to ask vendors; how a planner helps here (use ONLY the approved claims, no invented numbers); then <h2>Frequently asked questions</h2> with 4-5 real questions (<h3> + <p>). Finish with a short honest call to action linking to the contact page.',
    'Output HTML for the page BODY only using <h2>,<h3>,<p>,<ul>,<ol>,<li>,<strong>,<em>,<a>. NO <h1>, no images, no placeholders, no inline styles, no scripts.',
    `Approved company claims (use verbatim in meaning, nothing else about the company): ${JSON.stringify(kb.approvedClaims)}. Services: ${JSON.stringify(kb.services)}. Never mention: ${JSON.stringify(kb.forbidden)}.`,
    'Real venues/hotels may be named only as neutral starting points to investigate: never as partners, never with capacities, room counts, prices, ratings or availability, never ranked. Do NOT invent statistics, studies, percentages, prices, quotes, client stories, awards or distances you are unsure of; be general when unsure. No guarantees or ranking promises.',
    `Internal links: include 4 to 6 <a href="..."> links in the body text, chosen ONLY from this list (include the contact page and at least two nearby city pages), natural descriptive anchors, no repeated anchor text: ${JSON.stringify(links)}`,
    'Return JSON only with keys: title, slug, seoTitle (35-60 chars, must include the city name), metaDescription (120-155 chars, specific to this city, unique), excerpt (<=200 chars), focusKeyword (e.g. "wedding planner in <city>"), html, images.',
    'images = an array with EXACTLY ONE item {"role":"featured","alt","prompt"}: an atmospheric, photorealistic, text-free scene typical of a wedding setting in this city (single centred subject, lots of empty space around it). alt = plain descriptive sentence, 15-140 chars.',
  ].join('\n');

export async function writeCityPage(
  c: { slug: string; city: string; region: string },
  links: LinkTarget[],
  feedback: string[] = [],
  run: typeof runAi = runAi,
): Promise<ArticleDraft> {
  const r = await run<ArticleDraft>({
    task: 'article-write',
    priority: 'P5',
    json: true,
    maxOutputTokens: 9000,
    instructions: SYSTEM(c.city, c.region, links),
    input: `Write the "${c.city}" landing page as JSON. slug must be exactly "${c.slug}".${feedback.length ? `\nYour previous attempt FAILED these checks, fix every one:\n- ${feedback.join('\n- ')}` : ''}`,
  });
  return { ...r.output, slug: c.slug };
}

/** A service/info page (e.g. corporate events) whose WordPress body is empty or thin. Same guardrails as landing pages. */
export async function writeInfoPage(
  p: { slug: string; title: string; brief: string },
  links: LinkTarget[],
  feedback: string[] = [],
  run: typeof runAi = runAi,
): Promise<ArticleDraft> {
  const r = await run<ArticleDraft>({
    task: 'article-write',
    priority: 'P5',
    json: true,
    maxOutputTokens: 9000,
    instructions: [
      SYSTEM(p.title, 'India', links)
        .replace(/^You are a senior wedding-industry editor writing the landing page[^\n]*\n/, `You are a senior editor writing the page "${p.title}" for ${kb.brand.name}. Tone: ${kb.tone}\n`)
        .replace(/This page must be genuinely specific to[^\n]*\n/, `Brief: ${p.brief}\nWrite at least ${MIN_WORDS} words of original, practical, people-first content.\n`)
        .replace(/Suggested structure[^\n]*\n/, 'Structure: intro; what the service covers; how a good process works step by step; what to ask any planner or vendor; planning timeline; realistic considerations (permissions, logistics, weather, guest movement); FAQ with 4-5 real questions (<h2>Frequently asked questions</h2>, each <h3> + <p>); short honest call to action linking to the contact page.\n')
        .replace(/, e\.g\. "wedding planner in <city>"/, '')
        .replace(/\(must include the city name\)/, '')
        .replace(/typical of a wedding setting in this city/, 'relevant to this page'),
    ].join('\n'),
    input: `Write the "${p.title}" page as JSON. slug must be exactly "${p.slug}".${feedback.length ? `\nYour previous attempt FAILED these checks, fix every one:\n- ${feedback.join('\n- ')}` : ''}`,
  });
  return { ...r.output, slug: p.slug };
}
