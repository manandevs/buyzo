export interface User {
  id: string; 
  email: string;
  role: 'admin' | 'client';
  created_at?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  images: string[];
  price: string;
  currencySymbol: string;
  isNew: boolean;
  stock: number;
  description: string;
  /** URL segment for `/shop/[slug]`; falls back to `id` when absent. */
  slug?: string | null;
  /** Optional variant labels (e.g. sizes); `text[]` or jsonb in Supabase. */
  variations?: string[] | null;
  /** Optional merchandising filters for the shop sidebar. */
  product_type?: string | null;
  material?: string | null;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at?: string;
}

/** Line items for an order; `price` is the unit price at time of purchase. */
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  /** Selected options / variant payload (matches `jsonb` in Supabase). */
  variation: Record<string, unknown> | null;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  author_id: string | null;
  created_at?: string;
  updated_at?: string;
}
