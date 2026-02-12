import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { extraPages } from "#site/content";
import { ExtraMDXContent } from "@/components/mdx/content-mdx";
import dynamic from "next/dynamic";

const TableOfContents = dynamic(() =>
  import("@/components/mdx/toc/toc").then((mod) => mod.TableOfContents),
);

const getExtraPageBySlug = (country: string) => {
  // Extra pages live at content/trips/(extra)/*.mdx
  // Example slug: "trips/(extra)/bhutan"
  return extraPages.find(
    (page) =>
      page.slug === `trips/(extra)/${country}` || page.slugAsParams === country,
  );
};

type ExtraPageParams = {
  params: { country: string };
};

export async function generateMetadata({
  params,
}: ExtraPageParams): Promise<Metadata> {
  const { country } = await params;

  const extraPage = getExtraPageBySlug(country);
  if (!extraPage) return {};

  return {
    title: extraPage.title,
    description: extraPage.description,
    openGraph: {
      title: extraPage.title,
      description: extraPage.description,
      type: "article",
      authors: ["AceTheHimalaya"],
    },
    twitter: {
      card: "summary_large_image",
      title: extraPage.title,
      description: extraPage.description,
    },
  };
}

export function generateStaticParams() {
  return extraPages.map((page) => {
    // Use the final path segment (e.g. "bhutan" from "trips/(extra)/bhutan")
    const segments = page.slug.split("/");
    const country = segments[segments.length - 1];

    return { country };
  });
}

export default async function ExtraPage({ params }: ExtraPageParams) {
  const { country } = await params;
  const extraPage = getExtraPageBySlug(country);

  if (!extraPage) {
    console.error(`Extra page not found: ${country}`);
    notFound();
  }

  return (
    <div className="my-8 w-full">
      <div className="relative flex flex-row gap-8">
        <div className="w-full flex flex-col">
          {/* Title and description */}
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">
              {extraPage.title}
            </h1>
            {extraPage.description ? (
              <p className="text text-muted-foreground">
                {extraPage.description}
              </p>
            ) : null}
          </div>
          <ExtraMDXContent code={extraPage.content} />
        </div>
        <TableOfContents toc={extraPage.toc} />
      </div>
    </div>
  );
}

