import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { runJob } from '@/lib/automation/jobs';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Weekly SEO report (Search Console + GA4 + opportunities). Thin wrapper: the same job also runs from GitHub Actions via scripts/agent-run.ts. */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });
  return NextResponse.json(await runJob('weekly', { dry: new URL(req.url).searchParams.get('dry') === '1' }));
}
