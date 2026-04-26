import { Button } from "@/components/ui/button";

interface Category {
  id: string | number;
  title: string;
}

export const CategoryBar = ({ categories }: { categories: Category[] }) => (
  <div className="flex gap-3 pb-4 border-b border-gray-800">
    <Button variant="secondary" className="rounded-full px-3">All</Button>

    {categories.map((cat) => (
      <Button key={cat.id} variant="minimal" className="rounded-full px-3">
        {cat.title}
      </Button>
    ))}
  </div>
);
