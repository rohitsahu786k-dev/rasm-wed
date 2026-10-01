/**
 * Central AI configuration. The ONLY place model IDs and limits are read.
 * Server-only: never import from a client component.
 *
 * Cost-optimised for a $10/month budget. Model IDs verified 2026-09-30 against GET /v1/models for this account
 * (gpt-6-astra, gpt-6.1-sol, gpt-6-luna, gpt-5.6-sol, gpt-image-2, gpt-image-2.5-sunburst all present).
 * Override any of them with env vars; no code change needed when OpenAI ships a newer model.
 */

export type ModelTier = 'strong' | 'balanced' | 'cheap';

export interface ModelPrice {
  /** USD per 1M input tokens */
  input: number;
  /** USD per 1M output tokens */
  output: number;
}

const num = (v: string | undefined, d: number) => {
  const n = v === undefined || v === '' ? NaN : Number(v);
  return Number.isFinite(n) ? n : d;
};

export function loadAiConfig(env: Record<string, string | undefined> = process.env) {
  const models: Record<ModelTier, string> = {
    strong: env.AI_PRIMARY_MODEL || 'gpt-6.1-sol',
    balanced: env.AI_BALANCED_MODEL || 'gpt-6-luna',
    cheap: env.AI_CHEAP_MODEL || 'gpt-6-luna',
  };

  // Prices are configuration, not truth: they come from OpenAI's pricing page and change.
  // Override with AI_PRICING_JSON='{"gpt-6-astra":{"input":10,"output":50}}'.
  const defaultPrices: Record<string, ModelPrice> = {
    'gpt-6-astra': { input: 10, output: 50 },
    'gpt-6.1-sol': { input: 2, output: 10 },
    'gpt-6-sol': { input: 2, output: 10 },
    'gpt-5.6-sol': { input: 4, output: 20 },
    'gpt-5.6-terra': { input: 2, output: 12 },
    'gpt-5.6-luna': { input: 0.2, output: 1.2 },
    'gpt-6-luna': { input: 0.1, output: 0.5 },
  };
  let prices = defaultPrices;
  if (env.AI_PRICING_JSON) {
    try {
      prices = { ...defaultPrices, ...(JSON.parse(env.AI_PRICING_JSON) as Record<string, ModelPrice>) };
    } catch {
      /* ignore malformed override; defaults stay */
    }
  }

  return {
    apiKey: env.OPENAI_API_KEY ?? '',
    baseUrl: (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
    models,
    fallbackModel: env.AI_FALLBACK_MODEL || 'gpt-6-luna',
    imageModel: env.AI_IMAGE_MODEL || 'gpt-image-2.5-sunburst',
    /** Flat fallback estimate per image, used only when the API returns no usage. */
    imageCostUsd: num(env.AI_IMAGE_COST_USD, 0.08),
    /** USD per 1M tokens for image models (OpenAI pricing page): text in / image in / image out. */
    imagePrice: { textIn: num(env.AI_IMAGE_PRICE_TEXT_IN, 5), imageIn: num(env.AI_IMAGE_PRICE_IMAGE_IN, 8), imageOut: num(env.AI_IMAGE_PRICE_OUT, 30) },
    imageQuality: env.AI_IMAGE_QUALITY || 'medium',
    prices,
    /** Applied when a model has no price entry: assume the most expensive so budgets stay safe. */
    unknownModelPrice: { input: 10, output: 50 } as ModelPrice,
    budget: {
      dailyUsd: num(env.AI_DAILY_BUDGET_USD, 0.6),
      monthlyUsd: num(env.AI_MONTHLY_BUDGET_USD, 10),
      /** Fraction of the budget after which only CRITICAL tasks may spend. */
      criticalOnlyAfter: num(env.AI_CRITICAL_ONLY_AFTER, 0.8),
      maxOutputTokens: num(env.AI_MAX_OUTPUT_TOKENS, 8000),
      maxImagesPerDay: num(env.AI_MAX_IMAGES_PER_DAY, 1),
      maxRequestsPerDay: num(env.AI_MAX_REQUESTS_PER_DAY, 300),
    },
  };
}

export type AiConfig = ReturnType<typeof loadAiConfig>;
