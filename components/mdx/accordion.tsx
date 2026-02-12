"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

const Accordion = AccordionPrimitive.Root;

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("my-2 w-full", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

/* -------------------------------------------------------------------------- */
/* Trigger (AUTO SCROLL — CORRECT WAY)                                        */
/* -------------------------------------------------------------------------- */

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const HEADER_OFFSET = 120; // sticky header height

  React.useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      const state = el.getAttribute("data-state");
      if (state !== "open") return;

      // Wait for Radix close + layout reflow
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const y = window.scrollY + rect.top - HEADER_OFFSET;

          window.scrollTo({
            top: Math.max(y, 0),
            behavior: "smooth",
          });
        });
      });
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        ref={(node) => {
          triggerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.RefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(
          "group cursor-pointer flex w-full items-center justify-between rounded-lg border bg-zinc-100 dark:bg-zinc-900 px-4 py-3 text-left text-sm",
          "hover:bg-zinc-200/70 dark:hover:bg-zinc-900/60 transition-colors duration-200",
          className
        )}
        {...props}
      >
        {children}

        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
            "group-data-[state=open]:rotate-180"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=open]:animate-accordion-down",
      "data-[state=closed]:animate-accordion-up"
    )}
    {...props}
  >
    <div className={cn("px-4 py-4 text-sm", className)}>{children}</div>
    <Separator className="my-4" />
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
