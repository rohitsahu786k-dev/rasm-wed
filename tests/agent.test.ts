import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadAiConfig } from '../src/lib/ai/config.ts';
import { tierFor } from '../src/lib/ai/router.ts';
import { assertBudget, BudgetExceededError, costUsd } from '../src/lib/ai/budget.ts';
import { redactSecrets, runAi } from '../src/lib/ai/client.ts';
import { FileStore } from '../src/lib/automation/store.ts';
import { isAuthorizedAdmin, isAuthorizedCron } from '../src/lib/security/cron-auth.ts';
import { extractFacts, pageIssues, robotsIssues, scoreFor, duplicateIssues } from '../src/lib/monitoring/health-audit.ts';
import { alertsFromAudit } from '../src/lib/monitoring/alerts.ts';
import { diffLines, htmlToLines } from '../src/lib/seo/guidelines.ts';

const tmpStore = () => new FileStore(mkdtempSync(path.join(tmpdir(), 'agent-')));
const cfg = (env: Record<string, string> = {}) => loadAiConfig({ OPENAI_API_KEY: 'sk-test-0000000000000000', ...env });

test('models come from env, with verified defaults', () => {
  assert.equal(cfg().models.strong, 'gpt-6.1-sol');
  assert.equal(cfg().budget.monthlyUsd, 10);
  assert.equal(cfg().fallbackModel, 'gpt-6-luna');
  assert.equal(cfg({ AI_PRIMARY_MODEL: 'gpt-next' }).models.strong, 'gpt-next');
  assert.equal(cfg().imageModel, 'gpt-image-2.5-sunburst');
  assert.equal(cfg().budget.maxImagesPerDay, 1);
});

test('router keeps hard tasks on the strongest tier and only mechanical ones cheap', () => {
  assert.equal(tierFor('ranking-loss-analysis'), 'strong');
  assert.equal(tierFor('article-write'), 'strong');
  assert.equal(tierFor('code-repair'), 'strong');
  assert.equal(tierFor('log-classification'), 'cheap');
});

test('cost math and unknown-model safety price', () => {
  const c = cfg();
  assert.equal(costUsd(c, 'gpt-6-astra', 1_000_000, 1_000_000), 60);
  assert.equal(costUsd(c, 'mystery-model', 1_000_000, 0), 10);
});

test('budget: blocks non-critical near limit, blocks everything at limit', async () => {
  const store = tmpStore();
  const c = cfg({ AI_DAILY_BUDGET_USD: '1' });
  const ts = new Date().toISOString();
  await store.append('ai_usage', { ts, task: 'x', model: 'm', tokensIn: 0, tokensOut: 0, costUsd: 0.85, kind: 'text' });
  await assertBudget(store, c, 'P0'); // critical still allowed at 85%
  await assert.rejects(() => assertBudget(store, c, 'P8'), BudgetExceededError);
  await store.append('ai_usage', { ts, task: 'x', model: 'm', tokensIn: 0, tokensOut: 0, costUsd: 0.2, kind: 'text' });
  await assert.rejects(() => assertBudget(store, c, 'P0'), BudgetExceededError);
});

test('runAi uses the routed model, records usage, falls back on failure, never leaks the key', async () => {
  const store = tmpStore();
  const calls: { model: string; auth: string; input: string }[] = [];
  const fetchImpl = (async (_url: string, init: RequestInit) => {
    const body = JSON.parse(init.body as string);
    calls.push({ model: body.model, auth: (init.headers as Record<string, string>).Authorization, input: body.input });
    if (body.model === 'gpt-6.1-sol') return new Response(JSON.stringify({ error: { message: 'overloaded sk-proj-abcdefghijklmnopqrstuvwxyz' } }), { status: 503 });
    return new Response(JSON.stringify({ output_text: 'ok', usage: { input_tokens: 1000, output_tokens: 100 } }), { status: 200 });
  }) as unknown as typeof fetch;

  const r = await runAi({ task: 'article-write', priority: 'P8', instructions: 'i', input: 'my key is sk-proj-abcdefghijklmnopqrstuvwxyz' }, { cfg: cfg(), store, fetchImpl });
  assert.equal(r.output, 'ok');
  assert.equal(calls[0].model, 'gpt-6.1-sol');
  assert.equal(r.model, 'gpt-6-luna'); // fallback
  assert.ok(!calls[0].input.includes('sk-proj'), 'secret redacted from prompt');
  assert.equal((await store.list('ai_usage')).length, 1);

  const failing = (async () => new Response(JSON.stringify({ error: { message: 'bad sk-proj-abcdefghijklmnopqrstuvwxyz' } }), { status: 500 })) as unknown as typeof fetch;
  await assert.rejects(
    () => runAi({ task: 'summary', priority: 'P8', instructions: 'i', input: 'x' }, { cfg: cfg(), store, fetchImpl: failing }),
    (e: Error) => !e.message.includes('sk-proj'),
  );
  assert.equal(redactSecrets('password: hunter22222'), 'password: ***');
});

