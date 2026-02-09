import { trips } from "#site/content";
import { TripCard } from "@/components/cards/trip-card";
import { Separator } from "../ui/separator";

export default function BestOfBhutanTibet() {
  const bhutanTrips = trips.filter(
    (trip) => trip.country === "bhutan"
  );

  const tibetTrips = trips.filter(
    (trip) => trip.country === "tibet"
  );

  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-24">
        {/* BHUTAN SECTION */}
        <div>
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Best of Bhutan
            </h2>
            <Separator className="my-4 max-w-sm mx-auto" />
            <p className="text-sm sm:text-lg text-muted-foreground">
              Cultural journeys through monasteries, festivals, and mountain valleys
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bhutanTrips.map((trip) => (
              <TripCard
                key={trip.slug}
                trip={trip}
                className="h-64"
              />
            ))}
          </div>
        </div>

        {/* TIBET SECTION */}
        <div>
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Best of Tibet
            </h2>
            <Separator className="my-4 max-w-sm mx-auto" />
            <p className="text-sm sm:text-lg text-muted-foreground">
              Sacred landscapes, ancient monasteries, and high-altitude adventures
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tibetTrips.map((trip) => (
              <TripCard
                key={trip.slug}
                trip={trip}
                className="h-64"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
