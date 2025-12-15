
import { blogs } from "#site/content";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs Showcase",
};

const BlogPage = () => {
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");

  if (!publishedBlogs.length) {
    return (
      <section className="mx-auto flex max-w-5xl items-center justify-center px-6 py-16">
        <p className="text-sm text-muted-foreground">No blogs available yet.</p>
      </section>
    );
  }

  const sortedBlogs = [...publishedBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
      {sortedBlogs.map((blog) => {
        const formattedDate = new Intl.DateTimeFormat("en", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(blog.date));

        return (
          <article
            key={blog.slug}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-3 space-y-1">
              <p className="text-xs uppercase text-muted-foreground">
                {formattedDate}
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
    </section>
  );
};

export default BlogPage;
