import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Typography } from "../../ui/Typography";
import ProductGrid from "@/components/common/ProductGrid";

import categories from "@/data/seeds/categories-dumy-data.json";
import products from "@/data/seeds/products-dumy-data.json";



export default async function ProductShowcase() {

  return (
    <Container
      clean
      py={"lg"}
      as={"section"}
      variant={"full"}
      className="w-full bg-black text-white"
    >
      <Container variant={"default"}>
        {categories.slice(0, 2).map((category) => {
          const categoryProducts = products.filter((p) => p.category?.id === category.id);
          if (!categoryProducts.length) return null;
          return (
            <div key={category.id} className="mb-8">
              <div className="flex items-end justify-between mb-4 border-b border-zinc-800 pb-4">
                <Typography as="h2" variant={"h2"} weight={"bold"} tracking="tight">
                  {category.title}
                </Typography>

                <Button variant="secondary" className="rounded-full" asChild>
                  <Link href={`/shop?category=${encodeURIComponent(category.id)}`}>
                    View All
                  </Link>
                </Button>
              </div>

              <ProductGrid limitToRow products={categoryProducts} />
            </div>
          );
        })}
      </Container>
    </Container>
  );
}
