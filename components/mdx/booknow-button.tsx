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
import { toast } from "sonner";
import { Separator } from "../ui/separator";

type BookNowButtonProps = {
  className?: string;
  pricing: {
    currency: string;
    base: number;
    tiers: {
      label: string;
      price: number;
    }[];
  };
};

export default function BookNowButton({
  pricing,
  className,
}: BookNowButtonProps) {
  return (
    <div className={cn("py-0 my-0", className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="default"
            className="group cursor-pointer lg:py-5 w-full lg:text-lg lg:font-bold"
          >
            Book now{" "}
            <ChevronRight className="size-5 stroke-4 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
            <span className="sr-only">Book now</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[354px] mx-auto">
          <DialogHeader className="">
            <DialogTitle className="text-2xl text-center ">
              Price Details
            </DialogTitle>
            <p className="text-center ">
              You can book through weTravel portal .
            </p>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto flex flex-col items-center">
            <div className="text-center space-y-2">
              <p className="text-xl">For Solo Travellers </p>
              <Separator />
              <p className="font-bold">
                {pricing.currency} {pricing.base.toLocaleString()} / person
              </p>
            </div>

            <table className="w-full text-center border mt-4">
              <thead>
                <tr>
                  <th className="border-2 px-4 py-2 font-bold">No of people</th>
                  <th className="border-2 px-4 py-2 font-bold">
                    Price per person
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.tiers.map((tier) => (
                  <tr className="even:bg-secondary m-0 " key={tier.label}>
                    <td className="border-2 px-4 py-2 text-sm">{tier.label}</td>
                    <td className="border-2 px-4 py-2 text-sm">
                      {pricing.currency} {tier.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