test('cron/admin auth is closed by default and constant-time', () => {
  const req = (h?: string) => new Request('https://x.test', { headers: h ? { authorization: h } : {} });
  assert.equal(isAuthorizedCron(req('Bearer s3cret'), 's3cret'), true);
  assert.equal(isAuthorizedCron(req('Bearer nope'), 's3cret'), false);
  assert.equal(isAuthorizedCron(req(), 's3cret'), false);
  assert.equal(isAuthorizedCron(req('Bearer '), ''), false, 'unset secret must never authorise');
  assert.equal(isAuthorizedAdmin(`Basic ${Buffer.from('admin:pw').toString('base64')}`, 'pw'), true);
  assert.equal(isAuthorizedAdmin(`Basic ${Buffer.from('admin:bad').toString('base64')}`, 'pw'), false);
  assert.equal(isAuthorizedAdmin(null, 'pw'), false);
});

const html = (o: { title?: string; canon?: string; noindex?: boolean; h1?: number; img?: string; ld?: string } = {}) => `<html><head>
${o.title === undefined ? '<title>Good title</title>' : o.title ? `<title>${o.title}</title>` : ''}
<meta name="description" content="desc"/>
${o.canon ? `<link rel="canonical" href="${o.canon}"/>` : ''}
${o.noindex ? '<meta name="robots" content="noindex, nofollow"/>' : ''}
${o.ld ? `<script type="application/ld+json">${o.ld}</script>` : ''}
</head><body>${'<h1>x</h1>'.repeat(o.h1 ?? 1)}${o.img ?? ''}<a href="/a/">a</a><a href="https://other.com/">o</a></body></html>`;
const facts = (h: string, status = 200) => extractFacts('https://site.test/p/', status, h, new Headers(), 'https://site.test');

test('page audit flags the SEO regressions that matter', () => {
  assert.deepEqual(pageIssues(facts(html({ canon: 'https://site.test/p/' }))).filter((i) => i.code !== 'thin-content'), []);
  assert.ok(pageIssues(facts(html({ canon: 'https://site.test/p/' }))).some((i) => i.code === 'thin-content'), 'short pages are flagged');
  const codes = (h: string, s = 200) => pageIssues(facts(h, s)).map((i) => i.code);
  assert.ok(codes(html({ canon: 'https://site.test/p/', noindex: true })).includes('unexpected-noindex'));
  assert.ok(codes(html({ canon: 'https://site.test/other/' })).includes('canonical-mismatch'));
  assert.ok(codes(html({})).includes('missing-canonical'));
  assert.ok(codes(html({ canon: 'https://site.test/p/', title: '' })).includes('missing-title'));
  assert.ok(codes(html({ canon: 'https://site.test/p/', h1: 0 })).includes('missing-h1'));
  assert.ok(codes(html({ canon: 'https://site.test/p/', img: '<img src="a.png">' })).includes('image-alt-missing'));
  assert.ok(codes(html({ canon: 'https://site.test/p/', ld: '{bad json' })).includes('invalid-jsonld'));
  assert.ok(codes('', 503).includes('status-5xx'));
  assert.equal(pageIssues(facts(html({ canon: 'https://site.test/p/', noindex: true })), false).some((i) => i.code === 'unexpected-noindex'), false);
});

test('X-Robots-Tag noindex is detected', () => {
  const f = extractFacts('https://site.test/p/', 200, html({ canon: 'https://site.test/p/' }), new Headers({ 'x-robots-tag': 'noindex' }), 'https://site.test');
  assert.equal(f.noindex, true);
});

test('robots guard: blanket disallow is CRITICAL on production, fine on staging', () => {
  const bad = 'User-Agent: *\nDisallow: /\n';
  assert.equal(robotsIssues(bad, 'https://site.test', true)[0].severity, 'CRITICAL');
  assert.equal(robotsIssues(bad, 'https://site.test', false).length, 0);
  const good = 'User-Agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://site.test/sitemap.xml\n';
  assert.equal(robotsIssues(good, 'https://site.test', true).length, 0);
});

