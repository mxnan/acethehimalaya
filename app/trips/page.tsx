import { trips } from "#site/content";
import { TripCard } from "@/components/cards/trip-card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trips",
  description: "Choose your adventure",
};

export default function TripsPage() {
  const publishedTrips = trips.filter(
    (trip) => trip.status === "published"
  );

  if (!publishedTrips.length) {
    return (
      <section className="flex items-center justify-center px-6 py-16">
        <p className="text-sm text-muted-foreground">
          No trips available yet.
        </p>
      </section>
    );
  }

  // Group by country only
  const tripsByCountry = publishedTrips.reduce((acc, trip) => {
    const country = trip.slugAsParams.split("/")[0];
    acc[country] ??= [];
    acc[country].push(trip);
    return acc;
  }, {} as Record<string, typeof publishedTrips>);

  const countryOrder = ["nepal", "bhutan", "tibet"];
  const orderedCountries = [
    ...countryOrder.filter((c) => tripsByCountry[c]),
    ...Object.keys(tripsByCountry).filter(
      (c) => !countryOrder.includes(c)
    ),
  ];

  return (
    <div className="my-8 w-full min-h-screen">
      <div className="flex flex-col gap-8">
        {orderedCountries.map((country) => (
          <div key={country} className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold capitalize">
              {country}
            </h2>
            <Separator className="max-w-md my-4" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tripsByCountry[country].map((trip) => (
                <TripCard
                  key={trip.slugAsParams}
                  trip={trip}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
