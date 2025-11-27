// src/lib/email.ts
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

// Debug warnings (only show in console if missing)
if (!fromEmail) {
  console.warn('⚠ RESEND_FROM_EMAIL is not set. Email sending will fail.');
}

if (!toEmail) {
  console.warn('⚠ RESEND_TO_EMAIL is not set. Email sending will fail.');
}

// Initialize Resend only if API key exists
export const resend =
  resendApiKey && resendApiKey.trim().length > 0
    ? new Resend(resendApiKey)
    : null;

// Email payload interface
export interface BaseEmailPayload {
  subject: string;
  html: string;
  text: string;
}

// Email sender function
export async function sendBroByteEmail(payload: BaseEmailPayload) {
  if (!resend) {
    console.error('❌ Resend client not configured. Check RESEND_API_KEY.');
    throw new Error('Email client not configured');
  }

  if (!fromEmail || !toEmail) {
    console.error('❌ From/To email not configured');
    throw new Error('From/To email not configured');
  }

  const response = await resend.emails.send({
    from: fromEmail,
    to: [toEmail], // ✅ Array format (Resend recommended)
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  });

  console.log('📬 Resend response:', response);
  return response;
}