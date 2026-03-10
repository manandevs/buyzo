import Link from "next/link";
import Image from "next/image";

interface Variation {
  label: string;
  url: string;
}

interface ProductCardProps {
  title: string;
  productUrl: string;
  imageUrl: string;
  price: string;
  currencySymbol?: string;
  isNew?: boolean;
  variations?: Variation[];
}

export default function ProductCard({
  title,
  productUrl,
  imageUrl,
  price,
  currencySymbol = "R",
  isNew = false,
  variations = [],
}: ProductCardProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">

        <div className="relative">

          <Link
            aria-label={`Image Link for ${title}`}
            href={productUrl}
            className="block w-full aspect-square overflow-hidden"
          >
            <span className="block w-full h-full">
              <img
                width="600"
                height="600"
                className="w-full h-full object-cover"
                alt={title}
                src={imageUrl}
              />
            </span>
          </Link>

          {isNew && (
            <span className="absolute top-10 -left-3 text-lg font-medium bg-black px-2 py-1 font-bitcountPropDoubleInk rotate-90">
              New
            </span>
          )}

          {variations.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-2 mt-3">
              {variations.map((variation, idx) => (
                <Link
                  key={idx}
                  aria-label={variation.label}
                  href={variation.url}
                  className="border border-gray-300 text-sm px-3 py-1 hover:bg-black hover:text-white transition"
                >
                  {variation.label}
                </Link>
              ))}
            </div>
          )}

        </div>

        <h3 className="text-base font-medium">
          <Link className="hover:underline" href={productUrl}>
            {title}
          </Link>
        </h3>

        <span className="flex items-center gap-2 text-gray-300">
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
        </span>

      </div>
    </div>
  );
}