import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import WhatsappIcon from "@/components/ui/icons/whatsapp-icon";
import FacebookIcon from "@/components/ui/icons/facebook-icon";
import TwitterXIcon from "@/components/ui/icons/twitter-x-icon";
import ClockIcon from "@/components/ui/icons/clock-icon";
import CopyLink from "@/components/mdx/copy-link";
import { formatDate } from "@/lib/utils";
import dynamic from "next/dynamic";


const TableOfContents = dynamic(
  () =>
    import("@/components/mdx/toc").then((mod) => mod.TableOfContents),
);


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

  const ogImage = blog.image || "/brand-assets/brand-logo-icon.png";

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.date,
      authors: ["AceTheHimalaya"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogImage],
    },
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
    <div className="my-8 w-full min-h-screen">
      {/* <Separator className="my-4" /> */}
      <div className="relative flex flex-row gap-8">
        {" "}
        <div className="w-full flex-1">
          {" "}
          {/* Top metadata row */}
          <div className="mb-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
            <div className="max-sm:mb-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {blog.category ? (
                <span className="px-3 py-1.5 bg-brand-color text-secondary rounded-md font-semibold">
                  {blog.category}
                </span>
              ) : null}
              <p className="text-sm text-muted-foreground">
                <ClockIcon className="inline-block mr-1 " />
                <time dateTime={blog.date}>{formatDate(blog.date)}</time>
              </p>
            </div>
            {/* Share buttons */}
            <div className="flex justify-center items-center gap-2">
              <Button asChild variant="outline" size="icon">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    blog.title
                  )}&url=${encodeURIComponent(
                    (process.env.NEXT_PUBLIC_SITE_URL || "") +
                      `/blogs/${blog.slugAsParams}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <TwitterXIcon />
                </a>
              </Button>

              <Button asChild variant="outline" size="icon">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    blog.title +
                      " " +
                      (process.env.NEXT_PUBLIC_SITE_URL || "") +
                      `/blogs/${blog.slugAsParams}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <WhatsappIcon />
                </a>
              </Button>

              <Button asChild variant="outline" size="icon">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    (process.env.NEXT_PUBLIC_SITE_URL || "") +
                      `/blogs/${blog.slugAsParams}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <FacebookIcon />
                </a>
              </Button>

              <CopyLink
                link={
                  (process.env.NEXT_PUBLIC_SITE_URL || "") +
                  `/blogs/${blog.slugAsParams}`
                }
              />
            </div>
          </div>
          <Separator className="my-6" />
          {/* Hero image (if provided) */}
          {blog.image ? (
            <div className="mb-8">
              <Image
                height={900}
                width={1200}
                priority
                src={blog.image}
                alt={blog.title}
                className="w-full h-84 md:h-108 object-cover  rounded-md shadow-sm"
              />
            </div>
          ) : null}
          {/* Title and description */}
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">
              {blog.title}
            </h1>
            {blog.description ? (
              <p className="text text-muted-foreground">{blog.description}</p>
            ) : null}
          </div>
          <MDXContent code={blog.content} />
          {/* Publication date + share buttons */}
          <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <strong>Published:</strong>{" "}
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </p>
            {/* Share buttons */}
            <div className="flex justify-center items-center gap-2">
              <Button asChild variant="outline" size="icon">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    blog.title
                  )}&url=${encodeURIComponent(
                    (process.env.NEXT_PUBLIC_SITE_URL || "") +
                      `/blogs/${blog.slugAsParams}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <TwitterXIcon />
                </a>
              </Button>

              <Button asChild variant="outline" size="icon">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    blog.title +
                      " " +
                      (process.env.NEXT_PUBLIC_SITE_URL || "") +
                      `/blogs/${blog.slugAsParams}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <WhatsappIcon />
                </a>
              </Button>

              <Button asChild variant="outline" size="icon">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    (process.env.NEXT_PUBLIC_SITE_URL || "") +
                      `/blogs/${blog.slugAsParams}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <FacebookIcon />
                </a>
              </Button>

              <CopyLink
                link={
                  (process.env.NEXT_PUBLIC_SITE_URL || "") +
                  `/blogs/${blog.slugAsParams}`
                }
              />
            </div>
          </div>
        </div>
        <TableOfContents  toc={blog.toc} />
      </div>
    </div>
  );
}
