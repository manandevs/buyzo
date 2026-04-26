"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

export default function ContactMarquee() {
  const marqueeItems = [
    "Not sure what's possible? Get in touch to find out.",
    "Ready to scale your brand? Let's talk strategy.",
    "Have questions about bulk orders? Reach out today.",
    "Looking for custom solutions? Our team is here to help.",
    "Want to sell on Buyzo? Join our marketplace.",
    "Need lightning-fast delivery? Explore our logistics.",
  ];

  return (
    <Container
      clean
      py={"lg"}
      as={"section"}
      variant={"full"}
      className="relative overflow-hidden"
    >
      <Container className="mb-16">
        <Typography variant={"h2"} weight={"bold"} className="max-w-5xl">
          Brands that thrive invest in custom-designed packaging. Let us help
          bring your vision to life.
        </Typography>

        {/* The Stylized Logo Callout from the design */}
        <div className="mt-10 flex justify-end">
          <div className="-rotate-6 hover:rotate-0 transition-transform duration-500">
            <Link
              href="/"
              className="text-7xl md:text-9xl font-typefesse tracking-tighter opacity-80 hover:opacity-100"
            >
              Buyzo
            </Link>
          </div>
        </div>
      </Container>

      {/* The Infinite Slider (Marquee) */}
      <div className="border-y border-zinc-800 py-10 overflow-hidden bg-zinc-950/50">
        <Link href="/contact" aria-label="Get in touch" className="block w-full group">
          <motion.div
            className="flex whitespace-nowrap gap-16 text-xl md:text-2xl font-medium"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // Slightly slower for better readability
              ease: "linear",
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...marqueeItems, ...marqueeItems].map((text, i) => (
              <Typography variant={"p"} key={i} className="flex items-center gap-8">
                <span className="text-zinc-300 group-hover:text-white transition-colors">
                  {text}
                </span>

                <ArrowUpRight />
              </Typography>
            ))}
          </motion.div>
        </Link>
      </div>
    </Container>
  );
}