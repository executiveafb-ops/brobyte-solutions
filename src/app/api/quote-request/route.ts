// src/app/api/quote-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendBroByteEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Make schema tolerant: only email + requirements must be valid
const quoteRequestSchema = z
  .object({
    projectType: z.string().optional(),
    budgetRange: z.string().optional(),
    billingPreference: z.string().optional(),
    paymentMode: z.string().optional(),
    companyName: z.string().optional(),
    contactName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    requirements: z.string().min(1, 'Please describe your requirements'),
  })
  .passthrough(); // ignore any extra fields from the form

export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Use POST for quote requests.' },
    { status: 405 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.parse(body);

    const subject = 'Quote request';

    const text = `
Project type: ${parsed.projectType || 'Not specified'}
Budget range: ${parsed.budgetRange || 'Not specified'}
Billing preference: ${parsed.billingPreference || 'Not specified'}
Payment mode: ${parsed.paymentMode || 'Not specified'}

Company: ${parsed.companyName || 'Not specified'}
Contact: ${parsed.contactName || 'Not specified'}
Email: ${parsed.email}
Phone/WhatsApp: ${parsed.phone || 'Not specified'}

Requirements:
${parsed.requirements}
    `.trim();

    const html = `
      <h2>New quote request${parsed.companyName ? ` from ${parsed.companyName}` : ''}</h2>

      <p><strong>Project type:</strong> ${parsed.projectType || 'Not specified'}</p>
      <p><strong>Budget range:</strong> ${parsed.budgetRange || 'Not specified'}</p>
      <p><strong>Billing preference:</strong> ${parsed.billingPreference || 'Not specified'}</p>
      <p><strong>Payment mode:</strong> ${parsed.paymentMode || 'Not specified'}</p>

      <hr />

      <p><strong>Company:</strong> ${parsed.companyName || 'Not specified'}</p>
      <p><strong>Contact person:</strong> ${parsed.contactName || 'Not specified'}</p>
      <p><strong>Email:</strong> ${parsed.email}</p>
      <p><strong>Phone / WhatsApp:</strong> ${parsed.phone || 'Not specified'}</p>

      <hr />

      <p><strong>Requirements:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
${parsed.requirements}
      </pre>
    `.trim();

    await sendBroByteEmail({
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Quote request error:', error);

    const message =
      error?.name === 'ZodError'
        ? 'Invalid data submitted'
        : 'Failed to submit quote request';

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}