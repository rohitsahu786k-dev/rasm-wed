import Image from 'next/image';
import { parseElementor, type Block } from '@/lib/elementor';
import { scrubRetiredPhones } from '@/lib/site';

/** Owner-written counters/badges and template leftovers from the old Elementor pages. */
const SKIP = /^(have a look|over \d+\+? successful events|a journey of celebrations|introduction|list item|beautiful memories|about us|home|the royal setup|wedding designs|check out some of our best-selling designs|a visual tour)\b/i;
const SKIP_P = /^(crafting over \d+ successful events|\[elementor-template)/i;
/** Anonymous, templated "couples share" quotes are not verifiable reviews; they are not rendered. */
const TESTIMONIAL_H = /couples share their wedding experiences/i;

const tokens = (s: string) => s.toLowerCase().replace(/\.[a-z0-9]+$/i, '').split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !/^(palace|resort|hotel|the|udaipur|wedding|images?|scaled)$/.test(w));

/** Keeps only content blocks worth showing and drops headings that ended up with no content beneath them. */
export function cleanBlocks(input: Block[]): Block[] {
  const out: Block[] = [];
  let skipping = false;
  for (const b of input) {
    if (b.type === 'h1') continue;
    if ('text' in b && (b.type === 'h2' || b.type === 'h3' || b.type === 'h4')) {
      skipping = TESTIMONIAL_H.test(b.text);
      if (skipping || SKIP.test(b.text)) continue;
    }
    if (skipping) {
      if (b.type === 'p' || b.type === 'ul' || b.type === 'ol' || b.type === 'img') continue;
    }
    if (b.type === 'p' && SKIP_P.test(b.text)) continue;
    out.push(b);
  }
  // drop dangling headings
  return out.filter((b, i) => {
    if (!('text' in b) || b.type === 'p') return true;
    const next = out[i + 1];
    if (!next) return false;
    if (next.type === 'p' || next.type === 'ul' || next.type === 'ol' || next.type === 'img') return true;
    const rank = (t: string) => Number(t.slice(1));
    // A heading directly followed by a same-or-higher-level heading has no content and is dropped.
    return 'text' in next ? rank(next.type) > rank(b.type) : true;
  });
}

type Node = { kind: 'block'; b: Block } | { kind: 'cards'; cards: { src: string; alt: string; title: string; w?: number; h?: number }[] };

/** An image immediately followed by a heading whose words match the file name is a venue/service card; anything else is decorative and dropped. */
function toNodes(blocks: Block[]): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'img') {
      const n = blocks[i + 1];
      if (n && (n.type === 'h3' || n.type === 'h4') && tokens(b.src.split('/').pop() ?? '').some((t) => tokens(n.text).includes(t))) {
        const last = nodes[nodes.length - 1];
        const card = { src: b.src, alt: b.alt || n.text, title: n.text, w: b.width, h: b.height };
        if (last?.kind === 'cards') last.cards.push(card);
        else nodes.push({ kind: 'cards', cards: [card] });
        i++;
      }
      continue;
    }
    nodes.push({ kind: 'block', b });
  }
  return nodes;
}

/**
 * Renders WordPress page content cleanly: raw HTML for editor/AI-authored pages, extracted semantic blocks for legacy
 * Elementor pages. Server component, no client JS.
 */
export function WpBody({ content, className = '' }: { content: string; className?: string }) {
  // One <h1> per page (the page template owns it): demote any <h1> authored inside WordPress content.
  // scrubRetiredPhones also rewrites retired numbers hard-coded into legacy Elementor buttons and body copy.
  const safe = scrubRetiredPhones(
    content
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<h1(\s|>)/gi, '<h2$1')
      .replace(/<\/h1>/gi, '</h2>'),
  );
  if (!/elementor/.test(safe)) return <div className={`wp-content ${className}`} dangerouslySetInnerHTML={{ __html: safe }} />;

  const nodes = toNodes(cleanBlocks(parseElementor(safe)));
  return (
    <div className={`wp-content ${className}`}>
      {nodes.map((n, i) => {
        if (n.kind === 'cards') {
          return (
            <ul key={i} className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 !list-none !pl-0 !max-w-none">
              {n.cards.map((c) => (
                <li key={c.src} className="!mt-0 rounded-2xl overflow-hidden border border-gold/20 bg-white">
                  <Image src={c.src} alt={c.alt} width={c.w ?? 500} height={c.h ?? 500} sizes="(min-width: 768px) 30vw, 45vw" className="w-full h-auto !rounded-none" />
                  <p className="p-3 text-sm font-medium text-charcoal-900">{c.title}</p>
                </li>
              ))}
            </ul>
          );
        }
        const b = n.b;
        return b.type === 'h2' ? <h2 key={i}>{b.text}</h2>
          : b.type === 'h3' || b.type === 'h4' ? <h3 key={i}>{b.text}</h3>
          : b.type === 'p' ? <p key={i}>{b.text}</p>
          : b.type === 'ul' ? <ul key={i}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
          : b.type === 'ol' ? <ol key={i}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ol>
          : null;
      })}
    </div>
  );
}
