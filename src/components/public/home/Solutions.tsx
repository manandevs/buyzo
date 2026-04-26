"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Typography } from "../../ui/Typography";

export default function Solution() {
  const solutions = [
    {
      title: "Electronics",
      description:
        "Shop toys, games, baby care products, and essentials for your little ones.",
      href: "/toys",
      images: "/images/toys.png",
    },
    {
      title: "Home & Living",
      description:
        "Find everything for your home: furniture, decor, kitchen essentials, and smart devices at unbeatable prices.",
      href: "/home-living",
      images: "/images/home-living.png",
    },
  ];

  // First card active by default
  const [activeBg, setActiveBg] = useState<string>(solutions[0].images);

  return (
    <Container
      clean
      py={"lg"}
      as={"section"}
      variant={"full"}
      className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${activeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Container className="flex flex-col gap-16 relative z-10">
        <Typography as={"h2"} variant={"h2"} weight={"bold"} align={"center"}>
          <span className="backdrop-blur-sm bg-black/10 mx-auto px-3 rounded-xl">
            Our Solutions
          </span>
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              className={`group relative flex flex-col justify-end rounded-xl shadow-2xl overflow-hidden cursor-pointer h-40 md:h-60 lg:h-80  xl:h-96 transition-all duration-500 ${activeBg === solution.images ? "scale-105" : "scale-100"
                }`}
              onMouseEnter={() => setActiveBg(solution.images)}
            >
              <motion.div
                className="absolute inset-0 flex flex-col justify-between p-4 duration-300 z-10 rounded-xl bg-white"
              >
                <div>
                  <Typography variant={'small'} className="text-purple-600">
                    Category
                  </Typography>
                  <Typography variant={'lead'} weight={'bold'} className="text-gray-900">
                    {solution.title}
                  </Typography>
                  <Typography variant={'small'} className="text-zinc-600 line-clamp-4 mt-1">
                    {solution.description}
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
          ))}
        </div>
      </Container>
    </Container>
  );
}