import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, request, private: isPrivate } = body;

    if (!name || !request) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Resend integration (uncomment and install resend package) ──────────
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // const recipients = isPrivate
    //   ? [process.env.PASTOR_EMAIL ?? 'pastor@bikfayabaptist.org']
    //   : [process.env.PRAYER_TEAM_EMAIL ?? 'prayer@bikfayabaptist.org'];
    //
    // await resend.emails.send({
    //   from: 'website@bikfayabaptist.org',
    //   to: recipients,
    //   subject: `Prayer Request${isPrivate ? ' (PRIVATE)' : ''} from ${name}`,
    //   html: `
    //     <h2>Prayer Request${isPrivate ? ' — PRIVATE (Pastors Only)' : ''}</h2>
    //     <p><strong>From:</strong> ${name}</p>
    //     <p><strong>Request:</strong></p>
    //     <p>${request}</p>
    //   `,
    // });
    // ──────────────────────────────────────────────────────────────────────

    if (process.env.NODE_ENV === 'development') {
      console.log('[Prayer Request]', { name, request, isPrivate });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Prayer API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