test('duplicates, scoring and alerts', () => {
  const a = { ...facts(html({ canon: 'https://site.test/p/' })), url: 'https://site.test/a/' };
  const b = { ...a, url: 'https://site.test/b/' };
  assert.ok(duplicateIssues([a, b]).some((i) => i.code === 'duplicate-title'));
  assert.equal(scoreFor([]), 100);
  const issues = [{ severity: 'CRITICAL' as const, code: 'robots-blocks-all', url: 'u', message: 'm' }];
  const report = { ts: '', baseUrl: '', pagesCrawled: 1, score: scoreFor(issues), counts: { CRITICAL: 1, HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 }, issues };
  assert.equal(alertsFromAudit(report)[0].level, 'CRITICAL');
});

test('guideline diffing ignores unchanged text', () => {
  const before = htmlToLines('<p>This sentence stays exactly the same across versions.</p><p>This one is going to be removed later.</p>');
  const after = htmlToLines('<p>This sentence stays exactly the same across versions.</p><p>A brand new requirement was published today.</p>');
  const d = diffLines(before, after);
  assert.equal(d.added.length, 1);
  assert.equal(d.removed.length, 1);
});

import { createPost, sanitizeHtml, wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';

test('WordPress publisher: drafts by default, sanitises HTML, writes Rank Math via its endpoint', async () => {
  assert.equal(wpCredsFromEnv({}), null);
  assert.ok(!sanitizeHtml('<p onclick="x()">a</p><script>bad()</script><a href="javascript:evil()">l</a>').match(/script|onclick|javascript:/i));
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(init.body as string) });
    return new Response(JSON.stringify({ id: 9, link: 'l', status: 'draft', slug: 's' }), { status: 200 });
  }) as unknown as typeof fetch;
  const c = { url: 'https://wp.test', username: 'u', appPassword: 'p' };
  const r = await createPost(c, { title: 't', slug: 's', html: '<p>x</p>', excerpt: 'e', seoTitle: 'ST' }, f);
  assert.equal(r.id, 9);
  assert.equal(calls[0].body.status, 'draft');
  assert.ok(calls[1].url.endsWith('/rankmath/v1/updateMeta'));
  assert.deepEqual((calls[1].body.meta as Record<string, string>).rank_math_title, 'ST');
});

import { generateKeyPairSync, createVerify } from 'node:crypto';
import { signJwt, googleCredsFromEnv } from '../src/lib/google/auth.ts';
import { evaluateArticle, countWords, similarity, type ArticleDraft } from '../src/lib/content/quality.ts';
import { buildImagePrompt, imageFilename } from '../src/lib/images/generate.ts';
import { WpStore } from '../src/lib/automation/wp-store.ts';

test('Google JWT is a valid RS256 signature over header.claims', () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  const creds = googleCredsFromEnv({ GOOGLE_SERVICE_ACCOUNT_EMAIL: 'sa@x.iam.gserviceaccount.com', GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: pem.replace(/\n/g, '\n') })!;
  const jwt = signJwt(creds, ['scope-a'], 1000);
  const [h, c, s] = jwt.split('.');
  assert.ok(createVerify('RSA-SHA256').update(`${h}.${c}`).verify(publicKey, Buffer.from(s, 'base64url')));
  const claims = JSON.parse(Buffer.from(c, 'base64url').toString());
  assert.equal(claims.iss, 'sa@x.iam.gserviceaccount.com');
  assert.equal(claims.exp - claims.iat, 3600);
  assert.equal(googleCredsFromEnv({}), null);
});

const para = 'Choosing a wedding venue in Rajasthan means comparing guest rooms, weather backup, transfers and permissions for each ceremony in detail. ';
const goodArticle = (over: Partial<ArticleDraft> = {}): ArticleDraft => ({
  title: 'Choosing Sangeet Venues in Jodhpur',
  slug: 'choosing-sangeet-venues-in-jodhpur',
  seoTitle: 'Choosing Sangeet Venues in Jodhpur: A Guide',
  metaDescription: 'A practical guide to choosing a sangeet venue in Jodhpur: layouts, sound rules, weather backup and guest transfers to check before booking.',
  excerpt: 'How to pick a sangeet venue.',
  focusKeyword: 'sangeet venues in jodhpur',
  html:
    `<p>${para.repeat(12)} <a href="/wedding-planner-in-jodhpur/">Jodhpur planning</a></p>` +
    `<h2>One</h2><p>${para.repeat(12)} <a href="/services/">services</a></p>` +
    `<h2>Two</h2><ul><li>a</li></ul><p>${para.repeat(12)} <a href="/contact-us/">contact</a></p>` +
    `<h2>Three</h2><p>${para.repeat(12)}</p><h2>Four</h2><p>${para.repeat(12)}</p>`,
  images: [{ role: 'featured', alt: 'A palace courtyard set for an evening wedding celebration', prompt: 'A palace courtyard at dusk with lanterns and marigold garlands' }],
  ...over,
});
const gctx = { allowedInternalPaths: new Set(['/wedding-planner-in-jodhpur/', '/services/', '/contact-us/']), existingTitles: ['Why Udaipur is the Wedding Capital of India'], siteOrigin: 'https://rasmwed.com' };

