import { blogs } from "#site/content";
import { CategoriesSidebar } from "@/components/nav/categories-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClockIcon from "@/components/ui/clock-icon";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs Showcase",
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
          <h1 className="text-3xl md:text-4xl font-bold ml-4 mt-4 mb-8">
            {!category ? (
              <>{"Latest"} Blogs</>
            ) : (
              <>
                 {category}
              </>
            )}
          </h1>
           <Separator className="my-8" />
          {/* Blog Grid */}
          {sortedBlogs.length === 0 ? (
            <p className="text-muted-foreground">
              No blogs found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedBlogs.map((blog) => (
                <Link key={blog.slugAsParams}  href={`/blogs/${blog.slugAsParams}`}>
                  <Card className="p-4 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    {/* Cover Image */}
                    {blog.image && (
                      <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-xl">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {blog.title}
                      </CardTitle>
                      {blog.description && (
                        <CardDescription className="line-clamp-3">
                          {blog.description}
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />
                        <time dateTime={blog.date}>
                          {formatDate(blog.date)}
                        </time>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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