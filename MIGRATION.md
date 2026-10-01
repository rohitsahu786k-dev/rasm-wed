# Rasm Weddings: Vite → Next.js migration report

## A. Stack
Next.js 16.3.7 (App Router, Turbopack), React 19.3, TypeScript (strict), Tailwind 3.4 (kept so the design is byte-for-byte the same tokens), ESLint 9, pnpm, Node ≥ 20.9, `src/` layout, `@/*` alias.

## B. Dependencies
| Package | Why |
|---|---|
| next, react, react-dom | framework |
| tailwindcss@3, postcss, autoprefixer | existing design system/config is v3; v4 would change output |
| framer-motion | the site's interactive animations (kept; the duplicate `motion` package and `gsap` were removed) |
| lucide-react | existing icons (per-icon imports) |
| clsx, tailwind-merge | existing helpers |
| sharp | image optimisation when self-hosting (Node host); also used once to generate icons |
| typescript@6, eslint@9, eslint-config-next | TS 7 / ESLint 10 are not yet supported by typescript-eslint / eslint-plugin-react |

Not installed (native instead): next-seo, next-sitemap, schema-dts, zod, react-hook-form, analytics packages.

## C/D/E. Routes, URL map, redirects
Public URLs are unchanged (WordPress format, trailing slash, `trailingSlash: true`) so **no redirect is needed for any indexed URL**.

