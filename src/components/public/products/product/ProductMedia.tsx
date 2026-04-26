import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

export const ProductMedia = ({ imageUrl, title, isNew, outOfStock, videoUrl }: any) => (
  <div className="flex flex-col gap-4">
    <div className="aspect-square relative">
      <Image
        src={imageUrl}
        alt={title}
        width={800}
        height={800}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-12 -left-8 flex gap-2 rotate-90">
        {isNew && (
          <Button className="bg-black">
            <Typography variant={"small"} weight={"medium"} font={"bitcount"}>New Arrival</Typography>
          </Button>
        )}
        {outOfStock && (
          <Button variant={"destructive"}>
            <Typography variant={"small"} weight={"medium"}>Out of Stock</Typography>
          </Button>
        )}
      </div>
    </div>

    {videoUrl && (
      <Button variant={"vibrant"} asChild>
        <Link href={videoUrl}>
          <Typography variant={"small"} weight={"medium"}>Watch Product Video</Typography>
        </Link>
      </Button>
    )}
  </div>
);
