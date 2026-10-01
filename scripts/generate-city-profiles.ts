// Generates src/data/city-profiles.json: factual quick-facts + FAQs for each destination page.
// Reviewed content lives in git (not generated at runtime), so the owner can read and edit it.
//   node --env-file=.env.local --experimental-strip-types scripts/generate-city-profiles.ts [slug ...]
import { promises as fs } from 'node:fs';
import { runAi } from '../src/lib/ai/client.ts';

export const CITIES = [
  { slug: 'udaipur', city: 'Udaipur', region: 'Rajasthan' },
  { slug: 'jaipur', city: 'Jaipur', region: 'Rajasthan' },
  { slug: 'jodhpur', city: 'Jodhpur', region: 'Rajasthan' },
  { slug: 'jaisalmer', city: 'Jaisalmer', region: 'Rajasthan' },
  { slug: 'kumbhalgarh', city: 'Kumbhalgarh', region: 'Rajasthan' },
  { slug: 'mount-abu', city: 'Mount Abu', region: 'Rajasthan' },
  { slug: 'nathdwara', city: 'Nathdwara', region: 'Rajasthan' },
  { slug: 'pushkar', city: 'Pushkar', region: 'Rajasthan' },
  { slug: 'kota', city: 'Kota', region: 'Rajasthan' },
  { slug: 'ranakpur', city: 'Ranakpur', region: 'Rajasthan' },
  { slug: 'goa', city: 'Goa', region: 'Goa' },
  { slug: 'ahmedabad', city: 'Ahmedabad', region: 'Gujarat' },
  { slug: 'gandhinagar', city: 'Gandhinagar', region: 'Gujarat' },
  { slug: 'thailand', city: 'Thailand', region: 'Thailand' },
];

export interface CityProfile {
  slug: string;
  tagline: string;
  facts: { nearestAirport: string; railAccess: string; bestMonths: string; settings: string[]; knownFor: string[]; gettingThere: string };
  faqs: { q: string; a: string }[];
}

const RISKY = /\b(guarantee[sd]?|best in india|#1|according to (a|the) (study|survey|report)|\d{1,3}\s?% )/i;

export function validateProfile(p: CityProfile, city: string): string[] {
  const f: string[] = [];
  if (!p.tagline || p.tagline.length > 100) f.push('tagline length');
  const x = p.facts;
  if (!x?.nearestAirport || !x.railAccess || !x.bestMonths || !x.gettingThere) f.push('missing facts');
  if (!Array.isArray(x?.settings) || x.settings.length < 3) f.push('settings < 3');
  if (!Array.isArray(x?.knownFor) || x.knownFor.length < 3) f.push('knownFor < 3');
  if (!Array.isArray(p.faqs) || p.faqs.length < 5) f.push('needs >= 5 faqs');
  for (const q of p.faqs ?? []) {
    if (q.q.length < 20 || q.q.length > 140 || !q.q.endsWith('?')) f.push(`bad question: ${q.q.slice(0, 40)}`);
    if (q.a.length < 150 || q.a.length > 700) f.push(`answer length ${q.a.length}`);
  }
  const all = JSON.stringify(p);
  if (RISKY.test(all)) f.push('risky claim pattern');
  if (!all.toLowerCase().includes(city.toLowerCase().split(' ')[0])) f.push('does not mention the city');
  return f;
}

const SYSTEM = (city: string, region: string) =>
  [
    `You write factual quick-facts and FAQs for the wedding destination page "${city}, ${region}" for Rasm Weddings & Events, a wedding planner based in Udaipur, Rajasthan.`,
    'Accuracy matters more than detail. Use only widely known, stable facts. When you are not sure of an exact figure (distance, travel time, schedule, availability), describe it generally and add "check current options". NEVER invent statistics, prices, capacities, venue partnerships, awards or client stories. Real venue names only as neutral examples, never as partners or ranked.',
    'Return JSON only: {"tagline": "<=90 chars, a plain descriptive line about weddings in this place", "facts": {"nearestAirport": "name and code if known, otherwise \\"check nearest airport options\\"", "railAccess": "main railway station(s) in plain words", "bestMonths": "typical comfortable wedding months with one reason, hedged", "settings": ["3 to 5 typical wedding setting types here, e.g. lakefront palace, fort courtyard, desert camp"], "knownFor": ["3 to 5 things the place is known for that shape a wedding"], "gettingThere": "1-2 sentences on how guests usually arrive, hedged"}, "faqs": [6 objects {"q": "a real question a couple or family would ask about a wedding here, ends with ?", "a": "helpful answer, 2-4 sentences (200-500 chars), practical, hedged, no promises"}]}.',
    'FAQ topics to cover (adapt to the place): best season, guest travel/stay, weather and backup planning, venue types and how to choose, local ceremony/tradition considerations, how a planner helps and how far ahead to start. Do not mention Rasm prices.',
  ].join('\n');

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('generate-city-profiles.ts')) {
  const only = process.argv.slice(2);
  const path = 'src/data/city-profiles.json';
  const current: Record<string, CityProfile> = JSON.parse(await fs.readFile(path, 'utf8').catch(() => '{}'));
  for (const c of CITIES.filter((x) => only.length === 0 || only.includes(x.slug))) {
    let profile: CityProfile | undefined;
    let fb = '';
    for (let i = 0; i < 2; i++) {
      const r = await runAi<Omit<CityProfile, 'slug'>>({ task: 'seo-strategy', priority: 'P5', json: true, maxOutputTokens: 2500, instructions: SYSTEM(c.city, c.region), input: `Write the profile for ${c.city}.${fb}` });
      const candidate = { slug: c.slug, ...r.output };
      const problems = validateProfile(candidate, c.city);
      if (problems.length === 0) {
        profile = candidate;
        break;
      }
      fb = `\nYour previous attempt failed: ${problems.join('; ')}. Fix every point.`;
    }
    if (profile) {
      current[c.slug] = profile;
      console.log('ok', c.slug);
    } else console.log('FAILED', c.slug);
  }
  await fs.writeFile(path, JSON.stringify(current, null, 2) + '\n');
}
