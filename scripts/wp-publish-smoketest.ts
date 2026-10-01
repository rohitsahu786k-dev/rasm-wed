// Creates ONE private draft, verifies Rank Math meta round-trips, then deletes it. Run:
//   node --env-file=.env.local --experimental-strip-types scripts/wp-publish-smoketest.ts
import { createPost, deletePost, wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';

const c = wpCredsFromEnv();
if (!c) throw new Error('WP credentials missing');

const post = await createPost(c, {
  title: 'zz-agent-smoketest (safe to delete)',
  slug: 'zz-agent-smoketest',
  html: '<p>Smoke test.</p><script>alert(1)</script>',
  excerpt: 'smoke test',
  seoTitle: 'Smoke Test SEO Title',
  seoDescription: 'Smoke test description',
  focusKeyword: 'smoke test',
});
console.log('created', { id: post.id, status: post.status });

const res = await fetch(`${c.url}/wp-json/wp/v2/posts/${post.id}?context=edit`, {
  headers: { Authorization: `Basic ${Buffer.from(`${c.username}:${c.appPassword}`).toString('base64')}` },
});
const back = (await res.json()) as { content: { raw: string }; meta?: Record<string, unknown> };
console.log('script stripped:', !back.content.raw.includes('<script'));
console.log('rank math meta round-trips:', back.meta?.rank_math_title === 'Smoke Test SEO Title', JSON.stringify(back.meta ?? {}).slice(0, 200));

await deletePost(c, post.id);
console.log('deleted smoketest draft', post.id);
