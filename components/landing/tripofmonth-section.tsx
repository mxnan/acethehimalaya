import React from "react";
import { TripDetailsCard } from "../cards/trip-details-card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { BadgeInfoIcon, ChevronRight, Info } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function TripOfTheMonth() {
  return (
    <div className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Trip of the Month
            </h2>
            <Separator className="my-4 max-w-sm" />
            <Badge
              variant={"outline"}
              className="px-4 py-2 text-lg sm:text-xl md:text-2xl font-bold"
            >
              Ghorepani Poon Hill Trek
            </Badge>

            <p className="my-6 text-sm sm:text-lg text-muted-foreground">
              Embark on our featured adventure: the Ghorepani Poon Hill Trek!
              This classic Himalayan journey is celebrated for its breathtaking
              sunrises, panoramic mountain vistas, and rich cultural encounters
              in charming Gurung villages. Whether you’re a first-time trekker
              or a seasoned explorer, Poon Hill promises a rewarding experience
              with moderate difficulty, warm hospitality, and stunning views of
              Annapurna and Dhaulagiri ranges. Don’t miss this unforgettable
              trek—our pick for Trip of the Month!
            </p>
            <Button
            asChild
              variant="default"
              size="sm"
              className="group cursor-pointer lg:py-5 w-max"
            >
              <Link href={"/trips/nepal/ghorepani-poon-hill-trek"}>
                Book now{" "}
                <ChevronRight className="size-5 stroke-2 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
                <span className="sr-only">Book now</span>
              </Link>
            </Button>
          </div>
          <div className="max-w-3xl mx-auto">
            <TripDetailsCard
              country="Nepal"
              duration="9 Days"
              difficulty="Moderate "
              activity="Trekking/Hiking"
              altitude="3,210 m/10,531 ft"
              bestSeason="Feb-May, Sep-Dec"
              accommodation="Tea House & Hotel"
              meals="Included "
              startEnd="Kathmandu"
              images={[
                {
                  src: "/trips/nepal/ghorepani-poon-hill-trek/cover.jpg",
                  caption: "Snow, peaks, and prayer flags—Poon Hill magic.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