test('quality gate: 1000+ words, links, images, no drafts-by-default failures', () => {
  const ok = evaluateArticle(goodArticle({ html: goodArticle().html + para.repeat(1) }), gctx);
  assert.ok(countWords(goodArticle().html) >= 1000, `fixture has ${countWords(goodArticle().html)} words`);
  assert.equal(ok.pass, true, ok.failures.join('; '));
  const has = (a: ArticleDraft, s: string) => evaluateArticle(a, gctx).failures.some((f) => f.includes(s));
  assert.ok(has(goodArticle({ html: '<h2>a</h2><p>short</p>' }), 'words'));
  assert.ok(has(goodArticle({ html: goodArticle().html.replace('/services/', '/does-not-exist/') }), 'non-existent'));
  assert.ok(has(goodArticle({ html: `${goodArticle().html}<p>According to a recent study, weddings cost more.</p>` }), 'unsupported'));
  assert.ok(has(goodArticle({ html: `${goodArticle().html}<p>We guarantee results.</p>` }), 'unsupported'));
  assert.ok(has(goodArticle({ images: [...goodArticle().images, { role: 'inline', alt: 'Round dining tables with floral centrepieces', prompt: 'tables' }] }), 'one image per article'));
  assert.ok(has(goodArticle({ images: [{ ...goodArticle().images[0], prompt: 'a sign with the text WELCOME' }] }), 'text/logo'));
  assert.ok(has(goodArticle({ title: 'Why Udaipur is the Wedding Capital of India' }), 'too similar'));
  assert.ok(has(goodArticle({ html: `<h1>x</h1>${goodArticle().html}` }), '<h1>'));
});

test('similarity and filenames', () => {
  assert.ok(similarity('best wedding venues in kumbhalgarh', 'wedding venues kumbhalgarh best') > 0.9);
  assert.ok(similarity('mehndi designs', 'sangeet venues') < 0.2);
  assert.equal(imageFilename('a-b', 'featured', 0), 'a-b-featured.webp');
  assert.equal(imageFilename('a-b', 'inline', 2), 'a-b-2.webp');
});

test('image prompt forbids text and enforces safe centred framing', () => {
  const p = buildImagePrompt('A floral mandap at sunset', 'featured');
  assert.match(p, /no text/i);
  assert.match(p, /margin/i);
  assert.match(p, /16:9/);
});

test('WpStore talks to the plugin endpoints', async () => {
  const seen: string[] = [];
  const f = (async (url: string, init: RequestInit) => {
    seen.push(`${init.method ?? 'GET'} ${url.replace('https://wp.test/wp-json/rasm-agent/v1', '')}`);
    return new Response(JSON.stringify(url.includes('/kv/') ? { value: { a: 1 } } : url.includes('/list') ? [{ x: 1 }] : { ok: true }), { status: 200 });
  }) as unknown as typeof fetch;
  const s = new WpStore({ url: 'https://wp.test', username: 'u', appPassword: 'p' }, f);
  await s.append('ai_usage', { a: 1 });
  assert.deepEqual(await s.list('ai_usage', { limit: 5 }), [{ x: 1 }]);
  assert.deepEqual(await s.getJson('latest_audit'), { a: 1 });
  await s.setJson('latest_audit', { b: 2 });
  assert.deepEqual(seen, ['POST /append', 'GET /list?collection=ai_usage&limit=5', 'GET /kv/latest_audit', 'PUT /kv/latest_audit']);
});

import { findOpportunities, expectedCtr } from '../src/lib/seo/opportunities.ts';

