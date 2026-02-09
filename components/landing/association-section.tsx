import React from "react";
import { Separator } from "../ui/separator";
import { Marquee } from "../mdx/marquee";

export default function OurAssociations() {
  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Our Affiliations
          </h2>
          <Separator className="my-4 max-w-md" />
          <p className="text-sm sm:text-lg text-muted-foreground">
            Ace the Himalaya is associated with various national and
            international based governmental and non- governmental organizations
            working in the sector of travel and tourism. The ties and membership
            with these organizations have helped us to provide our customers the
            best services and differentiate us among the competitors by
            following the proper code and ethics of travel and tourism.
          </p>
        </div>
        <Marquee speed={60} pauseOnHover>
          <div className="h-74 aspect-video bg-red-400"></div>
          <div className="h-74 aspect-video bg-orange-400"></div>
          <div className="h-74 aspect-video bg-green-400"></div>
          <div className="h-74 aspect-video bg-gray-400"></div>
        </Marquee>
      </div>
    </div>
  );
}
