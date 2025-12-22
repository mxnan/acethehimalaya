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
    return (
      +      <section className="flex items-center justify-center px-6 py-16">
        <p className="text-sm text-muted-foreground">No trips available yet.</p>
      </section>
    );
  }

  // Group trips by country
  const tripsByCountry = publishedTrips.reduce(
    (acc, trip) => {
      // Extract country from slugAsParams (e.g., "nepal/nepal1" -> "nepal")
      const country = trip.slugAsParams.split("/")[0];
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(trip);
      return acc;
    },
    {} as Record<string, typeof publishedTrips>
  );

  // Sort trips within each country by date
  Object.keys(tripsByCountry).forEach((country) => {
    tripsByCountry[country].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return (
    <section className="px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Trips</h1>
      
      <div className="space-y-12">
        {Object.entries(tripsByCountry).map(([country, countryTrips]) => (
          <div key={country}>
            <h2 className="mb-6 text-2xl font-semibold capitalize">
              {country}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {countryTrips.map((trip) => {
                const formattedDate = new Intl.DateTimeFormat("en", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(trip.date));

                return (
                  <article
                    key={trip.slug}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-3 space-y-1">
                      <p className="text-xs uppercase text-muted-foreground">
                        {formattedDate}
                      </p>
                      <h3 className="text-lg font-semibold leading-tight">
                        {trip.title}
                      </h3>
                      {trip.description ? (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {trip.description}
                        </p>
                      ) : null}
                    </div>

                    <Button
                      asChild
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      <Link href={`/trips/${trip.slugAsParams}`}>
                        View trip
                      </Link>
                    </Button>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
