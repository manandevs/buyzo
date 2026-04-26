import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ShoppingBag,
  Clock,
  Calendar,
  Share2,
  ExternalLink
} from "lucide-react";

// Types
import { BlogPost, BlogAuthor, Product } from "@/types";

// Data
import postsData from "@/data/seeds/blog-posts-dumy-data.json";
import authorsData from "@/data/seeds/blog-authers-dumy-data.json";
import productsData from "@/data/seeds/products-dumy-data.json";

// Components
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";

function BlogPostPage({ id }: { id: string }) {
  // Data Lookup
  const post = (postsData as BlogPost[]).find((p) => p.id === id);
  const author = (authorsData as BlogAuthor[]).find((a) => a?.id === post?.authorId);

  // Filtering products related to this post
  const relatedProducts = (productsData as Product[]).filter((p) =>
    post?.relatedProductIds?.includes(p.id ?? "")
  );

  if (!post) {
    return (
      <Container py="page" className="flex items-center justify-center min-h-[60vh]">
        <Typography variant="h3" weight="bold" className="text-zinc-500">
          Article not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container py="page">
      {/* Navigation */}
      <Link
        href="/blog"
        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        <Typography variant="small">Back to Blog</Typography>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">

        {/* LEFT COLUMN: Media & Shopping (Matches Author Page Avatar Column) */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square border border-zinc-800 bg-zinc-900 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-4 border border-zinc-800 flex flex-col gap-3 bg-zinc-900/20">
            <div className="flex items-center gap-3">
              {/* Corrected: Added relative, width, and height to the container */}
              <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
                <Image
                  src={author?.avatar || "/placeholder-avatar.png"}
                  alt={author?.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <Typography variant="small" weight="bold">
                  {author?.name}
                </Typography>
                <Typography variant="small" className="text-zinc-500">
                  {author?.email}
                </Typography>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="p-4 border border-zinc-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Share2 size={16} className="text-zinc-500" />
              <Typography variant="small" weight="bold">Share Insight</Typography>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-zinc-800 text-xs text-black">Twitter</Button>
              <Button variant="outline" size="sm" className="flex-1 border-zinc-800 text-xs text-black">LinkedIn</Button>
            </div>
          </div>

          {/* Related Products Section (Matches "Contact & Social" section) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#7B1FA2]" />
              <Typography variant="large" weight="bold">
                Shop the Story
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              {relatedProducts.length > 0 ? relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-all group"
                >
                  <div className="relative w-12 h-12 bg-white rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.imageUrl || ""}
                      alt={product.title || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <Typography variant="small" weight="bold" className="line-clamp-1 group-hover:text-[#7B1FA2]">
                      {product.title}
                    </Typography>
                    <Typography variant="small" className="text-zinc-500">
                      {product.currencySymbol}{product.price}
                    </Typography>
                  </div>
                </Link>
              )) : (
                <Typography variant="small" className="text-zinc-500 italic">
                  No related products for this post.
                </Typography>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content (Matches Author Bio Column) */}
        <div className="lg:col-span-2 flex flex-col gap-10">

          {/* Title & Meta Header */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Typography variant="p" weight="bold" className="text-[#7B1FA2]">
                {post.category?.title || "Editorial"}
              </Typography>
              <div className="flex flex-col gap-2">
                <Typography variant="h3" weight="bold">
                  {post.title}
                </Typography>
                {post.subtitle && (
                  <Typography variant="large" className="text-zinc-400 italic">
                    {post.subtitle}
                  </Typography>
                )}
              </div>

              {/* ARTICLE BODY CONTENT */}
              <div className="flex flex-col gap-2">
                {post.content?.map((section, idx) => {
                  switch (section.type) {
                    case "h2": return <Typography key={idx} variant="h4" weight="bold" className="pt-4">{section.text}</Typography>;
                    case "h3": return <Typography key={idx} variant="large" weight="bold" className="pt-2">{section.text}</Typography>;
                    case "blockquote": return (
                      <div key={idx} className="border-l-4 border-[#7B1FA2] pl-6 py-2 my-4 italic bg-zinc-900/30">
                        <Typography variant="p">"{section.text}"</Typography>
                      </div>
                    );
                    case "image": return (
                      <div key={idx} className="relative aspect-video w-full my-4 border border-zinc-800 overflow-hidden">
                        <Image src={section.imageUrl || ""} alt={section.alt || ""} fill className="object-cover" />
                      </div>
                    );
                    case "list": return (
                      <ul key={idx} className="flex flex-col gap-2 list-disc pl-6">
                        {section.listItems?.map((item, i) => (
                          <li key={i}><Typography variant="small">{item}</Typography></li>
                        ))}
                      </ul>
                    );
                    default: return <Typography key={idx} variant="small">{section.text}</Typography>;
                  }
                })}
              </div>

              {/* Navigation CTA Section */}
              <div className="flex items-center justify-end pt-8">
                {post.navigation?.externalUrl && (
                  <div className="p-2 border border-[#7B1FA2] bg-[#7B1FA2]/5 flex flex-col gap-2 rounded-xl max-w-md">
                    <Typography
                      variant="small"
                      weight="bold"
                      className="text-[#7B1FA2]"
                    >
                      {post.navigation.isExternal ? "Original Content" : "Related Link"}
                    </Typography>

                    <Button variant="vibrant" asChild className="w-full">
                      <Link
                        href={post.navigation.externalUrl}
                        target={post.navigation.isExternal ? "_blank" : "_self"}
                        rel={post.navigation.isExternal ? "noopener noreferrer" : undefined}
                      >
                        <Typography variant="small" weight="bold" className="flex items-center gap-2">
                          {post.navigation.label || "Read More"}
                          {post.navigation.isExternal && <ExternalLink size={14} />}
                        </Typography>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Meta Stats (Matches Official Website/Member Since grid) */}
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-1 border border-zinc-800 p-4">
                <Typography variant="small" weight="bold">Reading Time</Typography>
                <div className="flex items-center gap-2 text-white">
                  <Clock size={16} />
                  <Typography variant="p" weight="semibold">{post.readTime || "5 min read"}</Typography>
                </div>
              </div>
              <div className="flex flex-col gap-1 border border-zinc-800 p-4">
                <Typography variant="small" weight="bold">Published On</Typography>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={16} />
                  <Typography variant="p" weight="semibold">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* AUTHOR FOOTER SECTION (Matches Author Bio style) */}
          {author && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <BookOpen className="text-[#7B1FA2]" />
                <Typography variant="h4" weight="bold">About the Author</Typography>
              </div>

              <Link
                href={`/blog-authors/${author.id}`}
                className="group p-6 border border-zinc-800 flex flex-col md:flex-row gap-6 items-center md:items-start hover:bg-zinc-900/50 transition-all"
              >
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                  <Image src={author.avatar || ""} alt={author.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left">
                  <div className="flex flex-col">
                    <Typography variant="p" weight="bold" className="text-white group-hover:text-[#7B1FA2] transition-colors tracking-wider">
                      {author.name}
                    </Typography>
                    <Typography variant="small" className="text-zinc-500 uppercase font-bold tracking-tighter">
                      {author.role}
                    </Typography>
                  </div>
                  <Typography variant="p" className="text-sm text-zinc-400 line-clamp-2 italic">
                    {author.bio}
                  </Typography>
                  <div className="flex items-center justify-end md:justify-start mt-2">
                    <Typography variant="small" className="text-[#7B1FA2] font-bold">View full profile →</Typography>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default BlogPostPage;