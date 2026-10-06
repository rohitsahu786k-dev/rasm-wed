# Managing the homepage from WordPress (ACF)

The Next.js homepage reads its banner carousel, trust bar, welcome section and contact details from the **front page** (`new-home`) custom fields. Until the field group is imported, the site shows built-in defaults made from your own photos, so it never looks empty.

## One-time setup (2 minutes)
1. WordPress admin -> **ACF -> Tools -> Import Field Groups**.
2. Choose the file `acf-export-rasm-homepage.json` (in the repository root) -> **Import**.
3. Open **Pages -> new-home (the front page)**. A box called **Rasm Homepage & Site Details** appears with 4 tabs.

## Tabs
| Tab | What you edit |
|---|---|
| **Hero Banner Carousel** | Up to 6 slides. Each slide: **Desktop image** (about 1920 x 900), **Mobile image** (about 900 x 1200, portrait; optional, desktop image is used if empty), image description, small text, heading, sub heading, button text + link, text position, dark overlay. **Seconds per slide** (0 = no auto-play). |
| **Trust Bar** | Up to 6 number + label pairs shown under the banner. |
| **Welcome Section** | Small heading, heading, text, image, button. |
| **Contact & Social** | Phone(s), WhatsApp (digits, e.g. 919928464259), email, address, Instagram/Facebook/YouTube. Used in the header, footer, contact form, WhatsApp buttons and Google structured data. |

## Tips
- The **first slide** is loaded first and carries the page's main heading (H1): make it your most important message.
- Use photos **without text inside** (put text in the fields): text baked into images cannot be read by Google or screen readers and gets cropped on phones.
- Keep the subject in the centre; the image is cropped to fit different screens.
- Changes appear on the site within about 5 minutes. For instant refresh call `POST /api/revalidate` with the `REVALIDATE_SECRET` (or ask the developer to add it as a WordPress "update" webhook).

## Technical
`src/lib/acf.ts` (parsing, validation, defaults), `src/components/HeroCarousel.tsx` (carousel), `src/components/HomeSections.tsx` (trust bar, welcome, gallery teaser). Links from ACF are sanitised (only `/path`, `http(s)://`; `javascript:` is rejected). Field group requires "Show in REST API" (already enabled in the export).
