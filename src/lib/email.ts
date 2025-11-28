// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendBroByteEmailArgs = {
  subject: string;
  text: string;
  html: string;
};

export async function sendBroByteEmail({ subject, text, html }: SendBroByteEmailArgs) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    throw new Error('Missing RESEND_API_KEY');
  }

  // ✅ Always have a valid "from" (falls back to sandbox sender)
  const from = process.env.RESEND_FROM_EMAIL || 'BroByte Solutions <onboarding@resend.dev>';

  // ✅ Always have a valid "to"
  const to = process.env.RESEND_TO_EMAIL || 'shahed08.hossain@gmail.com';

  const { error } = await resend.emails.send({
    from,
    to, // a single email string is fine
    subject,
    text,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    throw error;
  }
}