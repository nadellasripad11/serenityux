import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const TO_EMAIL = 'nadellasripad11@gmail.com';
const DAILY_LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Best-effort in-memory rate limit, keyed by sender IP and by the email
 * address they typed in. Serverless instances are ephemeral so this isn't
 * bulletproof, but it stops casual repeat-submitting from the same warm
 * instance, which is the realistic threat on a personal site.
 */
const hits = new Map();

function isRateLimited(key) {
  const entry = hits.get(key);
  return Boolean(entry && Date.now() <= entry.resetAt && entry.count >= DAILY_LIMIT);
}

function recordHit(key) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  entry.count += 1;
}

function cleanupExpired() {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request) {
  cleanupExpired();

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const type = String(body.type ?? '').trim();
  const message = String(body.message ?? '').trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !message || !emailPattern.test(email)) {
    return Response.json(
      { error: 'Please fill out every field with a valid email.' },
      { status: 400 }
    );
  }

  if (name.length > 200 || email.length > 200 || type.length > 100 || message.length > 5000) {
    return Response.json({ error: 'That field is too long.' }, { status: 400 });
  }

  const limitedByIp = isRateLimited(`ip:${ip}`);
  const limitedByEmail = isRateLimited(`email:${email.toLowerCase()}`);

  if (limitedByIp || limitedByEmail) {
    return Response.json(
      {
        error:
          "You've hit today's limit of 3 messages. You can't spam this - try again tomorrow.",
      },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: 'Email is not configured yet. Try again later.' },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Portfolio contact form <onboarding@resend.dev>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `${type || 'New message'} from ${name}`,
      text: `From: ${name} <${email}>\nType: ${type}\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Type:</strong> ${escapeHtml(type)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    recordHit(`ip:${ip}`);
    recordHit(`email:${email.toLowerCase()}`);

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return Response.json(
      { error: 'Something went wrong sending your message. Try again.' },
      { status: 500 }
    );
  }
}
