import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { trips } from "#site/content";
import { TripMDXContent } from "@/components/mdx/content-mdx";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { BadgeInfo, BadgeInfoIcon, ClockIcon } from "lucide-react";

const TableOfContents = dynamic(
  () => import("@/components/mdx/toc/toc").then((mod) => mod.TableOfContents),
  {
    ssr: true,
    loading: () => (
      <div className="w-64 shrink-0">
        <div className="sticky top-20">
          <div className="h-10 w-full bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-10 w-full bg-muted animate-pulse rounded-lg mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    ),
  }
);

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

  const ogImage = trip.image || "";

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
export const revalidate = 86400; // 24 hours
export default async function TripPage({ params }: TripPageParams) {
  const { country, slug } = await params;
  const slugPath = `${country}/${slug}`;
  const trip = getTripBySlug(slugPath);

  if (!trip || trip.status !== "published") {
    notFound();
  }

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="relative flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* <Separator className="my-6" /> */}
          {/* Title and description */}
          <div className="flex flex-col gap-4 mb-8 mt-3">
            <h1 className="scroll-m-32 text-4xl font-extrabold font-sans uppercase text-primary tracking-normal">
              {trip.title}
              <Badge className="ml-4 font-bold"><ClockIcon className="size-4 mr-1" />{trip.duration}</Badge>
            </h1>
            {trip.description ? (
              <p className="text-muted-foreground">{trip.description}</p>
            ) : null}
          </div>
          {/* <Separator className="my-8" /> */}
          <TripMDXContent code={trip.content} />
        </div>
        <TableOfContents
          toc={trip.toc}
          price={trip.price}
          tripname={trip.title}
        />
      </div>
    </div>
  );
}
