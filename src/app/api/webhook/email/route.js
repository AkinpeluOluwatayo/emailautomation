import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req) {
    try {
        const payload = await req.json();

        if (payload.type === 'email.received') {
            const customerEmail = payload.data.from;
            const originalSubject = payload.data.subject;

            await resend.emails.send({
                from: 'Elroi Support <onboarding@resend.dev>',
                to: customerEmail,
                subject: `Registration Steps: ${originalSubject}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 30px;">
                        <h2 style="color: #2d5a27;">Next Steps: Registration</h2>
                        <p>Thank you for your interest in <strong>Elroi Farms</strong>.</p>
                        <ol>
                            <li>Verify Profile</li>
                            <li>Select Plan</li>
                            <li>Onboarding Call</li>
                        </ol>
                        <a href="https://emailautomation-eight.vercel.app/register" style="background: #2d5a27; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Begin Registration Now</a>
                    </div>
                `
            });
        }
        return NextResponse.json({ processed: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}