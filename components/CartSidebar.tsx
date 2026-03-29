"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import Button from "./common/Button";
import Image from "next/image";
import { useSidebar } from "./SidebarProvider";
import Link from "next/link";

export default function CartSidebar() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  const { closeSidebar } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setIsMounted(true));
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center gap-4 py-16 text-gray-500">
        <FiShoppingCart size={32} className="opacity-50" />
        <p className="text-sm">Loading cart…</p>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center gap-6 mt-10">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
          <FiShoppingCart size={40} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Your Cart is Empty</h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          Looks like you have not added anything to your cart yet. Discover our premium packaging solutions.
        </p>
        <Link href="/shop" onClick={closeSidebar} className="w-full">
          <Button variant="primary" className="mt-4 w-full py-4 text-lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
        {items.map((item) => (
          <div key={`${item.id}-${item.variation}`} className="flex gap-4 border-b border-gray-100 pb-4">
            <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400"><FiShoppingCart size={24} /></div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                {item.variation && <p className="text-sm text-gray-500">{item.variation}</p>}
                <p className="font-medium mt-1 text-[#BA68C8]">R {item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-2 py-1 bg-white text-black">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variation)}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.variation)}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.variation)}
                  className="text-red-400 hover:text-red-600 transition-colors p-1"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t mt-auto">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600 text-lg">Subtotal</span>
          <span className="text-2xl font-bold">R {getCartTotal().toFixed(2)}</span>
        </div>
        <Button className="w-full py-4 text-lg">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}