"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion, Variants, easeOut } from "framer-motion";

export default function Hero() {
  const solutions = [
    {
      title: "Electronics",
      description:
        "Shop smartphones, laptops, accessories, and all your favorite gadgets at unbeatable prices.",
      href: "/electronics",
    },
    {
      title: "Fashion",
      description:
        "Discover trendy clothing, shoes, and accessories for men, women, and kids from top brands.",
      href: "/fashion",
    },
    {
      title: "Home & Living",
      description:
        "Find everything for your home, from furniture and décor to kitchen essentials and smart home devices.",
      href: "/home-living",
    },
    {
      title: "Beauty & Health",
      description:
        "Explore skincare, makeup, personal care, and wellness products from trusted brands.",
      href: "/beauty-health",
    },
    {
      title: "Sports & Outdoors",
      description:
        "Get sports equipment, outdoor gear, fitness accessories, and everything to stay active.",
      href: "/sports-outdoors",
    },
    {
      title: "Toys & Baby",
      description:
        "Shop toys, games, baby care products, and essentials for your little ones.",
      href: "/toys-baby",
    },
  ];

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col px-6 overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: easeOut }}
      >
        <Image
          src="/images/hero-image.jpg"
          alt="Ecommerce store hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-center gap-14 py-20">
        {/* Animated Text */}
        <motion.div
          className="text-white flex flex-col gap-4 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold mt-5"
          >
            Quality products, seamless shopping, and lightning-fast delivery.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200"
          >
            Shop thousands of products from top brands. Fast delivery and trusted service at your fingertips.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="relative z-20 w-full flex flex-wrap gap-3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              className="group relative flex flex-col justify-end px-3 py-2 rounded-lg shadow-xl shadow-black/10 bg-white/25 hover:bg-white text-white hover:text-gray-900 h-44 w-60 overflow-hidden cursor-pointer"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Title */}
              <motion.h3
                className="text-xl font-bold mb-2 font-magnetik absolute top-4 left-4"
                variants={{
                  rest: { opacity: 1, y: 0 },
                  hover: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.25 }}
              >
                {solution.title}
              </motion.h3>

              {/* Hover Content */}
              <motion.div
                className="absolute inset-0 hidden group-hover:flex flex-col justify-between p-4 transition-all duration-75"
                variants={{
                  rest: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.5 }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-1 font-magnetik">
                    {solution.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">
                    {solution.description}
                  </p>
                </div>

                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 text-[#7B1FA2] mt-auto"
                  aria-label={`Explore ${solution.title}`}
                >
                  Tell me more
                  <FiArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}