test('opportunity engine finds low-CTR, striking-distance, decay and cannibalisation', () => {
  const row = (query: string, page: string, clicks: number, impressions: number, position: number) => ({ query, page, clicks, impressions, ctr: clicks / impressions, position });
  const cur = [
    row('best wedding planner in udaipur', 'https://rasmwed.com/wedding-planner-in-udaipur/', 0, 60, 6),
    row('haldi ceremony ideas', 'https://rasmwed.com/a/', 1, 40, 12),
    row('haldi ceremony ideas', 'https://rasmwed.com/b/', 1, 35, 13),
    row('old topic', 'https://rasmwed.com/old/', 1, 10, 9),
  ];
  const prev = [row('old topic', 'https://rasmwed.com/old/', 8, 80, 5)];
  const o = findOpportunities(cur, prev);
  const types = o.map((x) => x.type);
  assert.ok(types.includes('low-ctr'));
  assert.ok(types.includes('striking-distance'));
  assert.ok(types.includes('cannibalization'));
  assert.ok(types.includes('content-decay'));
  assert.ok(o.every((x, i) => i === 0 || o[i - 1].score >= x.score), 'sorted by score');
  assert.ok(expectedCtr(1) > expectedCtr(5) && expectedCtr(5) > expectedCtr(15));
  assert.deepEqual(findOpportunities([], []), []);
});

import { hasDedicatedPage, isBrandQuery } from '../src/lib/seo/opportunities.ts';
test('dedicated-page heuristic ignores stop words and brand queries', () => {
  assert.equal(hasDedicatedPage('best wedding planner in udaipur', ['/wedding-planner-in-udaipur/']), true);
  assert.equal(hasDedicatedPage('haldi ceremony ideas', ['/', '/wedding-planner-in-udaipur/']), false);
  assert.equal(isBrandQuery('rasm wedding'), true);
  assert.equal(isBrandQuery('wedding planner'), false);
});

import { WpPostStore } from '../src/lib/automation/wp-post-store.ts';
test('WpPostStore keeps state in private WordPress posts using core REST only', async () => {
  const posts = new Map<number, { slug: string; status: string; raw: string }>();
  let next = 1;
  const f = (async (url: string, init: RequestInit = {}) => {
    const u = new URL(url);
    const m = init.method ?? 'GET';
    if (m === 'GET') {
      const slug = u.searchParams.get('slug')!;
      const hit = [...posts.entries()].find(([, p]) => p.slug === slug && u.searchParams.get('status') === p.status);
      return new Response(JSON.stringify(hit ? [{ id: hit[0], content: { raw: hit[1].raw } }] : []), { status: 200 });
    }
    const body = JSON.parse(init.body as string);
    const id = Number(u.pathname.split('/').pop()) || next++;
    posts.set(id, { slug: body.slug, status: body.status, raw: body.content });
    return new Response(JSON.stringify({ id }), { status: 200 });
  }) as unknown as typeof fetch;
  const s = new WpPostStore({ url: 'https://wp.test', username: 'u', appPassword: 'p' }, f);
  await s.append('ai_usage', { ts: '1', a: 1 });
  await s.append('ai_usage', { ts: '2', a: 2 });
  assert.deepEqual(await s.list('ai_usage'), [{ ts: '1', a: 1 }, { ts: '2', a: 2 }]);
  assert.deepEqual(await s.list('ai_usage', { since: '2' }), [{ ts: '2', a: 2 }]);
  await s.setJson('latest_audit', { score: 90 });
  assert.deepEqual(await s.getJson('latest_audit'), { score: 90 });
  assert.equal(await s.getJson('missing'), null);
  assert.ok([...posts.values()].every((p) => p.status === 'private'));
  assert.equal(posts.size, 2, 'one private post per collection/key, updated in place');
});

import { measureUniqueness, isUniqueEnough } from '../src/lib/content/uniqueness.ts';
import { buildCandidates, withinCaps, PER_CITY_CAP } from '../src/lib/content/programmatic.ts';
import { fixMediaAlt, fixDescriptions, diagnoseUnfixable, validDescription } from '../src/lib/monitoring/autofix.ts';

test('uniqueness gate rejects template-swapped pages and accepts original ones', () => {
  const base = '<p>' + 'The old fort stands above the lake and the main courtyard hosts the ceremony while guests gather on the terrace at sunset. '.repeat(8) + '</p>';
  const swapped = base.replace(/lake/g, 'desert');
  const original = '<p>' + 'Guests arriving by train should plan luggage transfers, room keys and a welcome lunch, because family elders often prefer a quiet first evening before the rituals begin. '.repeat(8) + '</p>';
  assert.equal(isUniqueEnough(measureUniqueness(swapped, [{ id: 'a', html: base }])), false);
  assert.equal(isUniqueEnough(measureUniqueness(original, [{ id: 'a', html: base }])), true);
});

