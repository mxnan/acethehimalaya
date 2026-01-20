import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ReviewsScroller } from "./reviews-scroller";
import { Review } from "@/types/review";

type TripadvisorReviewsSectionProps = {
  reviews: Review[];
};

export function TripadvisorReviewsSection({
  reviews,
}: TripadvisorReviewsSectionProps) {
  if (!reviews?.length) return null;

  return (
    <section className="my-8">
      <header className="my-8 group flex flex-col items-center text-center">
        <div className="mb-6 flex justify-center bg-neutral-200 shadow-lg backdrop-blur-lg p-4 rounded-lg">
          <img
            src="/assets/tripadvisor.svg"
            alt="Tripadvisor"
            className="h-14"
          />
        </div>
        <p className=" mb-4 text-lg  font-bold text-muted-background">
          Traveler’s Choice Best of the Best Award 2025,2024,...
        </p>
        <a
          href="https://www.tripadvisor.com/Attraction_Review-g293890-d1957215-Reviews-Ace_the_Himalaya-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html"
          target="_blank"
          rel="noopener noreferrer"
          className="w-max inline-block"
        >
          <Button asChild variant={"outline"} className="w-max cursor-pointer ">
            <span>
              See all reviews on TripAdvisor ?{" "}
              <ChevronRight className="size-3 stroke-4 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
            </span>
          </Button>
        </a>
      </header>

      <div className="my-4 md:px-4 flex justify-center gap-6 max-h-[520px] overflow-hidden">
        <ReviewsScroller reviews={reviews.slice(0, 5)} duration={20} />
        <ReviewsScroller
          reviews={reviews.slice(5, 10)}
          duration={10}
          className="hidden sm:flex"
        />
        <ReviewsScroller
          reviews={reviews.slice(10, 15)}
          duration={20}
          className="hidden md:flex"
        />
      </div>
    </section>
  );
}
