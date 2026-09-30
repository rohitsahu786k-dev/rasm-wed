# Autonomous Website Intelligence Agent

Status legend: ✅ built and unit-tested · 🔌 built as a module, needs credentials/hosting decision · ⏳ designed, not yet built

## 1. Existing architecture (audited)
Next.js 16 App Router site, content from headless WordPress (`WP_ORIGIN`), 59 statically generated/ISR pages, trailing-slash canonical URLs, native metadata/sitemap/robots/JSON-LD, no database, no analytics tags, no Git remote configured yet, hosting not yet chosen (Vercel recommended; Node host also works). Existing QA: `scripts/seo-qa.mjs`, Lighthouse via `scripts/lh-summary.mjs`.

## 2. Architecture
```
Scheduler (Vercel Cron / system cron / GitHub Actions)
   │  Bearer CRON_SECRET
   ▼
/api/cron/*  ──►  agents (src/lib/*)  ──►  Store (audit log, usage ledger, reports)
                     │                          ▲
        ┌────────────┼──────────────┐           │
   monitoring/   seo/          ai/ (router → budget → Responses API → ledger)
   health-audit  guidelines    images/ (⏳)   content/ (⏳)   google/ (🔌)
        │
   alerts (webhook/email)         /admin/ai-seo (Basic-auth, noindex)
```
Modules: `lib/ai` ✅ config/router/budget/client · `lib/automation` ✅ store+audit log · `lib/monitoring` ✅ health audit, robots/indexability guard, alerts · `lib/seo` ✅ Google guideline monitor · `lib/security` ✅ cron+admin auth, secret redaction · `lib/google` 🔌 · `lib/content` ⏳ · `lib/images` ⏳ · `lib/crawler` (folded into monitoring) · `lib/analytics` 🔌 · `lib/schema` ✅ (site schema builders already exist).

## 3. Built now (verified by `pnpm test`, `pnpm typecheck`, `pnpm build`)
- **Central AI config**: no model ID outside `src/lib/ai/config.ts`; all overridable by env. IDs were checked against this account's live `GET /v1/models` on 2026-09-30: `gpt-6-astra`, `gpt-6.1-sol`, `gpt-5.6-sol`, `gpt-6-luna`, `gpt-image-2`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare` exist. Defaults: strong `gpt-6-astra`, balanced `gpt-5.6-sol`, cheap `gpt-6-luna`, fallback `gpt-5.6-sol`, image `gpt-image-2.5-sunburst`. Prices are config (`AI_PRICING_JSON`), unknown models are priced at the highest rate so budgets fail safe.
- **Router**: strategy, ranking-loss analysis, code repair, article writing/fact-check, Google-doc interpretation, high-risk review → strong. Only classification/dedup/summaries → cheap.
- **Budget guard**: daily + monthly USD caps, request cap, image cap; above 80% only P0–P3 (availability, indexability, errors, critical regressions) may spend; at 100% nothing.
- **Responses API client** (server only, plain `fetch`): fallback model on failure, usage ledger, prompts and errors are secret-redacted, `store:false`.
- **Health audit** (daily): sitemap-driven crawl; status, redirects, title/description, canonical (missing/duplicate/mismatch), H1, noindex via meta *and* `X-Robots-Tag`, JSON-LD parse validity, image alt, duplicate titles/descriptions, orphan pages, broken internal links, `robots.txt` blanket-Disallow guard (CRITICAL on production), sitemap health; severity + score; alerts de-duplicated for 6 h.
- **Guideline monitor** (weekly): hashes and diffs 11 Google Search Central pages, asks the strong model to interpret only the diff, stores in `google_updates`.
- **Admin** `/admin/ai-seo`: HTTP Basic (`ADMIN_PASSWORD`), closed (503) when unset, `noindex` header + robots disallow, `no-store`.
- **Audit log**: every autonomous action goes through `logAction`.

