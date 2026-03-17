"use client";

import { motion } from "framer-motion";
import { useSidebar } from "./SidebarProvider";
import Link from "next/link";
import { FiBox, FiHome, FiUsers } from "react-icons/fi";
import { FaIdCard } from "react-icons/fa";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: FiHome },
  { label: "Users", href: "/dashboard/users", icon: FiUsers },
  { label: "Products", href: "/dashboard/products", icon: FiBox },
  { label: "Categories", href: "/dashboard/categories", icon: FaIdCard },
];

export default function AdminSidebar() {
  const { activeSidebar } = useSidebar();
  const isOpen = activeSidebar === "dashboard-admin-sidebar";

  return (
    <motion.aside
      animate={{ x: isOpen ? 0 : -80 }}
      transition={{ duration: 0.25 }}
      className="h-full w-18 bg-black border-r border-neutral-800 flex flex-col items-center pt-5"
    >
      <nav className="flex flex-col gap-3">
        {navLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="group relative flex items-center justify-center size-10 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800 transition"
            >
              <Icon size={20} />

              {/* Tooltip */}
              <span className="absolute left-full ml-3 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}