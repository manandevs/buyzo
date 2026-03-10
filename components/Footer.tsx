"use client";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="footer-wrapper bg-gray-100 text-black relative">
      <footer className="footer max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-semibold">Innovated for Industry Leaders.</h4>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center bg-black p-3 rounded-full hover:bg-black transition text-white"
            aria-label="Back to top"
          >
            <FiArrowRight size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <Link
            href="/"
            className="text-4xl md:text-5xl font-typefesse tracking-[-4px] md:tracking-[-6px]"
          >
            Buyzo
          </Link>

          <div className="flex flex-col gap-4 justify-center items-center sm:items-start">
            <Link href="/food-service" className="hover:underline">Food Service</Link>
            <Link href="/food-processing" className="hover:underline">Food Processing</Link>
            <Link href="/agriculture" className="hover:underline">Agriculture</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-300 pt-6 text-sm text-black gap-4">
          <span>© Yucca 2026. All Rights Reserved</span>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:underline">Contact Us</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:underline">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}