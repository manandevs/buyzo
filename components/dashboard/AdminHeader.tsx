"use client";

import { useSidebar } from "./SidebarProvider";
import { FiMenu } from "react-icons/fi";

export default function AdminHeader() {
  const { openSidebar } = useSidebar();

  return (
    <header className="w-full h-16 bg-black border-b border-neutral-800 flex items-center px-6">
      <button
        onClick={() => openSidebar("dashboard-admin-sidebar")}
        className="flex items-center gap-2 text-white hover:text-gray-300"
      >
        <FiMenu size={20} />
      </button>
    </header>
  );
}