## 4. Not built yet (and why)
| Item | Blocker |
|---|---|
| Search Console / GA4 / PageSpeed collectors, opportunity + CTR + cannibalisation + decay engines | need Google service-account credentials and property access; design below |
| Self-healing code changes, PR creation, auto-merge, visual regression, rollback | need a Git remote (GitHub) and a deployment host with an API (Vercel) |
| Blog/content engine, image pipeline, knowledge base | need your verified company facts (approved statistics, real authors, case studies) so nothing is fabricated; image pipeline needs a decision on where generated files are stored |
| Postgres store | needs hosting decision (Vercel Postgres/Neon vs. disk on a Node host); `Store` interface is ready |
| Email alerts | provider choice (Resend/Postmark); webhook alerts work now |

### Design of what remains
- **Google (`lib/google`)**: service account JWT → `searchanalytics.query` (dimensions query/page/device/country/date; windows 7/28/90 days + YoY), URL Inspection (quota-aware), GA4 Data API `runReport` (landing page × organic sessions, key events; no user-level data sent to the model). Opportunity engine = SQL over `page_metrics` (impr↑ & CTR↓, pos 4–15, pos 11–30, decay vs. prior window, multi-page same query), scored by impact × confidence ÷ (difficulty × risk).
- **Risk engine**: L0 report · L1 deterministic autofix (missing metadata/alt/dimensions, invalid sitemap entry) · L2 extended QA (internal-link insertion, schema edits, refreshed copy) · L3 PR only (redirect migrations, deps majors, analytics/DNS/auth/payments/DB, mass URL change). Autofix flow: branch → change → `typecheck` → `lint` → `build` → crawl affected URLs with the audit above → SEO diff vs. baseline → preview deploy → merge only if configured and L1/L2.
- **Rollback**: record previous/new SHA + deployment ID; post-deploy the same audit runs on affected URLs; any 5xx, noindex, canonical, robots or metadata regression triggers Vercel "promote previous deployment".
- **Content engine**: daily *candidate* selection, not daily publishing. Gates: duplication check against content memory, knowledge-base grounding for company claims, source URLs stored, quality scorecard (originality, usefulness, intent match, factual confidence, spam risk) — anything below threshold is rewritten or rejected; skips days with no worthwhile topic; never publishes while a P0–P3 issue is open.
- **Images**: `gpt-image-2.5-sunburst` via `/v1/images/generations` or `/edits` (product reference images for real products); sharp → resize/WebP/AVIF, width/height, descriptive filename and alt; never presented as real projects/clients/staff; counted against `AI_MAX_IMAGES_PER_DAY`.
- **Experiments**: one variable at a time per page (title, description, links), hypothesis + baseline + ≥28-day readout, no re-testing of failed patterns.

## 5. Environment variables
Required now: `OPENAI_API_KEY`, `CRON_SECRET`, `ADMIN_PASSWORD`. Optional: `AI_PRIMARY_MODEL`, `AI_BALANCED_MODEL`, `AI_CHEAP_MODEL`, `AI_FALLBACK_MODEL`, `AI_IMAGE_MODEL`, `AI_PRICING_JSON`, `AI_DAILY_BUDGET_USD` (default 5), `AI_MONTHLY_BUDGET_USD` (100), `AI_MAX_IMAGES_PER_DAY` (3), `AI_MAX_REQUESTS_PER_DAY` (300), `ALERT_WEBHOOK_URL`, `AUDIT_BASE_URL`, `AI_DATA_DIR`.
Needed for later phases: `GOOGLE_SEARCH_CONSOLE_PROPERTY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `GA4_PROPERTY_ID`, `PAGESPEED_API_KEY`, `GITHUB_TOKEN` (fine-grained, repo contents+PR only), `GITHUB_REPO`, `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `DATABASE_URL`.

## 6. Dependencies
None added for this phase (plain `fetch`, `node:crypto`, `node:test`). Planned: `google-auth-library` (service-account JWT), a Postgres driver once hosting is chosen, `zod` only if AI JSON outputs need schema validation.

