import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
  import { Button } from "../ui/button";
  import { ChevronRight } from "lucide-react";
  import { cn } from "@/lib/utils";
  
  type BookNowButtonProps = {
    className?: string;
  };
  
  export default function BookNowButton({ className }: BookNowButtonProps) {
    return (
      <div className={cn("py-4 my-4", className)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="default"
              className="group cursor-pointer"
            >
              Book now{" "}
              <ChevronRight className="size-3 stroke-4 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
              <span className="sr-only">Book now</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[354px] mx-auto">
            <DialogHeader>
              <DialogTitle>Book now</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
                Switch over to weTravel modal/overlay
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  