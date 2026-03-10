"use client";

import Link from "next/link";
import Button from "./common/Button";

const infoBlocks = [
  {
    title: "Our Mission",
    text: "Our mission is to create a trusted online marketplace where buyers can easily find quality products at great prices and sellers can grow their businesses through powerful digital commerce tools.",
  },
  {
    title: "Our Vision",
    text: "Our vision is to build a global e-commerce platform like today’s leading marketplaces, connecting millions of customers and sellers through innovation, technology, and a seamless shopping experience.",
  },
];

export default function Info() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl md:text-5xl font-bold">
          Shop Smarter with Buyzo, Discover More Every Day
        </h2>

        <p className="text-gray-300 text-lg">
          Buyzo is a modern e-commerce marketplace where customers can explore
          thousands of products across electronics, fashion, home essentials,
          and more. We make online shopping simple, affordable, and reliable
          with secure payments and fast delivery.
        </p>

        <Link href="/about">
          <Button variant="secondary">About Buyzo</Button>
        </Link>
      </div>

      <div className="flex flex-col pt-24">
        {infoBlocks.map(({ title, text }) => (
          <div key={title} className="border-t border-gray-700 py-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {title}
            </h3>
            <p className="text-gray-200">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}