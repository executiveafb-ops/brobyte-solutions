// src/app/api/quote-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendBroByteEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const quoteRequestSchema = z.object({
  projectType: z.string().min(1),
  budgetRange: z.string().min(1),
  billingPreference: z.string().min(1),
  paymentMode: z.string().min(1),
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  requirements: z.string().min(10),
});

export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Use POST for quote requests.' },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.parse(body);

    // 📛 FIXED — Subject must be EXACTLY this
    const subject = 'Quote request';

    const text = `
Project type: ${parsed.projectType}
Budget range: ${parsed.budgetRange}
Billing preference: ${parsed.billingPreference}
Payment mode: ${parsed.paymentMode}

Company: ${parsed.companyName}
Contact: ${parsed.contactName}
Email: ${parsed.email}
Phone/WhatsApp: ${parsed.phone || 'Not specified'}

Requirements:
${parsed.requirements}
    `.trim();

    const html = `
      <h2>New quote request from ${parsed.companyName}</h2>

      <p><strong>Project type:</strong> ${parsed.projectType}</p>
      <p><strong>Budget range:</strong> ${parsed.budgetRange}</p>
      <p><strong>Billing preference:</strong> ${parsed.billingPreference}</p>
      <p><strong>Payment mode:</strong> ${parsed.paymentMode}</p>

      <hr />

      <p><strong>Company:</strong> ${parsed.companyName}</p>
      <p><strong>Contact person:</strong> ${parsed.contactName}</p>
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