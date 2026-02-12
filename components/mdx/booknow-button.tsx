import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BadgeDollarSign, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

type BookNowButtonProps = {
  className?: string;
  price?: number;
};

export default function BookNowButton({
  price,
  className,
}: BookNowButtonProps) {
  return (
    <div className={cn("py-0 my-0", className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="default"
            className="group cursor-pointer lg:py-5 w-max"
          >
            Book now{" "}
            <ChevronRight className="size-5 stroke-4 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
            <span className="sr-only">Book now</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[354px] mx-auto">
          <DialogHeader className="">
            <DialogTitle className="text-2xl font-black text-center ">
              Price Details
            </DialogTitle>
            <p className="text-center ">
              You can book through weTravel portal .
            </p>
          </DialogHeader>
          <Separator />
          <div className="max-h-96 overflow-y-auto flex flex-col">
            <div className="flex justify-center items-center gap-2">
              <p className="font-bold text-xl">
                {price ? `${price.toLocaleString()}` : "Price not available"}
              </p>
              <Badge variant={"default"} className="my-2 px-2 py-1 font-bold text-xs w-max">
                <BadgeDollarSign />
                USD
              </Badge>
            </div>
            <Button
              size={"lg"}
              variant={"destructive"}
              className="cursor-pointer mt-6"
              onClick={() => toast.warning("add payment portal here")}
            >
              Open Payment Portal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
