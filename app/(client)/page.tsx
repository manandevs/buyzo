import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Marquee from "@/components/Marquee";
import Product from "@/components/Product";
import ShopCTA from "@/components/ShopCTA";
import Solution from "@/components/Solution";
import Standards from "@/components/Standards";
import WhatsAppButton from "@/components/WhatsAppButton";

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
      <WhatsAppButton />
    </main>
  );
}