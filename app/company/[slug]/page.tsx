import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";
import dynamic from "next/dynamic";

const TableOfContents = dynamic(() =>
  import("@/components/mdx/toc/toc").then((mod) => mod.TableOfContents),
);

const getCompanyBySlug = (slug: string) =>
  company.find((page) => page.slugAsParams === slug);

type CompanyPageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CompanyPageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = getCompanyBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export function generateStaticParams() {
  return company
    .filter((page) => page.status === "published")
    .map((page) => ({ slug: page.slugAsParams }));
}

export default async function CompanyPage({ params }: CompanyPageParams) {
  const { slug } = await params;
  const page = getCompanyBySlug(slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  return (
    <div className="my-8 w-full min-h-screen">
      {/* <Separator className="mt-4" /> */}
      <div className="relative flex flex-row gap-8">
        <div className="w-full flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">
              {page.title}
            </h1>
            {page.description ? (
              <p className="text-muted-foreground">{page.description}</p>
            ) : null}
          </div>
          <MDXContent code={page.content} />
        </div>
        <TableOfContents toc={page.toc} />
      </div>
    </div>
  );
}
