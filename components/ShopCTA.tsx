"use client";

import Link from "next/link";
import Button from "./common/Button";

export default function ShopCTA() {
  return (
    <section className="w-full pb-36 md:pb-48 lg:pb-72 bg-black">
      <div className="max-w-4xl mx-auto text-center px-4 flex flex-col justify-center items-center">
        <p className="text-2xl md:text-3xl leading-relaxed mb-8 text-white">
          Set the standard for ecommerce excellence with <span className="bg-blue-600 bg-clip-text text-transparent font-bitcountPropDoubleInk">Buyzo.</span>
          Let us help you showcase your products and delight your customers.
        </p>

        <Link
          href="/shop"
          aria-label="See products"
        >
          <Button>
            See products
          </Button>
        </Link>
      </div>
    </section>
  );
}