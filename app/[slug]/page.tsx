import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { company } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";

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
    <article className="mx-auto min-h-[60vh] max-w-3xl px-6 py-12">
      <header className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(page.date))}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
        {page.description ? (
          <p className="text-sm text-muted-foreground">{page.description}</p>
        ) : null}
      </header>

      <MDXContent code={page.content} />
    </article>
  );
}

