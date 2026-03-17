"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Category } from "@/types";
import Button from "@/components/common/Button";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { ICON_LIST } from "@/lib/iconList";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      if (!res.ok) throw new Error();

      setCategories(data);
    } catch {
      setError("Failed to fetch categories.");
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error();

      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingCategory?.title) {
      toast.error("Title required");
      return;
    }

    try {
      const method = editingCategory.id ? "PUT" : "POST";

      const res = await fetch("/api/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });

      if (!res.ok) throw new Error();

      toast.success(
        editingCategory.id ? "Category updated" : "Category created"
      );

      setIsModalOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch {
      toast.error("Failed to save category.");
    }
  };

  const openModal = (cat: Partial<Category> | null = null) => {
    setEditingCategory(cat || { title: "", description: "" });
    setIsModalOpen(true);
  };

  const getIcon = (name?: string) => {
    if (!name) return null;
    const icon = ICON_LIST.find((i) => i.name === name);
    if (!icon) return null;
    const Icon = icon.icon;
    return <Icon size={18} />;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Categories</h1>

        <Button onClick={() => openModal()} className="gap-2">
          <FiPlus /> Add Category
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-100 p-8">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center p-8">{error}</div>
      ) : (
        <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-100">
                <th className="p-4">Icon</th>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="p-4">{getIcon(cat.icon)}</td>
                  <td className="p-4">{cat.title}</td>
                  <td className="p-4 text-gray-100">
                    {cat.description || "N/A"}
                  </td>

                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => openModal(cat)}
                      className="text-blue-400"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-400"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categories.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No categories found
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingCategory?.id ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <input
                placeholder="Title"
                className="bg-black border border-gray-700 p-3 rounded-lg"
                value={editingCategory?.title || ""}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                className="bg-black border border-gray-700 p-3 rounded-lg"
                value={editingCategory?.description || ""}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    description: e.target.value,
                  })
                }
              />
              
              <select
                className="bg-black border border-gray-700 p-3 rounded-lg"
                value={editingCategory?.icon || ""}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    icon: e.target.value,
                  })
                }
              >
                <option value="">Select Icon</option>

                {ICON_LIST.map((icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}