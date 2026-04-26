import FilterGroup from "@/components/common/FilterGroup";

interface SidebarFiltersProps {
  priceOptions: string[];
  sortOptions: string[];
  variationsOptions: string[];
}

export const SidebarFilters = ({ priceOptions, sortOptions, variationsOptions }: SidebarFiltersProps) => (
  <aside className="hidden lg:block w-44 space-y-4">
    <FilterGroup
      title="Price"
      options={priceOptions}
    />
    <FilterGroup
      title="Sort by"
      options={sortOptions}
    />
    <FilterGroup
      title="Product variations"
      options={variationsOptions}
    />
  </aside>
);
