"use client";

import * as React from "react";
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
import UnorderedListIcon from "../../ui/icons/unordered-list-icon";
import { usePathname } from "next/navigation";
import { Separator } from "../../ui/separator";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import type { TocEntry } from "./toc-tree.server";

// Lazy-load heavy components
const BookNowButton = dynamic(
  () => import("../booknow-button").then((mod) => mod.default),
  {
    ssr: false,
  }
);

const PrivateTripForm = dynamic(
  () => import("../private-trip-form").then((mod) => mod.PrivateTripForm),
  {
    ssr: false,
  }
);

interface TocClientProps {
  toc: TocEntry[];
  price?: number;
  className?: string;
  tripname?: string;
}

// Simple useMounted hook
function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// Active heading detection hook
function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

// Client-side Tree with active detection and animations
interface TreeClientProps {
  tree: TocEntry[];
  level?: number;
  activeItem?: string | null;
}

function TreeClient({ tree, level = 1, activeItem }: TreeClientProps) {
  if (!tree.length || level >= 3) return null;

  return (
    <ul className={cn("m-0 list-none", { "pl-3": level !== 1 })}>
      {tree.map((item, index) => (
        <li key={index} className={cn("mt-0 pt-2")}>
          <a
            href={item.url}
            className={cn(
              "inline-block relative text-sm pl-3 transition-colors duration-300 ease-in-out truncate w-full",
              item.url === `#${activeItem}`
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <AnimatePresence mode="sync">
              {item.url === `#${activeItem}` && (
                <motion.span
                  key="activeItem"
                  layoutId="activeItem"
                  className="absolute left-0 top-0 rounded-xl h-4 w-1 bg-primary"
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
            {item.title}
          </a>
          {item.items?.length ? (
            <TreeClient
              tree={item.items}
              level={level + 1}
              activeItem={activeItem}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContentsClient({
  toc,
  price,
  tripname,
  className,
}: TocClientProps) {
  const pathname = usePathname();
  const showBookNow = pathname.startsWith("/trips/");

  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  );

  const activeHeading = useActiveItem(itemIds);
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

  if (!mounted) return null;

  return (
    <>
      {/* Desktop TOC */}
      {isLargeScreen && (
        <div className={cn("w-64 shrink-0 ", className)}>
          <div className="sticky top-24">
            {showBookNow && price && (
              <BookNowButton className="mb-4" price={price} />
            )}
            {showBookNow && (
              <>
                <div className="mb-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="default"
                        className="group cursor-pointer w-max lg:font-bold"
                      >
                        Make an Inquiry
                        <ChevronRight className="size-5 stroke-3 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
                        <span className="sr-only">Book now</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[354px] mx-auto">
                      <DialogHeader className="">
                        <DialogTitle className="text-2xl font-black ">
                          Make An Inquiry for
                        </DialogTitle>
                      </DialogHeader>
                      <Separator />
                      <div>
                        <PrivateTripForm tripName={tripname} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Separator className="my-2" />
              </>
            )}

            <p className="group font-bold text-lg py-2 flex items-center gap-2">
              {" "}
              <UnorderedListIcon className="size-5" />
              On This Page
            </p>
            <Separator className="my-2" />
            <TreeClient tree={toc} activeItem={activeHeading} />
          </div>
        </div>
      )}

      {/* Mobile TOC Button */}
      {!isLargeScreen && (
        <div className="flex flex-row gap-4 fixed bottom-6 left-1/2 -translate-1/2 z-30 ">
          {showBookNow && price && (
            <BookNowButton price={price} className="my-0 py-0" />
          )}
          {showBookNow && (
            <div className="mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="default"
                    className="group cursor-pointer w-max lg:font-bold"
                  >
                    Inquiry
                    <ChevronRight className="size-5 stroke-3 group-hover:-rotate-45 transition-all ease-in-out duration-500" />
                    <span className="sr-only">Book now</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[354px] mx-auto">
                  <DialogHeader className="">
                    <DialogTitle className="text-2xl font-black ">
                      Make An Inquiry for
                    </DialogTitle>
                  </DialogHeader>
                  <Separator />
                  <div className="max-h-[70vh] overflow-y-auto">
                    <PrivateTripForm tripName={tripname} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="default"
                // className="fixed bottom-6 left-1/2 -translate-1/2 z-30 "
              >
                <UnorderedListIcon className="h-8 w-8" />
                {/* <span>On This Page</span> */}
                <span className="sr-only">Table of Contents</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[354px] mx-auto">
              <DialogHeader>
                <DialogTitle> On This Page</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <TreeClient tree={toc} activeItem={activeHeading} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
