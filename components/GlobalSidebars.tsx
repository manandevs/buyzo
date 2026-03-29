"use client";
import { useEffect } from "react";
import Button from "./common/Button";
import { FiMessageCircle } from "react-icons/fi";
import Sidebar from "./Sidebar";
import CartSidebar from "./CartSidebar";
import { useCartStore } from "@/store/useCartStore";

export default function GlobalSidebars() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      <Sidebar id="cart" closeButtonClass="yellow-to-purple">
        <CartSidebar />
      </Sidebar>
      <Sidebar id="whatsapp" closeButtonClass="yellow-to-green">
        <div className="flex flex-col h-full items-center justify-center text-center gap-6 mt-10">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-2">
            <FiMessageCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold font-magnetik tracking-tight">Chat with Us</h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Our team is ready to help with your packaging needs. Send us a message on WhatsApp and we shall reply as soon as possible.
          </p>
          <a href="https://wa.me/+27837960416" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full bg-green-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/30 border-none shadow-none text-white py-4 text-lg">
              Open WhatsApp
            </Button>
          </a>
        </div>
      </Sidebar>
    </>
  )
}