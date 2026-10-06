# Full SEO Audit and Implementation Report — rasmwed.com

**Date:** 6 October 2026
**Scope:** complete project, live site, content, technical SEO, schema, architecture, internal linking, performance, local SEO, off-page strategy.
**Companion doc:** `docs/SEO-STRATEGY.md` (strategy, unchanged). This document is the audit of the current state plus what was implemented.

---

## A. Current website status

The site is a Next.js 16 front end (`rasmwed.com`) rendering content from a headless WordPress backend, with a genuinely sophisticated SEO automation layer already in the codebase (Search Console/GA4 integration, daily health audit, autofix, programmatic content pipeline with uniqueness gates, weekly opportunity reports, CWV monitoring).

**The engineering quality is high.** Technical SEO fundamentals are in place and better than most sites in this niche:

- Lighthouse **SEO 100**, accessibility 93–100, **CLS 0** on every page sampled.
- Self-canonicalising metadata through one `buildMetadata()` helper; consistent trailing slashes; HTTP→HTTPS 301; correct 404 status codes.
- Organisation/LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage, BlogPosting and ItemList schema already emitted.
- `AggregateRating` correctly **not** emitted unless real figures are configured — the right call, and rare.
- Non-production deployments blanket-disallowed in robots; previews cannot compete with production.
- City pages carry real, hedged, non-fabricated local facts (airports, rail, seasons, settings).

**The problems are not craft problems. They are three structural ones:**

1. **The content backend is unreachable.** The configured WordPress origin does not resolve. The site only looks healthy because stale ISR content is being served with a one-year `stale-while-revalidate`. Nothing can be published and nothing can be updated.
2. **The topical architecture promised in the strategy was never built.** Zero of the five pillar pages existed, and because of a logic gap in the content engine, no cluster page could ever be generated either. The engine has been stuck at step one.
3. **The home page and the Udaipur city page were cannibalising the single most valuable keyword**, with 0 clicks between them on 33 impressions.

