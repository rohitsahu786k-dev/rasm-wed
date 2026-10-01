// One-off: copy the local .data store into the WordPress-backed store.
//   node --env-file=.env.local --experimental-strip-types scripts/migrate-store-to-wordpress.ts
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { FileStore } from '../src/lib/automation/store.ts';
import { WpPostStore } from '../src/lib/automation/wp-post-store.ts';
import { wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';

const dir = path.join(process.cwd(), '.data');
const local = new FileStore(dir);
const wp = new WpPostStore(wpCredsFromEnv()!);
for (const f of await fs.readdir(dir)) {
  const name = f.replace(/\.(jsonl|json)$/, '');
  if (f.endsWith('.jsonl')) {
    const rows = await local.list<object>(name);
    for (const r of rows) await wp.append(name, r);
    console.log('log', name, rows.length);
  } else if (f.endsWith('.json')) {
    await wp.setJson(name, await local.getJson(name));
    console.log('doc', name);
  }
}
