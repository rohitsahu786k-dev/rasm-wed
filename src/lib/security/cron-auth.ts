import { timingSafeEqual } from 'node:crypto';

/** Constant-time comparison; false when either side is empty. */
export function safeEqual(a: string, b: string) {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/**
 * Cron/admin endpoints accept `Authorization: Bearer <CRON_SECRET>` (what Vercel Cron sends).
 * If CRON_SECRET is unset the endpoint is closed, never open.
 */
export function isAuthorizedCron(req: Request, secret = process.env.CRON_SECRET ?? '') {
  const header = req.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return safeEqual(token, secret);
}

/** HTTP Basic check for the admin dashboard against ADMIN_PASSWORD (username is ignored). */
export function isAuthorizedAdmin(authorization: string | null, password = process.env.ADMIN_PASSWORD ?? '') {
  if (!authorization?.startsWith('Basic ')) return false;
  const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
  const pass = decoded.slice(decoded.indexOf(':') + 1);
  return safeEqual(pass, password);
}
