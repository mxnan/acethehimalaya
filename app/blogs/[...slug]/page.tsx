import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogs } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";

const getBlogBySlug = (slugPath: string) =>
  blogs.find((blog) => blog.slugAsParams === slugPath);

type BlogPageParams = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: BlogPageParams): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : "";
  const blog = getBlogBySlug(slugPath);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export function generateStaticParams() {
  return blogs
    .filter((blog) => blog.status === "published")
    .map((blog) => ({ slug: blog.slugAsParams.split("/") }));
}

export default async function BlogPostPage({ params }: BlogPageParams) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : "";
  const blog = getBlogBySlug(slugPath);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  return (
    <section className="py-12">
      <div className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(blog.date))}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{blog.title}</h1>
        {blog.description ? (
          <p className="text-sm text-muted-foreground">{blog.description}</p>
        ) : null}
      </div>

      <MDXContent code={blog.content} />
    </section>
  );
}
