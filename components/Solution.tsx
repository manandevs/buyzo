"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

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
    <section
      className="w-full min-h-screen py-16 bg-black flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${activeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          Our Solutions
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              className={`group relative flex flex-col justify-end rounded-xl shadow-2xl overflow-hidden cursor-pointer h-96 transition-all duration-500 ${activeBg === solution.images ? "scale-105" : "scale-100"
                }`}
              onMouseEnter={() => setActiveBg(solution.images)}
            >
              <motion.div
                className="absolute inset-0 flex flex-col justify-between p-4 duration-300 z-10 rounded-xl bg-white"
              >
                <div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900">
                    {solution.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">
                    {solution.description}
                  </p>
                </div>

                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 text-[#7B1FA2] mt-auto font-semibold"
                  aria-label={`Explore ${solution.title}`}
                >
                  See Products
                  <FiArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}