import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { trips } from "#site/content";
import { MDXContent } from "@/components/mdx/content-mdx";
import { TableOfContents } from "@/components/mdx/toc";

const getTripBySlug = (slugPath: string) =>
  trips.find((trip) => trip.slugAsParams === slugPath);

type TripPageParams = {
  params: {
    country: string;
    slug: string;
  };
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

  const ogImage = trip.image || "/brand-assets/brand-logo-icon.png";

  return {
    title: trip.title,
    description: trip.description,
    keywords: trip.tags,
    openGraph: {
      title: trip.title,
      description: trip.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
      type: "article",
      authors: ["AceTheHimalaya"],
      tags: trip.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: trip.title,
      description: trip.description,
      images: [ogImage],
    },
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
          {/* <Separator className="my-6" /> */}
          {/* Title and description */}
          <div className="flex flex-col gap-4 mb-8 mt-3">
            <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">
              {trip.title}
            </h1>
            {trip.description ? (
              <p className="text-muted-foreground">{trip.description}</p>
            ) : null}
          </div>
          {/* <Separator className="my-8" /> */}
          <MDXContent code={trip.content} />
        </div>
        <TableOfContents toc={trip.toc} pricing={trip.price} />
      </div>
    </div>
  );
}
