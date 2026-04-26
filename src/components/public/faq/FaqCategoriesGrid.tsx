import { motion } from "framer-motion";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";

export const FaqCategoriesGrid = ({ categories, onSelect }: any) => (
  <motion.div
    key="grid"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div className="flex flex-col mb-8">
      <Typography variant="h2" weight="bold">FAQ Help Center</Typography>
      <Typography variant="p" className="opacity-60">How can we help you today?</Typography>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((cat: any, i: number) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(cat.title)}
          className="group py-2 px-4 border border-white/25 cursor-pointer flex flex-col items-center justify-between gap-2 hover:bg-white/5 transition-colors"
        >
          <div className="relative size-44 transform group-hover:scale-110 transition-transform duration-300 ease-out">
            <Image
              src={cat.img}
              alt={cat.title}
              fill
              className="object-contain"
              sizes="150px"
              loading="eager"
            />
          </div>

          <div className="flex flex-col text-center">
            <Typography variant="h4" weight="bold">{cat.title}</Typography>
            <Typography variant="p" className="text-xs opacity-70">{cat.desc}</Typography>
          </div>

          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-[#BA68C8]" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);