test('programmatic strategy: hubs first, spokes only after their hub exists, demand-ranked, capped', () => {
  const none = { existing: [] as { title: string; slug: string }[], queries: [], programmaticSlugs: [] as string[] };
  const first = buildCandidates(none);
  assert.ok(first.length === 5 && first.every((c) => c.family === 'hub'), 'only the 5 pillar pages are offered before any hub exists');
  const allHubs = strategyHubs.map((h) => ({ title: h.title, slug: h.slug }));
  const c = buildCandidates({ ...none, existing: allHubs });
  const fam = new Set(c.map((x) => x.family));
  assert.deepEqual([...fam].sort(), ['cityIntent', 'community', 'market', 'month']);
  assert.ok(c.filter((x) => x.family === 'market').length === 30, '6 markets x 5 needs');
  assert.ok(c.every((x) => x.hubSlug && allHubs.some((h) => h.slug === x.hubSlug)), 'every spoke belongs to a hub');
  assert.equal(new Set(c.map((x) => x.plan.slug)).size, c.length, 'unique slugs');
  assert.ok(c.find((x) => x.family === 'market')!.plan.searchIntent.length > 60, 'markets carry market-specific context');
  // Only the NRI hub published -> only market spokes.
  const nriOnly = buildCandidates({ ...none, existing: [allHubs[1]] });
  assert.ok(nriOnly.filter((x) => x.family !== 'hub').every((x) => x.family === 'market'));
  // Demand outranks strategy weight within reach.
  const demand = buildCandidates({ ...none, existing: allHubs, queries: [{ query: 'jodhpur wedding catering', impressions: 40, clicks: 0, position: 30 }] });
  assert.equal(demand[0].city, 'Jodhpur');
  const capped = buildCandidates({ ...none, existing: allHubs, programmaticSlugs: Array.from({ length: PER_CITY_CAP }, (_, i) => `goa-page-${i}-goa`) });
  assert.ok(!capped.some((x) => x.family === 'cityIntent' && x.city === 'Goa'), 'per-city cap');
  const now = Date.now();
  assert.equal(withinCaps([1, 2, 3].map((d) => ({ ts: new Date(now - d * 3600_000).toISOString(), kind: 'programmatic' })), now, 3, 150).ok, false);
  assert.equal(withinCaps([{ ts: new Date(now - 9 * 86400_000).toISOString(), kind: 'programmatic' }], now, 3, 150).ok, true);
});

import { withSpokeIndex } from '../src/lib/content/hubs.ts';
import strategyData from '../src/data/keyword-strategy.json' with { type: 'json' };
const strategyHubs = strategyData.hubs;
test('hub index block is inserted once and replaced in place', () => {
  const s1 = withSpokeIndex('<p>hub body</p>', [{ title: 'A & B', url: '/a/', family: 'market' }]);
  assert.match(s1, /rasm:spokes/);
  assert.match(s1, /A &amp; B/);
  const s2 = withSpokeIndex(s1, [{ title: 'A & B', url: '/a/', family: 'market' }, { title: 'C', url: '/c/', family: 'month' }]);
  assert.equal((s2.match(/<!-- rasm:spokes -->/g) ?? []).length, 1);
  assert.match(s2, /By month/);
  assert.ok(s2.startsWith('<p>hub body</p>'), 'editor content untouched');
});

