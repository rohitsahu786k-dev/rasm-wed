// Manual runner. Usage:
//   node --env-file=.env.local --experimental-strip-types scripts/content-run.ts --dry     (generate locally, don't publish)
//   node --env-file=.env.local --experimental-strip-types scripts/content-run.ts           (publish to WordPress)
import { runContentPipeline } from '../src/lib/content/pipeline.ts';
import { wpCredsFromEnv } from '../src/lib/content/wp-publisher.ts';

const creds = wpCredsFromEnv();
if (!creds) throw new Error('WordPress credentials missing');
const result = await runContentPipeline({
  creds,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rasmwed.com',
  dryRun: process.argv.includes('--dry'),
  force: process.argv.includes('--force'),
});
console.log(JSON.stringify(result, null, 2));
