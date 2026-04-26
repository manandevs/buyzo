import { Search } from "lucide-react";
import { Typography } from "@/components/ui/Typography";

export const ProductSearchHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <Typography variant="h2" weight="bold">
      Shop all products
    </Typography>

    <div className="relative w-full md:max-w-60">
      <input
        placeholder="Search products... e.g. toys, gadgets, etc."
        className="w-full bg-transparent border border-gray-700 rounded-full py-2 px-8 focus:outline-none focus:border-white"
      />
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    </div>
  </div>
);