test('autofix: alt text from titles only, descriptions validated, code issues only diagnosed', async () => {
  const store = tmpStore();
  const c = { url: 'https://wp.test', username: 'u', appPassword: 'p' };
  const updated: number[] = [];
  const f = (async (url: string, init: RequestInit = {}) => {
    if (url.includes('/media?')) return new Response(JSON.stringify([{ id: 1, alt_text: '', title: { rendered: 'Jagmandir Island Palace' }, source_url: 'x/a.webp' }, { id: 2, alt_text: '', title: { rendered: 'IMG 5208' }, source_url: 'x/IMG_5208.webp' }, { id: 3, alt_text: 'has alt', title: { rendered: 'Fine' }, source_url: 'x/b.webp' }]));
    if (url.includes('/media/') && init.method === 'POST') { updated.push(Number(url.split('/').pop())); return new Response('{}'); }
    return new Response('[]');
  }) as unknown as typeof fetch;
  assert.equal(await fixMediaAlt(c, store, { fetchImpl: f }), 1);
  assert.deepEqual(updated, [1], 'meaningless names (IMG_5208) and existing alts untouched');
  assert.equal(validDescription('too short'), false);
  assert.equal(validDescription('x'.repeat(130)), true);
  assert.deepEqual(await fixDescriptions(c, [{ severity: 'MEDIUM', code: 'missing-description', url: 'https://s.test/nothing/', message: '' }], store, { fetchImpl: f, run: (async () => { throw new Error('must not call AI when no WP object'); }) as never }), []);
  const calls: string[] = [];
  const run = (async (r: { task: string }) => { calls.push(r.task); return { output: { rootCause: 'rc', proposedFix: 'pf', filesLikelyInvolved: [], risk: 'low' }, model: 'm', tokensIn: 1, tokensOut: 1, costUsd: 0.001 }; }) as never;
  const issues = [
    { severity: 'HIGH' as const, code: 'canonical-mismatch', url: 'https://s.test/a/', message: '' },
    { severity: 'HIGH' as const, code: 'missing-description', url: 'https://s.test/b/', message: '' },
  ];
  const d = await diagnoseUnfixable(issues, store, { run });
  assert.equal(d.length, 1);
  assert.deepEqual(calls, ['code-repair']);
  assert.equal((await diagnoseUnfixable(issues, store, { run })).length, 0, 'not re-diagnosed within 7 days');
});

import { fetchRetry } from '../src/lib/net.ts';
test('fetchRetry rides out transient origin errors (521) but not client errors', async () => {
  let n = 0;
  const flaky = (async () => new Response('{}', { status: ++n < 3 ? 521 : 200 })) as unknown as typeof fetch;
  assert.equal((await fetchRetry(flaky, 'https://x.test', {}, { baseDelayMs: 1 })).status, 200);
  assert.equal(n, 3);
  let m = 0;
  const notFound = (async () => { m++; return new Response('{}', { status: 404 }); }) as unknown as typeof fetch;
  assert.equal((await fetchRetry(notFound, 'https://x.test', {}, { baseDelayMs: 1 })).status, 404);
  assert.equal(m, 1, '404 is not retried');
});

import { classify, runIndexingCheck } from '../src/lib/monitoring/indexing.ts';
import { parsePsi, cwvAlerts } from '../src/lib/monitoring/cwv.ts';
import { loadOwnerFacts } from '../src/lib/content/pipeline.ts';

test('Search Console classifier maps coverage states to actions', () => {
  const r = (over: Record<string, string | undefined>) => ({ url: 'u', verdict: 'NEUTRAL', coverageState: 'X', ...over });
  assert.equal(classify(r({ verdict: 'PASS', coverageState: 'Submitted and indexed' })), null);
  assert.equal(classify(r({ verdict: 'PASS', googleCanonical: 'https://a/x', userCanonical: 'https://a/y' }))!.code, 'gsc-canonical-mismatch');
  assert.equal(classify(r({ coverageState: "Excluded by 'noindex' tag" }))!.severity, 'CRITICAL');
  assert.equal(classify(r({ coverageState: 'Blocked by robots.txt' }))!.code, 'gsc-robots-blocked');
  assert.equal(classify(r({ coverageState: 'Crawled - currently not indexed' }))!.contentFix, true);
  assert.equal(classify(r({ coverageState: 'Discovered - currently not indexed' }))!.code, 'gsc-discovered-not-indexed');
  assert.equal(classify(r({ coverageState: 'URL is unknown to Google' }))!.severity, 'LOW');
  assert.equal(classify(r({ coverageState: 'Soft 404' }))!.code, 'gsc-soft-404');
});

test('indexing job: resubmits stale sitemap, ignores new unknown pages, queues refresh only after 2 weeks', async () => {
  const store = tmpStore();
  const submitted: string[] = [];
  const states: Record<string, string> = { 'https://s/new/': 'URL is unknown to Google', 'https://s/thin/': 'Crawled - currently not indexed', 'https://s/ok/': 'Submitted and indexed' };
  const deps = {
    inspect: (async (_c: unknown, _p: string, url: string) => ({ url, verdict: states[url] === 'Submitted and indexed' ? 'PASS' : 'NEUTRAL', coverageState: states[url] })) as never,
    submit: (async (_c: unknown, _p: string, sm: string) => { submitted.push(sm); return true; }) as never,
    list: (async () => [{ path: 'https://s/sitemap.xml', lastSubmitted: '2024-01-01T00:00:00Z' }]) as never,
    sitemapUrls: ['https://s/sitemap.xml'],
  };
  const c = { email: 'e', privateKey: 'k' };
  const run1 = await runIndexingCheck(c, 'https://s/', Object.keys(states), store, deps);
  assert.deepEqual(submitted, ['https://s/sitemap.xml']);
  assert.equal(run1.indexed, 1);
  assert.ok(!run1.issues.some((i) => i.url === 'https://s/new/'), 'new page unknown for <21 days is not an error');
  assert.deepEqual(run1.refreshQueue, [], 'first sighting is not enough');
  const run2 = await runIndexingCheck(c, 'https://s/', Object.keys(states), store, deps);
  assert.deepEqual(run2.refreshQueue, ['https://s/thin/'], 'persisting two runs queues a quality refresh');
});

