# Rasm Weddings & Events: Complete SEO Strategy (India + overseas)

Written for the owner. Plain language. Everything marked **[AUTOMATED]** is done by the agent; **[YOU]** needs the owner or team.

---

## 0. Honest starting point (from real data, 30 Sep 2026)

| Signal | Reality |
|---|---|
| Search Console (28 days) | ~3 clicks, ~394 impressions. The site is almost invisible. |
| Indexing (URL Inspection of 54 pages) | **24 indexed, 21 unknown to Google, 5 crawled-not-indexed, 4 discovered-not-indexed.** Nearly half the site is not in Google. |
| Google Analytics (28 days) | ~60 sessions; 39 direct, 15 organic. **0 key events**: we cannot see leads yet. |
| Content | 25 older blog posts, 14 city pages (8 were cloned/empty until fixed), no pillar pages, no real-wedding proof. |

Consequences: (1) "rank for all wedding keywords" is not possible or sensible for a young site; the winning move is **topical authority in a narrow, high-value niche** and then widening. (2) The first job is not more pages, it is **getting the existing and new pages indexed and trusted**. (3) The single biggest ranking gap versus competitors (WedMeGood, WeddingWire, big planners) is **first-hand proof**: real weddings, real photos, real reviews. AI can write the guides; it cannot supply experience. That input must come from you.

---

## 1. Who we are trying to win

| Segment | Who searches | Value | Where they search |
|---|---|---|---|
| **A. NRI / overseas Indian families** (US, UK, UAE, Canada, Australia, Singapore) | "wedding in India from the USA", "NRI wedding planner India", "destination wedding India for NRIs" | Highest: big budgets, need a planner they cannot visit weekly | Google (their country), YouTube, Instagram, WhatsApp referrals |
| **B. Non-Indian couples marrying in India** | "Indian wedding in Rajasthan for foreigners", "palace wedding India", "Udaipur elopement" | High, small volume | Google, Pinterest, Instagram |
| **C. Domestic affluent families** (Delhi, Mumbai, Ahmedabad, Bangalore, Hyderabad, Kolkata...) | "destination wedding planner Udaipur", "wedding venues in Jaipur", "Rajasthan palace wedding cost" | High volume | Google (India), Instagram, WedMeGood/ShaadiSagaa |
| **D. Corporate / VIP events** | "corporate event planner Udaipur", "gala venue Rajasthan" | Secondary | Google, LinkedIn |

Important: **do not fake local presence** in the US/UK (no fake addresses/offices). We rank for overseas searchers by matching what *they* search: "destination wedding in India from {country}", not "wedding planner in London".

---

## 2. Keyword universe (organised by intent, not by list length)

1. **Money / commercial** (highest priority, few pages, strong): "wedding planner in {Udaipur, Jaipur, Jodhpur, Jaisalmer, Goa, Kumbhalgarh...}", "destination wedding planner India", "luxury wedding planner Rajasthan", "NRI wedding planner India". -> **City pages** (done; unique content) + **NRI hub**.
2. **Venue & place**: "palace wedding Udaipur", "heritage hotel wedding Rajasthan", "lake wedding venues Udaipur". -> **Venue pillar** + city guides. Venues are named only as neutral starting points; no capacities/prices/partnership claims unless you supply verified facts.
3. **Planning (informational, big volume)**: checklist, timeline, budget frameworks, seasons, guest logistics, decor, food, rituals, honeymoon. -> **Checklist/Destination pillars + spokes**.
4. **Community & culture** (very high intent, low competition): "Gujarati wedding in Udaipur", "Punjabi wedding Rajasthan", "Marwari wedding rituals", "Sikh Anand Karaj destination". Rituals differ by community, so pages are genuinely unique. -> **Rituals pillar + 12 community guides**.
5. **Overseas-market** (segment A): "{market} -> India wedding": timeline, guest travel, budget framework, choosing a destination, working with a planner. 6 markets x 5 needs. -> **NRI pillar + 30 guides**.
6. **Seasonality** (long-tail, converts): "Udaipur wedding in December", "Goa wedding in January". Weather/crowd/timing differ. -> **Month guides**.
7. **Brand**: "Rasm Weddings", reviews. -> Google Business Profile + real reviews.

