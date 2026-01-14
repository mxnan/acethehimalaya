import { trips } from "#site/content";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trips",
  description: "Choose your adventure",
};

export default function TripsPage() {
  const publishedTrips = trips.filter((trip) => trip.status === "published");

  if (!publishedTrips.length) {
    return +(
      <section className="flex items-center justify-center px-6 py-16">
        <p className="text-sm text-muted-foreground">No trips available yet.</p>
      </section>
    );
  }

  // Group trips by country
  const tripsByCountry = publishedTrips.reduce((acc, trip) => {
    // Extract country from slugAsParams (e.g., "nepal/nepal1" -> "nepal")
    const country = trip.slugAsParams.split("/")[0];
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(trip);
    return acc;
  }, {} as Record<string, typeof publishedTrips>);

  // Sort trips within each country by date
  Object.keys(tripsByCountry).forEach((country) => {
    tripsByCountry[country].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="relative flex flex-col gap-10">
        <></>
      </div>
    </div>
  );
}
