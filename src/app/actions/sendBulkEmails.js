'use server'
import { Resend } from 'resend';
import contacts from '@/lib/contacts.json';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBulkEmails() {
    const chunkSize = 50;
    const results = [];
    const total = contacts?.length || 0;

    if (total === 0) return { success: false, error: "No contacts found." };

    try {
        for (let i = 0; i < total; i += chunkSize) {
            const chunk = contacts.slice(i, i + chunkSize);

            const batchResults = await Promise.all(
                chunk.map((contact) =>
                    resend.emails.send({
                        from: 'Elroi Farms <onboarding@resend.dev>',
                        to: contact.email,
                        subject: 'Welcome to Elroi Farms and Technologies',
                        html: `<p>Hello ${contact.name}, welcome to Elroi Farms!</p>`,
                    })
                )
            );

            results.push(...batchResults);

            if (i + chunkSize < total) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
        return { success: true, totalSent: results.length };
    } catch (error) {
        return { success: false, error: error.message };
    }
}