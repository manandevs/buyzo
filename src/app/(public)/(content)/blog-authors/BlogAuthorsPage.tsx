import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

import blogAuthers from "@/data/seeds/blog-authers-dumy-data.json"
import { LinkedInIcon, TwitterIcon } from "@/components/common/Icons";

function BlogAuthorsPage() {
  return (
    <Container py="page">
      {/* Header */}
      <div className="mb-10">
        <Typography variant="h2" weight="bold">
          Our Authors
        </Typography>

        <Typography variant="p" className="text-zinc-400 mt-2 max-w-2xl">
          Meet the industry experts and creative minds behind our insights, bringing you the latest in tech, fashion, and home lifestyle.
        </Typography>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogAuthers.map((author) => (
          <div
            key={author.id}
            title="View Profile"
            className="group flex flex-col"
          >
            {/* Avatar Section */}
            <Link
              href={`/blog-authors/${author.id}`}
              className="relative w-full aspect-square"
            >
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 font-bold text-4xl">
                  {author.name.charAt(0)}
                </div>
              )}
            </Link>

            {/* Content Section */}
            <div className="py-4 flex gap-2 flex-col flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <Typography variant="small" className="text-[#7B1FA2]">
                  {author.role || "Contributor"}
                </Typography>

                <div className="flex gap-3">
                  {author.twitter && (
                    <Link href={`https://twitter.com/${author.twitter}`} className="text-zinc-500 hover:text-white transition-colors">
                      <TwitterIcon className="w-4 h-4" />
                    </Link>
                  )}
                  {author.linkedin && (
                    <Link href={`https://linkedin.com/in/${author.linkedin}`} className="text-zinc-500 hover:text-white transition-colors">
                      <LinkedInIcon className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <Typography variant="large" weight="bold" tracking={"wider"} className="line-clamp-1 hover:underline">
                  <Link href={`/blog-authors/${author.id}`}>
                    {author.name}
                  </Link>
                </Typography>

                {author.isVerified && (
                  <Typography
                    variant={"small"}
                    title="Verified Author"
                    className="flex items-center justify-center bg-blue-500 rounded-full px-2 gap-1"
                  >
                    <Check size={14} />
                    Verified
                  </Typography>
                )}
              </div>

              <Typography variant="p" className="line-clamp-3">
                {author.bio || "No biography available."}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default BlogAuthorsPage;