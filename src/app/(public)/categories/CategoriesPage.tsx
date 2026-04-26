import CategoryCard from "@/components/common/CategoryCard";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import categories from "@/data/seeds/categories-dumy-data.json";

function CategoriesPage() {
  const publishedCategories = categories.filter((c) => c.isPublished);

  return (
    <Container py="page">
      {/* Header */}
      <div className="mb-10">
        <Typography variant="h2" weight="bold">
          Categories
        </Typography>

        <Typography variant="p" className="text-zinc-400 mt-2">
          Explore curated product categories designed to help you discover what you need faster and smarter.
        </Typography>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedCategories.map((category) => (
          <CategoryCard key={category.id} {...category}/>
        ))}
      </div>
    </Container>
  );
}

export default CategoriesPage;