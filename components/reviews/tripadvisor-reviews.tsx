"use client"

import { Review } from "@/types/review"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

type TripadvisorReviewsProps = {
  reviews: Review[]
  className?: string
}

export function TripadvisorReviews({
  reviews,
  className,
}: TripadvisorReviewsProps) {
  if (!reviews?.length) return null

  return (
    <section className={cn("space-y-4", className)}>
      <header className="flex items-start">
        <img
          src="/assets/tripadvisor.svg"
          alt="Tripadvisor"
          className="h-12 w-max stroke-primary"
        />
      </header>

      <ul className="grid gap-4">
        {reviews.map((review, i) => (
          <li
            key={i}
            className="rounded-lg border bg-muted/40 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{review.author}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={cn(
                      "h-4 w-4",
                      idx < review.rating
                        ? "fill-emerald-500 text-emerald-500"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {review.text}
            </p>

            {review.date && (
              <p className="mt-2 text-xs text-muted-foreground">
                {review.date}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
