/**
 * Hub (pillar) pages keep an auto-maintained "guides in this series" index. It is regenerated deterministically
 * from the list of published spokes (no AI cost), so every new guide is linked from an already-indexed pillar.
 * The block lives between HTML comment markers, so editors can freely edit everything else on the page.
 */
import { fetchRetry } from '../net.ts';
import type { WpCreds } from './wp-publisher.ts';

const START = '<!-- rasm:spokes -->';
const END = '<!-- /rasm:spokes -->';

export interface SpokeRef {
  title: string;
  url: string;
  family: string;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FAMILY_LABEL: Record<string, string> = {
  market: 'By country',
  community: 'By community',
  cityIntent: 'By destination',
  month: 'By month',
};

export function renderSpokeIndex(spokes: SpokeRef[]) {
  if (spokes.length === 0) return `${START}${END}`;
  const groups = new Map<string, SpokeRef[]>();
  for (const s of spokes) groups.set(s.family, [...(groups.get(s.family) ?? []), s]);
  const body = [...groups.entries()]
    .map(([fam, list]) => `<h3>${FAMILY_LABEL[fam] ?? 'More guides'}</h3><ul>${list.map((s) => `<li><a href="${esc(s.url)}">${esc(s.title)}</a></li>`).join('')}</ul>`)
    .join('');
  return `${START}<h2>More guides in this series</h2>${body}${END}`;
}

/** Inserts or replaces the index block. Pure, unit-tested. */
export function withSpokeIndex(html: string, spokes: SpokeRef[]) {
  const block = renderSpokeIndex(spokes);
  const a = html.indexOf(START);
  const b = html.indexOf(END);
  if (a >= 0 && b > a) return html.slice(0, a) + block + html.slice(b + END.length);
  return `${html}\n${block}`;
}

export async function updateHubIndex(c: WpCreds, hubSlug: string, spokes: SpokeRef[], f: typeof fetch = fetch) {
  const h = { Authorization: `Basic ${Buffer.from(`${c.username}:${c.appPassword}`).toString('base64')}`, 'Content-Type': 'application/json' };
  const r = await fetchRetry(f, `${c.url}/wp-json/wp/v2/posts?slug=${hubSlug}&context=edit&_fields=id,content`, { headers: h });
  const [hub] = ((await r.json().catch(() => [])) as { id: number; content: { raw: string } }[]) ?? [];
  if (!hub) return false;
  const next = withSpokeIndex(hub.content.raw, spokes);
  if (next === hub.content.raw) return true;
  const u = await fetchRetry(f, `${c.url}/wp-json/wp/v2/posts/${hub.id}`, { method: 'POST', headers: h, body: JSON.stringify({ content: next }) });
  return u.ok;
}
