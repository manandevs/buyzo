import { Typography } from "@/components/ui/Typography";

export const ProductInventory = ({ outOfStock, stock }: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${outOfStock ? "bg-red-500" : "bg-[#9C27B0]"}`} />
      <Typography variant="small" className={outOfStock ? "text-red-400" : "text-[#9C27B0]"}>
        {outOfStock ? "Currently Unavailable" : "In Stock & Ready to Ship"}
      </Typography>
    </div>
    {!outOfStock && stock && (
      <Typography>
        Only&nbsp;
        <Typography as={"span"} variant="small" className="text-[#9C27B0] underline underline-[#9C27B0]">
          {stock}
        </Typography>
        &nbsp;items remaining
      </Typography>
    )}
  </div>
);
