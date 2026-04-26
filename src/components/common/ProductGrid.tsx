"use client";
import { Product } from "@/types";
import ProductCard from "@/components/common/ProductCard";
import { useGridColumns } from "@/hooks/use-grid-columns"; 

interface ProductGridProps {
  products: Product[];
  limitToRow?: boolean;
}

const ProductGrid = ({ products, limitToRow = false }: ProductGridProps) => {
  const cols = useGridColumns();
  // console.log(cols)
  const visibleProducts = limitToRow ? products.slice(0, cols) : products;

  return (
    <div className="grid gap-4 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {visibleProducts.map((product, index) => (
        <ProductCard
          key={index}
          {...product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;