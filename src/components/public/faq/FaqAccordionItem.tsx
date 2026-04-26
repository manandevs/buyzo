import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-sm">
      <div className="p-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-white/5 rounded-sm",
            isOpen && "bg-white/5"
          )}
        >
          <Typography variant="large" weight="semibold">{question}</Typography>
          <ChevronDown
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            size={20}
          />
        </button>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-3 border-t border-white/5 text-zinc-400">
          <Typography variant="p">{answer}</Typography>
        </div>
      </motion.div>
    </div>
  );
}
