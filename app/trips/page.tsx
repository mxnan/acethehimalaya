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

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="relative flex-1">
        <div className="space-y-8">
          {Object.entries(tripsByCountry).map(([country, countryTrips]) => (
            <div key={country} className="space-y-4">
              <h2 className="text-2xl font-bold capitalize">{country}</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {countryTrips.map((trip) => (
                  <Button
                    key={trip.slugAsParams}
                    asChild
                    variant="outline"
                    className="justify-start"
                  >
                    <Link href={`/trips/${trip.slugAsParams}`}>
                      {trip.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
