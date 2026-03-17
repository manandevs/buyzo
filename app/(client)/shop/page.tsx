"use client";

import React, { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import ShopCTA from "@/components/ShopCTA";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Health",
  "Sports & Outdoors",
  "Toys & Baby",
];

const filterTypes = [
  "Food Service",
  "Food Processing",
  "Agriculture",
  "Retail Packaging",
  "Bespoke Moulded",
];

const filterMaterials = [
  "Paper Pulp",
  "Recyclable Plastic",
  "Compostable",
  "FSC-Certified Wood",
  "Glass",
];

const mockProducts = [
  {
    id: "1",
    title: "Single Wall Matte Black Coffee Cup",
    productUrl: "/product/single-wall-matte-black-coffee-cup",
    imageUrl:
      "https://yucca.co.za/wp-content/uploads/2025/08/KG-SW-B-250-600x600.jpg",
    price: "1.09",
    isNew: true,
    variations: [
      { label: "250ml", url: "#" },
      { label: "350ml", url: "#" },
    ],
  },
  {
    id: "2",
    title: "Paper Pulp Cup Holder",
    productUrl: "/product/paper-pulp-cup-holder",
    imageUrl:
      "https://yucca.co.za/wp-content/uploads/2025/09/KG-CH-2-600x600.jpg",
    price: "1.55",
    isNew: true,
    variations: [
      { label: "2-Holder", url: "#" },
      { label: "4-Holder", url: "#" },
    ],
  },
  {
    id: "3",
    title: "Dessert Cup (90mm)",
    productUrl: "/product/dessert-cups",
    imageUrl:
      "https://yucca.co.za/wp-content/uploads/2025/09/YP-JU9-600x600.jpg",
    price: "1.38",
  },
  {
    id: "4",
    title: "Dessert Cup Flat Lid (90mm)",
    productUrl: "/product/flat-lid-closed",
    imageUrl:
      "https://yucca.co.za/wp-content/uploads/2025/08/YP-JYF90-600x600.jpg",
    price: "0.63",
  },
  {
    id: "5",
    title: "Premium Black Cutlery Set",
    productUrl: "/product/cutlery-set",
    imageUrl:
      "https://yucca.co.za/wp-content/uploads/2025/08/KG-SW-B-250-600x600.jpg",
    price: "2.50",
  },
  {
    id: "6",
    title: "Eco-friendly Salad Bowl",
    productUrl: "/product/salad-bowl",
    imageUrl:
      "https://yucca.co.za/wp-content/uploads/2025/09/KG-CH-2-600x600.jpg",
    price: "3.20",
    isNew: true,
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold">Shop all products</h1>
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search products"
              className="w-full bg-transparent border border-gray-700 text-white rounded-full py-3 px-12 focus:outline-none focus:border-white transition-colors"
            />
            <FiSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 border-b border-gray-800 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none][scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mt-4">
          <aside className="hidden lg:block w-64 shrink-0 space-y-10">
            <div>
              <h3 className="font-semibold text-lg mb-4">Product Type</h3>
              <div className="space-y-3">
                {filterTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-700 bg-transparent text-white focus:ring-0 focus:ring-offset-0 accent-white"
                    />
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Material</h3>
              <div className="space-y-3">
                {filterMaterials.map((material) => (
                  <label
                    key={material}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-700 bg-transparent text-white focus:ring-0 focus:ring-offset-0 accent-white"
                    />
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {material}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-end mb-8">
              <div className="relative">
                <select className="appearance-none bg-transparent border border-gray-700 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-white transition-colors cursor-pointer">
                  <option className="bg-black text-white">Latest</option>
                  <option className="bg-black text-white">Price: low to high</option>
                  <option className="bg-black text-white">Price: high to low</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  {index === 4 && (
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
                  <ProductCard {...product} />
                </React.Fragment>
              ))}
            </div>

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