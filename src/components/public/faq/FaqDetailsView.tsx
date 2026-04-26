import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { FaqAccordionItem } from "./FaqAccordionItem";

export const FaqDetailsView = ({ selectedCategory, activeCategoryData, questions, onBack }: any) => (
  <motion.div
    key="details"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="max-w-4xl mx-auto"
  >
    <button
      onClick={onBack}
      className="flex items-center gap-2 mb-8 group text-zinc-400 hover:text-white transition-colors"
    >
      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      <span>Back to Categories</span>
    </button>

    <div className="flex items-center gap-4 mb-12 py-3 px-4 border border-dashed border-gray-800 rounded-2xl">
      <div className="relative size-24">
        <Image
          src={activeCategoryData?.img || ""}
          alt=""
          fill
          className="object-contain"
          loading="eager"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="h3" weight="bold">{selectedCategory}</Typography>
        <Typography variant="p" className="opacity-60">{activeCategoryData?.desc}</Typography>
      </div>
    </div>

    <div className="space-y-2.5">
      {questions.length > 0 ? (
        questions.map((faq: any, index: number) => (
          <FaqAccordionItem key={index} question={faq.q} answer={faq.a} />
        ))
      ) : (
        <div className="py-12 border border-dashed border-white/20 text-center">
          <Typography variant="p">Detailed information for this category is coming soon.</Typography>
        </div>
      )}
    </div>
  </motion.div>
);
