import { parseElementor, type Block } from '@/lib/elementor';

/** Owner-written counters/badges from the old Elementor template that conflict with approved facts or add no content. */
const SKIP = /^(have a look|over \d+\+? successful events|a journey of celebrations|introduction|list item|beautiful memories|about us|home)\b/i;
const SKIP_P = /^crafting over \d+ successful events/i;

/**
 * Renders WordPress page content cleanly: raw HTML for editor/AI-authored pages, extracted semantic blocks for legacy
 * Elementor pages. Server component, no client JS.
 */
export function WpBody({ content, className = '' }: { content: string; className?: string }) {
  const safe = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  if (!/elementor/.test(safe)) return <div className={`wp-content ${className}`} dangerouslySetInnerHTML={{ __html: safe }} />;

  const blocks: Block[] = parseElementor(safe).filter((b) => {
    if (b.type === 'img' || b.type === 'h1') return false;
    if ('text' in b) return !SKIP.test(b.text) && !(b.type === 'p' && SKIP_P.test(b.text));
    return true;
  });
  return (
    <div className={`wp-content ${className}`}>
      {blocks.map((b, i) =>
        b.type === 'h2' ? <h2 key={i}>{b.text}</h2>
        : b.type === 'h3' || b.type === 'h4' ? <h3 key={i}>{b.text}</h3>
        : b.type === 'p' ? <p key={i}>{b.text}</p>
        : b.type === 'ul' ? <ul key={i}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
        : b.type === 'ol' ? <ol key={i}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ol>
        : null,
      )}
    </div>
  );
}
