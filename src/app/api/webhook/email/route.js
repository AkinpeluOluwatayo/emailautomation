import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Safety check for the API key during the build process
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req) {
    try {
        const payload = await req.json();

        // 1. Check if the event is a received email (the customer's reply)
        if (payload.type === 'email.received') {
            const customerEmail = payload.data.from;
            const originalSubject = payload.data.subject;

            // 2. Trigger the Registration Process Follow-Up
            await resend.emails.send({
                from: 'Elroi Support <onboarding@resend.dev>',
                to: customerEmail,
                subject: `Registration Steps: ${originalSubject}`,
                html: `
                    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 30px; line-height: 1.6;">
                        <h2 style="color: #2d5a27; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Next Steps: Registration</h2>
                        <p>Hello,</p>
                        <p>Thank you for your interest in joining <strong>Elroi Farms and Technologies</strong>. To complete your registration and gain access to our agricultural dashboard, please follow these three simple steps:</p>
                        
                        <ol style="color: #444; padding-left: 20px;">
                            <li style="margin-bottom: 15px;">
                                <strong>Profile Verification:</strong> Click the link below to verify your identity and business details.
                            </li>
                            <li style="margin-bottom: 15px;">
                                <strong>Select Your Plan:</strong> Choose between our <em>Agri-Tech Starter</em> or <em>Enterprise</em> solutions depending on your farm's scale.
                            </li>
                            <li style="margin-bottom: 15px;">
                                <strong>Onboarding Call:</strong> Once your profile is ready, you can schedule a 15-minute call with our technical team.
                            </li>
                        </ol>

                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://emailautomation-eight.vercel.app/register" 
                               style="background-color: #2d5a27; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                               Begin Registration Now
                            </a>
                        </div>

                        <p style="font-size: 14px; color: #666;">
                            If you have any questions during this process, simply reply to this email. We are here to help you grow.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
                        <p style="font-size: 11px; color: #aaa; text-align: center;">
                            Elroi Farms and Technologies <br />
                            Innovating the Future of Agriculture
                        </p>
                    </div>
                `
            });
        }

        return NextResponse.json({ processed: true }, { status: 200 });
    } catch (error) {
        console.error("Webhook Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}