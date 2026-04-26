import Link from "next/link";
import { Typography } from "@/components/ui/Typography";

export const ProductOptions = ({ variations }: { variations?: string[] }) => {
  if (!variations || variations.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <Typography variant="large" weight="semibold">Available Options</Typography>
      <div className="flex gap-2 flex-wrap">
        {variations.map((variation, idx) => (
          <Link
            key={idx}
            aria-label={variation}
            href={variation}
            className="border border-gray-300 px-3 py-1 hover:bg-black hover:text-white transition"
          >
            <Typography variant={"small"}>{variation}</Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
