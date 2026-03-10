"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Marquee texts related to Buyzo (e-commerce store like Daraz or Tumu)
const marqueeTexts1 = [
  "Fast Delivery",
  "Best Prices",
  "Top Brands",
  "Exclusive Deals",
  "Shop Now",
];

const marqueeTexts2 = [
  "New Arrivals",
  "Daily Offers",
  "Secure Payments",
  "Customer Support",
  "Buyzo Marketplace",
];

export default function Marquee() {
  return (
    <section className="w-full bg-black overflow-hidden py-36 md:py-48 lg:py-72 relative flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-[196px] font-typefesse tracking-tighter text-white opacity-25 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        Buyzo
      </h1>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop" as const,
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {marqueeTexts1.concat(marqueeTexts1).map((text, idx) => (
            <span
              key={idx}
              className="uppercase text-xl md:text-8xl font-bitcountPropDoubleInk bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent"
            >
              {text}
            </span>
          ))}
        </motion.div>

        {/* Second line */}
        <motion.div
          className="flex gap-16 whitespace-nowrap mt-12"
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop" as const,
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {marqueeTexts2.concat(marqueeTexts2).map((text, idx) => (
            <span
              key={idx}
              className="uppercase text-xl md:text-8xl font-bitcountPropDoubleInk bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}