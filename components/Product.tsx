import Link from "next/link";
import ProductCard from "./common/ProductCard";
import Button from "./common/Button";

const productsData = [
  {
    id: 1,
    title: "Single Wall Matte Black Coffee Cup",
    productUrl: "https://yucca.co.za/product/single-wall-matte-black-coffee-cup/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/08/KG-SW-B-250-600x600.jpg",
    price: "1.09",
    isNew: true,
    variations: [
      { label: "250ml", url: "https://yucca.co.za/product/single-wall-matte-black-coffee-cup/?pa_volume=250ml" },
      { label: "350ml", url: "https://yucca.co.za/product/single-wall-matte-black-coffee-cup/?pa_volume=350ml" },
    ],
  },
  {
    id: 2,
    title: "Paper Pulp Cup Holder",
    productUrl: "https://yucca.co.za/product/paper-pulp-cup-holder/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/09/KG-CH-2-600x600.jpg",
    price: "1.55",
    isNew: true,
    variations: [
      { label: "2-Holder", url: "https://yucca.co.za/product/paper-pulp-cup-holder/?pa_type-2=2-Holder" },
      { label: "4-Holder", url: "https://yucca.co.za/product/paper-pulp-cup-holder/?pa_type-2=4-Holder" },
    ],
  },
  {
    id: 3,
    title: "Dessert Cup (90mm)",
    productUrl: "https://yucca.co.za/product/dessert-cups/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/09/YP-JU9-600x600.jpg",
    price: "1.38",
    isNew: true,
    variations: [
      { label: "250ml", url: "https://yucca.co.za/product/dessert-cups/?pa_volume=250ml" },
      { label: "350ml", url: "https://yucca.co.za/product/dessert-cups/?pa_volume=350ml" },
    ],
  },
  {
    id: 4,
    title: "Dessert Cup Flat Lid (90mm)",
    productUrl: "https://yucca.co.za/product/flat-lid-closed/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/08/YP-JYF90-600x600.jpg",
    price: "0.63",
    isNew: true,
    variations: [
      { label: "90mm", url: "https://yucca.co.za/product/flat-lid-closed/?pa_size=90mm" },
    ],
  },
];

export default function Product() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            New Products
          </h2>

          <Link href="/shop">
            <Button variant="secondary">
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsData.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

      </div>
    </section>
  );
}