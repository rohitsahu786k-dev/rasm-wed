import kb from '../../data/knowledge-base.json' with { type: 'json' };
import { runAi } from '../ai/client.ts';
import { MIN_WORDS, type ArticleDraft } from './quality.ts';
import type { TopicPlan } from './topics.ts';

export interface LinkTarget {
  path: string;
  title: string;
}

const SYSTEM = (links: LinkTarget[]) =>
  [
    `You are a senior wedding-industry editor writing for ${kb.brand.name}. Tone: ${kb.tone}`,
    `Write a genuinely useful, original, people-first article of AT LEAST ${MIN_WORDS + 200} words (never below ${MIN_WORDS}); write as long as the topic needs. Structure: a short intro that answers the reader's core question, 5-8 descriptive <h2> sections (use <h3> where useful), practical detail (timelines, checklists, trade-offs, what to ask vendors), one <ul> or <ol>, and a final <h2>Frequently asked questions</h2> with 3-5 real questions (each <h3> + <p>). End with a short, honest call to action linking to the contact page.`,
    'Output HTML for the article BODY only: <h2>,<h3>,<p>,<ul>,<ol>,<li>,<strong>,<em>,<a>. NO <h1>, no inline styles, no scripts, no <img> tags and no image placeholders (the featured image is added separately).',
    `Company facts: use ONLY these approved claims, verbatim in meaning: ${JSON.stringify(kb.approvedClaims)}. Services: ${JSON.stringify(kb.services)}. Never mention: ${JSON.stringify(kb.forbidden)}.`,
    'Real venues/hotels may be named only as neutral starting points to investigate (never as partners, never with capacities, room counts, prices, ratings or availability, and never ranked). If the plan has a specific search intent, cover ONLY that intent: do not restate generic destination overviews, best-season notes or venue lists that other pages already cover; use original structure, examples and wording. Do NOT invent statistics, studies, percentages, prices, quotes, client stories, awards or venue partnerships. General, widely known cultural/practical knowledge is fine; if unsure, be general or omit. Do not promise rankings or guarantees.',
    `Internal links: include 3 to 6 <a href="..."> links inside the body text, chosen ONLY from this list, with natural descriptive anchor text (never repeat identical anchor text): ${JSON.stringify(links)}`,
    'Return JSON only with keys: title (natural, <=70 chars, the only H1), slug, seoTitle (35-60 chars), metaDescription (120-155 chars, specific, no clickbait), excerpt (1-2 sentences, <=200 chars), focusKeyword, html, images.',
    'images = an array with EXACTLY ONE item {"role":"featured","alt","prompt"} and nothing else. prompt = a vivid scene description (single centred subject with lots of empty space around it) of an atmospheric Indian wedding/palace/decor/destination visual relevant to the section; describe NO text, signs, logos or lettering. alt = plain descriptive sentence (15-140 chars), no keyword stuffing.',
  ].join('\n');

export async function writeArticle(
  plan: TopicPlan,
  links: LinkTarget[],
  feedback: string[] = [],
  run: typeof runAi = runAi,
): Promise<ArticleDraft> {
  const r = await run<ArticleDraft>({
    task: 'article-write',
    priority: 'P8',
    json: true,
    maxOutputTokens: 9000,
    instructions: SYSTEM(links),
    input:
      `Write this article as JSON.\n${JSON.stringify(plan)}\n` +
      (feedback.length ? `\nYour previous attempt FAILED these checks, fix every one:\n- ${feedback.join('\n- ')}\n` : ''),
  });
  return r.output;
}
