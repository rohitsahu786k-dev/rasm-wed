// Runs one scheduled job directly (no web server needed, no serverless time limit). Used by GitHub Actions.
//   node --env-file=.env.local --experimental-strip-types scripts/agent-run.ts <health|autofix|content|programmatic|weekly|guidelines> [--dry]
import { runJob, type JobName } from '../src/lib/automation/jobs.ts';

const name = process.argv[2] as JobName;
const valid = ['health', 'autofix', 'content', 'programmatic', 'weekly', 'guidelines'];
if (!valid.includes(name)) throw new Error(`job must be one of: ${valid.join(', ')}`);
const result = await runJob(name, { dry: process.argv.includes('--dry') });
console.log(JSON.stringify(result, null, 2));
if ((result as { status?: string })?.status === 'error') process.exitCode = 1;
