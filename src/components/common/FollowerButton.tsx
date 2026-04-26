"use client";

import React, { useRef, useState, useEffect, ReactNode, FC } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowerButtonProps {
  children: ReactNode;
}

export const FollowerButton: FC<FollowerButtonProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Setup Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Add "Spring" for that smooth, high-end feel (removes the "hard" 1:1 feel)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Handle Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Calculate position relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };

  // 4. Hide/Show real cursor logic
  useEffect(() => {
    if (isHovered) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => { document.body.style.cursor = "auto"; };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-none"
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              x: smoothX,
              y: smoothY,
              translateX: "-50%", // Center the follower on cursor
              translateY: "-50%",
              pointerEvents: "none",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="z-50"
          >
            <Link href="/shop" className="relative flex items-center justify-center">
              {/* Outer Dashed Spinning Ring */}
              <div
                className={cn(
                  "absolute w-44 h-44 md:w-60 md:h-60 rounded-full border border-dashed border-purple-500/50 animate-[spin_10s_linear_infinite]"
                )}
              />

              {/* Main Circular Button */}
              <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                <span className="text-black font-bold text-sm md:text-base mb-1 uppercase tracking-tighter">
                  Shop Now
                </span>
                <div className="bg-black text-white p-2 md:p-3 rounded-full">
                  <ArrowUpRight size={24} strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};