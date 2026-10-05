import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Light in-memory throttle (per server instance): 5 enquiries per IP per 10 minutes.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 50)) return NextResponse.json({ ok: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (throttled(ip)) return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const destination = clean(body.destination, 120);
  const date = clean(body.date, 40);
  const guests = clean(body.guests, 40);
  const message = String(body.message ?? '').trim().slice(0, 2000);
  const source = clean(body.source, 200);

  if (!name || phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'Please enter your name and a valid phone number.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_SECURE = 'true', SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('[contact] SMTP_USER / SMTP_PASS are not set; enquiry could not be emailed');
    return NextResponse.json({ ok: false, error: 'Email service is not configured.' }, { status: 503 });
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone / WhatsApp', phone],
    ['Email', email || '-'],
    ['Destination', destination || '-'],
    ['Wedding date', date || 'Flexible'],
    ['Guests', guests || '-'],
    ['Message', message || '-'],
    ['Page / source', source || '-'],
  ];

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE !== 'false',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: `"${SITE.name} Website" <${SMTP_USER}>`,
      to: SITE.email,
      ...(email ? { replyTo: `"${name}" <${email}>` } : {}),
      subject: `New enquiry: ${name}${destination ? ` | ${destination}` : ''}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html:
        `<h2 style="font-family:Arial,sans-serif">New wedding enquiry</h2>` +
        `<table cellpadding="8" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
        rows.map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee"><b>${k}</b></td><td style="border-bottom:1px solid #eee">${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('') +
        `</table>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] send failed', e);
    return NextResponse.json({ ok: false, error: 'We could not send your enquiry. Please call or WhatsApp us.' }, { status: 502 });
  }
}
