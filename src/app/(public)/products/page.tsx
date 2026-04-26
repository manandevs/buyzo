"use client";

import React from "react";
import categories from "@/data/seeds/categories-dumy-data.json";
import products from "@/data/seeds/products-dumy-data.json";

import { Container } from "@/components/ui/Container";
import ProductGrid from "@/components/common/ProductGrid";
import { ProductSearchHeader } from "@/components/public/products/ProductSearchHeader";
import { SidebarFilters } from "@/components/public/products/SidebarFilters";
import { CategoryBar } from "@/components/public/products/CategoryBar";
import { ProductLoadMore } from "@/components/public/products/ProductLoadMore";


export default function ProductsPage() {
  const variationsOptions = [
    ...new Set(
      products
        .flatMap((p) => p.variations ?? [])
        .filter(Boolean)
    ),
  ];

  const sortOptions = ["Latest", "Price: low to high", "Price: high to low", "Name: A to Z", "Name: Z to A"];
  const priceOptions = ["$0 - $100", "$100 - $200", "$200 - $300", "$300 - $400", "$400 - $500"];

  return (
    <Container py="page" className="flex flex-col gap-10">
      <ProductSearchHeader />

      <CategoryBar categories={categories} />

      <div className="flex flex-col lg:flex-row gap-4">
        <SidebarFilters
          priceOptions={priceOptions}
          sortOptions={sortOptions}
          variationsOptions={variationsOptions as string[]}
        />

        <div className="flex-1 flex flex-col">
          <ProductGrid products={products} />
          <ProductLoadMore />
        </div>
      </div>
    </Container>
  );
}