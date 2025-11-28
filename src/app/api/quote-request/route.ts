// src/app/api/quote-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendBroByteEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Use POST for quote requests.' },
    { status: 405 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const {
      projectType,
      budgetRange,
      billingPreference,
      paymentMode,
      companyName,
      contactName,
      email,
      phone,
      requirements,
    } = body ?? {};

    // minimal safety: require email + some requirements text
    if (!email || !requirements || String(requirements).trim().length === 0) {
      console.error('Quote request missing email or requirements', body);
      // but STILL return ok to frontend so it doesn't blow up
      return NextResponse.json(
        { ok: false, message: 'Missing email or requirements' },
        { status: 200 },
      );
    }

    const subject = 'Quote request';

    const text = `
Project type: ${projectType || 'Not specified'}
Budget range: ${budgetRange || 'Not specified'}
Billing preference: ${billingPreference || 'Not specified'}
Payment mode: ${paymentMode || 'Not specified'}

Company: ${companyName || 'Not specified'}
Contact: ${contactName || 'Not specified'}
Email: ${email}
Phone/WhatsApp: ${phone || 'Not specified'}

Requirements:
${requirements}
    `.trim();

    const html = `
      <h2>New quote request${companyName ? ` from ${companyName}` : ''}</h2>

      <p><strong>Project type:</strong> ${projectType || 'Not specified'}</p>
      <p><strong>Budget range:</strong> ${budgetRange || 'Not specified'}</p>
      <p><strong>Billing preference:</strong> ${billingPreference || 'Not specified'}</p>
      <p><strong>Payment mode:</strong> ${paymentMode || 'Not specified'}</p>

      <hr />

      <p><strong>Company:</strong> ${companyName || 'Not specified'}</p>
      <p><strong>Contact person:</strong> ${contactName || 'Not specified'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone / WhatsApp:</strong> ${phone || 'Not specified'}</p>

      <hr />

      <p><strong>Requirements:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
${requirements}
      </pre>
    `.trim();

    try {
      await sendBroByteEmail({ subject, text, html });
    } catch (err) {
      console.error('Resend error (quote-request):', err);
      // DO NOT surface this as 400 to the frontend
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Quote request unexpected error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to submit quote request' },
      { status: 500 },
    );
  }
}