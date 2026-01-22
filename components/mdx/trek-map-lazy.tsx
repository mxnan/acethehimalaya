"use client";

import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const TrekMap = dynamic(() => import("./trek-map").then((mod) => mod.TrekMap), {
  ssr: false,
});

type TrekMapLazyProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fileName?: string;
};

/**
 * Lazy-loaded TrekMap component
 * Only loads when it enters the viewport
 */
export function TrekMapLazy({
  src,
  alt,
  width,
  height,
  className,
  fileName,
}: TrekMapLazyProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    rootMargin: "200px", // Start loading 200px before visible
    threshold: 0.1,
  });

  return (
    <div ref={elementRef} className={cn("relative w-full", className)}>
      {hasIntersected ? (
        <TrekMap
          src={src}
          alt={alt}
          width={width}
          height={height}
          fileName={fileName}
        />
      ) : (
        <div className="w-full aspect-square bg-muted animate-pulse rounded-2xl flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      )}
    </div>
  );
}

