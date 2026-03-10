import Link from "next/link";
import ProductCard from "./common/ProductCard";
import Button from "./common/Button";

const categories =[
  {
    title: "Electronics",
    href: "/electronics",
  },
  {
    title: "Fashion",
    href: "/fashion",
  },
  {
    title: "Home & Living",
    href: "/home-living",
  },
  {
    title: "Beauty & Health",
    href: "/beauty-health",
  },
  {
    title: "Sports & Outdoors",
    href: "/sports-outdoors",
  },
  {
    title: "Toys & Baby",
    href: "/toys-baby",
  },
];

const productsData =[
  {
    id: "1",
    title: "Single Wall Matte Black Coffee Cup",
    category: "Home & Living",
    productUrl: "https://yucca.co.za/product/single-wall-matte-black-coffee-cup/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/08/KG-SW-B-250-600x600.jpg",
    price: "1.09",
    isNew: true,
    variations:[
      { label: "250ml", url: "https://yucca.co.za/product/single-wall-matte-black-coffee-cup/?pa_volume=250ml" },
      { label: "350ml", url: "https://yucca.co.za/product/single-wall-matte-black-coffee-cup/?pa_volume=350ml" },
    ],
  },
  {
    id: "2",
    title: "Paper Pulp Cup Holder",
    category: "Home & Living",
    productUrl: "https://yucca.co.za/product/paper-pulp-cup-holder/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/09/KG-CH-2-600x600.jpg",
    price: "1.55",
    isNew: true,
    variations:[
      { label: "2-Holder", url: "https://yucca.co.za/product/paper-pulp-cup-holder/?pa_type-2=2-Holder" },
      { label: "4-Holder", url: "https://yucca.co.za/product/paper-pulp-cup-holder/?pa_type-2=4-Holder" },
    ],
  },
  {
    id: "3",
    title: "Dessert Cup (90mm)",
    category: "Home & Living",
    productUrl: "https://yucca.co.za/product/dessert-cups/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/09/YP-JU9-600x600.jpg",
    price: "1.38",
    isNew: true,
    variations:[
      { label: "250ml", url: "https://yucca.co.za/product/dessert-cups/?pa_volume=250ml" },
      { label: "350ml", url: "https://yucca.co.za/product/dessert-cups/?pa_volume=350ml" },
    ],
  },
  {
    id: "4",
    title: "Dessert Cup Flat Lid (90mm)",
    category: "Home & Living",
    productUrl: "https://yucca.co.za/product/flat-lid-closed/",
    imageUrl: "https://yucca.co.za/wp-content/uploads/2025/08/YP-JYF90-600x600.jpg",
    price: "0.63",
    isNew: true,
    variations:[
      { label: "90mm", url: "https://yucca.co.za/product/flat-lid-closed/?pa_size=90mm" },
    ],
  },
];

export default function Product() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        {categories.map((category) => {
          const categoryProducts = productsData.filter(
            (p) => p.category === category.title
          );

          if (!categoryProducts.length) return null;

          return (
            <div key={category.title} className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {category.title}
                </h2>

                <Link href={category.href}>
                  <Button variant="secondary">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}