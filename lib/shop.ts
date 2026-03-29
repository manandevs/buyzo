import type { Product } from "@/types";

export type ShopProduct = Product & { categoryTitle?: string };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(s: string) {
  return UUID_RE.test(s);
}

/** Normalize Supabase row: `images` array and legacy `imageUrl`. */
export function normalizeProductRow(row: Record<string, unknown>): ShopProduct {
  const r = row as unknown as Product & { imageUrl?: string };
  let images: string[] = [];
  if (Array.isArray(r.images)) {
    images = (r.images as unknown[]).filter((u): u is string => typeof u === "string" && u.length > 0);
  }
  if (!images.length && typeof r.imageUrl === "string" && r.imageUrl.trim()) {
    images = [r.imageUrl.trim()];
  }
  let variations: string[] | null = null;
  if (Array.isArray(r.variations)) {
    const v = (r.variations as unknown[]).filter((x): x is string => typeof x === "string");
    variations = v.length ? v : null;
  }
  return {
    ...r,
    images,
    variations,
  };
}

export function productDetailPath(p: Pick<Product, "id" | "slug">) {
  const s = typeof p.slug === "string" ? p.slug.trim() : "";
  if (s) return `/shop/${encodeURIComponent(s)}`;
  return `/shop/${encodeURIComponent(p.id)}`;
}

export function primaryImageUrl(p: Pick<Product, "images">) {
  return p.images?.[0] ?? "/images/toys.png";
}

export function productMatchesSearch(p: ShopProduct, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const title = (p.title ?? "").toLowerCase();
  const desc = (p.description ?? "").toLowerCase();
  const cat = (p.categoryTitle ?? "").toLowerCase();
  return title.includes(s) || desc.includes(s) || cat.includes(s);
}
