/**
 * Persistence for the autonomous agent (audit log, usage ledger, reports, guideline snapshots).
 * The interface is storage-agnostic; FileStore works on any Node host with a writable disk.
 * A Postgres implementation (Neon/Vercel Postgres) plugs into the same interface for serverless hosting.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { WpStore } from './wp-store.ts';
import { WpPostStore } from './wp-post-store.ts';
import { wpCredsFromEnv } from '../content/wp-publisher.ts';

export type Risk = 0 | 1 | 2 | 3;

export interface AiAction {
  id: string;
  ts: string;
  agent: string;
  task: string;
  reason: string;
  evidence?: unknown;
  target?: string;
  before?: unknown;
  after?: unknown;
  model?: string;
  tokensIn?: number;
  tokensOut?: number;
  costUsd?: number;
  risk: Risk;
  tests?: unknown;
  result?: string;
}

export interface UsageRecord {
  ts: string;
  task: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  kind: 'text' | 'image';
}

export interface Store {
  append<T extends object>(collection: string, record: T): Promise<void>;
  list<T>(collection: string, opts?: { limit?: number; since?: string }): Promise<T[]>;
  getJson<T>(key: string): Promise<T | null>;
  setJson(key: string, value: unknown): Promise<void>;
}

export class FileStore implements Store {
  private dir: string;
  constructor(dir: string) {
    this.dir = dir;
  }

  private file(collection: string) {
    if (!/^[a-z0-9_-]+$/i.test(collection)) throw new Error('invalid collection name');
    return path.join(this.dir, `${collection}.jsonl`);
  }

  async append<T extends object>(collection: string, record: T) {
    await fs.mkdir(this.dir, { recursive: true });
    await fs.appendFile(this.file(collection), `${JSON.stringify(record)}\n`, 'utf8');
  }

  async list<T>(collection: string, opts: { limit?: number; since?: string } = {}) {
    let text = '';
    try {
      text = await fs.readFile(this.file(collection), 'utf8');
    } catch {
      return [];
    }
    let rows = text.split('\n').filter(Boolean).map((l) => JSON.parse(l) as T & { ts?: string });
    if (opts.since) rows = rows.filter((r) => (r.ts ?? '') >= opts.since!);
    return (opts.limit ? rows.slice(-opts.limit) : rows) as T[];
  }

  async getJson<T>(key: string) {
    try {
      return JSON.parse(await fs.readFile(path.join(this.dir, `${key}.json`), 'utf8')) as T;
    } catch {
      return null;
    }
  }

  async setJson(key: string, value: unknown) {
    if (!/^[a-z0-9_-]+$/i.test(key)) throw new Error('invalid key');
    await fs.mkdir(this.dir, { recursive: true });
    await fs.writeFile(path.join(this.dir, `${key}.json`), JSON.stringify(value, null, 2), 'utf8');
  }
}

let singleton: Store | undefined;
/** AI_STORE=wordpress keeps all agent state in the WordPress MySQL database via core REST (no plugin). AI_STORE=wordpress-plugin uses the optional Rasm Agent Store plugin. */
export function getStore(): Store {
  if (singleton) return singleton;
  const mode = process.env.AI_STORE;
  const creds = mode === 'wordpress' || mode === 'wordpress-plugin' ? wpCredsFromEnv() : null;
  singleton = creds ? (mode === 'wordpress-plugin' ? new WpStore(creds) : new WpPostStore(creds)) : new FileStore(process.env.AI_DATA_DIR || path.join(process.cwd(), '.data'));
  return singleton;
}

export const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** Every autonomous action goes through here: no silent changes. */
export async function logAction(store: Store, a: Omit<AiAction, 'id' | 'ts'>) {
  const rec: AiAction = { id: newId(), ts: new Date().toISOString(), ...a };
  await store.append('ai_actions', rec);
  return rec;
}
