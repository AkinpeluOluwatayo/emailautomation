'use server'
import { Resend } from 'resend';
// Ensure your file is at: src/lib/contacts.json
import contacts from '@/lib/contacts.json';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBulkEmails() {
    const chunkSize = 50;
    const results = [];
    const total = contacts?.length || 0;

    if (total === 0) {
        return { success: false, error: "The contacts list is empty or missing." };
    }

    console.log(`[ELROI BULK] Starting send to ${total} contacts...`);

    try {
        for (let i = 0; i < total; i += chunkSize) {
            const chunk = contacts.slice(i, i + chunkSize);

            console.log(`[ELROI BULK] Processing batch ${Math.floor(i/chunkSize) + 1}...`);

            // 1. Send batch of 50 simultaneously
            const batchResults = await Promise.all(
                chunk.map((contact) =>
                    resend.emails.send({
                        from: 'Elroi Farms <hello@yourdomain.com>', // Replace with your verified domain later
                        to: contact.email,
                        subject: 'Welcome to Elroi Farms and Technologies',
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #2d5a27; border-radius: 12px; padding: 25px;">
                                <h2 style="color: #2d5a27;">Hello ${contact.name}!</h2>
                                <p>Welcome to <strong>Elroi Farms and Technologies</strong>. We are thrilled to have you join our agricultural community.</p>
                                <p>Keep an eye on your inbox for our upcoming tech-driven farming solutions.</p>
                                <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
                                <p style="font-size: 11px; color: #888; text-align: center;">© 2026 Elroi Farms and Technologies</p>
                            </div>
                        `,
                    })
                )
            );

            results.push(...batchResults);

            // 2. Wait 2 seconds between batches, but only if there are more batches left
            if (i + chunkSize < total) {
                console.log(`[ELROI BULK] Pausing for 2 seconds to respect rate limits...`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }

        console.log(`[ELROI BULK] Successfully sent all ${results.length} emails.`);
        return { success: true, totalSent: results.length };

    } catch (error) {
        console.error("[ELROI BULK] Error encountered:", error.message);
        return { success: false, error: error.message };
    }
}