"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Clock,
  Mountain,
  Activity,
  TrendingUp,
  Calendar,
  Home,
  Utensils,
  Route,
  Map,
} from "lucide-react";

/* ---------------------------------- types --------------------------------- */

type TripDetailsCardProps = {
  variant?: "default" | "info-only";
  country?: string;
  duration?: string;
  difficulty?: string;
  activity?: string;
  altitude?: string;
  bestSeason?: string;
  accommodation?: string;
  meals?: string;
  startEnd?: string;
  trekkingDistance?: string;
  images?: {
    src: string;
    caption?: string;
  }[];
  className?: string;
};

type OpenCloseButtonProps = {
  onclickFunction: () => void;
  isOpen: boolean;
  text1?: string;
  text2?: string;
  className?: string;
};

/* ----------------------------- open close btn ------------------------------ */

const OpenCloseButton = ({
  onclickFunction,
  isOpen,
  text1,
  text2,
  className,
}: OpenCloseButtonProps) => (
  <motion.div
    className={cn("", className)}
    initial={false}
    animate={isOpen ? "open" : "closed"}
  >
    <Button
      variant="default"
      onClick={onclickFunction}
      className="group cursor-pointer flex items-center gap-4 bg-neutral-200 backdrop-blur-md text-black border-white/30 hover:bg-neutral-300/80"
    >
      {text1 && text2 && (
        <span className="max-sm:hidden">{isOpen ? text2 : text1}</span>
      )}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 23 23"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-black"
      >
        <motion.path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </motion.svg>
    </Button>
  </motion.div>
);

/* ------------------------------- constants -------------------------------- */

const AUTO_SLIDE_INTERVAL = 5000;

const detailLabels = {
  country: "Country",
  duration: "Duration",
  difficulty: "Difficulty",
  activity: "Activity",
  altitude: "Max Altitude",
  bestSeason: "Best Season",
  accommodation: "Accommodation",
  meals: "Meals",
  startEnd: "Start / End Point",
  trekkingDistance: "Trekking Distance",
};

const detailIcons = {
  country: MapPin,
  duration: Clock,
  difficulty: Mountain,
  activity: Activity,
  altitude: TrendingUp,
  bestSeason: Calendar,
  accommodation: Home,
  meals: Utensils,
  startEnd: Route,
  trekkingDistance: Map,
};

/* ----------------------------- main component ------------------------------ */

export function TripDetailsCard({
  country,
  duration,
  difficulty,
  activity,
  altitude,
  bestSeason,
  accommodation,
  meals,
  startEnd,
  trekkingDistance,
  images,
  variant = "default",
  className,
}: TripDetailsCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const details = {
    country,
    duration,
    difficulty,
    activity,
    altitude,
    bestSeason,
    accommodation,
    meals,
    startEnd,
    trekkingDistance,
  };

  const validDetails = Object.entries(details).filter(
    ([, value]) => value != null && value.trim() !== ""
  );

  /* --------------------------- auto slide images --------------------------- */
  useEffect(() => {
    if (variant !== "default") return;
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [images, variant]);

  if (validDetails.length === 0) return null;

  const detailsOpen = variant === "info-only" ? true : isOpen;

  return (
    <Card
      className={cn(
        variant === "info-only"
          ? "relative overflow-hidden rounded-xl border shadow-sm"
          : "relative min-h-[70vh] overflow-hidden rounded-xl border-none shadow-sm",
        className
      )}
    >
      {/* Image carousel */}
      {variant === "default" && images && images.length > 0 && (
        <AnimatePresence>
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
            >
              <Image
                src={images[currentImage].src}
                alt={images[currentImage].caption ?? "Trip image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
                priority={currentImage === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Gradient overlay */}
      {variant === "default" && (
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
      )}

      {/* Toggle button */}
      {variant === "default" && (
        <div className="absolute top-4 left-4 z-20">
          <OpenCloseButton
            onclickFunction={() => setIsOpen((prev) => !prev)}
            isOpen={isOpen}
            text1="Show details"
            text2="Hide details"
          />
        </div>
      )}

      {/* Caption */}
      {variant === "default" && images?.[currentImage]?.caption && (
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "linear" }}
          className="absolute top-4 right-4 z-20 max-w-sm max-sm:hidden"
        >
          <div className="rounded-md bg-primary backdrop-blur-md px-3 py-2 shadow-sm">
            <p className="text-xs md:text-sm font-semibold text-white dark:text-black">
              {images[currentImage].caption}
            </p>
          </div>
        </motion.div>
      )}

      {/* Details panel */}
      <motion.div
        className={cn(
          "z-10",
          variant === "info-only"
            ? "relative inset-auto"
            : "absolute bottom-4 left-4 right-4"
        )}
        animate={detailsOpen ? "open" : "closed"}
        variants={{
          open: { y: 0, opacity: 1 },
          closed: { y: 20, opacity: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className={cn(
            "rounded-lg  p-4",
            variant === "info-only"
              ? "w-full bg-muted text-primary"
              : "w-max bg-black/50 backdrop-blur-md text-white"
          )}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {validDetails.map(([key, value]) => {
              const Icon = detailIcons[key as keyof typeof detailIcons];

              return (
                <div key={key} className="flex items-start gap-3">
                  <div className="flex p-2 items-center justify-center rounded-md bg-neutral-600 dark:bg-neutral-100">
                    <Icon
                      className={cn(
                        "size-5 stroke-3",
                        variant === "info-only"
                          ? "stroke-primary-foreground"
                          : "stroke-primary-foreground"
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs ">
                      {detailLabels[key as keyof typeof detailLabels]}
                    </span>
                    <span className="text-sm font-semibold ">{value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
