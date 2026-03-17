"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./common/Button";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useSidebar } from "./SidebarProvider";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSidebar } = useSidebar();
  const getCartCount = useCartStore((state) => state.getCartCount);
  const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <header className="w-full fixed top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b to-transparent via-black/75 from-black text-white z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-4xl md:text-5xl font-typefesse tracking-[-4px] md:tracking-[-6px]">
          Buyzo
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-400 transition">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <Button variant="ghost" className="hidden md:flex items-center gap-2 cursor-pointer">
              <FiUser size={18} />
              Sign In
            </Button>
          </SignInButton>
          <UserButton />

          <Button onClick={() => openSidebar("cart")} className="hidden md:flex items-center gap-2 px-5 py-2 text-sm relative">
            <FiShoppingCart size={18} />
            Cart
            {mounted && getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Button>

          <button className="md:hidden text-2xl relative" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiShoppingCart />}
            {!menuOpen && mounted && getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden px-6 py-4 flex flex-col gap-4 bg-gray-900 border-b border-gray-800 absolute w-full left-0 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg hover:text-purple-400 transition" onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          <Button onClick={() => { setMenuOpen(false); openSidebar("cart"); }} className="w-full flex items-center justify-center gap-2 py-3 mt-2">
            <FiShoppingCart size={18} />
            Cart ({mounted ? getCartCount() : 0})
          </Button>
        </nav>
      )}
    </header>
  );
}