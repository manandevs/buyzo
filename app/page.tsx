import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Marquee />

      {/* Your future sections will go here */}
      {/* <FeaturedProducts /> */}
      {/* <CategoriesGrid /> */}
      {/* <Footer /> */}
    </main>
  );
}