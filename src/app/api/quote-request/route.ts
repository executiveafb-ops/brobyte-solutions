// src/app/api/quote/route.ts
import { sendBroByteEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Expected: { name, email, message }
    
    if (!data?.name || !data?.email || !data?.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await sendBroByteEmail({
      subject: Quote Request from ${data.name},
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
     `,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
    });

    return new Response(
      JSON.stringify({ success: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Email send failed:", error);

    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
}