import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import GlobalSidebars from "@/components/GlobalSidebars";
import { SidebarProvider } from "@/components/SidebarProvider";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUser from "@/components/actions/SyncUser";
import { Toaster } from "react-hot-toast";

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
        <ClerkProvider>
          <SidebarProvider>
            <SyncUser />
            {children}
            <Footer />
            <GlobalSidebars />
            <Toaster position="bottom-center" toastOptions={{ className: "text-sm" }} />
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
