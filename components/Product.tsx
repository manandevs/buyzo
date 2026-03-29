import Link from "next/link";
import ProductCard from "./common/ProductCard";
import Button from "./common/Button";
import { supabase } from "@/lib/supabase";
import {
  normalizeProductRow,
  primaryImageUrl,
  productDetailPath,
  type ShopProduct,
} from "@/lib/shop";

export default async function Product() {
  const [catRes, prodRes] = await Promise.all([
    supabase.from("categories").select("*").order("title"),
    supabase.from("products").select("*").order("created_at", { ascending: false }),
  ]);

  const categories = catRes.data ?? [];
  const products: ShopProduct[] = (prodRes.data ?? []).map((row) =>
    normalizeProductRow(row as Record<string, unknown>)
  );

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        {categories.map((category) => {
          const categoryProducts = products
            .filter((p) => p.category === category.id)
            .slice(0, 4);

          if (!categoryProducts.length) return null;

          return (
            <div key={category.id} className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {category.title}
                </h2>

                <Link href={`/shop?category=${encodeURIComponent(category.id)}`}>
                  <Button variant="secondary">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryProducts.map((product) => {
                  const detailUrl = productDetailPath(product);
                  const variationLinks =
                    product.variations?.map((label) => ({
                      label,
                      url: detailUrl,
                    })) ?? [];

                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      productUrl={detailUrl}
                      imageUrl={primaryImageUrl(product)}
                      price={Number(product.price).toFixed(2)}
                      currencySymbol={product.currencySymbol}
                      isNew={product.isNew}
                      variations={variationLinks}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
