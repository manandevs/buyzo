import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const bitcount = localFont({
  src: "../../public/fonts/bitcount/bitcount-double-ink.ttf",
  variable: "--font-bitcount",
});

const magnetik = localFont({
  src: "../../public/fonts/magnetik/magnetik-regular.otf",
  variable: "--font-magnetik",
});

const typefesse = localFont({
  src: "../../public/fonts/typefesse/typefesse-regular.otf",
  variable: "--font-typefesse",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buyzopro.vercel.app"),
  title: {
    default: "Buyzo | Quality Products, Seamless Shopping & Fast Delivery",
    template: "%s | Buyzo"
  },
  description: "Shop thousands of products from top brands in electronics, fashion, home essentials, and more. Experience secure payments, lightning-fast delivery, and sustainable shopping with Buyzo.",
  keywords: [
    "Ecommerce", "Online Shopping", "Buyzo Marketplace", "Electronics",
    "Fashion", "Home and Living", "Sustainable Packaging", "Fast Delivery"
  ],
  authors: [{ name: "Buyzo Team" }],
  creator: "Buyzo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buyzopro.vercel.app",
    title: "Buyzo | Your Trusted Online Marketplace",
    description: "Discover trendy clothing, electronics, and home essentials with unbeatable prices and global shipping.",
    siteName: "Buyzo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Buyzo Shopping Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buyzo | Shop Smarter, Discover More",
    description: "Fast delivery and trusted service at your fingertips.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icons/favicon.svg",
    shortcut: "/icons/favicon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("h-full antialiased", jetbrainsMono.variable, bitcount.variable, magnetik.variable, typefesse.variable,)} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}