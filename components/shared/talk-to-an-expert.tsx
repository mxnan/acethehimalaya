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
    name: "Sujan",
    role: "Nepal",
    phone: "+9779851233710",
  },
  {
    name: "Prem",
    role: "Nepal",
    phone: "+9779851102225",
  },
  {
    name: "Kathy",
    role: "USA",
    phone: "+18773060650",
  },
  {
    name: "Melanie",
    role: "Switzerland",
    phone: "+41765662003",
  },
  {
    name: "Abex",
    role: "Indonesia",
    phone: "+6281270160460",
  },
  {
    name: "Sihyoung",
    role: "South Korea",
    phone: "+821093401692",
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
            "group relative inline-flex items-center gap-2 rounded-md border border-border/50",
            "text-primary bg-green-500 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600",
            "px-2 py-1 cursor-pointer transition-colors",
            className
          )}
        >
          <WhatsappIcon
            ref={iconRef}
            size={28}
            className=""
          />

          {/* Text only on lg+ */}
          <span className="max-lg:hidden text-sm font-semibold ">
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
