import BlogPostAuthorsPage from "./BlogPostAuthorsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPostAuthorsPage id={id} />;
}
