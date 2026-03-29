"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./common/Button";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useSidebar } from "./SidebarProvider";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const { isLoaded, userId } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSidebar } = useSidebar();
  const cartCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent text-white">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 min-h-[56px] sm:min-h-[64px]">
        <Link
          href="/"
          className="text-3xl sm:text-4xl md:text-5xl font-typefesse tracking-[-3px] sm:tracking-[-4px] md:tracking-[-6px] shrink-0"
        >
          Buyzo
        </Link>

        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center max-w-2xl"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm xl:text-base text-white/90 hover:text-white transition whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isLoaded && !userId && (
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2 cursor-pointer text-sm px-3 py-2"
              >
                <FiUser size={18} />
                <span className="hidden xl:inline">Sign In</span>
              </Button>
            </SignInButton>
          )}
          {isLoaded && userId && (
            <div className="hidden md:block [&_button]:ring-0">
              <UserButton />
            </div>
          )}

          <Button
            onClick={() => openSidebar("cart")}
            className="hidden lg:flex items-center gap-2 px-4 xl:px-5 py-2 text-sm relative"
            aria-label="Open cart"
          >
            <FiShoppingCart size={18} />
            <span className="hidden xl:inline">Cart</span>
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold min-w-[1.25rem] h-5 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {isLoaded && userId && (
            <div className="lg:hidden flex justify-center md:hidden [&_button]:ring-0">
              <UserButton />
            </div>
          )}
          <button
            type="button"
            onClick={() => openSidebar("cart")}
            className="lg:hidden relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Open cart"
          >
            <FiShoppingCart size={22} />
            {mounted && cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold min-w-[1rem] h-4 px-0.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="lg:hidden border-t border-gray-800 bg-gray-950/95 backdrop-blur-md px-4 sm:px-6 py-4 flex flex-col gap-1 shadow-xl max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base py-3 border-b border-gray-800/80 text-white/90 hover:text-purple-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            {isLoaded && !userId && (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gray-700 md:hidden"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUser size={18} />
                  Sign In
                </Button>
              </SignInButton>
            )}

            <Button
              onClick={() => {
                setMenuOpen(false);
                openSidebar("cart");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 lg:hidden"
            >
              <FiShoppingCart size={18} />
              Cart {mounted ? `(${cartCount})` : ""}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
