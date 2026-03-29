import { slugify } from "@/lib/utils";

/** Footer / marketing routes; slugs match `slugify(category.title)` in Supabase. */
export const STOREFRONT_CATEGORY_SLUGS = [
  { slug: "electronics", label: "Electronics" },
  { slug: "fashion", label: "Fashion" },
  { slug: "home-living", label: "Home & Living" },
  { slug: "beauty-health", label: "Beauty & Health" },
  { slug: "sports-outdoors", label: "Sports & Outdoors" },
] as const;

export type StorefrontCategorySlug = (typeof STOREFRONT_CATEGORY_SLUGS)[number]["slug"];

export function isStorefrontCategorySlug(s: string): s is StorefrontCategorySlug {
  return STOREFRONT_CATEGORY_SLUGS.some((c) => c.slug === s);
}

export function categoryHref(slug: string) {
  return `/categories/${slug}`;
}

/** Resolve live category row from Supabase list by URL slug. */
export function findCategoryBySlug<
  T extends { id: string; title: string },
>(categories: T[] | null | undefined, slug: string): T | undefined {
  return categories?.find((c) => slugify(c.title) === slug);
}
