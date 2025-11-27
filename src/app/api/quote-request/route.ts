// src/app/api/quote-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendBroByteEmail } from '@/lib/email';

const quoteRequestSchema = z.object({
  projectType: z.string().min(1),
  budgetRange: z.string().min(1),
  billingPreference: z.string().min(1),
  paymentMode: z.string().min(1),
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  notes: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.parse(body);

    // Very safe: no template literals, simple concat
    const subject =
      'Quote request from ' +
      parsed.companyName +
      ' - ' +
      parsed.projectType;

    const text =
      'Project type: ' + parsed.projectType + '\n' +
      'Budget range: ' + parsed.budgetRange + '\n' +
      'Billing preference: ' + parsed.billingPreference + '\n' +
      'Payment mode: ' + parsed.paymentMode + '\n\n' +
      'Company: ' + parsed.companyName + '\n' +
      'Contact: ' + parsed.contactName + '\n' +
      'Email: ' + parsed.email + '\n\n' +
      'Notes:\n' + parsed.notes;

    // Simple HTML: just wrap the text in <pre>
    const safeTextForHtml = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const html =
      '<pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif;">' +
      safeTextForHtml +
      '</pre>';

    await sendBroByteEmail({
      subject,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Quote request error:', error);
    const message =
      error.name === 'ZodError'
        ? 'Invalid data submitted'
        : 'Failed to submit quote request';
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}