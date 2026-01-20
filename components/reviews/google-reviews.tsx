"use client"

import { Review } from "@/types/review"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

type GoogleReviewsProps = {
  reviews: Review[]
  className?: string
}

export function GoogleReviews({ reviews, className }: GoogleReviewsProps) {
  if (!reviews?.length) return null

  return (
    <section className={cn("space-y-4", className)}>
      <header className="flex items-center gap-2">
        <img
          src="/assets/google.svg"
          alt="Google"
          className="h-16 w-max"
        />
        <h3 className="text-lg font-semibold">Google Reviews</h3>
      </header>

      <ul className="grid gap-4">
        {reviews.map((review, i) => (
          <li
            key={i}
            className="rounded-lg border bg-background p-4"
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
                        ? "fill-yellow-400 text-yellow-400"
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
