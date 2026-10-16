import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Resend integration (uncomment and install resend package) ──────────
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'website@bikfayabaptist.org',
    //   to: process.env.CONTACT_EMAIL ?? 'info@bikfayabaptist.org',
    //   subject: `New Contact: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone ?? 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });
    // ──────────────────────────────────────────────────────────────────────

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact Form]', { name, email, phone, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
