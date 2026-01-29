"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  TripDetailsPanel,
  type TripDetailsEntries,
} from "./trip-details-card-details";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type TripDetailsCardProps = {
  variant?: "default" | "info-only";
  country?: string;
  duration?: string;
  difficulty?: string;
  activity?: string;
  altitude?: string;
  bestSeason?: string;
  accommodation?: string;
  meals?: string;
  startEnd?: string;
  trekkingDistance?: string;
  images?: {
    src: string;
    caption?: string;
  }[];
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function TripDetailsCard({
  country,
  duration,
  difficulty,
  activity,
  altitude,
  bestSeason,
  accommodation,
  meals,
  startEnd,
  trekkingDistance,
  images,
  variant = "default",
  className,
}: TripDetailsCardProps) {
  const details = {
    country,
    duration,
    difficulty,
    activity,
    altitude,
    bestSeason,
    accommodation,
    meals,
    startEnd,
    trekkingDistance,
  };

  const entries: TripDetailsEntries = Object.entries(details)
    .filter(([, value]) => typeof value === "string" && value.trim() !== "")
    .map(([key, value]) => [
      key as TripDetailsEntries[number][0],
      value as string,
    ]);

  if (!entries.length) return null;

  return (
    <Card
      className={cn(
        "rounded-xl border shadow-sm p-4",
        className
      )}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Image Panel (always visible, no animation)                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        {images && images.length > 0 && (
          <div>
            <Image
              src={images[0].src}
              alt={images[0].caption || "Trip Image"}
              sizes="100vw"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Details Panel (always visible, no animation)                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative">
        <TripDetailsPanel entries={entries} variant={variant} />
      </div>
    </Card>
  );
}
