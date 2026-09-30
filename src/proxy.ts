import { NextResponse, type NextRequest } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/security/cron-auth';

/** Protects /admin/* with HTTP Basic auth (ADMIN_PASSWORD). Closed (503) if the password is not configured. */
export function proxy(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) return new NextResponse('Admin is not configured', { status: 503, headers: { 'X-Robots-Tag': 'noindex' } });
  if (!isAuthorizedAdmin(req.headers.get('authorization'))) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Rasm AI SEO", charset="UTF-8"', 'X-Robots-Tag': 'noindex' },
    });
  }
  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = { matcher: ['/admin/:path*'] };
