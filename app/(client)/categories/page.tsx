"use client";

import React, { useCallback, useEffect, useState, type ComponentType } from "react";
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
} from "react-icons/fi";
import ShopCTA from "@/components/ShopCTA";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types";

const TITLE_ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
  "food service": FiCoffee,
  "retail packaging": FiShoppingBag,
  "logistics & shipping": FiBox,
  shipping: FiBox,
  electronics: FiMonitor,
  "home & living": FiHome,
  "beauty & health": FiHeart,
};

function iconForCategory(title: string): ComponentType<{ size?: number }> {
  const key = title.toLowerCase().trim();
  return TITLE_ICON_MAP[key] ?? FiBox;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("categories")
      .select("*")
      .order("title");
    if (err) {
      setError("Failed to load categories.");
      setCategories([]);
    } else {
      setCategories(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Shop by Category
            </h1>
            <p className="text-lg text-gray-400">
              Browse our extensive range of packaging solutions. Find exactly what you need by
              exploring our dedicated categories or searching directly below.
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-center" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-16">Loading categories…</p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category) => {
              const Icon = iconForCategory(category.title);
              const href = `/shop?category=${encodeURIComponent(category.id)}`;

              return (
                <motion.div
                  key={category.id}
                  className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <div className="w-10 h-10 bg-black border border-gray-700 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-purple-900/20 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all duration-300 shrink-0 shadow-lg">
                      <Icon size={16} />
                    </div>
                    <h2 className="text-2xl font-bold">
                      <Link href={href} className="hover:text-purple-400 transition-colors before:absolute before:inset-0">
                        {category.title}
                      </Link>
                    </h2>
                  </div>

                  <p className="text-gray-400 mb-4 flex-1 relative z-10 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-[#BA68C8] font-semibold mt-auto group-hover:text-white transition-colors relative z-10">
                    <Link href={href} className="inline-flex items-center gap-2">
                      Explore {category.title}
                      <FiArrowRight
                        size={18}
                        className="group-hover:translate-x-1.5 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!loading && categories.length === 0 && !error && (
          <p className="text-center text-gray-500 py-16">No categories yet.</p>
        )}
      </main>
      <ShopCTA />
    </div>
  );
}
