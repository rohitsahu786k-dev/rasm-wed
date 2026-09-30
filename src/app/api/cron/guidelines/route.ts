import { NextResponse } from 'next/server';
import { isAuthorizedCron } from '@/lib/security/cron-auth';
import { getStore, logAction } from '@/lib/automation/store';
import { checkGuidelines, type GuidelineChange } from '@/lib/seo/guidelines';
import { runAi } from '@/lib/ai/client';
import { SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Weekly: detect changes in Google Search documentation and interpret them for this site. */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) return new NextResponse('Unauthorized', { status: 401 });
  const store = getStore();

  const interpret = async (c: GuidelineChange) => {
    const r = await runAi<string>({
      task: 'google-doc-interpretation',
      priority: 'P5',
      instructions:
        `You are a senior technical SEO. A Google Search Central page changed. Using ONLY the diff below (a primary source), ` +
        `state (1) what changed, (2) whether it affects a Next.js marketing/blog site for ${SITE.name}, (3) the concrete action, ` +
        `or "no action". Do not speculate beyond the text. Max 120 words.`,
      input: `Page: ${c.url}\nADDED:\n${c.added.join('\n')}\nREMOVED:\n${c.removed.join('\n')}`,
      maxOutputTokens: 600,
    });
    await logAction(store, { agent: 'guideline-monitor', task: 'interpret-google-change', reason: c.url, model: r.model, tokensIn: r.tokensIn, tokensOut: r.tokensOut, costUsd: r.costUsd, risk: 0 });
    return r.output;
  };

  const changes = await checkGuidelines(store, { interpret });
  await logAction(store, { agent: 'guideline-monitor', task: 'weekly-guideline-check', reason: 'scheduled', risk: 0, result: `${changes.length} change(s)` });
  return NextResponse.json({ changes: changes.map((c) => ({ id: c.id, status: c.status })) });
}
