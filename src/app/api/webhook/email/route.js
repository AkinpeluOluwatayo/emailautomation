import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const payload = await req.json();

        // Check if the event is an incoming email (the reply)
        if (payload.type === 'email.received') {
            const customerEmail = payload.data.from;
            const originalSubject = payload.data.subject;

            // Trigger the Automatic Follow-Up
            await resend.emails.send({
                from: 'Elroi Support <onboarding@resend.dev>',
                to: customerEmail,
                subject: `Re: ${originalSubject}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #2d5a27; border-radius: 8px;">
                        <h3 style="color: #2d5a27;">Message Received!</h3>
                        <p>Thank you for reaching out to **Elroi Farms and Technologies**.</p>
                        <p>Our team has received your reply and we are currently reviewing your inquiry. We usually respond within 24 hours.</p>
                        <p>In the meantime, feel free to check our latest agricultural tech updates on our dashboard.</p>
                        <br />
                        <p>Best regards,<br />The Elroi Team</p>
                    </div>
                `
            });
        }

        return NextResponse.json({ processed: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}