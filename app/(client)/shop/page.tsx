"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import ShopCTA from "@/components/ShopCTA";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types";
import {
  normalizeProductRow,
  productDetailPath,
  primaryImageUrl,
  productMatchesSearch,
  type ShopProduct,
} from "@/lib/shop";

type SortKey = "latest" | "price-asc" | "price-desc";

function ShopPageContent() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("latest");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [catRes, prodRes] = await Promise.all([
        supabase.from("categories").select("*").order("title"),
        supabase.from("products").select("*").order("created_at", { ascending: false }),
      ]);
      if (catRes.error) throw catRes.error;
      if (prodRes.error) throw prodRes.error;
      const cats = catRes.data ?? [];
      const catMap = Object.fromEntries(cats.map((c) => [c.id, c.title]));
      const enriched = (prodRes.data ?? []).map((row) => {
        const p = normalizeProductRow(row as Record<string, unknown>);
        return { ...p, categoryTitle: catMap[p.category] ?? "" };
      });
      setCategories(cats);
      setProducts(enriched);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadData();
    });
  }, [loadData]);

  useEffect(() => {
    const c = searchParams.get("category");
    queueMicrotask(() => {
      setActiveCategoryId(c && c.trim() ? c : null);
    });
  }, [searchParams]);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.product_type?.trim()) set.add(p.product_type.trim());
    }
    return [...set].sort();
  }, [products]);

  const materialOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.material?.trim()) set.add(p.material.trim());
    }
    return [...set].sort();
  }, [products]);

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const toggleMaterial = (m: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const filteredSorted = useMemo(() => {
    let list = products.filter((p) => {
      if (!productMatchesSearch(p, search)) return false;
      if (activeCategoryId && p.category !== activeCategoryId) return false;
      if (
        selectedTypes.length > 0 &&
        (!p.product_type || !selectedTypes.includes(p.product_type))
      ) {
        return false;
      }
      if (
        selectedMaterials.length > 0 &&
        (!p.material || !selectedMaterials.includes(p.material))
      ) {
        return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "latest") {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      }
      const pa = Number(a.price);
      const pb = Number(b.price);
      if (sort === "price-asc") return pa - pb;
      return pb - pa;
    });

    return list;
  }, [products, search, activeCategoryId, selectedTypes, selectedMaterials, sort]);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold">Shop all products</h1>
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border border-gray-700 text-white rounded-full py-3 px-12 focus:outline-none focus:border-white transition-colors"
            />
            <FiSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 border-b border-gray-800 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none][scrollbar-width:none]">
          <button
            type="button"
            onClick={() => setActiveCategoryId(null)}
            className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${
              activeCategoryId === null
                ? "bg-white text-black border-white"
                : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${
                activeCategoryId === cat.id
                  ? "bg-white text-black border-white"
                  : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-center" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-12 mt-4">
          <aside className="hidden lg:block w-64 shrink-0 space-y-10">
            {typeOptions.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Product type</h3>
                <div className="space-y-3">
                  {typeOptions.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-5 h-5 rounded border-gray-700 bg-transparent text-white focus:ring-0 focus:ring-offset-0 accent-white"
                      />
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {materialOptions.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Material</h3>
                <div className="space-y-3">
                  {materialOptions.map((material) => (
                    <label
                      key={material}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => toggleMaterial(material)}
                        className="w-5 h-5 rounded border-gray-700 bg-transparent text-white focus:ring-0 focus:ring-offset-0 accent-white"
                      />
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {material}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {typeOptions.length === 0 && materialOptions.length === 0 && (
              <p className="text-sm text-gray-500">
                Add <code className="text-gray-400">product_type</code> or{" "}
                <code className="text-gray-400">material</code> on products in Supabase to
                enable sidebar filters.
              </p>
            )}
          </aside>

          <div className="flex-1 flex flex-col">
            <div className="flex justify-end mb-8">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none bg-transparent border border-gray-700 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option className="bg-black text-white" value="latest">
                    Latest
                  </option>
                  <option className="bg-black text-white" value="price-asc">
                    Price: low to high
                  </option>
                  <option className="bg-black text-white" value="price-desc">
                    Price: high to low
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {loading ? (
              <div className="text-center text-gray-400 py-20">Loading products…</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSorted.map((product, index) => (
                  <React.Fragment key={product.id}>
                    {index === 6 && filteredSorted.length > 7 && (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 my-4 shadow-xl">
                        <div className="text-center md:text-left">
                          <h3 className="text-2xl font-bold mb-2">
                            Upgrade Your Packaging
                          </h3>
                          <p className="text-gray-400">
                            Discover our new line of fully sustainable, FSC-certified materials.
                          </p>
                        </div>
                        <Button variant="secondary">Explore Custom Orders</Button>
                      </div>
                    )}
                    <ProductCard
                      title={product.title}
                      productUrl={productDetailPath(product)}
                      imageUrl={primaryImageUrl(product)}
                      price={Number(product.price).toFixed(2)}
                      currencySymbol={product.currencySymbol}
                      isNew={product.isNew}
                      outOfStock={product.stock <= 0}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}

            {!loading && filteredSorted.length === 0 && (
              <p className="text-center text-gray-500 py-16">No products match your filters.</p>
            )}

            <div className="mt-16 flex justify-center">
              <Button variant="secondary">View more products</Button>
            </div>
          </div>
        </div>
      </main>

      <ShopCTA />
    </div>
  );
}

function ShopLoading() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="text-center text-gray-400 py-20">Loading shop…</div>
      </main>
      <ShopCTA />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopPageContent />
    </Suspense>
  );
}
