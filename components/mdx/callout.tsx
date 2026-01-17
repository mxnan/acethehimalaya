import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Lightbulb, FileText } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

type CalloutType = "default" | "note" | "warning" | "info";

interface CalloutProps {
  type?: CalloutType;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface CalloutFooterProps {
  children: React.ReactNode;
  className?: string;
}

const calloutStyles = {
  default: {
    container: "border-border bg-muted/60 text-muted-foreground",
    icon: FileText,
    iconColor: "text-muted-foreground",
    separatorColor: "bg-border",
  },
  note: {
    container:
      "border-brand-orange bg-yellow-200 dark:bg-yellow-400 text-black",
    icon: Lightbulb,
    iconColor: "text-muted-background",
    separatorColor: "bg-black",
  },
  warning: {
    container:
      "border-orange-400 bg-orange-100/70 text-orange-900 dark:bg-orange-800/35 dark:text-orange-100 dark:border-orange-600",
    icon: AlertTriangle,
    iconColor: "text-orange-600 dark:text-orange-400",
    separatorColor: "bg-orange-400",
  },
  info: {
    container:
      "bg-brand-blue/90 dark:bg-brand-blue text-white",
    icon: Info,
    iconColor: "text-white",
    separatorColor: "bg-white",
  },
};

// Separate CalloutFooter component
export function CalloutFooter({ children, className }: CalloutFooterProps) {
  return <div className={cn("text-xs", className)}>{children}</div>;
}

export function Callout({
  type = "default",
  header,
  children,
  className,
}: CalloutProps) {
  const styles = calloutStyles[type];
  const Icon = styles.icon;

  // Separate footer content from other children
  const childrenArray = React.Children.toArray(children);
  const footerIndex = childrenArray.findIndex(
    (child) => React.isValidElement(child) && child.type === CalloutFooter
  );

  const mainContent =
    footerIndex >= 0 ? childrenArray.slice(0, footerIndex) : childrenArray;
  const footer = footerIndex >= 0 ? childrenArray[footerIndex] : null;

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-4 text-sm",
        styles.container,
        className
      )}
    >
      {/* Header */}
      {header && (
        <div className="flex items-center gap-2 mt-4">
          <Icon className={cn("h-6 w-6 shrink-0", styles.iconColor)} />
          <div className="font-bold text-xl">{header}</div>
        </div>
      )}
      {header && <Separator className={cn("max-w-sm my-4", styles.separatorColor)} />}
      {/* Content */}
      <div className={cn("")}>
        {mainContent}
      </div>
      {footer && <Separator className={cn("max-w-sm my-4", styles.separatorColor)} />}
      {/* Footer */}
      {footer}
    </div>
  );
}