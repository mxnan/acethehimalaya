import { blogs } from "#site/content";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs Showcase",
};

export default function BlogPage() {
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");

  if (!publishedBlogs.length) {
    return (
      <section className="flex items-center justify-center px-6 py-16">
        <p className="text-sm text-muted-foreground">No blogs available yet.</p>
      </section>
    );
  }

  const sortedBlogs = [...publishedBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="flex flex-col gap-10">
        {sortedBlogs.map((blog) => {
          return (
            <article
              key={blog.slug}
              className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 space-y-1">
                <p className="text-xs uppercase text-muted-foreground">
                  <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                </p>
                <h2 className="text-lg font-semibold leading-tight">
                  {blog.title}
                </h2>
                {blog.description ? (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blog.description}
                  </p>
                ) : null}
              </div>

              <Button
                asChild
                variant="secondary"
                className="w-full justify-center"
              >
                <Link href={`/blogs/${blog.slugAsParams}`}>Read blog</Link>
              </Button>
            </article>
          );
        })}
      </div>

    </div>
  );
}
