import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Marquee from "@/components/Marquee";
import Product from "@/components/Product";
import ShopCTA from "@/components/ShopCTA";
import Solution from "@/components/Solution";
import Standards from "@/components/Standards";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <Hero />
      <Marquee />
      <ShopCTA />
      <Solution />
      <Info />
      <Product />
      <CTA />
      <Standards />
      <FAQ />
      <a
        href="https://wa.me/+27837960416"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
    </main>
  );
}