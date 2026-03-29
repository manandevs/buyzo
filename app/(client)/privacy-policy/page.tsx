import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Buyzo",
  description: "Buyzo privacy policy (placeholder).",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 2026</p>
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
          <p>
            This is a placeholder privacy policy for Buyzo. Replace this page with your final legal
            text before launch. It outlines how you collect, use, and protect customer data on your
            e-commerce platform.
          </p>
          <p>
            When you go live, describe what personal information you collect (for example account
            details, order and payment information, and analytics), how you use it, who you share it
            with, retention periods, and the rights shoppers have under applicable law.
          </p>
          <p>
            For questions about this policy, contact us via the{" "}
            <Link href="/contact" className="text-[#BA68C8] hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
