import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Buyzo",
  description: "Buyzo terms and conditions (placeholder).",
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 2026</p>
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
          <p>
            This is a placeholder terms and conditions page for Buyzo. Replace it with your
            lawyer-reviewed terms before accepting real orders.
          </p>
          <p>
            Your final terms should cover use of the site, account rules, product descriptions and
            pricing, orders and acceptance, payment, shipping and returns, limitations of liability,
            and governing law.
          </p>
          <p>
            Questions? Reach us through the{" "}
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
