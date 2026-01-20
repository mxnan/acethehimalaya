import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ReviewsScroller } from "./reviews-scroller";
import { Review } from "@/types/review";

type GoogleReviewsSectionProps = {
  reviews: Review[];
};

export function GoogleReviewsSection({ reviews }: GoogleReviewsSectionProps) {
  if (!reviews?.length) return null;

  return (
    <section className="my-8">
      <header className="my-8 group flex flex-col items-center">
        <div className="mb-6 flex justify-center bg-neutral-200 shadow-lg backdrop-blur-lg p-4 rounded-lg">
          <img src="/assets/google.svg" alt="Google" className="h-20" />
        </div>
        <p className="mb-4 text-lg font-bold text-muted-background">
          500+ reviews , Everyone Aced it .
        </p>
        <a
          href="https://www.google.com/search?hl=en-IN&gl=in&q=Ace+the+Himalaya,+A1+Business+complex,+Thamel+Marg,+Kathmandu+44600,+Nepal&ludocid=4388246407736065962&lsig=AB86z5VJ80PmnJ62e6xO-D-3KKc6#lrd=0x39eb18fd323c279d:0x3ce62edb9ffdffaa,1"
          target="_blank"
          rel="noopener noreferrer"
           className="w-max inline-block"
        >
          <Button variant={"outline"} className="w-max cursor-pointer ">
            Read on google ?{" "}
            <ChevronRight className="size-3 stroke-4 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
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
