// Creates the private WordPress post "agent-facts" (once) where the owner types real first-hand facts, one per line.
//   node --env-file=.env.local --experimental-strip-types scripts/init-owner-facts.ts
import { wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';

const c = wpCredsFromEnv();
if (!c) throw new Error('WordPress credentials missing');
const H = { Authorization: `Basic ${Buffer.from(`${c.username}:${c.appPassword}`).toString('base64')}`, 'Content-Type': 'application/json' };
const existing = (await (await fetch(`${c.url}/wp-json/wp/v2/posts?slug=agent-facts&status=private&_fields=id`, { headers: H })).json()) as { id: number }[];
if (existing[0]) {
  console.log('already exists, id', existing[0].id);
} else {
  const content = [
    '# HOW TO USE: write one real fact per line (no # lines are read). The AI writer may use these as first-hand experience and nothing beyond them.',
    '# Good: "December sangeet lawns in Udaipur need heaters from about 6 pm; we always book them in advance."',
    '# Good: "We handled 38 weddings last year, 22 of them for NRI families from the US and UK." (only if true)',
    '# Only add facts you are happy to publish. Never add client names without permission.',
    '',
  ]
    .map((l) => `<p>${l}</p>`)
    .join('\n');
  const r = await fetch(`${c.url}/wp-json/wp/v2/posts`, { method: 'POST', headers: H, body: JSON.stringify({ title: '__agent facts (owner edits this, one fact per line)', slug: 'agent-facts', status: 'private', content, categories: [] }) });
  console.log('created', r.status, ((await r.json()) as { id: number }).id);
}
