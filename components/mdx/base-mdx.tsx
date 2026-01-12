import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";


// Function to convert heading text to URL-friendly slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}


type ComponentsProps = HTMLAttributes<HTMLElement>;

export const BaseComponents = {
  Callout: ({
    className,
    type = "default",
    ...props
  }: ComponentsProps & { type?: "default" | "warning" | "danger" }) => {
    let variantClass = "";
    switch (type) {
      case "warning":
        variantClass =
          "border-yellow-400 bg-yellow-100/70 text-yellow-900 dark:bg-yellow-800/35 dark:text-yellow-100 dark:border-yellow-600";
        break;
      case "danger":
        variantClass =
          "border-red-400 bg-red-100/70 text-red-900 dark:bg-red-800/35 dark:text-red-100 dark:border-red-600";
        break;
      case "default":
      default:
        variantClass =
          "border-border bg-muted/60 text-muted-foreground";
    }

    return (
      <div
        className={cn(
          "mt-6 rounded-lg border px-4 py-3 text-sm font-bold",
          variantClass,
          className
        )}
        {...props}
      />
    );
  },
  h1: ({ className, children, ...props }: ComponentsProps) => {
    const id = typeof children === 'string' ? slugify(children) : 'h1';
    return (
      <h1
        className={cn(
          "mt-12 scroll-m-32 text-4xl font-black font-sans uppercase text-primary tracking-normal",
          className
        )}
        id={id}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ className, children, ...props }: ComponentsProps) => {
    const id = typeof children === 'string' ? slugify(children) : 'h2';
    return (
      <h2
        className={cn(
          "mt-10 scroll-m-32 pb-1 text-3xl font-extrabold font-sans uppercase text-primary tracking-tight first:mt-0",
          className
        )}
        id={id}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ className, children, ...props }: ComponentsProps) => {
    const id = typeof children === 'string' ? slugify(children) : 'h3';
    return (
      <h3
        className={cn(
          "mt-8 scroll-m-32 text-2xl font-bold font-sans uppercase text-primary tracking-tight",
          className
        )}
        id={id}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ className, children, ...props }: ComponentsProps) => {
    const id = typeof children === 'string' ? slugify(children) : 'h4';
    return (
      <h4
        className={cn(
          "mt-8 scroll-m-32 text-xl font-medium font-sans uppercase text-primary tracking-tight",
          className
        )}
        id={id}
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({ className, ...props }: ComponentsProps) => (
    <p
      className={cn("leading-7 not-first:mt-6", className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }: ComponentsProps) => (
    <strong
      className={cn("font-semibold text-muted-foreground", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentsProps) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentsProps) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentsProps) => (
    <li className={cn("mt-2 list-disc", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentsProps) => (
    <blockquote
      className={cn(
        "*:text-muted-foreground mt-6 border-l-4 border-muted-foreground pl-6 italic",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 h-px max-w-sm md:my-8 bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full max-w-4xl ", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("even:bg-secondary m-0 border-t  p-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: ComponentsProps) => (
    <th
      className={cn(
        "border-2 px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentsProps) => (
    <td
      className={cn(
        "border-2 px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  //////////////////////////////////////////////
//   pre: Pre, // using as pre-with-copy for copy button functions
  //////////////////////////////////////////////
  code: ({ className, ...props }: ComponentsProps) => (
    <code
      className={cn(
        "relative rounded  px-[0.3rem] py-[0.2rem]  font-sans font-medium text-sm!",
        className
      )}
      {...props}
    />
  ),
  ////////////////////// customLink
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-bold italic text-muted-foreground mx-1 pb-2 custom-underline text-sm",
        className
      )}
      {...props}
    />
  ),
  ///////////////////// steps
  Step: ({ className, ...props }: React.ComponentProps<"span">) => (
    <span className={cn("scroll-m-32 ", className)} {...props} />
  ),
  Steps: ({ ...props }: React.ComponentProps<"div">) => (
    <div
      className="[&>span]:step font-bold rounded-md steps mt-6 ml-4 border-l-4 border-l-muted-foreground pl-8 [counter-reset:step]"
      {...props}
    />
  ),
};