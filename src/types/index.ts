export type Product = {
  // Identity
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;

  // Classification
  category?: Category;
  type?: string;

  // Pricing
  price?: string;
  currencySymbol?: string;

  // Media
  imageUrl?: string;
  videoUrl?: string;

  // Status
  isPublished?: boolean;
  isNew?: boolean;
  outOfStock?: boolean;
  stock?: number;
  isAd?: boolean;

  // Variants
  variations?: string[];

  // Marketing / Content
  features?: string[];
  benefits?: string[];

  // Technical Details
  specifications?: string[];

  // Social Proof
  reviews?: string[];

  // FAQ
  faq?: {
    questions?: string[];
    answers?: string[];
  }[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isPublished?: boolean;
};

export type BlogAuthor = {
  id: string;
  name: string;
  avatar?: string;
  role?: string; // e.g. "Editor", "Product Specialist"
  bio?: string;

  // Contact / Social
  email?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;

  // Metadata
  isVerified?: boolean;
  createdAt?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string; // SEO description
  featuredImage: string;
  videoUrl?: string;

  // Relations
  category?: Category;
  authorId: string; // Links to BlogAuthor.id
  relatedProductIds?: string[]; // Links to Product.id[]

  // Body Content
  content: BlogPostContentSection[];

  // Metadata
  tags?: string[];
  readTime?: string;
  publishedAt: string;
  isPublished?: boolean;
  isFeatured?: boolean; // For highlighting on homepages

  // Navigation Logic
  navigation?: BlogNavigation;
};

export type BlogNavigation = {
  externalUrl?: string;
  isExternal?: boolean;
  label?: string;
  anchorId?: string;
};

export type BlogPostContentSection = {
  type: "p" | "h2" | "h3" | "blockquote" | "image" | "list";
  text?: string;
  imageUrl?: string;
  alt?: string;
  listItems?: string[]; // Used only if type is "list"
};

export type CartItem = {
  id: string; 
  productId: string;
  quantity: number;
  selectedVariation?: string;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  currencySymbol: string;
  shippingFee?: number;
  tax?: number;
  total?: number;
};