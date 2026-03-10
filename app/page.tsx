import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Marquee from "@/components/Marquee";
import Product from "@/components/Product";
import ShopCTA from "@/components/ShopCTA";
import Solution from "@/components/Solution";

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
      {/* Your future sections will go here */}
      {/* <FeaturedProducts /> */}
      {/* <CategoriesGrid /> */}
      {/* <Footer /> */}
    </main>
  );
}