/**
 * Server-only OpenAI Responses API client with routing, budget enforcement, fallback and usage ledger.
 * Uses plain fetch (no SDK dependency). The API key never leaves this module.
 */
import { loadAiConfig, type AiConfig } from './config.ts';
import { tierFor, type AiTask, type Priority } from './router.ts';
import { assertBudget, costUsd } from './budget.ts';
import { getStore, type Store, type UsageRecord } from '../automation/store.ts';

export interface AiRequest {
  task: AiTask;
  priority: Priority;
  instructions: string;
  input: string;
  /** Ask the model for JSON and parse it. */
  json?: boolean;
  maxOutputTokens?: number;
}

export interface AiResult<T = string> {
  output: T;
  model: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
}

interface Deps {
  cfg?: AiConfig;
  store?: Store;
  fetchImpl?: typeof fetch;
}

/** Strip anything that looks like a credential before it can reach a prompt, a log or an error. */
export function redactSecrets(text: string) {
  return text
    .replace(/sk-[A-Za-z0-9_-]{16,}/g, 'sk-***')
    .replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, '[private key]')
    .replace(/(password|secret|token|api[_-]?key)(["'\s:=]+)[^\s"']{6,}/gi, '$1$2***');
}

interface ResponsesBody {
  output_text?: string;
  output?: { type: string; content?: { type: string; text?: string }[] }[];
  usage?: { input_tokens?: number; output_tokens?: number };
  error?: { message?: string };
}

const extractText = (r: ResponsesBody) =>
  r.output_text ??
  (r.output ?? [])
    .flatMap((o) => (o.type === 'message' ? (o.content ?? []) : []))
    .map((c) => c.text ?? '')
    .join('');

async function callModel(cfg: AiConfig, f: typeof fetch, model: string, req: AiRequest) {
  const res = await f(`${cfg.baseUrl}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({
      model,
      instructions: redactSecrets(req.instructions),
      // The API requires the word "JSON" in the input itself when json_object output is requested.
      input: redactSecrets(req.json ? `${req.input}\n\nRespond with a single valid JSON object.` : req.input),
      max_output_tokens: Math.min(req.maxOutputTokens ?? cfg.budget.maxOutputTokens, cfg.budget.maxOutputTokens),
      ...(req.json ? { text: { format: { type: 'json_object' } } } : {}),
      store: false,
    }),
  });
  const body = (await res.json().catch(() => ({}))) as ResponsesBody;
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${redactSecrets(body.error?.message ?? 'request failed')}`);
  return body;
}

export async function runAi<T = string>(req: AiRequest, deps: Deps = {}): Promise<AiResult<T>> {
  const cfg = deps.cfg ?? loadAiConfig();
  const store = deps.store ?? getStore();
  const f = deps.fetchImpl ?? fetch;
  if (!cfg.apiKey) throw new Error('OPENAI_API_KEY is not configured');

  await assertBudget(store, cfg, req.priority);

  const primary = cfg.models[tierFor(req.task)];
  let model = primary;
  let body: ResponsesBody;
  try {
    body = await callModel(cfg, f, model, req);
  } catch (err) {
    if (cfg.fallbackModel === primary) throw err;
    model = cfg.fallbackModel;
    body = await callModel(cfg, f, model, req);
  }

  const tokensIn = body.usage?.input_tokens ?? 0;
  const tokensOut = body.usage?.output_tokens ?? 0;
  const cost = costUsd(cfg, model, tokensIn, tokensOut);
  const usage: UsageRecord = { ts: new Date().toISOString(), task: req.task, model, tokensIn, tokensOut, costUsd: cost, kind: 'text' };
  await store.append('ai_usage', usage);

  const text = extractText(body);
  const output = (req.json ? JSON.parse(text) : text) as T;
  return { output, model, tokensIn, tokensOut, costUsd: cost };
}