| URL | Type | Rendering |
|---|---|---|
| `/` | home | Static, ISR 1h (blog cards) |
| `/wedding-destination/` | venue catalogue | Static (client filters, SSR'd HTML) |
| `/services/ /gallery/ /about-us/ /contact-us/ /traditional-decoration/ /corporate-events/` | dedicated templates | Static, ISR 1h |
| `/blog/` | journal index | Static, ISR 1h |
| `/wedding-planner-in-{udaipur,jaipur,jodhpur,goa,kumbhalgarh,thailand}/` | city pages (unique data in `src/data/cities.ts`) | Static, server component, FAQPage JSON-LD |
| `/wedding-planner-in-{mount-abu,nathdwara,jaisalmer,pushkar,kota,ranakpur,ahmedabad,gandhinagar}/` | render their own WordPress body | Static, ISR 1h |
| 25 blog posts `/{slug}/` | WordPress posts | Static, ISR 1h, BlogPosting JSON-LD |
| legal pages (privacy, terms, refund, shipping) | WordPress pages | Static, ISR 1h |
| `/thank-you-page/` | WP page | noindex, not in sitemap, disallowed in robots |
| unknown URL | – | real HTTP 404 |

Redirects (all single-hop, 308): `/venue-catalogue`, `/destinations`, `/venues`, `/wedding-venues` → `/wedding-destination/`; `/journal` → `/blog/`; `/about` → `/about-us/`; `/contact` → `/contact-us/`; `/category/blog/` → `/blog/`; `/blog/:slug` → `/:slug/`.
Removed: the Vite-only fake `/venue-blog/*` and `/blog/<unknown>` pages that returned 200 with invented content (now 404).

## G. Metadata
`src/lib/metadata.ts` `buildMetadata()` gives every page a unique title/description, self-canonical, OG and Twitter tags. `metadataBase` = `NEXT_PUBLIC_SITE_URL`; title template `%s | Rasm Weddings & Events`. Non-production deployments are `noindex` (metadata + robots).

## H/I. Sitemap / robots
`src/app/sitemap.ts` builds from live WordPress (pages + posts, real `lastModified`, excludes noindex pages, de-duplicated). `src/app/robots.ts` allows crawling in production, blocks `/api/` and `/thank-you-page/`, blanket-disallows only on preview/staging.

## J. Schema
Organization (LocalBusiness) + WebSite site-wide; BlogPosting on posts; FAQPage on the six city pages (FAQs are visible and city-specific). The old `WeddingVenueReservationService` type was invalid and was replaced; `priceRange` was dropped; no placeholder phone number is published. Blog-post FAQs are boilerplate shared by all posts, so they get **no** FAQ schema.

## K–M. Performance
- Every page ships full HTML (H1, copy, links) with no JS needed; previously the HTML was an empty `<div id="root">`.
- gsap removed (hero animation is CSS; H1 no longer starts invisible until hydration); `motion` package removed; Manrope via `next/font` (no render-blocking Google CSS); all images through `next/image` (WebP, remotePatterns restricted to `/wp-content/uploads/**`); LCP images use `priority`; Instagram embed loads only when scrolled near.
- Lighthouse (local production build): **desktop 98 / 93–100 / 100 / 100**, LCP 1.1 s, CLS 0, TBT 0. **Mobile (simulated 4× CPU, slow 4G)**: performance 76–89, LCP 3.7–4.8 s, CLS 0, TBT 30–90 ms; accessibility 93–100, best-practices 100, SEO 100. Reports in `reports/` (git-ignored; regenerate with `scripts/lh-summary.mjs`).

## N. Accessibility
Skip link, `<main id>`, one H1 per page, native `<details>` FAQs (was JS buttons), aria-names for selects, labelled newsletter input, darker `gold-dark` (#997316→#85610F) and grey text for AA contrast, larger carousel-dot spacing, Instagram iframe title.

## O. Security
Security headers (nosniff, Referrer-Policy, Permissions-Policy, HSTS, X-Frame-Options); image host allow-list; `<script>` stripped from WP HTML; JSON-LD escaped; **a WordPress Basic-auth credential was committed in `test-graphql.js` (git history) – rotate it.** No CSP yet (inline Next/JSON-LD scripts need a nonce setup; recommended follow-up).

## P. Tracking
The Vite app contained **no GA4/GTM/Ads/pixel code**, so nothing was lost. If tags live in WordPress, add them with `@next/third-parties` (GTM) using `strategy` after-interactive.

## R. Remaining issues / decisions for the owner
1. **Cutover**: WordPress currently *is* `rasmwed.com`. Move WP to `cms.rasmwed.com`, set `WP_ORIGIN`, then point DNS at the Next deployment.
2. Real WhatsApp/phone are placeholders (`src/lib/site.ts`); forms still only open WhatsApp and the newsletter form fakes success (unchanged behaviour, no CRM existed).
3. Blog posts render the venue-style boilerplate (spaces, FAQs) inherited from the design; recommend replacing with per-post content.
4. Six city URLs previously showed borrowed copy; they now show their own WordPress content.
5. Mobile lab LCP is 3.7–4.8 s under Lighthouse throttling; next levers are lazy-loading the mega-menu and inquiry modal and lighter framer-motion (LazyMotion).
6. Rich Results Test / Search Console checks need the live domain.

## S. Checklists
Pre-launch: `pnpm typecheck && pnpm lint && pnpm build`; `pnpm start -p 3111` + `node scripts/seo-qa.mjs http://localhost:3111` (status, single H1, self-canonical, sitemap, redirects, 404s, alt text); compare against the live WP sitemap (52 URLs); set env vars; verify `robots.txt` on the deployed URL is not `Disallow: /`.
Post-launch: Search Console sitemap resubmit + URL inspection on home/city/post; Page indexing and Core Web Vitals reports weekly for 8 weeks; Rich results (Article, FAQ); 404/5xx logs; GA4 landing-page comparison vs. pre-migration baseline; confirm verification meta/DNS record survived.

## U/V. Run & deploy
```
pnpm install
cp .env.example .env.local
pnpm dev            # local
pnpm build && pnpm start
```
Deploy on Vercel (recommended): import the repo, set `NEXT_PUBLIC_SITE_URL`, `WP_ORIGIN`; production domain = `rasmwed.com` (redirect www→apex or vice-versa in Vercel domains); previews are automatically noindex. On a Node host (e.g. Hostinger Node.js): `pnpm build && pnpm start` behind HTTPS; `sharp` is included.
