import { blogs } from "#site/content";
import { BlogCard } from "@/components/cards/blog-card";
import { NewsletterForm } from "@/components/footer/newsletter-form";
import { CategoriesSidebar } from "@/components/nav/categories-sidebar";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Blog from the himalayas, we have a large collection of blogs explaining everything you will need for your next trip to the himalayas.",

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
        <div className="w-full flex-1">
          {/* Header Section */}
          <div className="my-4 space-y-4">
            {/* Dynamic Title with Blog Count */}
            <div className="flex flex-col md:flex-row md:items-end items-center">
              <h1 className="text-3xl md:text-4xl font-bold">
                {!category ? <>{"Latest"} Blogs</> : <>{decodeURIComponent(category || "")}</>}
              </h1>
              <p className="text-muted-foreground mt-2 md:mt-0 md:ml-4">
                {sortedBlogs.length}{" "}
                {sortedBlogs.length === 1 ? "blog" : "blogs"} found
              </p>
            </div>
            {/* Description */}
            <p className="mt-4 max-w-2xl max-md:text-center text-lg text-gray-700 dark:text-gray-300">
              {!category
                ? "Explore our latest blogs covering a variety of topics to inspire your next adventure."
                : `Explore our latest blogs in the "${decodeURIComponent(category || "")}" category to inspire your next adventure.`}
            </p>

          </div>
          {/* Divider */}
          <Separator className="my-8" />
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
          {/* Divider */}
          <Separator className="my-8 max-w-md" />
          {/* Sign up for Newsletter */}
          <div className="space-y-4">
            <p>
              Stay updated with our latest blog posts, travel tips, and exclusive content by subscribing to our newsletter.
            </p>
            <div className="max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
        <CategoriesSidebar
          categories={allCategories}
          selectedCategory={category}
        />
      </div>
    </div>
  );
}
