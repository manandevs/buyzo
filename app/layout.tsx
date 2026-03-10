import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const typefesse = localFont({
  src: "../public/fonts/Typefesse.otf",
  variable: "--font-typefesse",
});

const magnetik = localFont({
  src: "../public/fonts/Magnetik.otf",
  variable: "--font-magnetik",
});

const bitcountPropDoubleInk = localFont({
  src: "../public/fonts/BitcountPropDoubleInk.ttf",
  variable: "--font-bitcountPropDoubleInk",
});

export const metadata: Metadata = {
  title: "Buyzo",
  description: "Buyzo ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${typefesse.variable} ${magnetik.variable} ${bitcountPropDoubleInk.variable} antialiased font-magnetik bg-black text-white`}>
        <Header />
        {children}
      </body>
    </html>
  );
}