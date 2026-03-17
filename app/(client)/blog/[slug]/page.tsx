"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronLeft, FiCalendar, FiUser, FiClock, FiShare2 } from "react-icons/fi";
import ShopCTA from "@/components/ShopCTA";

const MOCK_POST = {
  title: "The Future of Sustainable Packaging in 2026",
  category: "Sustainability",
  date: "March 10, 2026",
  author: "Sarah Jenkins",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1605600659873-d808a1d8dbf8?auto=format&fit=crop&q=80&w=1200",
  content: `
    <p>The packaging industry is undergoing a massive transformation. With consumers increasingly demanding eco-friendly options and regulatory bodies imposing stricter rules on single-use plastics, businesses are forced to rethink how they package their products.</p>
    <h2>The Shift to Biodegradable Materials</h2>
    <p>One of the most significant trends we're seeing in 2026 is the rapid adoption of biodegradable and compostable materials. Materials like PLA (Polylactic Acid) and custom-moulded paper pulp are no longer just niche alternatives; they are becoming the industry standard for everything from food service to consumer electronics.</p>
    <p>Brands that adopt these materials early are not only future-proofing their operations against incoming legislation but also enjoying a significant boost in brand loyalty among eco-conscious demographics.</p>
    <h2>FSC-Certified Sourcing</h2>
    <p>It's not enough for a package to be recyclable; its origin matters too. Forest Stewardship Council (FSC) certification ensures that the wood pulp used in cardboard and paper packaging comes from responsibly managed forests. At Buyzo, we've seen a 300% increase in requests for FSC-certified packaging over the past two years alone.</p>
    <blockquote>"Sustainability is no longer a marketing buzzword. It is a fundamental operational requirement for brands looking to survive in the coming decade."</blockquote>
    <h2>Minimalism: Less is More</h2>
    <p>Beyond materials, design philosophy is shifting. The minimalist approach to packaging aims to reduce the volume and weight of materials used without compromising product safety. This reduction translates to lower manufacturing costs, decreased shipping weight, and ultimately, a smaller carbon footprint.</p>
    <p>In conclusion, the future of packaging is transparent, responsible, and highly efficient. Businesses that invest in sustainable packaging solutions today will set the standard for their industries tomorrow.</p>
  `
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col selection:bg-[#BA68C8] selection:text-white">
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-10">

        <div className="flex items-center gap-2 justify-between">
          {/* Breadcrumb Navigation */}
          <Link
            href="/blog"
            className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl py-2 px-4 inline-flex items-center justify-center gap-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden"
          >
            <FiChevronLeft size={20} />
            Back to Insights
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xs">
            <p>Categories :</p>
            <span className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl py-2 px-4 inline-flex items-center justify-center gap-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden">
              {MOCK_POST.category}
            </span>
          </div>
        </div>

        {/* Article Header Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {MOCK_POST.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400 py-6 border-y border-gray-800">
            <div className="flex items-center gap-2"><FiUser size={18} /><span>{MOCK_POST.author}</span></div>
            <div className="flex items-center gap-2"><FiCalendar size={18} /><span>{MOCK_POST.date}</span></div>
            <div className="flex items-center gap-2"><FiClock size={18} /><span>{MOCK_POST.readTime}</span></div>
            <button className="ml-auto flex items-center gap-2 hover:text-white transition-colors">
              <FiShare2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Featured Banner Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full aspect-[16/9] sm:aspect-[21/9] relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800"
        >
          <Image src={MOCK_POST.image} alt={MOCK_POST.title} fill className="object-cover" />
        </motion.div>

        {/* Article Custom Formatted Markdown HTML */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-none text-gray-300 text-lg leading-relaxed
            [&>h2]:text-white[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
            [&>p]:mb-6
            [&>a]:text-[#BA68C8] hover:[&>a]:text-purple-400 [&>a]:transition-colors
            [&>blockquote]:border-l-4 [&>blockquote]:py-2 [&>blockquote]:px-4 [&>blockquote]:border-purple-500 [&>blockquote]:bg-gray-900/50 [&>blockquote]:p-6[&>blockquote]:rounded-r-xl [&>blockquote]:text-xl [&>blockquote]:font-medium[&>blockquote]:italic [&>blockquote]:text-white [&>blockquote]:my-8"
          dangerouslySetInnerHTML={{ __html: MOCK_POST.content }}
        />

        {/* Tags Metadata Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-3">
            {['Packaging', 'Eco-friendly', 'Trends'].map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <ShopCTA />
    </div>
  );
}