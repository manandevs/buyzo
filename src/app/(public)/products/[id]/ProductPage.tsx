"use client";

import products from "@/data/seeds/products-dumy-data.json";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { ProductMedia } from "@/components/public/products/product/ProductMedia";
import { ProductHeader } from "@/components/public/products/product/ProductHeader";
import { ProductOptions } from "@/components/public/products/product/ProductOptions";
import { ProductInventory } from "@/components/public/products/product/ProductInventory";
import { ProductFaq } from "@/components/public/products/product/ProductFaq";
import { ProductFeaturesBenefits } from "@/components/public/products/product/ProductFeaturesBenefits";
import { ProductSpecsReviews } from "@/components/public/products/product/ProductSpecsReviews";

function ProductPage({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Container py="page" className="flex items-center justify-center min-h-[60vh]">
        <Typography variant="h3" weight="bold" className="text-gray-500">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container py="page">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* Left: Media */}
        <ProductMedia
          imageUrl={product.imageUrl}
          title={product.title}
          isNew={product.isNew}
          outOfStock={product.outOfStock}
          videoUrl={product.videoUrl}
        />

        {/* Right: Details */}
        <div className="flex flex-col gap-6 col-span-2">
          <ProductHeader
            product={product}
          />

          <div className="h-px bg-gray-800 w-full my-2" />

          <ProductOptions variations={product.variations} />

          <ProductInventory
            outOfStock={product.outOfStock}
            stock={product.stock}
          />

          <div className="mt-4 flex flex-col gap-2">
            <Typography variant="large" weight="semibold">Description</Typography>
            <Typography variant="p">
              {product.description || "No description available for this product."}
            </Typography>
          </div>

          <ProductFaq faq={product.faq} />
        </div>
      </div>

      <ProductFeaturesBenefits
        features={product.features}
        benefits={product.benefits}
      />

      <ProductSpecsReviews
        specifications={product.specifications}
        reviews={product.reviews}
      />
    </Container>
  );
}

export default ProductPage;