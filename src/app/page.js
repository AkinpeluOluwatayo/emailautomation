'use client'
import { sendPracticeEmails } from './actions/sendEmail';

export default function Home() {
  const handleSend = async () => {
    const response = await sendPracticeEmails();
    if (response.success) {
      alert("Emails sent successfully!");
    } else {
      alert("Error: " + response.error);
    }
  };

  return (
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <h1 className="text-2xl font-bold mb-4">Email Automation Practice</h1>
        <button
            onClick={handleSend}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send Test Emails
        </button>
      </main>
  );
}