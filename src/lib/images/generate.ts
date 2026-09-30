/**
 * Image generation -> WebP. Server-only.
 * Rules baked in: never any text/logos/watermarks in the image, subject centred with safe margins so card,
 * hero and social crops never cut it, no depiction of real people/clients/events as documentary evidence.
 */
import sharp from 'sharp';
import { loadAiConfig, type AiConfig } from '../ai/config.ts';
import { assertBudget } from '../ai/budget.ts';
import { getStore, type Store, type UsageRecord } from '../automation/store.ts';
import type { Priority } from '../ai/router.ts';

const NO_TEXT =
  'Absolutely no text, letters, numbers, words, captions, logos, signage, watermarks or typography anywhere in the image (including on banners, books, screens and clothing).';

const SAFE_FRAMING: Record<'featured' | 'inline', string> = {
  featured:
    'Wide 3:2 landscape composition. Place the main subject in the centre third with generous empty margin on all four sides (at least 20% of the frame above and below, 12% at the sides) so it survives any crop to 16:9, 4:3, 1.91:1 or square. Nothing important near the edges.',
  inline: 'Landscape 3:2 composition, main subject centred, comfortable margin around it, nothing important at the edges.',
};

export function buildImagePrompt(scene: string, role: 'featured' | 'inline') {
  return [
    `Photorealistic, professional editorial photograph. ${scene.trim()}`,
    'Natural light, refined colour grade, sharp focus, realistic textures. An atmospheric setting, not a documentary record of any real event; no identifiable real person.',
    SAFE_FRAMING[role],
    NO_TEXT,
  ].join(' ');
}

/** Real cost from the API's token usage; flat estimate only when usage is missing. */
export function imageCostFromUsage(
  cfg: AiConfig,
  u?: { input_tokens?: number; output_tokens?: number; input_tokens_details?: { text_tokens?: number; image_tokens?: number } },
) {
  if (!u || u.output_tokens === undefined) return cfg.imageCostUsd;
  const textIn = u.input_tokens_details?.text_tokens ?? u.input_tokens ?? 0;
  const imageIn = u.input_tokens_details?.image_tokens ?? 0;
  const p = cfg.imagePrice;
  return (textIn * p.textIn + imageIn * p.imageIn + u.output_tokens * p.imageOut) / 1_000_000;
}

export interface GeneratedImage {
  webp: Buffer;
  width: number;
  height: number;
  bytes: number;
}

interface Deps {
  cfg?: AiConfig;
  store?: Store;
  fetchImpl?: typeof fetch;
}

export async function generateWebp(
  opts: { scene: string; role: 'featured' | 'inline'; priority?: Priority; task?: string },
  deps: Deps = {},
): Promise<GeneratedImage> {
  const cfg = deps.cfg ?? loadAiConfig();
  const store = deps.store ?? getStore();
  const f = deps.fetchImpl ?? fetch;
  if (!cfg.apiKey) throw new Error('OPENAI_API_KEY is not configured');
  await assertBudget(store, cfg, opts.priority ?? 'P8', { image: true });

  const res = await f(`${cfg.baseUrl}/images/generations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({ model: cfg.imageModel, prompt: buildImagePrompt(opts.scene, opts.role), size: '1536x1024', quality: cfg.imageQuality, n: 1 }),
    signal: AbortSignal.timeout(180_000),
  });
  const body = (await res.json().catch(() => ({}))) as {
    data?: { b64_json?: string }[];
    usage?: { input_tokens?: number; output_tokens?: number; input_tokens_details?: { text_tokens?: number; image_tokens?: number } };
    error?: { message?: string };
  };
  if (!res.ok || !body.data?.[0]?.b64_json) {
    throw new Error(`Image generation failed (${res.status}): ${(body.error?.message ?? 'no image returned').replace(/sk-[A-Za-z0-9_-]+/g, 'sk-***')}`);
  }
  const cost = imageCostFromUsage(cfg, body.usage);
  const usage: UsageRecord = { ts: new Date().toISOString(), task: opts.task ?? 'image', model: cfg.imageModel, tokensIn: body.usage?.input_tokens ?? 0, tokensOut: body.usage?.output_tokens ?? 0, costUsd: cost, kind: 'image' };
  await store.append('ai_usage', usage);

  // Web-optimised WebP. Featured up to 1600px wide (retina-safe for hero); inline 1200px.
  const width = opts.role === 'featured' ? 1600 : 1200;
  const { data, info } = await sharp(Buffer.from(body.data[0].b64_json, 'base64'))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  return { webp: data, width: info.width, height: info.height, bytes: data.length };
}

/** SEO-friendly filename from the article slug: `<slug>-featured.webp`, `<slug>-1.webp`. */
export const imageFilename = (slug: string, role: 'featured' | 'inline', index: number) =>
  role === 'featured' ? `${slug}-featured.webp` : `${slug}-${index}.webp`;
