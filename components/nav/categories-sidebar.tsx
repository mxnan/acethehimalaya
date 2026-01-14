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
import UnorderedListIcon from "@/components/ui/unordered-list-icon";

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
      {/* Latest/All Blogs Option */}
      <li className="mt-0 pt-0">
        <Link href={createCategoryUrl(null)}>
          <span
            className={cn(
              "inline-block relative text-sm pl-3 transition-colors duration-300 ease-in-out truncate w-full",
              !selectedCategory
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <AnimatePresence mode="sync">
              {!selectedCategory && (
                <motion.span
                  key="activeItem"
                  layoutId="activeCategory"
                  className="absolute left-0 top-0 rounded-xl h-4 w-1 bg-brand-color"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.3 }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    stiffness: 100,
                    damping: 10,
                  }}
                />
              )}
            </AnimatePresence>
            Latest Blogs
          </span>
        </Link>
      </li>

      {/* Category List */}
      {categories.map((category) => (
        <li key={category} className="mt-0 pt-0">
          <Link href={createCategoryUrl(category)}>
            <span
              className={cn(
                "inline-block relative text-sm pl-3 transition-colors duration-300 ease-in-out truncate w-full",
                selectedCategory === category
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <AnimatePresence mode="sync">
                {selectedCategory === category && (
                  <motion.span
                    key="activeItem"
                    layoutId="activeCategory"
                    className="absolute left-0 top-0 rounded-xl h-4 w-1 bg-brand-color"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.3 }}
                    transition={{
                      type: "tween",
                      duration: 0.3,
                      stiffness: 100,
                      damping: 10,
                    }}
                  />
                )}
              </AnimatePresence>
              {category}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Categories Sidebar */}
      {isLargeScreen && (
        <div className="w-64 shrink-0">
          <div className="sticky top-16">
            <p className="font-bold text-lg pt-6 mb-4">Categories</p>
            <CategoryList />
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