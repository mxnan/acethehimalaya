import { blogs } from "#site/content";
import { BlogCard } from "@/components/cards/blog-card";
import { CategoriesSidebar } from "@/components/nav/categories-sidebar";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Blog from the himalayas, we have a large collection of blogs explaining everything you will need for you next trip",
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");
  // Get all unique categories
  const allCategories = Array.from(
    new Set(publishedBlogs.map((blog) => blog.category).filter(Boolean))
  ).sort();

  // Filter blogs by category if selected
  const filteredBlogs = category
    ? publishedBlogs.filter((blog) => blog.category === category)
    : publishedBlogs;

  // Sort by date (newest first)
  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="relative flex flex-row gap-8">
        {" "}
        <div className="w-full flex-1">
          {/* Dynamic Title */}
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-8">
            {!category ? <>{"Latest"} Blogs</> : <>{category}</>}
          </h1>
          <Separator className="my-8 max-w-md" />
          {/* Blog Grid */}
          {sortedBlogs.length === 0 ? (
            <p className="text-muted-foreground">
              No blogs found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedBlogs.map((blog) => (
                <BlogCard key={blog.slugAsParams} blog={blog} />
              ))}
            </div>
          )}
        </div>
        <CategoriesSidebar
          categories={allCategories}
          selectedCategory={category}
        />
      </div>
    </div>
  );
}
