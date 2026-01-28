import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ReviewsScrollerLazy } from "./reviews-scroller-lazy";
import { Review } from "@/types/review";
import { Card, CardContent } from "../ui/card";

type TripadvisorReviewsSectionProps = {
  reviews: Review[];
};

export function TripadvisorReviewsSection({
  reviews,
}: TripadvisorReviewsSectionProps) {
  if (!reviews?.length) return null;

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center gap-8">
      <Card className="max-h-[354px] py-6 w-full lg:w-2/3 grow overflow-hidden bg-primary-background border-none shadow-none">
        <CardContent className="mx-auto px-6 flex max-sm:items-center justify-center gap-6 overflow-hidden">
          <ReviewsScrollerLazy
            reviews={reviews.slice(0, 5)}
            duration={20}
            className="mx-auto sm:mx-0"
          />
          <ReviewsScrollerLazy
            reviews={reviews.slice(5, 10)}
            duration={10}
            className="mx-auto hidden sm:flex sm:mx-0"
          />
          <ReviewsScrollerLazy
            reviews={reviews.slice(10, 15)}
            duration={20}
            className="mx-auto hidden md:flex md:mx-0"
          />
        </CardContent>

      </Card>
      <Card className=" max-h-[354px] w-full lg:w-1/3 grow bg-primary-background border-none shadow-none ">
        <CardContent className="group flex flex-col items-center text-center p-6">
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
        </CardContent>

      </Card>

    </section>
  );
}
