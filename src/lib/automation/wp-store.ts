/**
 * Store backed by the live WordPress MySQL database through the "Rasm Agent Store" plugin
 * (wordpress-plugin/rasm-agent-store). Selected with AI_STORE=wordpress.
 * This keeps ALL agent state in WordPress's own database, so serverless hosting needs no second database.
 */
import type { Store } from './store.ts';
import type { WpCreds } from '../content/wp-publisher.ts';

export class WpStore implements Store {
  private c: WpCreds;
  private f: typeof fetch;
  constructor(c: WpCreds, f: typeof fetch = fetch) {
    this.c = c;
    this.f = f;
  }

  private async call<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await this.f(`${this.c.url}/wp-json/rasm-agent/v1${path}`, {
      ...init,
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.c.username}:${this.c.appPassword}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`WP store ${path} -> ${res.status}`);
    return (await res.json()) as T;
  }

  async append<T extends object>(collection: string, record: T) {
    await this.call('/append', { method: 'POST', body: JSON.stringify({ collection, record }) });
  }

  async list<T>(collection: string, opts: { limit?: number; since?: string } = {}) {
    const q = new URLSearchParams({ collection, limit: String(opts.limit ?? 1000), ...(opts.since ? { since: opts.since } : {}) });
    return this.call<T[]>(`/list?${q}`);
  }

  async getJson<T>(key: string) {
    return (await this.call<{ value: T | null }>(`/kv/${encodeURIComponent(key)}`)).value;
  }

  async setJson(key: string, value: unknown) {
    await this.call(`/kv/${encodeURIComponent(key)}`, { method: 'PUT', body: JSON.stringify({ value }) });
  }

  async ping() {
    try {
      await this.call('/ping');
      return true;
    } catch {
      return false;
    }
  }
}