Real data (Search Console, 28 days, from the project's own stored reports): **~3 clicks, ~394 impressions**. 24 of 54 pages indexed. The site is effectively invisible, which is consistent with a young domain whose architecture was never completed.

---

## B. Critical issues found

### B1. WordPress backend does not resolve — **blocks everything** ⚠️ Needs Cloudflare access

**Diagnosis complete. The WordPress install is alive and healthy on the server; only the public DNS record is missing.**

Confirmed against the Hostinger account that actually owns the site (`u846607122`, Business Web Hosting, active):

| Check | Result |
|---|---|
| WordPress installation | ✅ **Exists** — `admin.rasmwed.com`, id `30952346`, created 2023-06-08, `is_valid: true` |
| Server vhost | ✅ `admin.rasmwed.com`, addon vhost, enabled, root `/home/u846607122/domains/admin.rasmwed.com/public_html` |
| Front-end vhost | ✅ `rasmwed.com`, `website_type: nodejs`, enabled, created 2026-10-05 |
| `admin.rasmwed.com` public DNS | ❌ **NXDOMAIN** via Google DNS (`8.8.8.8`) — the record does not exist |
| Authoritative nameservers | `randall.ns.cloudflare.com`, `macy.ns.cloudflare.com` — **DNS is on Cloudflare** |
| Hostinger DNS zone for `rasmwed.com` | `[]` — not authoritative there, so it cannot be fixed via Hostinger |
| `rasmwed.com/wp-json/wp/v2/posts` | 308 → 404 (this host is the Next.js app, not WordPress) |
| Clean `next build` | fails: WordPress returns no pages and no posts |

Commit `e366bcf` moved the WordPress backend to `admin.rasmwed.com`, but **the DNS record for that hostname was never created in Cloudflare.** Both the Next.js front end and the WordPress backend sit on the same Hostinger server; the vhost is serving, nothing is broken server-side, and no data has been lost. One DNS record reconnects them.

**Why the live site still looks fine:** response headers show `x-nextjs-cache: STALE` with `Cache-Control: s-maxage=300, stale-while-revalidate=31535700`. Next is serving year-old-permitted stale content while every background revalidation silently fails.

**Consequences, in order of arrival:**
- No new content can be published; the entire AI content pipeline's WordPress writes fail.
- No editor or Rank Math change reaches the live site.
- Any URL not already in cache renders as a 404 page.
- When cache entries do roll over, the sitemap collapses from 53 URLs to 13 and the city and blog pages break.

**Fix — one DNS record in Cloudflare (5 minutes):**

1. In Cloudflare → DNS for `rasmwed.com`, read the **origin IP** off the existing `rasmwed.com` A record (that is the Hostinger server; the public IPs you see from outside are Cloudflare's proxy, not the origin).
2. Add a record:
   - **Type:** `A`
   - **Name:** `admin`
   - **IPv4:** the same origin IP as the apex record
   - **Proxy status:** **DNS only** (grey cloud) to start with.
3. Why DNS-only first: it lets Hostinger issue/renew the TLS certificate for `admin.rasmwed.com` cleanly, and guarantees Cloudflare rules, caching or bot-fighting cannot interfere with `/wp-json` REST calls or with WordPress application-password authentication. You can switch it to proxied later, but then set SSL mode to **Full (strict)** and confirm `/wp-json/*` is not challenged or cached.
4. Confirm it is live: `curl https://admin.rasmwed.com/wp-json/wp/v2/posts?per_page=1` must return JSON.
5. ✅ Local `.env.local` has been corrected to `https://admin.rasmwed.com` (it pointed at the front end). Verify the **production** environment variables (`WP_ORIGIN`, `NEXT_PUBLIC_WP_ORIGIN`, `WP_URL`) say the same. `NEXT_PUBLIC_WP_ORIGIN` is inlined at build time, so it needs a rebuild to take effect.
6. Redeploy, then re-run `npx next build` — the new guard in `generateStaticParams()` will fail loudly if the backend is still unreachable, so a green build is now real proof the connection works.

**Also worth doing while in Cloudflare:** the `www` → apex 301 is now handled in `next.config.mjs`, but doing it at the Cloudflare edge as well is cheaper and catches requests before they reach the app.

Until this is done, **no content work can ship**, and the code fixes below will only take effect on the next successful build.

### B2. `next build` fails — pre-existing, now fixed ✅

Verified pre-existing by stashing all my changes and rebuilding: the baseline fails identically.

`wp()` in `src/lib/wp.ts` threw on **any** non-OK response in strict mode, including **404**. Routing in `src/app/[slug]/page.tsx` asks for a post first and must fall through to a page, so a 404 there means "absent", not "broken". Every city page killed the build.

**Fixed:** 404 now returns `null` in strict mode; 5xx, 429 and network errors still throw.

**And guarded:** tolerating 404 alone would have been a *worse* trade — the build would then succeed quietly and prerender every WordPress-backed URL as a 404 page. `generateStaticParams()` now throws with an explicit, actionable message if both the pages and posts collections come back empty, because the site has dozens of each. Verified: a clean build with the bad origin now fails with
`WordPress returned no pages and no posts from https://rasmwed.com. Refusing to prerender…`

---

## C. High-priority SEO issues

### C1. Keyword cannibalisation on the money term — fixed ✅

The project's own stored opportunity report flagged it and it had not been acted on. I confirmed it independently from the live HTML:

| URL | Live title (before) |
|---|---|
| `/` | Wedding Planner in Udaipur \| Rasm Weddings |
| `/wedding-planner-in-udaipur/` | **Best** Wedding Planner in Udaipur \| Rasm Weddings |
| `/about-us/` | About Rasm: **Wedding Planner in Udaipur** |
| `/contact-us/` | Contact a **Wedding Planner in Udaipur** |

Four pages, one phrase. Search Console: `best wedding planner in udaipur` 21 impressions / **0 clicks**; `udaipur wedding planner` 12 impressions / **0 clicks**.

Note that the uncommitted work in progress would have made this **worse**, not better: it forced every city title to `Wedding Planner in {City}`, which for Udaipur is character-for-character the home page's title.

**Resolution (home page owns the term; nothing redirected, no content lost):**

| URL | Primary keyword (after) |
|---|---|
| `/` | wedding planner in udaipur |
| `/wedding-planner-in-udaipur/` | **destination** wedding planner in udaipur |
| `/about-us/` | rasm weddings and events (brand/company intent) |
| `/contact-us/` | contact wedding planner udaipur |

The retarget is evidence-led, not arbitrary: `destination wedding planner in udaipur` already shows **10 impressions at position 72.5 with no dedicated page**, per the stored GSC data. The city page now answers a query the site was already being shown for and had nothing to serve.

### C2. No pillar pages, and the content engine was structurally stuck — fixed ✅

`docs/SEO-STRATEGY.md` specifies five pillar pages as the foundation of the whole architecture, and `keyword-strategy.json` defines them. **None existed.**

Worse, the engine could never have produced the clusters either. In `src/lib/content/programmatic.ts`:

```js
const hubReady = (id) => have.has(h.slug) ? h.slug : null;   // have = WordPress post slugs
```

Spokes are only offered once their hub is in `have`. No hub was ever published, so `hubReady()` always returned `null` and **not a single cluster page could ever be generated.** The engine has been idling at step one since it was written.

**Implemented:** three pillar pages as real, hand-written code routes (see F), and the pipeline now treats code-owned pillars as published, which simultaneously stops it creating duplicate WordPress posts under slugs a code route would shadow **and** releases the spoke candidates.

### C3. `www` served a full duplicate of the site — fixed ✅

`https://www.rasmwed.com/` returned **200** with the complete site and a non-www canonical tag. Every page was reachable on two hostnames. The canonical tag mitigates but does not resolve host duplication.

**Fixed:** a 301 host redirect in `next.config.mjs` using a `has: [{ type: 'host' }]` rule.

### C4. Unverifiable and risky claims in city page content — flagged, Udaipur cleaned ⚠️ Needs owner input

`src/data/city-destinations.ts` contains content that contradicts the project's own stated policy ("Venues are named only as neutral starting points; no capacities/prices/partnership claims unless you supply verified facts"):

- Exact venue price ranges (e.g. `₹1.5 Cr – ₹3.5 Cr+`) presented as fact.
- Specific guest capacities per venue (e.g. `200 – 1,200 Guests`).
- Service claims — "**zero vendor markups**", "total transparency", "end-to-end palace bookings" — which read as partnership and pricing guarantees.
- Named luxury hotels in a way that implies a commercial relationship.

I removed these from the Udaipur lead copy (replacing them with substantive content, not deleting the section) and stripped unsupported "Best" superlatives from every city H1, title, keyword and image alt.

**I did not rewrite the per-venue price and capacity tables for the other cities**, because I cannot verify which figures are real, and guessing would be fabrication. This needs an owner pass: confirm each figure, or move them to clearly-labelled indicative ranges, or remove them. Stating prices and capacities you cannot stand behind is both a trust and a legal exposure, and Google's reviews/claims guidance treats unverifiable business claims poorly.

---

## D. Medium-priority improvements

### D1. Sitemap omitted code-owned routes and did not filter noindex — fixed ✅

Two real bugs in `src/app/sitemap.ts`:

- It listed only `/` plus WordPress pages and posts. Any **code-owned route** was included only by accident, if a WordPress page happened to share its slug. The nine designed template pages survived on that coincidence; the new pillars would have been **orphaned from the sitemap entirely**.
- The posts loop did **not** filter `NOINDEX_SLUGS`, so a noindexed post could still be submitted to Google. (Only `thank-you-page` is affected today, but the asymmetry with the pages loop was a latent bug.)

**Fixed:** pillars and `STATIC_PAGES` are now listed explicitly, posts are filtered, and priorities are tiered (home 1.0, pillars 0.9, pages 0.8, posts 0.6).

### D2. Footer "Popular Wedding Venues" used misleading anchors — fixed ✅

Seven links labelled as specific hotels — "Taj Lake Palace Udaipur", "The Oberoi Udaivilas", "Rambagh Palace Jaipur" — **all pointed at a city page**. The anchor promised a venue page that does not exist, implied a partnership not claimed anywhere, and wasted seven site-wide internal links on four already heavily-linked URLs.

**Fixed:** replaced with the "Wedding Planning Guides" column linking the three new pillars and four genuine existing guides. Same link count, now pointing at pages that need discovery.

### D3. Mobile LCP 3.9–5.9 s ⚠️ Partly out of requested scope

| Page (mobile) | Perf | LCP | CLS | TBT |
|---|---|---|---|---|
| Home | 64–81 | **4.0–5.9 s** | 0 | 280–360 ms |
| City (Kota) | 78 | **3.9 s** | 0 | 400 ms |

CLS is a perfect 0 and SEO is 100 — LCP is the single remaining vitals problem (target < 2.5 s).

What I checked and found **already correct**, so no change was warranted:
- Analytics (gtag + Meta Pixel) already load with `strategy="lazyOnload"`. This is near-optimal; they appear in the Lighthouse trace but do not block LCP.
- `HeroCarousel` already uses `getImageProps` from `next/image` with `priority`, `loading="eager"` and `fetchPriority="high"` on the first slide, so srcset and WebP are already applied.

**The remaining cause, and why I did not change it:** the carousel renders *both* a desktop container (`hidden md:block`) and a mobile container (`block md:hidden`), each containing every slide. Browsers still download `<img>` elements inside `display:none` containers, so a mobile visitor fetches **both** the desktop and the mobile hero for slide 0, both marked eager and high-priority, competing for bandwidth at exactly the critical moment. The network trace confirms a duplicated hero asset (`Fateh-Garh-Palace.webp` requested both optimised and raw).

The correct fix is a single `<picture>` with two `<source media="…">` so the browser downloads exactly one — but that is a structural change to the hero and squarely inside the image work you asked me to leave alone. **Recommended, not done.** Expected gain is roughly halving critical image bytes on mobile, the largest single LCP win available.

### D4. Alias redirects take two hops — low impact, documented

`/contact` → 308 `/contact/` → 308 `/contact-us/`. `trailingSlash: true` normalises the slash before the alias matches, so all seven legacy SPA aliases chain. All resolve correctly to a 200, and these are Vite-era URLs with little or no inbound equity, so I left them rather than risk `skipTrailingSlashRedirect` site-wide. Worth noting, not worth fixing.

### D5. Title lengths

The project's own audit flagged eight city titles at 71–85 characters. The retarget in C1 brings every city title to the `{keyword} | Rasm Weddings` form, within the 60-character budget `tidyTitle()` enforces.

---

## E. Low-priority opportunities

- `robots.txt` emits a `Host:` directive, which Google ignores. Harmless; could be dropped.
- `/thank-you-page/` is both `Disallow`ed in robots **and** noindexed. Disallow prevents Google from seeing the noindex, so if it was ever indexed it cannot be removed this way. Pick one — noindex alone is the correct choice for a page you want de-indexed.
- The query `tipobet refund` draws 6 impressions at position 27.8 onto `/refund-policy/` — unrelated gambling-spam drift, not an action item, but worth watching in case it indicates a legacy WordPress compromise.
- `aggregateRating` remains correctly unset. Do not set it until real Google Business Profile reviews exist.

---

## F. Completed changes

All verified: `tsc --noEmit` clean, `eslint` clean on every changed file, **31/31 tests pass**, and the three new pillar routes prerender correctly (title, canonical, and `Article` + `FAQPage` + `BreadcrumbList` + `ItemList` + `WebPage` schema all confirmed in the built HTML).

| # | Change | Files |
|---|---|---|
| 1 | 404 treated as "absent" not "fatal" in strict WordPress fetches — **unblocks the build** | `src/lib/wp.ts` |
| 2 | Build guard: refuse to prerender if WordPress returns no pages *and* no posts | `src/app/[slug]/page.tsx` |
| 3 | `www` → non-www 301 host redirect | `next.config.mjs` |
| 4 | Udaipur city page retargeted to destination/venue intent; cannibalisation resolved | `src/data/city-destinations.ts`, `src/app/[slug]/page.tsx` |
| 5 | About and Contact retargeted off the home page's primary phrase | `src/data/routes.ts` |
| 6 | Unsupported "Best" superlatives stripped from all city H1s, titles, keywords, alt text | `src/data/city-destinations.ts` |
| 7 | Unverifiable "zero vendor markups" / partnership claims removed from Udaipur lead copy | `src/data/city-destinations.ts` |
| 8 | City metadata now derives from one keyword source of truth, so title/H1/description cannot drift | `src/app/[slug]/page.tsx` |
| 9 | **Three pillar pages written** (~2,000+ words each, FAQs, TOC, full internal linking) | `src/data/pillars.ts`, `src/components/PillarPage.tsx`, `src/components/PillarRoute.tsx`, 3 route files |
| 10 | `Article` schema type added for evergreen guides (no fabricated dates) | `src/lib/schema.ts` |
| 11 | Sitemap: pillars + static pages listed explicitly, posts filtered for noindex, tiered priorities | `src/app/sitemap.ts` |
| 12 | Content engine unstuck — code pillars count as published hubs, releasing spoke generation | `src/lib/content/pipeline.ts` |
| 13 | Footer venue-anchor links replaced with pillar guide links | `src/components/Footer.tsx` |
| 14 | Pillars added to the site-wide `CORE_LINKS` explore block | `src/components/InnerPages.tsx` |
| 15 | Breadcrumb schema emitted on pillars (`webPageSchema` references `#breadcrumb`, so it must exist) | `src/components/PillarRoute.tsx` |
| 16 | Hard-coded "2025–2026" availability replaced with a rolling year (was already in progress) | `src/components/Navbar.tsx` |
| 17 | Mojibake repair + description clipping in metadata (was already in progress) | `src/lib/metadata.ts` |

### The three pillar pages

| URL | Primary keyword | Role |
|---|---|---|
| `/destination-weddings-in-india-guide/` | destination wedding in india | Top-of-funnel hub; links to all city pages |
| `/palace-and-heritage-weddings-in-rajasthan-guide/` | palace wedding in rajasthan | Closest to commercial intent; venue decisions |
| `/nri-wedding-in-india-guide/` | nri wedding in india | Highest-value segment per the strategy doc |

Each has: H1 + 5–6 H2 sections, 5–6 FAQs with `FAQPage` schema, an on-page table of contents, 8 city links, 6 guide links verified against the live sitemap, cross-links to the other pillars, and a CTA.

**Content integrity:** no prices, capacities, statistics, awards, partnerships, testimonials or client claims are asserted anywhere. Budget guidance is framework-level only, exactly as `docs/SEO-STRATEGY.md` §7 requires until the owner supplies verified facts. Visa guidance points to official sources rather than advising.

---

## G. Pending changes

| Priority | Item | Problem | Fix | Why it matters |
|---|---|---|---|---|
| **Critical** | `admin.rasmwed.com` DNS | NXDOMAIN; backend unreachable; site frozen on stale cache. WordPress itself is healthy on the server — only the Cloudflare record is missing | Add an `A` record `admin` → the apex's origin IP, DNS-only (full steps in B1) | Nothing can publish or update. Caches will roll and pages will break. Blocks every other item. |
| **Critical** | Deploy this branch | Fixes exist only in the working tree | Build and deploy once B1 is resolved | None of the above is live yet |
| **High** | Venue prices and capacities | Unverifiable figures stated as fact across city pages | Owner verifies, relabels as indicative, or removes | Trust, and legal exposure on quoted prices |
| **High** | Pillars 4 and 5 | Rituals and Checklist hubs not yet built | Write as code pillars following the same pattern | Completes the five-cluster architecture |
| **High** | Real-wedding portfolio | No first-hand proof anywhere on the site | 10 pages, with consent: photos + 300-word story + what your team handled | The single strongest E-E-A-T signal and best link magnet; AI cannot supply it |
| **High** | Google Business Profile + reviews | No real ratings exist, so rating schema stays off | Complete the profile; ask every happy client | Local pack visibility; unlocks legitimate `AggregateRating` |
| **Medium** | Mobile LCP | Hero downloaded twice on mobile (D3) | Single `<picture>` with `media` sources | Largest available LCP win; currently 3.9–5.9 s vs 2.5 s target |
| **Medium** | Spoke→pillar auto-index | `updateHubIndex()` writes into a WordPress post; code pillars have none | Add engine-published spokes to `guides` in `pillars.ts`, or read the store at render | Keeps clusters linked both ways as content grows |
| **Medium** | `agent-facts` post | Content stays generic without owner facts | Fill in the private WordPress `agent-facts` post | Turns competent guides into pages competitors cannot copy |
| **Low** | GA4 key event | `generate_lead` fires but is not marked a key event | Mark it in GA4 admin (1 minute) | Without it, no page-level lead attribution |
| **Low** | `/thank-you-page/` | Disallow blocks Google seeing the noindex | Drop the Disallow, keep the noindex | Correct de-indexing |

---

## H. New pages required

Priority order. Pillars 1–3 are **done**; the rest are specified for the next passes.

| # | Page | URL | Primary keyword | Intent | Parent | Priority |
|---|---|---|---|---|---|---|
| ✅1 | Destination Weddings in India guide | `/destination-weddings-in-india-guide/` | destination wedding in india | Informational | Home | Done |
| ✅2 | Palace & Heritage Weddings in Rajasthan | `/palace-and-heritage-weddings-in-rajasthan-guide/` | palace wedding in rajasthan | Commercial-informational | Home | Done |
| ✅3 | NRI Wedding in India guide | `/nri-wedding-in-india-guide/` | nri wedding in india | Informational | Home | Done |
| 4 | Indian Wedding Rituals & Ceremonies | `/indian-wedding-rituals-and-ceremonies-guide/` | indian wedding rituals | Informational | Home | High |
| 5 | Destination Wedding Checklist & Timeline | `/indian-destination-wedding-checklist-and-timeline/` | destination wedding checklist india | Informational, linkable asset | Home | High |
| 6 | Real Weddings / Portfolio index | `/real-weddings/` | rasm weddings portfolio | Trust / E-E-A-T | Home | **High** |
| 7 | Individual real wedding stories (×10) | `/real-weddings/{couple-venue}/` | {venue} wedding | Trust + long-tail venue terms | #6 | **High** |
| 8 | Wedding cost guide (Udaipur) | `/udaipur-wedding-cost-guide/` | udaipur wedding cost | Commercial research | #2 | Medium — **needs owner price bands** |
| 9 | NRI market guides (×6: US, UK, UAE, CA, AU, SG) | `/india-destination-wedding-from-{market}/` | destination wedding in india from {market} | Informational | #3 | Medium |
| 10 | Community ritual guides (×12) | `/{community}-wedding-guide/` | {community} wedding rituals | Informational | #4 | Medium |
| 11 | City × month guides | `/{city}-wedding-in-{month}/` | {city} wedding in {month} | Long-tail, converts | #1 | Low — engine handles |
| 12 | Team / author pages | `/about-us/team/` | — | E-E-A-T | `/about-us/` | Medium |

Pages 9–11 are what the **now-unblocked content engine** generates automatically, capped at 3/week, 3 per city, 150 total.

**Legal/trust pages: already complete** — privacy policy, terms, refund policy, shipping policy all exist and are indexed. Nothing missing here.

---

## I. Existing pages needing major rewriting

| Page | Problem | Action |
|---|---|---|
| City pages (all 14) | Per-venue prices and capacities stated as verified fact; implied hotel partnerships | Owner verification pass (C4) |
| `/wedding-planner-in-udaipur/` | Was cannibalising home | ✅ Retargeted; body copy could go further into venue/season depth |
| `/wedding-destination/` | Content decay: impressions 22 → 4 | Refresh with genuinely new information once the backend is live; do not bump `dateModified` without real changes |
| `/wedding-planner-in-mount-abu/`, `/wedding-planner-in-thailand/` | Duplicate meta description ("Crafting over 500 successful events…") on 2 pages | Unique descriptions; the retarget in C1 fixes this as a side effect |
| 25 legacy blog posts | Thin, dated titles, no pillar links | Add pillar links; refresh the strongest 5, leave the rest |

---

## J. Keyword → page mapping

Canonical map now lives in `src/data/page-keywords.ts` and is machine-checked by `scripts/check-keywords.ts`. One primary keyword per page, no overlaps.

| Page | Primary | Key secondary |
|---|---|---|
| `/` | wedding planner in udaipur | destination wedding planner, palace wedding, wedding in rajasthan |
| `/wedding-planner-in-udaipur/` | **destination wedding planner in udaipur** | udaipur wedding venues, palace wedding in udaipur, lake pichola wedding venues |
| `/wedding-planner-in-{city}/` | wedding planner in {city} | destination wedding in {city}, {city} wedding venues |
| `/wedding-destination/` | wedding destinations | destination wedding, udaipur, jaipur, goa |
| `/services/` | wedding planning services | decor, catering, entertainment, hospitality |
| `/traditional-decoration/` | wedding decoration in udaipur | mandap, stage, floral, lighting |
| `/corporate-events/` | corporate event management in udaipur | conference, gala dinner, product launch |
| `/gallery/` | wedding gallery | mandap, decor, udaipur |
| `/about-us/` | **rasm weddings and events** | wedding planning company udaipur |
| `/contact-us/` | **contact wedding planner udaipur** | free consultation, whatsapp, udaipur office |
| `/blog/` | wedding planning blog | udaipur, destination wedding, budget |
| `/destination-weddings-in-india-guide/` | **destination wedding in india** | how to plan, season, budget |
| `/palace-and-heritage-weddings-in-rajasthan-guide/` | **palace wedding in rajasthan** | heritage venues, fort wedding, royal wedding |
| `/nri-wedding-in-india-guide/` | **nri wedding in india** | planning from abroad, from usa, from uk |

Bold = changed or new in this pass.

---

## K. Content gap analysis

Measured against what the strategy doc identified and what the site actually had:

| Cluster | Competitors cover | Site had | Site now has | Gap |
|---|---|---|---|---|
| Destination-wedding planning (head) | Deeply | Nothing | ✅ Pillar | Spokes pending |
| Palace/heritage venues | Deeply, with real venue detail | Scattered across city pages | ✅ Pillar | Real venue pages pending |
| NRI / overseas planning | **Thinly — genuine opportunity** | Nothing | ✅ Pillar | 6 market guides pending |
| Rituals by community | Thinly, generically | 3 legacy posts | — | Pillar + 12 guides pending |
| Checklists / timelines | Yes, as linkable assets | 1 legacy post | — | Pillar pending |
| Cost / pricing | Heavily (drives huge traffic) | 1 legacy post | — | **Blocked on owner price bands** |
| Seasonality (city × month) | Thinly | Nothing | — | Engine will generate |
| **Real weddings / proof** | **Heavily — their main advantage** | **Nothing** | — | **Biggest gap; owner-supplied only** |

The NRI cluster and the community-ritual cluster are the two places where the competition is genuinely weak and the business has a real right to rank. The real-weddings gap is the one that no amount of writing can close.

---

## L. Technical SEO fixes

| Item | Before | After |
|---|---|---|
| Build | **Failed** (strict 404) | ✅ Passes, with a loud guard for a dead backend |
| `www` host | 200 duplicate | ✅ 301 → apex |
| Sitemap: code routes | Omitted unless a WP slug matched | ✅ Explicit |
| Sitemap: noindex posts | Not filtered | ✅ Filtered |
| Sitemap priorities | Home only | ✅ Tiered 1.0 / 0.9 / 0.8 / 0.6 |
| Breadcrumb schema on pillars | Would have dangled | ✅ Emitted |
| Title lengths (city) | 71–85 chars | ✅ Within 60 |
| HTTP → HTTPS | ✅ 301 | unchanged |
| Trailing slash | ✅ Consistent 308 | unchanged |
| 404 status | ✅ Correct | unchanged |
| Canonicals | ✅ Self-referencing | unchanged |
| robots.txt | ✅ Correct, prod-gated | unchanged |
| Redirect chains (aliases) | 2 hops | Documented, not changed (D4) |

---

## M. Internal linking improvements

- Three pillars added to the site-wide footer column (every page) and to `CORE_LINKS` (every designed page's explore block) — so neither is orphaned from day one.
- Seven misleading hotel-anchor footer links repointed to pages that actually exist.
- Each pillar links out to 8 city pages, 6 existing guides, both sibling pillars and the contact page; each links back from footer and explore blocks. Hierarchy is Home → Pillar → City/Guide, everything within 3 clicks.
- Anchor text is descriptive and varied, not exact-match repetition.
- **Pending:** the 25 legacy blog posts still do not link to any pillar. Adding those links is the cheapest remaining indexing win and the stored GSC data shows 21 of them are unknown to Google.

---

## N. Core Web Vitals

CLS is already 0 and SEO is 100 across the board; LCP is the only real problem. See **D3** for the measured numbers, the root cause (hero image downloaded twice on mobile), what I verified as already-correct (lazy-loaded analytics, `getImageProps` with `priority`/`fetchPriority`), and why the remaining fix sits inside the image work you excluded.

No performance regressions were introduced: the pillar pages deliberately carry **no banner image**, so their LCP element is text, not a hero.

---

## O. Schema implemented

Already present and correct: `LocalBusiness`+`ProfessionalService`, `WebSite`, `WebPage` (+`AboutPage`/`ContactPage`/`CollectionPage`/`ImageGallery`), `BreadcrumbList`, `Service`, `FAQPage`, `BlogPosting`, `ItemList`, `Place`, `ContactPoint`, `PostalAddress`, `GeoCoordinates`.

Added this pass: **`Article`** (for evergreen pillar guides — deliberately distinct from `BlogPosting`, and asserting no fabricated dates), plus `BreadcrumbList`, `FAQPage`, `ItemList` and `WebPage` on all three pillars. Verified in the built HTML.

**Deliberately NOT implemented:** `Review` and `AggregateRating`. No genuine, verifiable ratings exist. The existing env-gated guard is the right design and I left it untouched. `Product`/`Offer` does not apply to a service business. `Event` does not apply — these are private weddings, not public events. `VideoObject` becomes worthwhile once real venue walkthrough footage exists.

---

## P. Local SEO

Strong already: accurate `LocalBusiness` with real NAP, geo coordinates, `areaServed`, `hasMap`, two phone numbers, consistent address.

- 14 genuinely differentiated city pages with real hedged local facts — **not** doorway pages. This is done correctly and should not be scaled further without equivalent depth.
- **Pending (owner):** Google Business Profile completion, real reviews, and NAP-consistent directory citations (WedMeGood, WeddingWire India, ShaadiSaga, WeddingSutra).
- The home page now unambiguously owns "wedding planner in Udaipur", which is the right page for the local pack given it holds the most authority.

---

## Q. Off-page / backlink strategy ⚠️ Requires access for gap analysis

No backlink tool is connected, so I cannot enumerate competitor referring domains or run a true link-gap analysis. That is **"Requires access"** — it needs Ahrefs/Semrush or similar. What follows is strategy, not measurement.

| Type | Target | Priority | Difficulty | Expected value |
|---|---|---|---|---|
| Directory citations | WedMeGood, WeddingWire India, ShaadiSaga, WeddingSutra | High | Low | Local relevance + referral leads |
| Google Business Profile | Udaipur office, real reviews | **High** | Low | Local pack; unlocks rating schema |
| Linkable asset | The checklist/timeline pillar (#5) as a printable toolkit | High | Medium | Editorial links |
| Real-wedding features | Submit genuine weddings to wedding publications | High | Medium | Strong editorial links + proof |
| Partner links | Venues, hotels, photographers, decorators you actually work with | Medium | Low | Highly relevant, easy to earn |
| Local press | PR on real events, Udaipur/Rajasthan outlets | Medium | Medium | Authority + brand |
| NRI community | Associations and community groups in target markets | Medium | Medium | Directly reaches segment A |
| Expert contributions | Quotes/guest posts where you have genuine expertise | Low | High | Quality over volume |
| Pinterest / Instagram / YouTube | Decor and mandap boards; venue walkthroughs | Medium | Low | Major discovery channel for weddings |

Explicitly excluded: PBNs, paid links, link farms, automated outreach, comment spam.

---

## R. Competitor gaps

Genuine competitor ranking data requires Search Console competitive data or a third-party tool — **"Requires access"**. From the SERP landscape described in the strategy doc and the site's own position data, the structural reasons competitors (WedMeGood, WeddingWire, large planners) outrank this site are:

1. **First-hand proof at scale.** Hundreds of real weddings with photos, venues and couple names. This site has none. Biggest single gap.
2. **Domain authority and referring domains** accumulated over years.
3. **Topical completeness** — they answer the whole journey; this site had commercial pages and scattered blogs with no connective architecture. *This pass closes the architectural half of that gap.*
4. **Review volume** — real ratings feeding both rankings and click-through.
5. **Venue-level pages** that capture "{specific venue} wedding" long-tail, which this site currently only gestures at with misleading footer anchors.

Where this site can genuinely win: **NRI/overseas intent** (competitors cover it thinly), **community-specific rituals** (genuinely unique per community, low competition), and **Udaipur depth** (being headquartered there is a real, defensible advantage).

---

## S. Pages with highest ranking potential

1. `/` — "wedding planner in udaipur": most authority, now uncontested internally.
2. `/nri-wedding-in-india-guide/` — weak competition, highest-value segment.
3. `/palace-and-heritage-weddings-in-rajasthan-guide/` — high commercial intent, strong local right to rank.
4. `/wedding-planner-in-udaipur/` — now serving a measured query with no competitor page on this site.
5. `/wedding-planner-in-jodhpur/` — already has a bespoke template and richer content than the other cities.

## T. Pages close to page 1 ⚠️ Requires live Search Console access

From the project's stored (30 Sep) data, nothing is genuinely close — the best non-brand positions are 27–50. Honest assessment: **no page is within striking distance today.** The near-term goal is indexing and first impressions, not position 4–10 pushes.

| Query | Impressions | Position |
|---|---|---|
| `rasm` (brand) | 41 | 33.2 |
| `best wedding planner in udaipur` | 21 | 48.6 |
| `udaipur wedding planner` | 12 | — |
| `destination wedding planner in udaipur` | 10 | 72.5 |
| `destination wedding planner in kumbhalgarh` | 5 | 36.8 |
| `event planner in jaisalmer` | 6 | 50.0 |

A live GSC pull is needed for current figures; these are a week old and predate every change in this report.

## U. Cannibalisation problems

| Query | Competing pages | Status |
|---|---|---|
| best wedding planner in udaipur | `/`, `/wedding-planner-in-udaipur/` | ✅ Resolved (C1) |
| udaipur wedding planner | `/`, `/wedding-planner-in-udaipur/` | ✅ Resolved (C1) |
| wedding planner in udaipur (title overlap) | `/`, `/about-us/`, `/contact-us/` | ✅ Resolved (C1) |

No remaining known conflicts. `scripts/check-keywords.ts` should be run after the next deploy to confirm.

---

## V. Quick wins

1. **Fix `admin.rasmwed.com` DNS** — unblocks literally everything. Minutes of work, gated on Cloudflare access.
2. **Deploy this branch** — 17 fixes including the build fix and the cannibalisation resolution.
3. **Mark `generate_lead` a key event in GA4** — one minute; without it there is zero lead attribution.
4. **Add pillar links to the 25 legacy blog posts** — cheapest fix for the 21 posts Google does not know about.
5. **Complete the Google Business Profile and ask 10 clients for reviews** — fastest local-visibility move available.
6. **Fill in the `agent-facts` post** — ~1 hour, and it is what separates competent guides from uncopyable ones.

---

## W. 30-day plan

| Week | Owner | Agent / code |
|---|---|---|
| 1 | **Fix DNS**; mark GA4 key event; start GBP | Deploy this branch; verify sitemap, canonicals, schema, redirects live |
| 2 | Verify or remove venue prices/capacities (C4); begin collecting real-wedding consent | Write pillars 4 and 5 (Rituals, Checklist); add pillar links to legacy posts |
| 3 | 10 review requests; fill `agent-facts` | Confirm the content engine now generates spokes; first NRI market guides |
| 4 | First 3 real-wedding stories drafted | Build `/real-weddings/` index + templates; re-run health audit and keyword check |

**Target:** indexed pages 24 → 45+; first impressions on NRI and palace-venue queries.

## X. 90-day plan

- Complete all five pillars and the first 20 cluster pages (engine, 3/week, gated).
- 10 real-wedding pages live; 20+ genuine reviews; directory citations complete.
- Mobile LCP fix (D3) → LCP under 2.5 s.
- Cost/pricing guide, once owner price bands exist.
- 6 NRI market guides and the first 6 community ritual guides.
- Weekly Search Console loop driving the queue; refresh decaying pages on real changes only.

**Target:** impressions up 10–30×; first steady non-brand clicks; leads attributable per page.

## Y. Long-term topical authority plan

Finish the five clusters, then widen only where real demand shows in Search Console. Keep the caps (3 programmatic pages/week, 3 per city, 150 total) — they are what keeps this white-hat under Google's scaled-content-abuse policy. Compound the two assets automation cannot create: **real weddings and real reviews.** Convert owner facts into pages competitors cannot copy. Refresh winners on genuine new information.

**No one can guarantee a #1 position.** What is controllable is indexing, uniqueness, architecture, internal links, page experience, proof and consistency. A young domain typically needs 4–9 months for meaningful non-brand traffic, and the honest blocker today is not strategy — it is that the content backend is offline.

---

## Verification performed

- `npx tsc --noEmit` — clean.
- `npx eslint` on all 12 changed files — clean (repo-wide pre-existing warnings in `scripts/` and `dist/` untouched).
- `node --test tests/*.test.ts` — **31/31 pass**, including the programmatic-strategy and hub-index tests.
- `npx next build --webpack` — completes; three pillar routes prerender.
- Built HTML inspected for the pillars: correct `<title>` (within 60 chars), self-referencing canonical, meta description, 1 × `<h1>`, 11 × `<h2>`, and `Article` + `FAQPage` + `BreadcrumbList` + `ItemList` + `WebPage` + `WebSite` + `LocalBusiness` schema.
- Build guard confirmed to fire on a clean build against an unreachable backend.
- Live site verified by HTTP: robots.txt, sitemap (53 URLs), titles/descriptions/canonicals on 6 key pages, 404 status, trailing-slash behaviour, alias redirect chains, `www` duplication, HTTP→HTTPS.
- DNS verified against `8.8.8.8`; Hostinger DNS, websites and WordPress-installation APIs all queried.

**Not verified:** rendering on real devices (no browser in this environment) and current live Search Console/Analytics figures. The pillar pages reuse the existing, already-responsive layout primitives (`rasm-container`, the same breakpoint patterns as every other page) and add no new layout mechanism, but a visual check on a phone after deploy is still worth five minutes.
