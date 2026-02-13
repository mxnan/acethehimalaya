import React from "react";
import { Separator } from "../ui/separator";
import { Marquee } from "../mdx/marquee";
import Image from "next/image";


interface AssociationCardProps {
  src: string;
  alt: string;
}

function AssociationCard({
  src,
  alt,
}: AssociationCardProps) {
  return (
    <div className="relative group h-24 mx-2 md:h-28 lg:h-32 aspect-video flex items-center justify-center bg-neutral-50 rounded-xl shadow-sm border px-6 transition-all duration-500 hover:shadow-md hover:translate-y-10">

      <Image
        src={src}
        alt={alt}
        width={200}
        height={100}
        className="object-contain max-h-full w-auto"
      />

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-min rounded-md bg-muted px-3 py-1 text-xs text-muted-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        {alt}
      </div>
    </div>
  );
}

const associations = [
  { src: "/assets/landing/affiliations/travellife-logo.png", alt: "Travel Life" },
  { src: "/assets/landing/affiliations/ntb-logo.png", alt: "Nepal Tourism Board" },
  { src: "/assets/landing/affiliations/nma-logo.png", alt: "Nepal Mountaineering Association (NMA)" },
  { src: "/assets/landing/affiliations/atcf-logo.png", alt: "Adventure Travel Conservation Fund (ATCF)" },
  { src: "/assets/landing/affiliations/atta.png", alt: "Adventure Travel Trade Association (ATTA)" },
  { src: "/assets/landing/affiliations/co2-logo.png", alt: "CO2 Neutral Website" },
  { src: "/assets/landing/affiliations/eco-soc-logo.png", alt: "The International Ecotourism Society (TIES)" },
  { src: "/assets/landing/affiliations/emblem-nepal.png", alt: "Ministry of Culture, Tourism & Civil Aviation (MoTCA)" },
  { src: "/assets/landing/affiliations/keep-logo.png", alt: "Kathmandu Environmental Education Project (KEEP)" },
  { src: "/assets/landing/affiliations/lnt-logo.png", alt: "Leave No Trace" },
  { src: "/assets/landing/affiliations/pata-logo.png", alt: "Pacific Asia Travel Association (PATA)" },
  { src: "/assets/landing/affiliations/sambhav-nepal.png", alt: "Sambhav Nepal" },
  { src: "/assets/landing/affiliations/sti-logo.png", alt: "Sustainable Travel International" },
  { src: "/assets/landing/affiliations/taan-logo.png", alt: "Trekking Agencies’ Association of Nepal (TAAN)" },
  { src: "/assets/landing/affiliations/tap-logo.png", alt: "Travelers Against Plastic (TAP)" },


];

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
        <Marquee speed={10} pauseOnHover>
          {associations.map((item) => (
            <AssociationCard
              key={item.src}
              src={item.src}
              alt={item.alt}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
