"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Product, Category } from "@/types";
import Button from "@/components/common/Button";
import { FiEdit, FiTrash2, FiPlus, FiImage } from "react-icons/fi";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCategories(data ?? []);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data ?? []);
    } catch (err) {
      setError("Failed to fetch products.");
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const openModal = (product: Partial<Product> | null = null) => {
    setEditingProduct(
      product ?? {
        title: "",
        category: categories[0]?.id || "",
        images: [],
        price: "",
        currencySymbol: "R",
        isNew: false,
        stock: 0,
        description: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const { title, category, images, price, stock } = editingProduct;
    const imageList = Array.isArray(images) ? images : [];
    const primaryImage = imageList[0]?.trim();

    if (!title || !category || !primaryImage || price === undefined || stock === undefined) {
      toast.error("Fill all required fields.");
      return;
    }

    const priceNumber = Number(price);
    const stockNumber = Number(stock);

    if (Number.isNaN(priceNumber) || priceNumber < 0) return toast.error("Invalid price.");
    if (!Number.isInteger(stockNumber) || stockNumber < 0) return toast.error("Invalid stock.");

    const productToSave: Partial<Product> = {
      ...editingProduct,
      images: primaryImage ? [primaryImage] : [],
      price: priceNumber.toFixed(2),
      stock: stockNumber,
    };

    try {
      if (productToSave.id) {
        const { error } = await supabase.from("products").update(productToSave).eq("id", productToSave.id);
        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase.from("products").insert([productToSave]);
        if (error) throw error;
        toast.success("Product added successfully");
      }

      resetModal();
      fetchProducts();
    } catch {
      toast.error("Failed to save product.");
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20 h-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Products</h1>
        <Button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2 rounded-xl"
        >
          <FiPlus />
          Add Product
        </Button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-center text-gray-400 p-10">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-500 p-10">{error}</div>
      ) : (
        <div className="bg-black border border-gray-800 rounded-2xl max-w-6xl h-screen overflow-scroll custom-scroll mx-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-300 text-sm">
                <th className="p-4 w-20">Image</th>
                <th className="p-4 min-w-44">Title</th>
                <th className="p-4 w-28 text-right">Price</th>
                <th className="p-4 min-w-36">Category</th>
                <th className="p-4 w-20 text-center">Stock</th>
                <th className="p-4 w-20 text-center">New</th>
                <th className="p-4 w-32 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((prod) => {
                const categoryObj = categories.find((c) => c.id === prod.category);
                return (
                  <tr
                    key={prod.id}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                  >

                    {/* IMAGE */}
                    <td className="p-4">
                      <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                        {prod.images?.[0] ? (
                          <Image
                            src={prod.images[0]}
                            alt={prod.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-600">
                            <FiImage size={20} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* TITLE */}
                    <td className="p-4 font-medium text-white">
                      {prod.title}
                    </td>

                    {/* PRICE */}
                    <td className="p-4 text-right font-semibold">
                      {prod.currencySymbol}{Number(prod.price).toFixed(2)}
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4 text-gray-300">
                      {categoryObj?.title || prod.category}
                    </td>

                    {/* STOCK */}
                    <td className="p-4 text-center font-medium">
                      {prod.stock}
                    </td>

                    {/* NEW */}
                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${prod.isNew
                            ? "bg-purple-600/20 text-purple-300"
                            : "bg-gray-700/30 text-gray-400"
                          }`}
                      >
                        {prod.isNew ? "Yes" : "No"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => openModal(prod)}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          <FiEdit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4">
              {editingProduct?.id ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Title"
                className="bg-black border border-gray-800 p-3 rounded-lg"
                value={editingProduct?.title || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, title: e.target.value })
                }
                required
              />

              <select
                className="bg-black border border-gray-800 p-3 rounded-lg"
                value={editingProduct?.category || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <input
                type="url"
                placeholder="Primary image URL"
                className="bg-black border border-gray-800 p-3 rounded-lg"
                value={editingProduct?.images?.[0] || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    images: e.target.value.trim() ? [e.target.value.trim()] : [],
                  })
                }
                required
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="bg-black border border-gray-800 p-3 rounded-lg"
                  value={editingProduct?.price || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Currency"
                  className="bg-black border border-gray-800 p-3 rounded-lg"
                  value={editingProduct?.currencySymbol || "R"}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      currencySymbol: e.target.value,
                    })
                  }
                />

              </div>

              <div className="flex gap-4 items-center flex-wrap">

                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={editingProduct?.isNew || false}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        isNew: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-purple-600"
                  />
                  Is New Product?
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Stock"
                  className="bg-black border border-gray-800 p-3 rounded-lg w-32"
                  value={editingProduct?.stock ?? ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />

              </div>

              <textarea
                placeholder="Description"
                className="bg-black border border-gray-800 p-3 rounded-lg min-h-[100px]"
                value={editingProduct?.description || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="ghost" onClick={resetModal}>
                  Cancel
                </Button>

                <Button type="submit">Save Product</Button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}