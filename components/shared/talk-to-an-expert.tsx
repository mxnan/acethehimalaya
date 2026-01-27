"use client";

import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import WhatsappIcon from "@/components/ui/icons/whatsapp-icon";
import { AnimatedIconHandle } from "@/components/ui/icons/types";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type SalesPerson = {
  name: string;
  role?: string;
  phone: string; // with country code
};

/* -------------------------------------------------------------------------- */
/* Sales Data (single source of truth)                                         */
/* -------------------------------------------------------------------------- */

const SALES_TEAM: SalesPerson[] = [
  {
    name: "Ramesh Gurung",
    role: "Senior Trek Advisor",
    phone: "9779812345678",
  },
  {
    name: "Sita Sherpa",
    role: "Trip Consultant",
    phone: "9779801234567",
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function TalkToAnExpert({ className }: { className?: string }) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Talk to an Expert"
          onMouseEnter={() => iconRef.current?.startAnimation()}
          onMouseLeave={() => iconRef.current?.stopAnimation()}
          className={cn(
            "group inline-flex items-center gap-2 rounded-md border border-border/50",
            "bg-green-500/10 hover:bg-green-500/20",
            "px-2 py-1 cursor-pointer transition-colors",
            className
          )}
        >
          <WhatsappIcon
            ref={iconRef}
            size={28}
            className="text-green-700"
          />

          {/* Text only on lg+ */}
          <span className="hidden lg:inline  font-medium">
            Talk to an Expert
          </span>

          {/* Screen readers */}
          <span className="sr-only">Talk to an Expert</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Talk to an Expert</DialogTitle>
        </DialogHeader>

        <div className="mt-3 flex flex-col gap-3">
          {SALES_TEAM.map((person) => (
            <a
              key={person.phone}
              href={`https://wa.me/${person.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border px-4 py-3 transition hover:bg-muted"
            >
              <div className="flex flex-col">
                <span className="font-medium">{person.name}</span>
                {person.role && (
                  <span className="text-xs text-muted-foreground">
                    {person.role}
                  </span>
                )}
              </div>

              <WhatsappIcon className="h-5 w-5 text-green-700" />
            </a>
          ))}
        </div>

        <DialogFooter className="mt-4 text-xs text-muted-foreground">
          Ace the Himalaya
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
