"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import ShopCTA from "@/components/ShopCTA";

const BLOG_POSTS = [
  {
    slug: "future-of-sustainable-packaging-2026",
    title: "The Future of Sustainable Packaging in 2026",
    excerpt: "Explore the latest innovations in eco-friendly materials and how they are reshaping the retail landscape. Learn how businesses are adapting to new consumer expectations.",
    date: "March 10, 2026",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1605600659873-d808a1d8dbf8?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "elevate-unboxing-experience",
    title: "How to Elevate Your Brand's Unboxing Experience",
    excerpt: "Unboxing is the new storefront. Discover actionable strategies to create a memorable unboxing experience that drives customer loyalty and social sharing.",
    date: "March 5, 2026",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "food-safe-materials-guide",
    title: "The Ultimate Guide to Food-Safe Packaging Materials",
    excerpt: "Navigating FDA and EU regulations can be tricky. This comprehensive guide breaks down the safest and most compliant materials for the food service industry.",
    date: "February 28, 2026",
    category: "Food Service",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "custom-moulded-pulp-benefits",
    title: "Why Custom Moulded Pulp is Replacing Plastic Inserts",
    excerpt: "Electronics and luxury goods are shifting towards bespoke paper pulp. Learn why this highly protective, biodegradable solution is the new industry standard.",
    date: "February 2, 2026",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1622322301332-902c6b4125b2?auto=format&fit=crop&q=80&w=800",
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col selection:bg-[#BA68C8] selection:text-white">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent"
          >
            Buyzo Insights & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            Stay updated with the latest trends in e-commerce, sustainable packaging innovations, and industry standards. Discover insights to elevate your brand.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`} className="block relative w-full h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl p-2 px-4 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden">
                  {post.category}
                </div>
              </Link>

              <div className="p-4 flex flex-col flex-1 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  <FiCalendar size={14} />
                  <span>{post.date}</span>
                </div>

                <h2 className="text-2xl font-bold leading-tight group-hover:text-purple-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-400 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-800">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#BA68C8] font-semibold group/link"
                  >
                    Read Article
                    <FiArrowRight
                      size={18}
                      className="group-hover/link:translate-x-1.5 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 rounded-full border border-gray-700 text-white hover:bg-white hover:text-black transition-colors font-medium">
            Load More Articles
          </button>
        </div>
      </main>

      <ShopCTA />
    </div>
  );
}