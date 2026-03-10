"use client";

import Image from "next/image";
import { solutions } from "@/lib/data";
import SolutionCard from "./common/SolutionCard";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Ecommerce store hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-gray-900" />
      </div>

      <div className="w-full max-w-7xl px-6 mx-auto min-h-screen flex flex-col justify-center gap-14 py-20 z-10">
        <div className="text-white flex flex-col gap-4 w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mt-5">
            Quality products, seamless shopping, and lightning-fast delivery.
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Shop thousands of products from top brands. Fast delivery and trusted service at your fingertips.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {solutions.map((solution, idx) => (
            <SolutionCard
              key={idx}
              title={solution.title}
              description={solution.description}
              href={solution.href}
              images={solution.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}