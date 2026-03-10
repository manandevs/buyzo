"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTA() {
  const items = new Array(6).fill(
    "Not sure what's possible? Get in touch to find out."
  );

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Brands that thrive invest in custom-designed packaging. Let us help
          bring your vision to life.
        </h2>

        <div className="relative -rotate-6 ml-auto">
          <Link
            href="/"
            className="text-6xl md:text-8xl font-typefesse"
          >
            Buyzo
          </Link>
        </div>
      </div>

      <div className="mt-20 border-y border-gray-800 py-10 overflow-hidden">
        <Link href="/contact" aria-label="Enquire now" className="block w-full">

          <motion.div
            className="flex whitespace-nowrap gap-16 text-xl font-medium"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
          >
            {[...items, ...items].map((text, i) => (
              <div key={i} className="flex items-center gap-6">
                <span>{text}</span>

                <svg width="40" height="40" viewBox="0 0 80 80" fill="none">
                  <path
                    d="M57.2318 20.2935C57.9245 19.8361 58.8666 19.9137 59.4764 20.5236C60.0863 21.1334 60.1639 22.0755 59.7065 22.7682L59.4764 23.047L22.5235 60L20 57.4765L56.953 20.5236L57.2318 20.2935Z"
                    fill="white"
                  />
                  <path
                    d="M56.4295 23.5691H20.7383V20H59.9986V59.2603H56.4295V23.5691Z"
                    fill="white"
                  />
                </svg>
              </div>
            ))}
          </motion.div>

        </Link>
      </div>

    </section>
  );
}