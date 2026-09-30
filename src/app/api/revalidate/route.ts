import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { safeEqual } from '@/lib/security/cron-auth';

export const dynamic = 'force-dynamic';

/**
 * On-demand refresh so a post published in WordPress appears immediately instead of after the hourly ISR window.
 * Call from a WordPress webhook (or the publisher): POST /api/revalidate  { "slug": "my-post" }
 * Header: Authorization: Bearer $REVALIDATE_SECRET
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET ?? '';
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer /, '');
  if (!safeEqual(token, secret)) return new NextResponse('Unauthorized', { status: 401 });

  const { slug } = (await req.json().catch(() => ({}))) as { slug?: string };
  if (slug !== undefined && !/^[a-z0-9-]{1,200}$/.test(slug)) return NextResponse.json({ error: 'invalid slug' }, { status: 400 });

  revalidatePath('/');
  revalidatePath('/blog/');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/${slug}/`);
  return NextResponse.json({ revalidated: true, slug: slug ?? null });
}
