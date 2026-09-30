/**
 * fetch with retry/backoff for transient origin failures (Cloudflare 520-524, 502/503/504, network resets).
 * The WordPress host occasionally restarts; agent jobs must ride that out instead of failing halfway
 * (for example after images were generated but before the post was published).
 */
const TRANSIENT = new Set([408, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524]);

export async function fetchRetry(
  f: typeof fetch,
  url: string,
  init: RequestInit = {},
  opts: { tries?: number; baseDelayMs?: number; timeoutMs?: number } = {},
): Promise<Response> {
  const tries = opts.tries ?? 6;
  const base = opts.baseDelayMs ?? 5000;
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      // The timeout applies per attempt (a shared signal would cancel every retry).
      const res = await f(url, { ...init, signal: AbortSignal.timeout(opts.timeoutMs ?? 30_000) });
      if (!TRANSIENT.has(res.status) || i === tries - 1) return res;
      last = new Error(`HTTP ${res.status}`);
    } catch (e) {
      last = e;
      if (i === tries - 1) throw e;
    }
    await new Promise((r) => setTimeout(r, base * 2 ** i));
  }
  throw last;
}
