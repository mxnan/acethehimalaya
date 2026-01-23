"use client";

import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const TripAltitudeChart = dynamic(
  () => import("./trip-altitude-chart").then((mod) => mod.TripAltitudeChart),
  {
    ssr: false,
  }
);

type TripAltitudeChartLazyProps = {
  data: Array<{
    day: string;
    location: string;
    meters: number;
  }>;
  className?: string;
};

/**
 * Lazy-loaded TripAltitudeChart component
 * Only loads when it enters the viewport
 */
export function TripAltitudeChartLazy({
  data,
  className,
}: TripAltitudeChartLazyProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    rootMargin: "200px", // Start loading 200px before visible
    threshold: 0.1,
  });

  return (
    <div ref={elementRef} className={cn("w-full", className)}>
      {hasIntersected ? (
        <TripAltitudeChart data={data} />
      ) : (
        <div className="w-full h-[240px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading chart...</p>
        </div>
      )}
    </div>
  );
}

