"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useSidebar } from "./SidebarProvider";

export default function WhatsAppButton() {
  const { openSidebar } = useSidebar();
  
  return (
    <button
      onClick={() => openSidebar("whatsapp")}
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
}