/**
 * Quality gate for AI-written articles. Pure functions: nothing is published unless every critical check passes.
 * There are NO drafts: an article either passes and is published, or is rejected/rewritten.
 */

export const MIN_WORDS = 1000;

export interface ArticleDraft {
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  focusKeyword: string;
  /** Body HTML (no images: the single featured image is shown by the post template). */
  html: string;
  images: { role: 'featured' | 'inline'; alt: string; prompt: string }[];
}

export interface GateResult {
  pass: boolean;
  words: number;
  failures: string[];
  warnings: string[];
}

export const stripTags = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&amp;|&#\d+;|&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const countWords = (html: string) => (stripTags(html).match(/[\p{L}\p{N}'’-]+/gu) ?? []).length;

const UNSUPPORTED = [
  /\baccording to (a|the) (recent )?(study|survey|report|research)\b/i,
  /\b\d{1,3}(\.\d+)?\s?% of (couples|brides|grooms|weddings|guests|people)\b/i,
  /\bstudies (show|have shown|prove)\b/i,
  /\bguarantee[sd]?\b/i,
  /\b(#1|number one|no\.\s?1|best in india)\b/i,
  /\bas an ai\b|\blanguage model\b/i,
  /lorem ipsum/i,
];

export function tokenSet(text: string) {
  return new Set(text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w.length > 2));
}
export function similarity(a: string, b: string) {
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

export function evaluateArticle(
  a: ArticleDraft,
  ctx: { allowedInternalPaths: Set<string>; existingTitles: string[]; siteOrigin: string },
): GateResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const words = countWords(a.html);
  const text = stripTags(a.html);

  if (words < MIN_WORDS) failures.push(`only ${words} words (minimum ${MIN_WORDS})`);
  if (/<h1[\s>]/i.test(a.html)) failures.push('body contains an <h1> (title is the only H1)');
  const h2 = (a.html.match(/<h2[\s>]/gi) ?? []).length;
  if (h2 < 4) failures.push(`needs at least 4 <h2> sections (has ${h2})`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug) || a.slug.length > 90) failures.push('invalid slug');
  if (a.seoTitle.length < 20 || a.seoTitle.length > 65) failures.push(`SEO title length ${a.seoTitle.length} (want 20-65)`);
  if (a.metaDescription.length < 90 || a.metaDescription.length > 160) failures.push(`meta description length ${a.metaDescription.length} (want 90-160)`);
  if (!a.focusKeyword) failures.push('missing focus keyword');
  if (!/<p[\s>]/i.test(a.html)) failures.push('no paragraphs');

  for (const re of UNSUPPORTED) if (re.test(text)) failures.push(`unsupported/risky claim pattern: ${re}`);

  // Internal links: at least 3, and every one must point to a real page on this site.
  const hrefs = [...a.html.matchAll(/<a\s[^>]*href="([^"]+)"/gi)].map((m) => m[1]);
  const internal = hrefs.filter((h) => h.startsWith('/') || h.startsWith(ctx.siteOrigin));
  const badInternal = internal.filter((h) => {
    const p = h.replace(ctx.siteOrigin, '').split('#')[0].split('?')[0];
    return !ctx.allowedInternalPaths.has(p.endsWith('/') ? p : `${p}/`);
  });
  if (internal.length < 3) failures.push(`needs at least 3 internal links (has ${internal.length})`);
  if (badInternal.length) failures.push(`internal links to non-existent pages: ${badInternal.join(', ')}`);
  if (hrefs.some((h) => /^javascript:/i.test(h))) failures.push('javascript: link');

  // Images: exactly one featured image (budget mode), alt text present, no text-in-image prompts.
  const featured = a.images.filter((i) => i.role === 'featured');
  const inline = a.images.filter((i) => i.role === 'inline');
  if (featured.length !== 1) failures.push('needs exactly 1 featured image');
  if (inline.length !== 0) failures.push(`budget mode: one image per article, no inline images (has ${inline.length})`);
  for (const img of a.images) {
    if (img.alt.length < 15 || img.alt.length > 140) failures.push('image alt text should be 15-140 characters');
    if (/\b(text|caption|logo|watermark|typography|lettering|poster|sign)\b/i.test(img.prompt.replace(/\b(no|without|avoid|avoiding|free of|never|not)\b[^.;]*/gi, ''))) {
      failures.push('image prompt asks for text/logo/sign');
    }
  }

  // Duplicate/cannibalisation guard against everything already published.
  for (const t of ctx.existingTitles) {
    const s = similarity(a.title, t);
    if (s >= 0.6) failures.push(`title too similar to existing post "${t}" (${s.toFixed(2)})`);
  }

  if (!/<(ul|ol)[\s>]/i.test(a.html)) warnings.push('no list; consider adding one for scannability');
  if (!/<h2[^>]*>[^<]*(faq|frequently|questions)/i.test(a.html)) warnings.push('no FAQ section');
  const kw = a.focusKeyword.toLowerCase();
  const density = kw ? (text.toLowerCase().split(kw).length - 1) / Math.max(1, words / 100) : 0;
  if (density > 2.5) failures.push(`focus keyword stuffing (${density.toFixed(1)} per 100 words)`);

  return { pass: failures.length === 0, words, failures, warnings };
}
