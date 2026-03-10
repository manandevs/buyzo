"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCoffee,
  FiShoppingBag,
  FiBox,
  FiMonitor,
  FiHome,
  FiHeart,
  FiArrowRight,
  FiSearch,
  FiGlobe,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import Header from "@/components/Header";
import ShopCTA from "@/components/ShopCTA";

const categoriesData = [
  {
    title: "Food Service",
    description: "Premium packaging solutions for restaurants, cafes, and takeaways.",
    icon: FiCoffee,
    href: "/categories/food-service",
  },
  {
    title: "Retail Packaging",
    description: "Bags, boxes, and wrapping to elevate your brand's unboxing experience.",
    icon: FiShoppingBag,
    href: "/categories/retail-packaging",
  },
  {
    title: "Logistics & Shipping",
    description: "Durable corrugated boxes, mailers, and protective materials for secure transit.",
    icon: FiBox,
    href: "/categories/shipping",
  },
  {
    title: "Electronics",
    description: "Anti-static packaging and protective casings for delicate electronic goods.",
    icon: FiMonitor,
    href: "/categories/electronics",
  },
  {
    title: "Home & Living",
    description: "Eco-friendly storage, organization, and lifestyle product packaging.",
    icon: FiHome,
    href: "/categories/home-living",
  },
  {
    title: "Beauty & Health",
    description: "Elegant, sterile, and compliant packaging for cosmetics and wellness products.",
    icon: FiHeart,
    href: "/categories/beauty-health",
  },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-16">

        {/* Page Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Shop by Category
            </h1>
            <p className="text-lg text-gray-400">
              Browse our extensive range of packaging solutions. Find exactly what you need by exploring our dedicated categories or searching directly below.
            </p>
          </div>
          {/* 
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <FiSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div> */}
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categoriesData.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden"
              >

                {/* Icon & Title */}
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <div className="w-10 h-10 bg-black border border-gray-700 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-purple-900/20 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all duration-300 shrink-0 shadow-lg">
                    <Icon size={16} />
                  </div>
                  <h2 className="text-2xl font-bold">
                    <Link href={category.href} className="hover:text-purple-400 transition-colors before:absolute before:inset-0">
                      {category.title}
                    </Link>
                  </h2>
                </div>

                <p className="text-gray-400 mb-4 flex-1 relative z-10 leading-relaxed">
                  {category.description}
                </p>

                {/* Explore Link */}
                <div className="inline-flex items-center gap-2 text-[#BA68C8] font-semibold mt-auto group-hover:text-white transition-colors relative z-10">
                  Explore {category.title}
                  <FiArrowRight
                    size={18}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
      <ShopCTA />
    </div>
  );
}