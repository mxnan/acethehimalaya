"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

interface AccordionItemContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AccordionItemContext = React.createContext<
  AccordionItemContextType | undefined
>(undefined);

const useAccordionItem = (): AccordionItemContextType => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem");
  }
  return context;
};

type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>;

const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> & {
  children: React.ReactNode;
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionPrimitive.Item ref={ref} className={cn("my-2", className)} {...props}>
      <AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </AccordionItemContext.Provider>
    </AccordionPrimitive.Item>
  );
});
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  transition?: Transition;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    {
      className,
      children,
      transition = { type: "spring", stiffness: 150, damping: 17 },
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const { isOpen, setIsOpen } = useAccordionItem();

    React.useEffect(() => {
      const node = triggerRef.current;
      if (!node) return;

      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.attributeName === "data-state") {
            const currentState = node.getAttribute("data-state");
            setIsOpen(currentState === "open");
          }
        });
      });
      observer.observe(node, {
        attributes: true,
        attributeFilter: ["data-state"],
      });
      const initialState = node.getAttribute("data-state");
      setIsOpen(initialState === "open");
      return () => {
        observer.disconnect();
      };
    }, [setIsOpen]);

    return (
      <AccordionPrimitive.Header className="relative flex border rounded-lg bg-muted">
        {/* <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-lg z-0"
          style={{
            background: "linear-gradient(90deg, #F8FAE5 0%, #CED8B6 100%)",
            opacity: 0.35,
          }}
        /> */}
        <AccordionPrimitive.Trigger
          ref={(node: HTMLButtonElement | null) => {
            triggerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.RefObject<HTMLButtonElement | null>).current = node;
            }
          }}
          className={cn(
            "flex flex-1 items-center justify-between gap-4 text-start text-sm font-bold px-4 py-3 cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={transition}
          >
            <ChevronDown className="size-5 stroke-brand-color shrink-0" />
          </motion.div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> & {
  transition?: Transition;
};

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(
  (
    {
      className,
      children,
      transition = { type: "spring", stiffness: 150, damping: 17 },
      ...props
    },
    ref
  ) => {
    const { isOpen } = useAccordionItem();

    return (
      <AnimatePresence>
        {isOpen && (
          <AccordionPrimitive.Content forceMount {...props}>
            <motion.div
              key="accordion-content"
              initial={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
              animate={{ height: "auto", opacity: 1, "--mask-stop": "100%" }}
              exit={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
              transition={transition}
              style={{
                maskImage:
                  "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
                WebkitMaskImage:
                  "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
              }}
              className="overflow-hidden"
              ref={ref}
            >
              <div className={cn("px-4 py-4 text-sm", className)}>{children}</div>
            </motion.div>
          </AccordionPrimitive.Content>
        )}
      </AnimatePresence>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
  type AccordionItemContextType,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
};
