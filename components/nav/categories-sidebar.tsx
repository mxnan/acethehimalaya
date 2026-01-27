"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UnorderedListIcon from "@/components/ui/icons/unordered-list-icon";
import { Separator } from "../ui/separator";

type CategoriesSidebarProps = {
  categories: string[];
  selectedCategory?: string;
};

// Simple useMounted hook
function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export function CategoriesSidebar({
  categories,
  selectedCategory,
}: CategoriesSidebarProps) {
  const searchParams = useSearchParams();
  const mounted = useMounted();
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);

  const activeCategory = selectedCategory ?? "latest";

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const createCategoryUrl = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    return `/blogs${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const CategoryList = () => (
    <ul className="m-0 list-none space-y-2">
      {/* Latest Blogs (default state) */}
      <li>
        <Link href={createCategoryUrl(null)}>
          <span
            className={cn(
              "relative inline-flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors duration-200",
              activeCategory === "latest"
                ? "bg-neutral-300 dark:bg-neutral-700 text-primary font-semibold"
                : " hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80 text-primary"
            )}
          >
            <AnimatePresence mode="sync">
              {activeCategory === "latest" && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 z-[-1] rounded-md bg-neutral-400 dark:bg-neutral-600"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </AnimatePresence>
            Latest Blogs
          </span>
        </Link>
      </li>

      {/* Real categories */}
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <li key={category}>
            <Link href={createCategoryUrl(category)}>
              <span
                className={cn(
                  "relative inline-flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors duration-200",
                  isActive
                    ? "bg-neutral-300 dark:bg-neutral-700 text-primary font-semibold"
                    : " hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80 text-primary"
                )}
              >
                <AnimatePresence mode="sync">
                  {isActive && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 z-[-1] rounded-md bg-neutral-400 dark:bg-neutral-600"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
                {category}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Categories Sidebar */}
      {isLargeScreen && (
        <div className="w-64 shrink-0">
          <div className="sticky top-20">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 my-4">
                <UnorderedListIcon className="h-8 w-8" />
                <p className="font-bold text-xl">Categories</p>
              </div>
              <Separator className="mb-4" />
              <CategoryList />
            </div>

          </div>
        </div>
      )}

      {/* Mobile Categories Button */}
      {!isLargeScreen && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="default"
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
            >
              <UnorderedListIcon className="h-8 w-8" />
              <span>All Categories</span>
              <span className="sr-only">Blog Categories</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>categories</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <CategoryList />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
