"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./common/Button";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-1/2 -translate-x-1/2 bg-linear-to-b  to-transparent via-black/75 from-black text-white z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-4xl md:text-5xl font-typefesse tracking-[-4px] md:tracking-[-6px]"
        >
          Buyzo
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            <FiUser size={18} />
            Sign In
          </Button>
          <Button className="hidden md:flex items-center gap-2 px-5 py-2 text-sm">
            <FiShoppingCart size={18} />
            Cart
          </Button>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-4 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Button variant="ghost" className="w-full flex items-center gap-2">
            <FiUser size={18} />
            Sign In
          </Button>
          <Button className="w-full flex items-center gap-2">
            <FiShoppingCart size={18} />
            Cart
          </Button>
        </nav>
      )}
    </header>
  );
}