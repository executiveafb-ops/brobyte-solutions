// src/app/api/service-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendBroByteEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const serviceRequestSchema = z.object({
  serviceType: z.string().min(1),
  templateType: z.string().min(1),
  projectComplexity: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  integrations: z.string().optional(),
  requirements: z.string().min(10),
  files: z
    .array(
      z.object({
        name: z.string(),
        size: z.number().optional(),
      }),
    )
    .optional(),
});

export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Use POST for service requests.' },
    { status: 405 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = serviceRequestSchema.parse(body);

    // 🚀 FIX APPLIED — EXACTLY AS REQUESTED:
    // PURE static subject line, no variables, no special characters.
    const subject = 'New service request';

    const filesSummary =
      parsed.files && parsed.files.length > 0
        ? parsed.files
            .map(
              (file) =>
                `- ${file.name}${file.size ? ` (${file.size} bytes)` : ''}`,
            )
            .join('\n')
        : 'No files attached (UI stub only).';

    const text = `
Service type: ${parsed.serviceType}
Template vs custom: ${parsed.templateType}
Complexity: ${parsed.projectComplexity || 'Not specified'}
Budget range: ${parsed.budgetRange || 'Not specified'}
Timeline: ${parsed.timeline || 'Not specified'}

Company: ${parsed.companyName}
Contact: ${parsed.contactName}
Email: ${parsed.email}
Phone/WhatsApp: ${parsed.phone || 'Not specified'}
Integrations: ${parsed.integrations || 'Not specified'}

Requirements:
${parsed.requirements}

Files:
${filesSummary}
    `.trim();

    const html = `
      <h2>New service request from ${parsed.companyName}</h2>

      <p><strong>Service type:</strong> ${parsed.serviceType}</p>
      <p><strong>Template vs custom:</strong> ${parsed.templateType}</p>
      <p><strong>Complexity:</strong> ${parsed.projectComplexity || 'Not specified'}</p>
      <p><strong>Budget range:</strong> ${parsed.budgetRange || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${parsed.timeline || 'Not specified'}</p>

      <hr />

      <p><strong>Company:</strong> ${parsed.companyName}</p>
      <p><strong>Contact:</strong> ${parsed.contactName}</p>
      <p><strong>Email:</strong> ${parsed.email}</p>
      <p><strong>Phone / WhatsApp:</strong> ${parsed.phone || 'Not specified'}</p>
      <p><strong>Integrations:</strong> ${parsed.integrations || 'Not specified'}</p>

      <hr />

      <p><strong>Requirements:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${
        parsed.requirements
      }</pre>

      <hr />

      <p><strong>Files (names only, no upload yet):</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${filesSummary}</pre>
    `.trim();

    await sendBroByteEmail({
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Service request error:', error);

    const message =
      error?.name === 'ZodError'
        ? 'Invalid data submitted'
        : 'Failed to submit service request';

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}