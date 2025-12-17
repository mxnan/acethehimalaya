import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { trips } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";

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
    <article className="mx-auto min-h-[60vh] max-w-3xl px-6 py-12">
      <header className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(trip.date))}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{trip.title}</h1>
        {trip.description ? (
          <p className="text-sm text-muted-foreground">{trip.description}</p>
        ) : null}
      </header>

      <MDXContent code={trip.content} />
    </article>
  );
}
