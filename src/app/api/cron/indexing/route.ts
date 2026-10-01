import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { runJob } from '@/lib/automation/jobs';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Weekly Search Console indexing check: inspects every sitemap URL, resubmits the sitemap, queues quality refreshes. */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });
  return NextResponse.json(await runJob('indexing'));
}