We will **not** chase: generic "wedding" head terms, "wedding dresses", "wedding cards", photographer/makeup-artist queries (other businesses), or keyword variants that need a separate page for no user reason.

---

## 3. Site architecture (topical authority)

Five **pillar pages** (built first, 1,800+ words, each keeps an auto-updated "more guides" index) and their **spokes**:

| Pillar (hub) | Spokes | Count |
|---|---|---|
| Destination Weddings in India: complete guide | City x intent guides (rituals, decor, food, guest logistics, honeymoon) + city x month guides | 70 + 16 |
| NRI: Planning an Indian Wedding from Abroad | 6 countries x 5 needs | 30 |
| Indian Wedding Rituals and Ceremonies | 12 community guides (+ community x Udaipur/Jaipur/Jodhpur) | 17 |
| Palace and Heritage Weddings in Rajasthan (venues) | venue-type / setting guides (added later from Search Console demand) | grows |
| Destination Wedding Checklist and Timeline | printable-style toolkit pages | grows |

Rules (enforced in code): every spoke **must link to its pillar** and is **listed on the pillar automatically**; spokes link to their city page, two siblings and the contact page; the quality gate rejects links to pages that do not exist. Hierarchy: Home -> Pillar -> Spoke; every page reachable in <=3 clicks.

---

## 4. How the OpenAI automation works (programmatic SEO, safely)

