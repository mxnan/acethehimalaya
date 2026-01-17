"use client";

import { createContext, useContext, useState, ReactNode, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Group Context (auto-close)                                                  */
/* -------------------------------------------------------------------------- */

type AccordionGroupContextType = {
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

const AccordionGroupContext = createContext<AccordionGroupContextType | null>(
  null
);

function useAccordionGroup() {
  return useContext(AccordionGroupContext);
}

/* -------------------------------------------------------------------------- */
/* Item Context                                                               */
/* -------------------------------------------------------------------------- */

type AccordionItemContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null
);

function useAccordionItem() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error("Accordion components must be used inside <Acc />");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/* AccGroup                                                                   */
/* -------------------------------------------------------------------------- */

export function AccGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AccordionGroupContext.Provider value={{ openId, setOpenId }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </AccordionGroupContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Acc (single item)                                                          */
/* -------------------------------------------------------------------------- */

export function Acc({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const group = useAccordionGroup();

  const isOpen = group ? group.openId === id : false;

  const toggle = () => {
    if (!group) return;
    group.setOpenId(isOpen ? null : id);
  };

  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle }}>
      <motion.div
        layout
        transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
        className={cn("py-4", className)}
      >
        {children}
      </motion.div>
    </AccordionItemContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export function AccTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen, toggle } = useAccordionItem();

  return (
    <button
      onClick={toggle}
      className={cn(
        "group cursor-pointer flex w-full items-center justify-between text-left",
        "text-lg font-medium text-brand-color",
        "transition-colors hover:text-brand-color/60",
        className
      )}
    >
      <span>{children}</span>

      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="ml-3 text-brand-color"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export function AccContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen } = useAccordionItem();

  return (
    <motion.div
      layout
      animate={{
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        opacity: isOpen ? 1 : 0,
      }}
      transition={{
        gridTemplateRows: { duration: 0.35, ease: "easeInOut" },
        opacity: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "grid overflow-hidden",
        className
      )}
    >
      <div className="min-h-0 mt-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

