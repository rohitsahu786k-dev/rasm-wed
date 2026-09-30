/**
 * Turns Elementor-built WordPress page HTML (200 KB of wrapper divs, icons, inline CSS) into clean semantic blocks
 * so pages can be rendered with the site's own design instead of Elementor markup.
 * Only headings, paragraphs, lists and real content images survive; scripts, styles, forms and icon SVGs are dropped.
 */

export type Block =
  | { type: 'h1' | 'h2' | 'h3' | 'h4'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'img'; src: string; alt: string; width?: number; height?: number };

const PLACEHOLDER = /^(add your (heading|title|text)( text)?( here)?|heading|click here|read more|learn more|button)$/i;

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;|&#8217;|&#x27;|&apos;/g, '’')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const clean = (html: string) => decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

export function parseElementor(html: string): Block[] {
  const src = html
    .replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<svg[\s\S]*?<\/svg>|<form[\s\S]*?<\/form>|<noscript[\s\S]*?<\/noscript>|<!--[\s\S]*?-->/gi, '')
    .replace(/<(nav|footer|header)[\s\S]*?<\/\1>/gi, '');

  const blocks: Block[] = [];
  const seen = new Set<string>();
  const re = /<(h[1-4])\b[^>]*>([\s\S]*?)<\/\1>|<(p)\b[^>]*>([\s\S]*?)<\/p>|<(ul|ol)\b[^>]*>([\s\S]*?)<\/\5>|<img\b([^>]*)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[1]) {
      const text = clean(m[2]);
      if (!text || PLACEHOLDER.test(text) || text.length > 160) continue;
      const key = `${m[1]}:${text.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      blocks.push({ type: m[1].toLowerCase() as 'h1' | 'h2' | 'h3' | 'h4', text });
    } else if (m[3]) {
      const text = clean(m[4]);
      if (text.length < 25 || seen.has(text)) continue;
      seen.add(text);
      blocks.push({ type: 'p', text });
    } else if (m[5]) {
      const items = [...m[6].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((x) => clean(x[1])).filter((t) => t.length > 2);
      if (items.length >= 2 && !seen.has(items.join('|'))) {
        seen.add(items.join('|'));
        blocks.push({ type: m[5].toLowerCase() as 'ul' | 'ol', items });
      }
    } else if (m[7]) {
      const attrs = m[7];
      const url = /\bsrc="([^"]+)"/i.exec(attrs)?.[1] ?? '';
      const w = Number(/\bwidth="(\d+)"/i.exec(attrs)?.[1] ?? 0);
      const h = Number(/\bheight="(\d+)"/i.exec(attrs)?.[1] ?? 0);
      // Only real photographs from the media library; skip icons/logos/tiny images and duplicates.
      if (!/\/wp-content\/uploads\//.test(url) || /\.svg(\?|$)/i.test(url) || (w && w < 300) || seen.has(url)) continue;
      seen.add(url);
      blocks.push({ type: 'img', src: url, alt: decode(/\balt="([^"]*)"/i.exec(attrs)?.[1] ?? ''), width: w || undefined, height: h || undefined });
    }
  }
  return blocks;
}

/** Plain-text word count of parsed blocks (used to decide whether a page has enough content to be indexable). */
export const blockWords = (blocks: Block[]) =>
  blocks.reduce((n, b) => {
    const text = 'items' in b ? b.items.join(' ') : 'text' in b ? b.text : '';
    return n + text.split(/\s+/).filter(Boolean).length;
  }, 0);
