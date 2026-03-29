"use client";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { STOREFRONT_CATEGORY_SLUGS, categoryHref } from "@/lib/storefront-nav";

export default function Footer() {
  return (
    <div className="footer-wrapper bg-gray-100 text-black relative">
      <footer className="footer max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <h4 className="text-lg sm:text-xl font-semibold pr-4">
            Quality products. Trusted shopping.
          </h4>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center bg-black p-3 rounded-full hover:bg-gray-900 transition text-white self-start sm:self-auto shrink-0"
            aria-label="Back to top"
          >
            <FiArrowRight size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-8 sm:mb-10">
          <Link
            href="/"
            className="text-4xl md:text-5xl font-typefesse tracking-[-4px] md:tracking-[-6px] lg:col-span-4 self-start"
          >
            Buyzo
          </Link>

          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Shop by category
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              {STOREFRONT_CATEGORY_SLUGS.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    href={categoryHref(slug)}
                    className="text-sm sm:text-base hover:underline underline-offset-4 decoration-black/40"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-300 pt-6 text-xs sm:text-sm text-black">
          <span className="text-center sm:text-left">© {new Date().getFullYear()} Buyzo. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
            <Link href="/contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:underline underline-offset-4">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