test('Core Web Vitals: field data wins, poor field values alert', () => {
  const field = parsePsi('https://s/', { loadingExperience: { metrics: { LARGEST_CONTENTFUL_PAINT_MS: { percentile: 4800 }, CUMULATIVE_LAYOUT_SHIFT_SCORE: { percentile: 30 }, INTERACTION_TO_NEXT_PAINT: { percentile: 250 } } }, lighthouseResult: { categories: { performance: { score: 0.7 } } } });
  assert.equal(field.source, 'field');
  assert.equal(field.cls, 0.3);
  assert.equal(cwvAlerts([field]).length, 2, 'LCP and CLS are poor, INP is fine');
  const lab = parsePsi('https://s/', { lighthouseResult: { audits: { 'largest-contentful-paint': { numericValue: 5000 }, 'cumulative-layout-shift': { numericValue: 0 } } } });
  assert.equal(lab.source, 'lab');
  assert.equal(cwvAlerts([lab]).length, 0, 'lab data never raises alerts');
});

test('owner facts are read from the private post, comments and short lines ignored', async () => {
  const f = (async () => new Response(JSON.stringify([{ content: { raw: '<p># instructions</p>\n<p>- December sangeet lawns in Udaipur need heaters from about 6 pm.</p><p>short</p>' } }]))) as unknown as typeof fetch;
  assert.deepEqual(await loadOwnerFacts({ url: 'https://wp.test', username: 'u', appPassword: 'p' }, f), ['December sangeet lawns in Udaipur need heaters from about 6 pm.']);
});

import { parseHome, safeHref, toImage, DEFAULT_SLIDES } from '../src/lib/acf.ts';
test('ACF homepage parsing: valid slides used, invalid ignored, defaults when empty, links sanitised', () => {
  assert.equal(parseHome({}).slides, DEFAULT_SLIDES, 'empty ACF -> real default banners');
  assert.equal(parseHome({ hero_slides: [] }).slides.length, DEFAULT_SLIDES.length);
  const img = (url: string) => ({ url, width: 1920, height: 900, alt: 'a' });
  const p = parseHome({
    hero_autoplay_seconds: '4',
    hero_slides: [
      { desktop_image: img('https://x.test/d.jpg'), mobile_image: img('https://x.test/m.jpg'), heading: 'Hello', button_label: 'Go', button_link: { url: 'https://rasmwed.com/services/' }, text_align: 'center', overlay: '200' },
      { desktop_image: 123, heading: 'numeric id is ignored' },
      { desktop_image: img('https://x.test/z.jpg'), heading: '' },
      { desktop_image: img('javascript:alert(1)'), heading: 'bad url' },
    ],
    home_stats: [{ value: '500+', label: 'Events' }, { value: '', label: 'x' }],
  });
  assert.equal(p.slides.length, 1);
  assert.equal(p.slides[0].mobile?.url, 'https://x.test/m.jpg');
  assert.equal(p.slides[0].buttonHref, '/services/', 'own-domain links become relative');
  assert.equal(p.slides[0].align, 'center');
  assert.equal(p.slides[0].overlay, 80, 'overlay clamped');
  assert.equal(p.autoplaySeconds, 4);
  assert.deepEqual(p.stats, [{ value: '500+', label: 'Events' }]);
  assert.equal(safeHref('javascript:alert(1)'), undefined);
  assert.equal(safeHref('//evil.test'), undefined);
  assert.equal(safeHref('/about-us/'), '/about-us/');
  assert.equal(safeHref('https://wa.me/918094875504'), 'https://wa.me/918094875504');
  assert.equal(toImage({ url: '/relative.jpg', width: 1, height: 1 }), undefined);
});
