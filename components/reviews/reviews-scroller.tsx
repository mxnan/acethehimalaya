"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Review } from "@/types/review"
import { Star } from "lucide-react"

type ReviewsScrollerProps = {
  reviews: Review[]
  duration?: number
  className?: string
}

export function ReviewsScroller({
  reviews,
  duration = 16,
  className,
}: ReviewsScrollerProps) {
  return (
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "mirror",
      }}
      className={cn(
        "flex flex-col gap-6 list-none m-0 p-0",
        className
      )}
    >
      {[0, 1].map((dup) => (
        <React.Fragment key={dup}>
          {reviews.map((r, i) => (
            <motion.div
              key={`${dup}-${i}`}
              whileHover={{
                y: -6,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="rounded-3xl border bg-background p-6 shadow-sm max-w-xs"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                {r.text}
              </p>

              <div className="flex items-center gap-3 mt-5">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {r.author}
                  </span>

                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={cn(
                          "h-3.5 w-3.5",
                          idx < r.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  )
}
