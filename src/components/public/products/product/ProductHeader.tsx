import { Typography } from "@/components/ui/Typography";

export const ProductHeader = ({ product }: any) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <Typography variant="p" weight="medium">
        {typeof product.category === 'string' ? product.category : product.category?.title} — {product.type}
      </Typography>
      <Typography variant="h2" weight="bold" className="leading-tight">
        {product.title}
      </Typography>
      {product.subtitle && (
        <Typography variant="p" weight="normal" className="italic">
          "{product.subtitle}"
        </Typography>
      )}
    </div>

    <div className="flex items-baseline gap-2">
      <Typography variant="h4" weight="bold">
        {product.currencySymbol}&nbsp;{product.price}
      </Typography>
      <Typography variant="small" className="text-gray-500">
        Tax included
      </Typography>
    </div>
  </div>
);
