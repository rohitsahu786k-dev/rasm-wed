/**
 * Agent state stored in the live WordPress MySQL database using only core WordPress REST (no plugin needed).
 * Each collection/key is ONE private post titled "__agent:<name>" whose body holds JSON lines / a JSON document.
 * Private posts are invisible to the public site, REST listing, feeds and Rank Math sitemaps.
 * Selected with AI_STORE=wordpress.
 *
 * Writes are read-modify-write; the agent's jobs run at different times of day so contention is not a concern.
 * Logs are capped so a document never grows unbounded.
 */
import type { Store } from './store.ts';
import type { WpCreds } from '../content/wp-publisher.ts';
import { fetchRetry } from '../net.ts';

const MAX_LINES = 3000;

interface PostRef {
  id: number;
  raw: string;
}

export class WpPostStore implements Store {
  private c: WpCreds;
  private f: typeof fetch;
  private ids = new Map<string, number>();

  constructor(c: WpCreds, f: typeof fetch = fetch) {
    this.c = c;
    this.f = f;
  }

  private headers() {
    return { Authorization: `Basic ${Buffer.from(`${this.c.username}:${this.c.appPassword}`).toString('base64')}`, 'Content-Type': 'application/json' };
  }

  private async api<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetchRetry(this.f, `${this.c.url}/wp-json/wp/v2${path}`, { ...init, headers: this.headers(), signal: AbortSignal.timeout(30_000) });
    const body = (await res.json().catch(() => ({}))) as T & { message?: string };
    if (!res.ok) throw new Error(`WP store ${path} -> ${res.status} ${body.message ?? ''}`);
    return body;
  }

  private slug(name: string) {
    if (!/^[a-z0-9_:-]+$/i.test(name)) throw new Error('invalid store name');
    return `agent-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  private async find(name: string): Promise<PostRef | null> {
    const list = await this.api<{ id: number; content: { raw: string } }[]>(`/posts?slug=${this.slug(name)}&status=private&context=edit&_fields=id,content`);
    if (!list[0]) return null;
    this.ids.set(name, list[0].id);
    return { id: list[0].id, raw: list[0].content.raw ?? '' };
  }

  private async write(name: string, raw: string, existing: PostRef | null) {
    const body = JSON.stringify({ title: `__agent:${name}`, slug: this.slug(name), status: 'private', content: raw, categories: [] });
    if (existing) await this.api(`/posts/${existing.id}`, { method: 'POST', body });
    else await this.api('/posts', { method: 'POST', body });
  }

  async append<T extends object>(collection: string, record: T) {
    const cur = await this.find(collection);
    const lines = (cur?.raw ?? '').split('\n').filter(Boolean);
    lines.push(JSON.stringify(record));
    await this.write(collection, lines.slice(-MAX_LINES).join('\n'), cur);
  }

  async list<T>(collection: string, opts: { limit?: number; since?: string } = {}) {
    const cur = await this.find(collection);
    let rows = (cur?.raw ?? '').split('\n').filter(Boolean).map((l) => JSON.parse(l) as T & { ts?: string });
    if (opts.since) rows = rows.filter((r) => (r.ts ?? '') >= opts.since!);
    return (opts.limit ? rows.slice(-opts.limit) : rows) as T[];
  }

  async getJson<T>(key: string) {
    const cur = await this.find(`kv:${key}`);
    return cur?.raw ? (JSON.parse(cur.raw) as T) : null;
  }

  async setJson(key: string, value: unknown) {
    const name = `kv:${key}`;
    await this.write(name, JSON.stringify(value), await this.find(name));
  }

  /** Test helper: permanently remove a store post. */
  async destroy(name: string) {
    const cur = await this.find(name);
    if (cur) await this.api(`/posts/${cur.id}?force=true`, { method: 'DELETE' });
  }
}