1. **Order**: pillars first, then market -> community -> city guides -> months. Spokes are only offered after their pillar exists.
2. **Priority**: real Search Console demand x strategy weight. When data shows a query with impressions and no dedicated page, that candidate jumps the queue.
3. **Writing**: `gpt-6.1-sol` writes 1,000+ words (pillars 1,800+), grounded in an approved-facts file plus **owner facts** you can edit in WordPress (see section 7). It may not invent statistics, prices, clients, awards, partnerships or visa/immigration advice.
4. **Gates (all must pass, otherwise rewrite once, then reject, never draft)**: word count, structure, >=3 valid internal links incl. the pillar, no unsupported claims, image prompt has no text, title not duplicated, and a **body-uniqueness gate** (reject if >18% of any existing page's 5-word phrases, or >30% overall, is reused).
5. **Publishing**: one image (WebP, no text, uncropped framing) -> WordPress media -> post -> Rank Math title/description -> pillar index updated -> page revalidated.
6. **Caps** (spam safety): 3 programmatic pages/week, 3 per city, 150 total; plus the daily blog for genuine long-tail questions. Google's *scaled content abuse* policy targets low-value mass pages; small, distinct, useful pages are fine.
7. **Learning loop**: weekly report finds low-CTR, striking-distance, cannibalising and decaying pages; pages Google crawls but will not index are queued for a deeper rewrite (28+ days old, 1 per week).

---

## 5. Search Console error handling **[AUTOMATED, weekly]**

Google has no API for the "Page indexing" report, so the agent **inspects every sitemap URL** with the URL Inspection API and reads Sitemaps API health.

| Finding | Automatic action |
|---|---|
| Sitemap old/unsubmitted, sitemap errors | (Re)submits the sitemap; alerts if Google reports errors |
| New page unknown to Google | Waits 21 days (normal), then flags "strengthen internal links" |
| Crawled/Discovered - not indexed (pages we wrote) | After 2 consecutive weeks: quality rewrite through the same gates; pillar index links help discovery |
| Noindex, blocked by robots, 404/soft-404, redirect on a sitemap URL, canonical mismatch | **Alert + AI root-cause diagnosis with a proposed code fix** (never auto-applied: code changes need review) |
| Core Web Vitals | Weekly PageSpeed/CrUX check; alert when field LCP > 4 s, CLS > 0.25, INP > 500 ms |
| **Manual actions, security issues** | **Not available through any API.** Turn on Search Console email alerts and check the UI monthly. |

Never used: Google's Indexing API for normal pages (not permitted), and no "force indexing" tricks.

---

## 6. Off-site authority (what AI cannot do for you) **[YOU]**

Ranking on a young domain depends on trust signals no automation should fake:

1. **Google Business Profile** for the Udaipur office: complete profile, photos, services, weekly posts, **real client reviews** (ask every happy client; never buy or fake).
2. **Real-wedding portfolio pages** (with couples' consent): 10 to start. Photos + a 300-word story + what your team handled. This is the strongest E-E-A-T signal and the best link magnet.
3. **Listings**: WedMeGood, WeddingWire India, ShaadiSaga, WeddingSutra, Bridebook, Zola-style directories relevant to India; identical NAP (name/address/phone) everywhere.
4. **Legitimate links**: venue and hotel partners, photographers, decorators, travel bloggers, NRI community groups/associations, local newspapers (PR about real events), guest posts with real expertise. No paid links, PBNs, comment spam or automated link building.
5. **Social as discovery**: Instagram Reels and **Pinterest** (decor/mandap boards are a top wedding traffic source) linking to the guides; YouTube venue walk-throughs (real footage).
6. **Newsletter/WhatsApp** for NRI leads: capture email from guide pages.

---

## 7. What only the owner can provide (highest ROI, ~1 hour/month)

Create or edit the private WordPress post **`agent-facts`** (Posts -> Private). One fact per line. The writer may use these as real first-hand experience:

- Real numbers you are comfortable publishing (weddings per year, years of experience, guest-count range you handle).
- Price bands (only if you want cost pages; without them, guides stay "framework" only).
- Venues you actually work with and how (only what is true and allowed).
- Lessons learned ("In December, sangeet lawns in Udaipur need heaters by 6 pm...").
- Testimonials you are allowed to quote.

Without these, pages are competent but generic; with them, they become the pages competitors cannot copy.

---

## 8. Conversion tracking (GA4 shows 0 key events today) **[AUTOMATED in code]**

`generate_lead` events fire on WhatsApp clicks and inquiry-form submits (and Meta Pixel `Lead`). After deploy, mark `generate_lead` as a key event in GA4 (Admin -> Events -> mark as key event, 1 minute). Then the weekly report can show which pages bring leads.

---

## 9. Roadmap and realistic outcomes

| Phase | When | Goals | Expected |
|---|---|---|---|
| **0: Fix the base** | Weeks 0-2 | Deploy Next.js site, move WordPress to `cms.`, resubmit sitemap, fix 25 not-indexed posts (internal links, hub index), GA4 leads, GBP live | Indexed pages 24 -> 45+ |
| **1: Pillars + money pages** | Weeks 2-8 | 5 pillars, NRI hub + 6 market guides, city pages indexed, 10 real-wedding pages **[YOU]**, 20 reviews **[YOU]** | First impressions on "destination wedding planner Udaipur" / NRI queries |
| **2: Long tail engine** | Months 2-6 | Communities, months, city intents (3/week), daily long-tail blog, weekly Search Console fixes | Impressions x10-30, first steady clicks; leads from long-tail |
| **3: Authority** | Months 6-12 | Links from venues/press/directories, refresh winners, add price-band and comparison pages from your facts | Page-1 rankings for several city + NRI terms |

No one can guarantee positions. What is controllable: indexing, uniqueness, internal links, page experience, proof and consistency. Expect months, not weeks; a young domain typically needs 4 to 9 months for meaningful non-brand traffic.

---

## 10. Budget

OpenAI API: **~$4-6/month** at full cadence (30 blogs, 12 programmatic pages, weekly reports/fixes; hard cap $10). Hosting/scheduling: GitHub Actions free; Vercel Hobby free (or Pro $20 if you want its crons). Everything else is your time for proof (portfolio, reviews, links).
