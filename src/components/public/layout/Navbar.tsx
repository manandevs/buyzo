"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  FileUser, Menu, ShoppingCart, User, X,
  Search, Truck, HelpCircle, Heart, Package, ShieldCheck
} from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Typography } from '../../ui/Typography';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Main Links (Public Group)
  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Subheader Utility Links (User & Public Groups)
  const utilityLinks = [
    { name: "Track Order", href: "/track-order", icon: <Truck size={14} /> },
    { name: "Wishlist", href: "/wishlist", icon: <Heart size={14} /> },
    { name: "FAQs", href: "/faq", icon: <HelpCircle size={14} /> },
    { name: "Returns", href: "/returns", icon: <ShieldCheck size={14} /> },
  ];

  // Logic to lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* COOL SUBHEADER (Utility Bar) */}
      {!isOpen && (
        <div className="hidden lg:block bg-black/40 backdrop-blur-md border-b border-white/5">
          <Container
            clean
            variant={"full"}
            className="py-2 bg-linear-to-t from-black via-25% via-black/80 to-transparent"
          >
            <Container className='flex justify-end items-center gap-4'>
              {utilityLinks.map((link) => (
                <Typography
                  key={link.href}
                  asChild
                  variant="small"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Link href={link.href}>
                    {link.icon}
                    {link.name}
                  </Link>
                </Typography>
              ))}
            </Container>
          </Container>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <Container
        variant="full"
        clean
        className={cn(
          "w-full transition-all duration-300",
          isOpen ? "bg-black h-screen" : "bg-linear-to-b from-black via-75% via-black/80 to-transparent"
        )}
      >
        <Container className="flex items-center justify-between gap-3 py-2.5 sm:pb-4 sm:pt-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-3xl sm:text-4xl md:text-5xl font-typefesse tracking-[-3px] sm:tracking-[-4px] md:tracking-[-6px] shrink-0 text-white"
          >
            Buyzo
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Typography
                key={link.href}
                asChild
                variant="small"
                className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Link href={link.href}>
                  {link.name}
                </Link>
              </Typography>
            ))}
          </nav>

          {/* Desktop Actions - STYLES PRESERVED */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/search" className="hidden sm:block p-2 text-white/70 hover:text-white">
              <Search size={20} />
            </Link>

            <Button variant="vibrant" className="hidden md:flex items-center gap-2" asChild>
              <Link href="/sign-in">
                <FileUser size={18} />
                <span className="hidden xl:inline">Sign In</span>
              </Link>
            </Button>

            <Button className="hidden lg:flex items-center gap-2 relative" aria-label="Open cart" asChild>
              <Link href="/cart">
                <ShoppingCart size={18} />
                <span className="hidden xl:inline">Cart</span>
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold min-w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </Button>

            {/* Mobile Cart Style Preserved */}
            <Link href="/cart" className="lg:hidden">
              <button type="button" className="relative p-2 text-white" aria-label="Cart">
                <ShoppingCart size={22} />
                <span className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] font-bold min-w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </Container>

        {/* MOBILE MENU (Expanded with all Routes) */}
        <div
          className={cn(
            "fixed inset-0 top-15 bg-black z-40 lg:hidden flex flex-col transition-all duration-500 ease-in-out overflow-y-auto",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
          )}
        >
          <nav className="flex flex-col px-6 py-8 gap-8 z-50">
            {/* Primary Mobile Links */}
            <div className="flex flex-col gap-2">
              {/* <p className="text-sm tracking-wider uppercase text-zinc-300 font-bold mb-2"></p> */}
              <Typography
                className='text-zinc-300'
                variant={"muted"}
              >
                Marketplace
              </Typography>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold text-white hover:text-purple-400 py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Account & Support (From your folder structure) */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-3">
                {/* <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold"></p> */}
                <Typography
                  className='text-zinc-400'
                  variant={"muted"}
                >
                  Account
                </Typography>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-300"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-300"
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-300"
                >Wishlist
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {/* <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Support</p> */}
                <Typography
                  className='text-zinc-400'
                  variant={"muted"}
                >
                  Support
                </Typography>
                <Link
                  href="/track-order"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-300"
                >
                  Track Order
                </Link>
                <Link
                  href="/shipping"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-300"
                >
                  Shipping
                </Link>
                <Link
                  href="/returns"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-300"
                >Returns
                </Link>
              </div>
            </div>

            {/* Mobile Buttons Preserved */}
            <div className="flex flex-col gap-4 mt-4 pb-12">
              <Button
                variant="neo"
                size="lg"
                className="w-full justify-center gap-3 text-black border-black/20"
                asChild
              >
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} /> Sign In
                </Link>
              </Button>
              <Button
                variant="vibrant"
                size="lg"
                className="w-full justify-center gap-3"
                asChild
              >
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart size={20} /> View Cart
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;