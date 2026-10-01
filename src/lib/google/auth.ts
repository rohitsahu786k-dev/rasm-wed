/**
 * Google service-account auth (RS256 JWT bearer flow) using only node:crypto + fetch.
 * Server-only. The private key never leaves this module and is never logged.
 */
import { createSign } from 'node:crypto';

export interface GoogleCreds {
  email: string;
  privateKey: string;
}

export function googleCredsFromEnv(env: Record<string, string | undefined> = process.env): GoogleCreds | null {
  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const raw = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !raw) return null;
  // Env files/hosts store the key with literal "\n" sequences.
  return { email, privateKey: raw.replace(/\\n/g, '\n') };
}

const b64u = (v: string | Buffer) => Buffer.from(v).toString('base64url');

export function signJwt(creds: GoogleCreds, scopes: string[], now = Math.floor(Date.now() / 1000)) {
  const header = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64u(
    JSON.stringify({ iss: creds.email, scope: scopes.join(' '), aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }),
  );
  const sig = createSign('RSA-SHA256').update(`${header}.${claims}`).sign(creds.privateKey);
  return `${header}.${claims}.${b64u(sig)}`;
}

const cache = new Map<string, { token: string; exp: number }>();

export async function getAccessToken(creds: GoogleCreds, scopes: string[], f: typeof fetch = fetch) {
  const key = `${creds.email}|${scopes.join(' ')}`;
  const hit = cache.get(key);
  if (hit && hit.exp > Date.now() + 60_000) return hit.token;
  const res = await f('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: signJwt(creds, scopes) }),
    signal: AbortSignal.timeout(20_000),
  });
  const body = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!res.ok || !body.access_token) throw new Error(`Google auth failed: ${body.error_description ?? res.status}`);
  cache.set(key, { token: body.access_token, exp: Date.now() + (body.expires_in ?? 3600) * 1000 });
  return body.access_token;
}
