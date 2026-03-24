'use client'
import { sendBulkEmails } from '@/app/actions/sendBulkEmails';

export default function Home() {
    const handleSend = async () => {
        const response = await sendBulkEmails();
        if (response.success) {
            alert("Emails sent successfully!");
        } else {
            alert("Error: " + response.error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-[#2d5a27]">Elroi Farms Automation</h1>
            <button
                onClick={handleSend}
                className="px-8 py-4 bg-[#2d5a27] text-white rounded-xl shadow-lg hover:bg-[#1e3d1a] transition-all transform active:scale-95 font-semibold"
            >
                Send Bulk Welcome Emails to People
            </button>
        </main>
    );
}