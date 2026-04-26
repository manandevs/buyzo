import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Typography } from "../ui/Typography";

export default function ProductCard({
  id,
  title = "Product Title",
  imageUrl = "/images/toys.png",
  price = "0.00",
  currencySymbol = "R",
  isNew = false,
  variations = [],
}: Product) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Link
            aria-label={`Image Link for ${title}`}
            href={`/products/${id}`}
            className="block w-full aspect-square overflow-hidden"
          >
            <span className="block w-full h-full">
              <Image
                width={600}
                height={600}
                className="w-full h-full object-cover"
                alt={title}
                src={imageUrl}
              />
            </span>
          </Link>

          {isNew && (
            <span className="absolute top-10 -left-3 bg-black px-2 py-1 rotate-90">
              <Typography variant={"large"} weight={"medium"} font={"bitcount"}>
                New
              </Typography>
            </span>
          )}

          {variations.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-2 mt-3">
              {variations.map((variation, idx) => (
                <Link
                  key={idx}
                  aria-label={variation}
                  href={variation}
                  className="border border-gray-300 px-3 py-1 hover:bg-black hover:text-white transition"
                >
                  <Typography variant={"small"}>
                    {variation}
                  </Typography>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Typography
          as={"h3"}
          variant={"p"}
          className="hover:underline"
        >
          <Link href={`/products/${id}`}>
            {title}
          </Link>
        </Typography>

        <Typography
          as={"span"}
          variant={"p"}
          className="flex items-center gap-2 text-gray-300"
        >
          <span>
            From{" "}
            <span className="font-medium">
              <span>{currencySymbol}</span>
              {price}
            </span>
          </span>

          <span className="text-gray-300">
            incl. vat
          </span>
        </Typography>
      </div>
    </div>
  );
}