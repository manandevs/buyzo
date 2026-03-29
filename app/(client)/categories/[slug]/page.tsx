import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import ShopCTA from "@/components/ShopCTA";
import { supabase } from "@/lib/supabase";
import {
  STOREFRONT_CATEGORY_SLUGS,
  findCategoryBySlug,
  isStorefrontCategorySlug,
} from "@/lib/storefront-nav";
import {
  normalizeProductRow,
  primaryImageUrl,
  productDetailPath,
} from "@/lib/shop";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STOREFRONT_CATEGORY_SLUGS.map(({ slug }) => ({ slug }));
}

export default async function CategorySlugPage({ params }: Props) {
  const { slug } = await params;

  if (!isStorefrontCategorySlug(slug)) {
    notFound();
  }

  const meta = STOREFRONT_CATEGORY_SLUGS.find((c) => c.slug === slug)!;

  const { data: categories } = await supabase.from("categories").select("*");
  const category = findCategoryBySlug(categories, slug);

  const { data: productRows } = category
    ? await supabase
        .from("products")
        .select("*")
        .eq("category", category.id)
        .order("created_at", { ascending: false })
    : { data: null as null };

  const products = (productRows ?? []).map((row) =>
    normalizeProductRow(row as Record<string, unknown>)
  );

  const title = category?.title ?? meta.label;

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{title}</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
          <div className="flex flex-wrap gap-3">
            {category && (
              <Link href={`/shop?category=${encodeURIComponent(category.id)}`}>
                <Button variant="secondary" className="text-sm sm:text-base">
                  Shop filtered view
                </Button>
              </Link>
            )}
            <Link href="/shop">
              <Button variant="ghost" className="text-sm sm:text-base border border-gray-700">
                All products
              </Button>
            </Link>
          </div>
        </div>

        {!category && (
          <p className="text-gray-400 mb-8 max-w-2xl">
            This category will appear here once it is added in your store admin with the title{" "}
            <span className="text-white font-medium">&quot;{meta.label}&quot;</span>.
          </p>
        )}

        {products.length === 0 ? (
          <p className="text-gray-500 py-12 text-center">
            No products in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => {
              const detailUrl = productDetailPath(product);
              const variationLinks =
                product.variations?.map((label) => ({
                  label,
                  url: detailUrl,
                })) ?? [];

              return (
                <ProductCard
                  key={product.id}
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
        )}
      </main>
      <ShopCTA />
    </div>
  );
}
