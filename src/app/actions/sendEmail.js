'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPracticeEmails() {
    const contacts = [
        { name: "Akinpelu Tayo", email: "akinpeluoluwatayo1235@gmail.com" },
    ];

    try {
        const results = await Promise.all(
            contacts.map((contact) =>
                resend.emails.send({
                    from: 'Elroi Farms <onboarding@resend.dev>',
                    to: contact.email,
                    subject: 'Welcome to Elroi Farms and Technologies',
                    // Adding a modern, clean HTML structure
                    html: `
                        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                            <h2 style="color: #2d5a27; text-align: center;">Welcome to the Future of Farming</h2>
                            <p>Hello <strong>${contact.name}</strong>,</p>
                            <p>Thank you for connecting with <strong>Elroi Farms and Technologies</strong>. We are committed to bridging the gap between agriculture and modern technology.</p>
                            <p>Whether you're interested in our fresh produce or our tech-driven agricultural solutions, we're excited to have you with us.</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="#" style="background-color: #2d5a27; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explore Our Solutions</a>
                            </div>
                            <hr style="border: none; border-top: 1px solid #eee;" />
                            <p style="font-size: 12px; color: #888; text-align: center;">
                                © 2026 Elroi Farms and Technologies. All rights reserved.
                            </p>
                        </div>
                    `,
                })
            )
        );

        return { success: true, results };
    } catch (error) {
        return { success: false, error: error.message };
    }
}