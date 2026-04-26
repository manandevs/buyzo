"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types";
import { Typography } from "@/components/ui/Typography";

const CategoryCard:FC<Category> = ({id, imageUrl, title, description}) => {
  return (
    <Link
      key={id}
      href={`/products?${id}`}
      className="group"
    >
      <div className="w-full bg-white p-6">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={800}
          className="object-contain h-auto w-full"
        />
      </div>

      <div className="py-2.5 flex flex-col gap-2">
        <Typography variant="h4" weight="bold">{title}</Typography>
        <Typography variant="p">{description}</Typography>
        <Typography variant="p" className="text-[#7B1FA2]">Explore category →</Typography>
      </div>
    </Link>
  )
}

export default CategoryCard