## 7. Schedule
Daily 03:00 UTC `/api/cron/health` · Monday 04:00 UTC `/api/cron/guidelines` (both in `vercel.json`). Planned: hourly uptime/indexability probe, daily GSC/GA4 pull, weekly report, monthly strategic audit.

## 8. Security
Key only in server env, never in client bundle or logs; prompts/errors redacted; cron endpoints closed unless `CRON_SECRET` matches (constant-time); admin behind Basic auth + noindex; audit log for every action. **The OpenAI key pasted into the chat is exposed: revoke it and issue a new one.** `.env.local` is git-ignored.

## 9. Honest limits
No system can guarantee rankings; this agent optimises measurable inputs. AI-written content is only published through the quality/fact gates above, using first-party facts you approve.

## Update: content engine, Google data, WordPress-backed state (built and verified)
- **Google**: service account works for Search Console (`https://rasmwed.com/`, owner) and GA4 property 440355560 (`src/lib/google/*`).
- **Daily publishing, no drafts**: `/api/cron/content` (04:30 UTC) picks a topic from existing posts + Search Console demand, writes a 1000+ word article (strong model), runs the quality gate (>=1000 words, >=4 H2, 3+ valid internal links, no invented stats/guarantees, no duplicate titles, 1 featured + 2-3 inline images, alt text, no text-in-image prompts), generates images (`gpt-image-2.5-sunburst`, no text, centred with safe margins) -> WebP -> WordPress media library, then PUBLISHES via the WordPress REST API with Rank Math title/description. Failing articles are rewritten once, then rejected, never saved as drafts. Skips the day when there is no worthwhile topic, when a post already went out in the last 20 h, or while a CRITICAL site issue is open.
- **Database = WordPress MySQL**: posts/media live in WordPress; agent state (audit log, usage, reports) goes to a custom table in the same MySQL through `wordpress-plugin/rasm-agent-store.zip` (install once in WP admin > Plugins > Upload) with `AI_STORE=wordpress`. Until installed the agent uses a local file store.
- Manual runs: `scripts/content-run.ts [--dry] [--force]`, `scripts/publish-dryrun.ts <slug>`.

## Update: $10/month budget mode
Measured cost per article (real API usage): topic ~$0.008 + article ~$0.04 per attempt (up to 2 attempts) + one WebP image ~$0.011 = **~$0.06-0.10**, i.e. **~$2-3/month** for one article a day. Models: `gpt-6.1-sol` for topic/article ($2/$10 per 1M tokens), `gpt-6-luna` ($0.1/$0.5) for cheap tasks and fallback, `gpt-image-2.5-sunburst` medium (~343 output tokens at $30/1M). Hard caps: $10/month, $0.60/day, 1 image/day; near 80% only critical work may spend. One image per article (featured, centred with safe margins, no text).

## Update: technical/city-page fixes
- The 8 city pages (Mount Abu, Nathdwara, Jaisalmer, Pushkar, Kota, Ranakpur, Ahmedabad, Gandhinagar) were cloned Jaipur-template Elementor pages (Kota described Jaipur, venue images reused across cities, Ahmedabad/Gandhinagar empty). Each now has unique 2,200-2,400 word content (quality-gated, one image), rendered by `CityLanding`. Originals (incl. Elementor JSON) are backed up in `.data/backups/pages/` and WordPress keeps revisions; Elementor edit mode is switched off per page so WordPress serves the new HTML.
- `about-us`, `traditional-decoration`, `corporate-events` now render owner-written WordPress copy (corporate-events was empty and was filled) under the designed sections.
- Health audit gained a thin-content rule; score 96/100 with 0 CRITICAL/HIGH/MEDIUM.
- Trackers load with `lazyOnload`. Lighthouse "best practices" stays at 77 on pages because the Meta Pixel sets a third-party cookie (inherent to the pixel).
