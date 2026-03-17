"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "./SidebarProvider";
import Image from "next/image";

interface SidebarProps {
  id: string;
  children: React.ReactNode;
  closeButtonClass?: string;
}

export default function Sidebar({ id, children, closeButtonClass }: SidebarProps) {
  const { activeSidebar, closeSidebar } = useSidebar();
  const isOpen = activeSidebar === id;

  // Prevent scrolling on the body when the sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark transparent backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Floating White Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-4 right-4 bottom-4 w-[calc(100vw-32px)] sm:w-115 md:w-125 bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] z-100 flex flex-col overflow-hidden"
          >
            {/* Close Button Container */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={closeSidebar}
                className={`hover:scale-110 transition-all duration-200 ${closeButtonClass}`}
                aria-label="Close Sidebar"
              >
                <Image
                  src={"/images/cross.png"}
                  alt="cross"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-4 text-black relative">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}