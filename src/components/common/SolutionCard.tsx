"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/Typography";

interface SolutionCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
  className?: string;
}

export default function SolutionCard({
  title,
  description,
  href,
  image,
  className,
}: SolutionCardProps) {
  return (
    <Link href={"#"} className={cn("block w-full h-full", className)}>
      <motion.div
        className="group relative flex flex-col rounded-xl shadow-xl shadow-black/20 bg-gray-800 text-white h-45 lg:h-72 w-full overflow-hidden cursor-pointer"
        initial="initial"
        whileHover="hover"
        animate="initial"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:blur-[2px]"
          />
          {/* Default Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 transition-opacity duration-500 group-hover:opacity-0" />
        </div>

        {/* Initial View: Top Left Title */}
        <motion.div
          className="relative z-10 p-3 lg:p-5"
          variants={{
            initial: { opacity: 1, y: 0 },
            hover: { opacity: 0, y: -20 },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography variant={'lead'} weight={'bold'}>
            {title}
          </Typography>
        </motion.div>

        {/* Hover View: White Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6 bg-white text-zinc-900 z-20"
          variants={{
            initial: { y: "100%" },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <Typography variant={'small'} className="text-purple-600">
              Category
            </Typography>
            <Typography variant={'lead'} weight={'bold'}>
              {title}
            </Typography>
            <Typography variant={'small'} className="text-zinc-600 line-clamp-4 mt-1">
              {description}
            </Typography>
          </div>

          <Typography variant={'small'} className="flex items-center gap-2 mt-auto text-purple-600">
            Tell me more
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 5 },
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.6,
              }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </Typography>
        </motion.div>
      </motion.div>
    </Link>
  );
}