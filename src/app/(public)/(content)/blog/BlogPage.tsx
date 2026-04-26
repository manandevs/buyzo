import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react"; // Replaced Check with Clock for blog meta

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

import blogPosts from "@/data/seeds/blog-posts-dumy-data.json";
import blogAuthors from "@/data/seeds/blog-authers-dumy-data.json";

function BlogPage() {
  // Logic to separate the two featured posts
  const featuredPosts = blogPosts.filter((p) => p.isFeatured && p.isPublished).slice(0, 3);
  const regularPosts = blogPosts.filter(
    (p) => p.isPublished && !featuredPosts.find((f) => f.id === p.id)
  );

  return (
    <Container py="page">
      {/* Header */}
      <div className="mb-10">
        <Typography variant="h2" weight="bold">
          Insights & Articles
        </Typography>

        <Typography variant="p" className="text-zinc-400 mt-2 max-w-2xl">
          Deep dives into technology, sustainable fashion, and modern home design curated by our industry experts.
        </Typography>
      </div>

      <div className="mb-6 flex flex-col gap-4">
         <Typography variant="h3" weight="bold">
          Featured Stories
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4">
         <Typography variant="h3" weight="bold">
          Recent Posts
        </Typography>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
            {regularPosts.map((post) => (
            <PostCard key={post.id} post={post} />
            ))}
        </div>
      </div>
    </Container>
  );
}

function PostCard({ post }: { post: any }) {
  // Find author name for the "Verified" equivalent slot
  const author = blogAuthors.find((a) => a.id === post.authorId);

  return (
    <div className="group flex flex-col" title="Read Article">
      {/* Featured Image Section (Matches Avatar Section) */}
      <Link
        href={`/blog/${post.id}`}
        className="relative w-full aspect-5/3 overflow-hidden bg-zinc-900"
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content Section (Matches Author Content Section) */}
      <div className="py-4 flex gap-2 flex-col flex-1">
        
        {/* Top Meta Row (Role equivalent) */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <Typography variant="small" className="text-[#7B1FA2] font-bold">
            {post.category?.title || "Editorial"}
          </Typography>

          <div className="flex items-center gap-1.5 text-zinc-500">
            <Clock size={12} />
            <Typography variant="small" className="text-zinc-500">
              {post.readTime}
            </Typography>
          </div>
        </div>

        {/* Title Row (Name equivalent) */}
        <div className="flex items-center justify-between gap-4 mb-1">
          <Typography
            variant="large"
            weight="bold"
            tracking={"wider"}
            className="line-clamp-2 hover:underline flex-1"
          >
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </Typography>

          {/* Author Tag (Verified equivalent) */}
          <Typography
            variant={"small"}
            className="hidden sm:flex items-center justify-center bg-zinc-800 text-zinc-300 rounded-full px-2 py-0.5 whitespace-nowrap"
          >
            By {author?.name.split(" ")[0]}
          </Typography>
        </div>

        {/* Description (Bio equivalent) */}
        <Typography variant="p" className="line-clamp-3 text-zinc-400">
          {post.description || "Click to read the full story and discover more insights from our team."}
        </Typography>
      </div>
    </div>
  );
}

export default BlogPage;
