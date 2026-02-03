import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countryPages } from "#site/content";
import { CountryMDXContent } from "@/components/mdx/content-mdx";
import dynamic from "next/dynamic";

const TableOfContents = dynamic(() =>
  import("@/components/mdx/toc/toc").then((mod) => mod.TableOfContents)
);
const getCountryPageBySlug = (country: string) => {
  return countryPages.find((page) => page.country === country);
};

type CountryPageParams = {
  params: { country: string }; // Corrected type
};

export async function generateMetadata(
  { params }: CountryPageParams
): Promise<Metadata> {
  const { country } = await params;

  const countryPage = getCountryPageBySlug(country);
  if (!countryPage) return {};

  return {
    title: countryPage.title,
    description: countryPage.description,
    openGraph: {
      title: countryPage.title,
      description: countryPage.description,
      type: "article",
      authors: ["AceTheHimalaya"],
    },
    twitter: {
      card: "summary_large_image",
      title: countryPage.title,
      description: countryPage.description,
    },
  };
}

export function generateStaticParams() {
  return countryPages.map((page) => ({
    country: page.country,
  }));
}
export default async function CountryPage({ params }: CountryPageParams) {
  const { country } = await params;
  const countryPage = getCountryPageBySlug(country);

  if (!countryPage) {
    console.error(`Country not found: ${country}`);
    notFound();
  }

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="relative flex flex-row gap-8">
        <div className="w-full flex-1">
          {/* Title and description */}
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">
              {countryPage.title}
            </h1>
            {countryPage.description ? (
              <p className="text text-muted-foreground">
                {countryPage.description}
              </p>
            ) : null}
          </div>
          <CountryMDXContent code={countryPage.content} />
        </div>
        <TableOfContents toc={countryPage.toc} />
      </div>
    </div>
  );
}