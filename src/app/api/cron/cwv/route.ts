import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { runJob } from '@/lib/automation/jobs';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Weekly Core Web Vitals check via PageSpeed Insights (field data preferred). */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });
  return NextResponse.json(await runJob('cwv'));
}
