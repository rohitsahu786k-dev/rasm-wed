import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { runContentPipeline } from '@/lib/content/pipeline';
import { wpCredsFromEnv } from '@/lib/content/wp-publisher';
import { BudgetExceededError } from '@/lib/ai/budget';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Daily: publishes at most one quality-gated article (with WebP images) to WordPress. `?dry=1` generates without publishing. */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });
  const creds = wpCredsFromEnv();
  if (!creds) return NextResponse.json({ error: 'WordPress credentials not configured' }, { status: 500 });

  const dryRun = new URL(req.url).searchParams.get('dry') === '1';
  try {
    const result = await runContentPipeline({ creds, siteUrl: SITE_URL, dryRun });
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof BudgetExceededError) return NextResponse.json({ status: 'skipped', reason: e.message });
    return NextResponse.json({ status: 'error', error: (e as Error).message.replace(/sk-[A-Za-z0-9_-]+/g, 'sk-***') }, { status: 500 });
  }
}
