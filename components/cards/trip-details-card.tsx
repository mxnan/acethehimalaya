"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  TripDetailsPanel,
  type TripDetailsEntries,
} from "./trip-details-card-details";

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
        variant === "info-only"
          ? "rounded-xl border shadow-sm"
          : "relative aspect-video md:aspect-[21/9] overflow-hidden rounded-xl border-none shadow-sm",
        className
      )}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Hero Image                                                         */}
      {/* ------------------------------------------------------------------ */}

      {variant === "default" && images?.[0] && (
        <Image
          src={images[0].src}
          alt={images[0].caption ?? "Trip image"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Overlay for contrast */}
      {variant === "default" && (
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Details Panel (always visible, no animation)                       */}
      {/* ------------------------------------------------------------------ */}

      <div
        className={cn(
          "z-10",
          variant === "info-only"
            ? "relative p-4"
            : "absolute bottom-4 left-4 right-4"
        )}
      >
        <TripDetailsPanel entries={entries} variant={variant} />
      </div>
    </Card>
  );
}
