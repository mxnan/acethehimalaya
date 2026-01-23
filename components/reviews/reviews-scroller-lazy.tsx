"use client";

import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/review";

const ReviewsScroller = dynamic(
  () => import("./reviews-scroller").then((mod) => mod.ReviewsScroller),
  {
    ssr: false,
  }
);

type ReviewsScrollerLazyProps = {
  reviews: Review[];
  duration?: number;
  className?: string;
};

/**
 * Lazy-loaded ReviewsScroller component
 * Only loads when it enters the viewport
 */
export function ReviewsScrollerLazy({
  reviews,
  duration,
  className,
}: ReviewsScrollerLazyProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    rootMargin: "200px", // Start loading 200px before visible
    threshold: 0.1,
  });

  return (
    <div ref={elementRef} className={cn("w-full", className)}>
      {hasIntersected ? (
        <ReviewsScroller reviews={reviews} duration={duration} />
      ) : (
        <div className="w-full h-[400px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading reviews...</p>
        </div>
      )}
    </div>
  );
}

