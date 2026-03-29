"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiHeart,
  FiChevronDown,
} from "react-icons/fi";
import ShopCTA from "@/components/ShopCTA";
import Button from "@/components/common/Button";
import ProductCard from "@/components/common/ProductCard";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import {
  isUuid,
  normalizeProductRow,
  primaryImageUrl,
  productDetailPath,
  type ShopProduct,
} from "@/lib/shop";

const SHIPPING_COPY =
  "Standard delivery takes 3-5 business days. Expedited shipping is available at checkout. Free shipping on orders over R1000.";

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ProductDetailsPage() {
  const params = useParams();
  const slugParam = typeof params.slug === "string" ? params.slug : "";
  const addToCart = useCartStore((s) => s.addToCart);

  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [related, setRelated] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedVariation, setSelectedVariation] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("Description");

  const loadProduct = useCallback(async () => {
    if (!slugParam) return;
    setLoading(true);
    setNotFound(false);

    let query = supabase.from("products").select("*");
    if (isUuid(slugParam)) {
      query = query.eq("id", slugParam);
    } else {
      query = query.eq("slug", slugParam);
    }

    const { data: row, error } = await query.maybeSingle();

    if (error) {
      console.error(error);
      setProduct(null);
      setNotFound(true);
      setLoading(false);
      return;
    }
    if (!row) {
      setProduct(null);
      setNotFound(true);
      setLoading(false);
      return;
    }

    const p = normalizeProductRow(row as Record<string, unknown>);

    const { data: cat } = await supabase
      .from("categories")
      .select("title")
      .eq("id", p.category)
      .maybeSingle();

    const catTitle = cat?.title ?? "";
    setCategoryTitle(catTitle);
    setProduct({ ...p, categoryTitle: catTitle });

    const imgs = p.images.length ? p.images : [primaryImageUrl(p)];
    setActiveImage(imgs[0]);
    const vars = p.variations?.filter(Boolean) ?? [];
    setSelectedVariation(vars[0] ?? "");
    setQuantity(1);

    const { data: rel } = await supabase
      .from("products")
      .select("*")
      .eq("category", p.category)
      .neq("id", p.id)
      .limit(4);

    const relatedEnriched = (rel ?? []).map((r) =>
      normalizeProductRow(r as Record<string, unknown>)
    );
    setRelated(relatedEnriched);
    setLoading(false);
  }, [slugParam]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadProduct();
    });
  }, [loadProduct]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (!product) return;
    const max = Math.max(1, product.stock);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
    if (type === "increment" && quantity < max) setQuantity((prev) => prev + 1);
  };

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (product.stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }
    const variationKey = selectedVariation || undefined;
    addToCart({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      imageUrl: primaryImageUrl(product),
      quantity,
      variation: variationKey,
    });
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col">
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex items-center justify-center">
          <p className="text-gray-400">Loading product…</p>
        </main>
        <ShopCTA />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col">
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col items-center gap-6">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/shop" className="text-[#BA68C8] hover:underline">
            Back to shop
          </Link>
        </main>
        <ShopCTA />
      </div>
    );
  }

  const gallery = product.images.length ? product.images : [primaryImageUrl(product)];
  const variations = product.variations?.filter(Boolean) ?? [];
  const descriptionText =
    product.description?.trim() || "No description available for this product yet.";

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col selection:bg-[#BA68C8] selection:text-white">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-16">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} />
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <FiChevronRight size={14} />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-white transition-colors"
          >
            {categoryTitle || "Category"}
          </Link>
          <FiChevronRight size={14} />
          <span className="text-white truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="w-full aspect-square bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden relative flex items-center justify-center">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {gallery.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 relative ${
                    activeImage === img
                      ? "border-[#BA68C8] opacity-100"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <motion.div variants={fadeUpItem} className="border-b border-gray-800 pb-8 mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-light">
                  {product.currencySymbol}
                  {Number(product.price).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                  Incl. VAT
                </span>
                {product.stock <= 0 && (
                  <span className="text-sm text-red-400">Out of stock</span>
                )}
              </div>
            </motion.div>

            <motion.p variants={fadeUpItem} className="text-gray-400 text-lg leading-relaxed mb-8 line-clamp-6">
              {descriptionText}
            </motion.p>

            {variations.length > 0 && (
              <motion.div variants={fadeUpItem} className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
                  Options
                </h3>
                <div className="flex flex-wrap gap-3">
                  {variations.map((variation) => (
                    <button
                      key={variation}
                      type="button"
                      onClick={() => setSelectedVariation(variation)}
                      className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                        selectedVariation === variation
                          ? "bg-white text-black border-white"
                          : "bg-transparent border-gray-800 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {variation}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center justify-between border border-gray-800 rounded-full px-4 py-1 h-14 w-full sm:w-40 bg-gray-900/30">
                <button
                  type="button"
                  onClick={() => handleQuantityChange("decrement")}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={18} />
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("increment")}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={18} />
                </button>
              </div>

              <Button
                type="button"
                className="h-12 max-w-48 flex-1 text-lg"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <FiShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="h-12 w-12 px-0 py-0 flex justify-center items-center">
                <FiHeart size={20} />
              </Button>
            </motion.div>

            <motion.div variants={fadeUpItem} className="border-t border-gray-800">
              {[
                { title: "Description", content: descriptionText },
                { title: "Shipping & Delivery", content: SHIPPING_COPY },
              ].map((detail) => (
                <div key={detail.title} className="border-b border-gray-800">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(detail.title)}
                    className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium">{detail.title}</span>
                    <FiChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${
                        openAccordion === detail.title ? "rotate-180" : ""
                      }`}
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

        <section className="mt-12 border-t border-gray-800 pt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">You might also like</h2>
            <Link href="/shop">
              <Button variant="secondary" className="hidden sm:flex">
                Shop All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((rp) => (
              <ProductCard
                key={rp.id}
                title={rp.title}
                productUrl={productDetailPath(rp)}
                imageUrl={primaryImageUrl(rp)}
                price={Number(rp.price).toFixed(2)}
                currencySymbol={rp.currencySymbol}
                isNew={rp.isNew}
                outOfStock={rp.stock <= 0}
              />
            ))}
          </div>

          {related.length === 0 && (
            <p className="text-gray-500 text-center py-8">No related products in this category.</p>
          )}

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/shop" className="w-full">
              <Button variant="secondary" className="w-full">
                Shop All
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <ShopCTA />
    </div>
  );
}
