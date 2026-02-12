
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex rounded-md bg-neutral-200/50 dark:bg-neutral-800/60 p-2 w-min",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { "data-state"?: string }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative isolate cursor-pointer border-y-4 border-transparent rounded-md",
        "inline-flex flex-1 items-center justify-center",
        "px-3 py-1.5 text-sm font-medium whitespace-nowrap",
        "data-[state=active]:bg-zinc-400/20  data-[state=active]:dark:bg-zinc-600 data-[state=inactive]:bg-transparent",
        "transition-colors duration-500",
        "data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground",
        // "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      {props.children}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
