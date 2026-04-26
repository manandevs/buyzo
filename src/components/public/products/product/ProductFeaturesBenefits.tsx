import { Typography } from "@/components/ui/Typography";

export const ProductFeaturesBenefits = ({ features, benefits }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col gap-2">
      <Typography variant="h4" weight="bold">Key Features</Typography>
      <ul className="grid grid-cols-1 gap-2">
        {features?.map((feature: string, i: number) => (
          <li key={i} className="flex gap-2 items-start">
            <span className="mt-1 flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
            <Typography>{feature}</Typography>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col gap-2">
      <Typography variant="h4" weight="bold">Why You'll Love It</Typography>
      <div className="grid gap-2">
        {benefits?.map((benefit: string, i: number) => (
          <Typography key={i}>✨&nbsp;{benefit}</Typography>
        ))}
      </div>
    </div>
  </div>
);
