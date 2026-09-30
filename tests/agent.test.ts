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
  assert.deepEqual(pageIssues(facts(html({ canon: 'https://site.test/p/' }))), []);
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
