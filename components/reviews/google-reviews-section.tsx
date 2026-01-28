import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ReviewsScrollerLazy } from "./reviews-scroller-lazy";
import { Review } from "@/types/review";
import { Card, CardContent } from "../ui/card";

type GoogleReviewsSectionProps = {
  reviews: Review[];
};

export function GoogleReviewsSection({ reviews }: GoogleReviewsSectionProps) {
  if (!reviews?.length) return null;

  return (
    <section className="flex flex-col lg:flex-row items-center gap-8">
      <Card className=" max-h-[354px] w-full lg:w-1/3 grow bg-primary-background border-none shadow-none ">
        <CardContent className="group flex flex-col items-center text-center p-6">
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
        </CardContent>
      </Card>

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
    </section>
  );
}
