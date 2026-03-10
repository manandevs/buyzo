"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiHeart,
  FiChevronDown
} from "react-icons/fi";
import Header from "@/components/Header";
import ShopCTA from "@/components/ShopCTA";
import Button from "@/components/common/Button";
import ProductCard from "@/components/common/ProductCard";

// --- Mock Data ---

const MOCK_PRODUCT = {
  id: "1",
  title: "Single Wall Matte Black Coffee Cup",
  category: "Food Service",
  price: "1.09",
  currencySymbol: "R",
  description: "Premium, food-safe single wall matte black coffee cups. Engineered for heat retention and a sleek, modern aesthetic. Ideal for cafes, restaurants, and premium takeaway services.",
  images: [
    "https://yucca.co.za/wp-content/uploads/2025/08/KG-SW-B-250-600x600.jpg",
    "https://yucca.co.za/wp-content/uploads/2025/09/KG-CH-2-600x600.jpg",
    "https://yucca.co.za/wp-content/uploads/2025/09/YP-JU9-600x600.jpg",
  ],
  variations: ["250ml", "350ml", "500ml"],
  stock: 124,
  details: [
    {
      title: "Product Specifications",
      content: "Material: Premium Food-Grade Paper\nFinish: Matte Black\nLid Compatibility: 90mm standard lids\nRecyclable: Yes"
    },
    {
      title: "Shipping & Delivery",
      content: "Standard delivery takes 3-5 business days. Expedited shipping is available at checkout. Free shipping on orders over R1000."
    },
    {
      title: "Bulk Orders",
      content: "For wholesale pricing and orders exceeding 5,000 units, please contact our sales team directly at sales@buyzo.com."
    }
  ]
};

const RELATED_PRODUCTS = [
  {
    id: "2",
    title: "Paper Pulp Cup Holder",
    productUrl: "/product/paper-pulp-cup-holder",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/09/KG-CH-2-600x600.jpg",
    price: "1.55",
    isNew: true,
  },
  {
    id: "3",
    title: "Dessert Cup (90mm)",
    productUrl: "/product/dessert-cups",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/09/YP-JU9-600x600.jpg",
    price: "1.38",
  },
  {
    id: "4",
    title: "Dessert Cup Flat Lid",
    productUrl: "/product/flat-lid",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/08/YP-JYF90-600x600.jpg",
    price: "0.63",
  },
];

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function ProductDetailsPage() {
  const [activeImage, setActiveImage] = useState(MOCK_PRODUCT.images[0]);
  const [selectedVariation, setSelectedVariation] = useState(MOCK_PRODUCT.variations[0]);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(MOCK_PRODUCT.details[0].title);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "decrement" && quantity > 1) setQuantity(prev => prev - 1);
    if (type === "increment" && quantity < MOCK_PRODUCT.stock) setQuantity(prev => prev + 1);
  };

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col selection:bg-[#BA68C8] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-16">

        {/* --- Breadcrumbs --- */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <FiChevronRight size={14} />
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <FiChevronRight size={14} />
          <Link href={`/categories/${MOCK_PRODUCT.category.toLowerCase().replace(" ", "-")}`} className="hover:text-white transition-colors">
            {MOCK_PRODUCT.category}
          </Link>
          <FiChevronRight size={14} />
          <span className="text-white truncate">{MOCK_PRODUCT.title}</span>
        </nav>

        {/* --- Main Product Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Main Image */}
            <div className="w-full aspect-square bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden relative flex items-center justify-center">
              <img
                src={activeImage}
                alt={MOCK_PRODUCT.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {MOCK_PRODUCT.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? "border-[#BA68C8] opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Title & Price */}
            <motion.div
              //  variants={fadeUpItem} 
              className="border-b border-gray-800 pb-8 mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {MOCK_PRODUCT.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-light">
                  {MOCK_PRODUCT.currencySymbol}{MOCK_PRODUCT.price}
                </span>
                <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                  Incl. VAT
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              //  variants={fadeUpItem}
              className="text-gray-400 text-lg leading-relaxed mb-8">
              {MOCK_PRODUCT.description}
            </motion.p>

            {/* Variations */}
            <motion.div
              //  variants={fadeUpItem}
              className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Select Volume</h3>
              <div className="flex flex-wrap gap-3">
                {MOCK_PRODUCT.variations.map((variation) => (
                  <button
                    key={variation}
                    onClick={() => setSelectedVariation(variation)}
                    className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${selectedVariation === variation
                      ? "bg-white text-black border-white"
                      : "bg-transparent border-gray-800 text-gray-300 hover:border-gray-500"
                      }`}
                  >
                    {variation}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Actions (Quantity & Add to Cart) */}
            <motion.div
              // variants={fadeUpItem}
              className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-gray-800 rounded-full px-4 py-1 h-14 w-full sm:w-40 bg-gray-900/30">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={18} />
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={18} />
                </button>
              </div>

              {/* Primary Button */}
              <Button className="h-12 max-w-48 flex-1 text-lg">
                <FiShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="h-12 w-12 px-0 py-0 flex justify-center items-center">
                 <FiHeart size={20} />
              </Button>
            </motion.div>

            {/* Accordion Details */}
            <motion.div
              // variants={fadeUpItem}
              className="border-t border-gray-800">
              {MOCK_PRODUCT.details.map((detail, idx) => (
                <div key={idx} className="border-b border-gray-800">
                  <button
                    onClick={() => toggleAccordion(detail.title)}
                    className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium">{detail.title}</span>
                    <FiChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${openAccordion === detail.title ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === detail.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-gray-400 leading-relaxed whitespace-pre-line">
                          {detail.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* --- Related Products Section --- */}
        <section className="mt-12 border-t border-gray-800 pt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">You might also like</h2>
            <Link href="/shop">
              <Button variant="secondary" className="hidden sm:flex">Shop All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RELATED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/shop" className="w-full">
              <Button variant="secondary" className="w-full">Shop All</Button>
            </Link>
          </div>
        </section>

      </main>

      <ShopCTA />
    </div>
  );
}