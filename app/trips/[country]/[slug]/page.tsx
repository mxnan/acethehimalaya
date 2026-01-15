import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { trips } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";
import { TableOfContents } from "@/components/mdx/toc";

const getTripBySlug = (slugPath: string) =>
  trips.find((trip) => trip.slugAsParams === slugPath);

type TripPageParams = {
  params: Promise<{ country: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: TripPageParams): Promise<Metadata> {
  const { country, slug } = await params;
  const slugPath = `${country}/${slug}`;
  const trip = getTripBySlug(slugPath);

  if (!trip) {
    return {};
  }

  return {
    title: trip.title,
    description: trip.description,
  };
}

export function generateStaticParams() {
  return trips
    .filter((trip) => trip.status === "published")
    .map((trip) => {
      const [country, slug] = trip.slugAsParams.split("/");
      return { country, slug };
    });
}

export default async function TripPage({ params }: TripPageParams) {
  const { country, slug } = await params;
  const slugPath = `${country}/${slug}`;
  const trip = getTripBySlug(slugPath);

  if (!trip || trip.status !== "published") {
    notFound();
  }

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="relative flex flex-row gap-8">
        <div className="relative flex-1">
          <MDXContent code={trip.content} />
        </div>
        <TableOfContents toc={trip.toc} />
      </div>
    </div>
  );
}
