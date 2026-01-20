// types/review.ts
export type Review = {
  text: string
  author: string
  avatar?: string
  rating: number
  source?: "google" | "tripadvisor"
}
