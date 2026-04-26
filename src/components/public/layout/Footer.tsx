"use client";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Typography } from "../../ui/Typography";

const FOOTER_DATA = [
  { title: "Categories", links: [{ l: "Electronics", h: "/categories/electronics" }, { l: "Fashion", h: "/categories/fashion" }, { l: "Home & Living", h: "/categories/home-living" }, { l: "Beauty & Health", h: "/categories/beauty-health" }, { l: "Sports & Outdoors", h: "/categories/sports-outdoors" }, { l: "Toys & Baby", h: "/categories/toys-baby" }] },
  { title: "Information", links: [{ l: "About Us", h: "/about" }, { l: "Blog", h: "/blog" }, { l: "FAQs", h: "/faq" }, { l: "Contact Us", h: "/contact" }, { l: "Search", h: "/search" }] },
  { title: "Help", links: [{ l: "Shipping Info", h: "/shipping" }, { l: "Returns & Refunds", h: "/returns" }, { l: "Privacy Policy", h: "/privacy-policy" }, { l: "Terms of Service", h: "/terms-of-service" }] },
  { title: "Account", links: [{ l: "Profile", h: "/account" }, { l: "My Orders", h: "/orders" }, { l: "Track Order", h: "/track-order" }, { l: "Wishlist", h: "/wishlist" }, { l: "Shopping Cart", h: "/cart" }] },
];

export default function Footer() {
  return (
    <Container
      clean
      as={"footer"}
      variant={"full"}
      className="bg-zinc-50 text-black border-t border-zinc-200"
    >
      <Container py={"sm"}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-zinc-300 pb-8">
          <Typography as={"h4"} variant={"h4"} weight={"bold"}>
            Quality products. Trusted shopping.
          </Typography>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-black p-2 rounded-full text-white shadow-lg"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <Link href="/" className="text-5xl font-typefesse tracking-[-5px]">
              Buyzo
            </Link>
            <Typography className="max-w-xs">
              Premium marketplace for electronics, fashion, and home essentials with secure payments.
            </Typography>
          </div>
          {FOOTER_DATA.map((col) => (
            <div
              key={col.title}
              className="lg:col-span-2"
            >
              <Typography as={"h4"} variant={"large"} weight={"bold"} className="text-zinc-400 mb-2">
                {col.title}
              </Typography>
              <ul
                className="flex flex-col gap-2">
                {col.links.map((n) =>
                  <Typography as={"li"} key={n.l} className="hover:underline underline-offset-4">
                    <Link href={n.h}>{n.l}</Link>
                  </Typography>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-200 pt-10 text-zinc-500">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Typography as={"span"} variant={"small"} suppressHydrationWarning>
              © {new Date().getFullYear()} Buyzo Marketplace. All rights reserved.
            </Typography>
            <div className="flex gap-3 grayscale opacity-50 text-[9px] font-bold tracking-tighter">
              <span>VISA</span>
              <span>MASTERCARD</span>
              <span>PAYPAL</span>
            </div>
          </div>
          <div className="flex items-center gap-6 font-bold">
            <Link href="/sign-in" className="text-sm hover:text-purple-600">
              Sign In
            </Link>
            <Link href="/register" className="text-sm hover:text-purple-600">
              Join Buyzo
            </Link>
          </div>
        </div>
      </Container>
    </Container>
  );
}