import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogs } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";
import { formatDate } from "@/lib/utils";
import { Copy, Facebook, Linkedin, Timer, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

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
    openGraph: blog.image ? { images: [blog.image] } : undefined,
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
    <div className="relative max-w-5xl mx-auto pt-8">



      {/* Top metadata row */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3">
          {blog.category ? (
            <span className="px-2 py-1 bg-brand-color text-secondary rounded-md text-sm font-semibold">{blog.category}</span>
          ) : null}
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            <Timer className="inline-block mr-1 h-3 w-3" />
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
          </p>
        </div>
        {/* Share buttons */}
         <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={(process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open post link"
            >
              <Copy className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      {/* Hero image (if provided) */}
      {blog.image ? (
        <div className="mb-8">
          <Image
            height={1000}
            width={1000}
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-md shadow-sm"
          />
        </div>
      ) : null}
      {/* Title and description */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">{blog.title}</h1>
        {blog.description ? (
          <p className="text text-muted-foreground">{blog.description}</p>
        ) : null}
      </div>

      <MDXContent code={blog.content} />

      {/* Publication date + share buttons */}
      <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <strong>Published:</strong>{" "}
          <time dateTime={blog.date}>{formatDate(blog.date)}</time>
        </p>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent((process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={(process.env.NEXT_PUBLIC_SITE_URL || "") + `/blogs/${blog.slugAsParams}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open post link"
            >
              <Copy className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
