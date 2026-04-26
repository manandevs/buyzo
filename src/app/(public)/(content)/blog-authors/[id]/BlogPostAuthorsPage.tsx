import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Mail,
  Globe,
  Calendar,
  ArrowLeft,
  BookOpen,
  ShoppingBag
} from "lucide-react";

// Types
import { BlogAuthor, Product } from "@/types"; // Adjust path to your types file

// Data
import authorsData from "@/data/seeds/blog-authers-dumy-data.json";
import productsData from "@/data/seeds/products-dumy-data.json";

// Components
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { LinkedInIcon, TwitterIcon } from "@/components/common/Icons";

function BlogPostAuthorPage({ id }: { id: string }) {
  // Data Lookup
  const author = (authorsData as BlogAuthor[]).find((a) => a.id === id);

  // Filtering products that this author might recommend (Mocked by slicing)
  const recommendedProducts = (productsData as Product[]).slice(0, 3);

  // Mocking recent posts for the layout
  const recentPosts = [
    { id: "1", title: "The Evolution of Premium Wireless Audio", date: "2023-10-12" },
    { id: "2", title: "Why Minimalism is the Future of Home Design", date: "2023-09-28" },
  ];

  if (!author) {
    return (
      <Container py="page" className="flex items-center justify-center min-h-[60vh]">
        <Typography variant="h3" weight="bold" className="text-zinc-500">
          Author not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container py="page">
      <Link
        href="/blog-authors"
        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        <Typography variant="small">Back to Authors</Typography>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-700 font-bold text-7xl">
                {author.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="large" weight="bold">
              Contact & Social
            </Typography>
            <div className="flex flex-col gap-2">
              {author.twitter && (
                <Link
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-all text-zinc-300 hover:text-white"
                >
                  <TwitterIcon size={18} />
                  <Typography variant="small">@{author.twitter}</Typography>
                </Link>
              )}
              {author.linkedin && (
                <Link
                  href={`https://linkedin.com/in/${author.linkedin}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-all text-zinc-300 hover:text-white"
                >
                  <LinkedInIcon size={18} />
                  <Typography variant="small">LinkedIn Profile</Typography>
                </Link>
              )}
              {author.email && (
                <Link
                  href={`mailto:${author.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-all text-zinc-300 hover:text-white"
                >
                  <Mail size={18} />
                  <Typography variant="small">{author.email}</Typography>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right: Bio & Identity */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Typography variant="p" weight="bold" className="text-[#7B1FA2]">
                {author.role || "Expert Contributor"}
              </Typography>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <Typography variant="h2" weight="bold">
                  {author.name}
                </Typography>
                {author.isVerified && (
                  <div className="flex items-center justify-center bg-blue-500 text-white rounded-full px-3 py-1 gap-1.5">
                    <Check size={14} strokeWidth={3} />
                    <Typography variant="small" weight="bold">Verified</Typography>
                  </div>
                )}
              </div>
            </div>

            <Typography variant="large">
              {author.bio || "This author has not provided a biography yet."}
            </Typography>
          </div>

          {/* Meta Info Stats */}
          <div className="grid grid-cols-2">
            {author.website && (
              <div className="flex flex-col gap-1 border border-zinc-800 p-4">
                <Typography variant="small" weight="bold">Official Website</Typography>
                <Link href={author.website} className="flex items-center gap-2 text-white hover:text-[#7B1FA2] transition-colors">
                  <Globe size={16} />
                  <Typography variant="p" weight="semibold">Visit Site</Typography>
                </Link>
              </div>
            )}
            {author.createdAt && (
              <div className="flex flex-col gap-1 border border-zinc-800 p-4">
                <Typography variant="small" weight="bold">Member Since</Typography>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={16} />
                  <Typography variant="p" weight="semibold">
                    {new Date(author.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </Typography>
                </div>
              </div>
            )}
          </div>

          {/* Recent Articles Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="text-[#7B1FA2]" />
              <Typography variant="h4" weight="bold">Recent Articles</Typography>
            </div>

            <div className="flex flex-col gap-2">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group p-4 border border-zinc-800 flex flex-col gap-2"
                >
                  <Typography variant="h4" weight="bold">
                    {post.title}
                  </Typography>
                  <Typography variant="p" className="line-clamp-2">
                    Dive into the detailed breakdown and professional opinion provided by {author.name.split(' ')[0]} in this latest feature...
                  </Typography>
                  <div className="flex items-center justify-end gap-4">
                    <Typography variant="small">Publish At: {post.date}</Typography>
                    <Button variant={"vibrant"}>
                      Read Article
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default BlogPostAuthorPage;