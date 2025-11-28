// src/app/api/service-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendBroByteEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Use POST for service requests.' },
    { status: 405 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const {
      serviceType,
      templateType,
      projectComplexity,
      budgetRange,
      timeline,
      companyName,
      contactName,
      email,
      phone,
      integrations,
      requirements,
      files,
    } = body ?? {};

    // minimal safety
    if (!email || !requirements || String(requirements).trim().length === 0) {
      console.error('Service request missing email or requirements', body);
      // still return ok-ish to frontend
      return NextResponse.json(
        { ok: false, message: 'Missing email or requirements' },
        { status: 200 },
      );
    }

    const subject = 'New service request';

    const filesSummary =
      Array.isArray(files) && files.length > 0
        ? files
            .map(
              (file: any) =>
                `- ${file?.name || 'Unnamed file'}${
                  file?.size ? ` (${file.size} bytes)` : ''
                }`,
            )
            .join('\n')
        : 'No files attached (UI stub only).';

    const text = `
Service type: ${serviceType || 'Not specified'}
Template vs custom: ${templateType || 'Not specified'}
Complexity: ${projectComplexity || 'Not specified'}
Budget range: ${budgetRange || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

Company: ${companyName || 'Not specified'}
Contact: ${contactName || 'Not specified'}
Email: ${email}
Phone/WhatsApp: ${phone || 'Not specified'}
Integrations: ${integrations || 'Not specified'}

Requirements:
${requirements}

Files:
${filesSummary}
    `.trim();

    const html = `
      <h2>New service request${companyName ? ` from ${companyName}` : ''}</h2>

      <p><strong>Service type:</strong> ${serviceType || 'Not specified'}</p>
      <p><strong>Template vs custom:</strong> ${templateType || 'Not specified'}</p>
      <p><strong>Complexity:</strong> ${projectComplexity || 'Not specified'}</p>
      <p><strong>Budget range:</strong> ${budgetRange || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>

      <hr />

      <p><strong>Company:</strong> ${companyName || 'Not specified'}</p>
      <p><strong>Contact:</strong> ${contactName || 'Not specified'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone / WhatsApp:</strong> ${phone || 'Not specified'}</p>
      <p><strong>Integrations:</strong> ${integrations || 'Not specified'}</p>

      <hr />

      <p><strong>Requirements:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
${requirements}
      </pre>

      <hr />

      <p><strong>Files (names only, no upload yet):</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
${filesSummary}
      </pre>
    `.trim();

    try {
      await sendBroByteEmail({ subject, text, html });
    } catch (err) {
      console.error('Resend error (service-request):', err);
      // don't break frontend
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Service request unexpected error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to submit service request' },
      { status: 500 },
    );
  }
}