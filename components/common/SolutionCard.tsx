"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion, easeOut } from "framer-motion";

interface SolutionCardProps {
  title: string;
  description: string;
  href: string;
  images: string;
  isImages?: boolean;
}

export default function SolutionCard({ title, description, href, images, isImages = true }: SolutionCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col rounded-xl shadow-xl shadow-black/20 bg-gray-800 text-white h-72 w-full overflow-hidden cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Background Image */}
      {isImages && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={images}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay to ensure top-left title is always readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
        </div>
      )}

      {/* Default State Title (matches your top-left design) */}
      <motion.h3
        className="text-xl font-bold absolute top-4 left-4 z-10"
        variants={{
          rest: { opacity: 1, y: 0 },
          hover: { opacity: 0, y: -10 },
        }}
        transition={{ duration: 0.3, ease: easeOut }}
      >
        {title}
      </motion.h3>

      {/* Hover Content Overlay */}
      <motion.div
        // Use Framer Motion for visibility instead of CSS display: hidden to keep animations smooth
        className="absolute inset-0 flex flex-col justify-between p-5 bg-white text-gray-900 z-20"
        variants={{
          rest: { opacity: 0, y: "10%", pointerEvents: "none" },
          hover: { opacity: 1, y: 0, pointerEvents: "auto" },
        }}
        transition={{ duration: 0.3, ease: easeOut }}
      >
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {/* line-clamp prevents long descriptions from blowing out the card height */}
          <p className="text-sm font-medium text-gray-600 line-clamp-5">
            {description}
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[#7B1FA2] font-semibold mt-auto group/link"
          aria-label={`Explore ${title}`}
        >
          Tell me more
          <FiArrowRight
            size={18}
            strokeWidth={2}
            className="group-hover/link:translate-x-1.5 transition-transform duration-300"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}