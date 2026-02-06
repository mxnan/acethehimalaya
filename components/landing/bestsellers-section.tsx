"use client";

import { trips } from "#site/content";
import { TripCard } from "@/components/cards/trip-card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BestSellersSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [scrollWidth, setScrollWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const END_BUFFER = 80; // px – visual breathing room

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;

      const totalContentWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;

      const lastCardCenterOffset = viewportWidth / 2;

      const overflow = totalContentWidth - lastCardCenterOffset;

      // Vertical scroll distance must cover:
      // overflow + viewport height + buffer
      const requiredHeight = Math.max(
        overflow + window.innerHeight + END_BUFFER,
        window.innerHeight,
      );

      setScrollWidth(overflow);
      setSectionHeight(requiredHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth], {
    clamp: false,
  });

  // TS-safe bestseller filter
  const bestSellerTrips = trips
    .filter(
      (trip): trip is typeof trip & { rating: number } =>
        typeof trip.rating === "number" && trip.rating > 7,
    )
    .sort((a, b) => b.rating - a.rating);

  return (
    <section className="py-16">
      <div
        ref={sectionRef}
        style={{ height: sectionHeight || "100vh" }}
        className="relative"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Header */}
          <div className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2 text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Best Sellers for 2026
            </h2>
            <Separator className="mx-auto my-4 max-w-xs sm:max-w-md" />
          </div>

          {/* Footer text */}
          <div className="pointer-events-none absolute left-1/2 bottom-16 z-10 -translate-x-1/2 text-center px-4">
            <p className="text-sm sm:text-lg text-muted-foreground">
              Explore our most popular trips, loved by adventurers worldwide.
            </p>
          </div>

          {/* Horizontal track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 px-6 sm:px-24"
          >
            {bestSellerTrips.map((trip) => (
              <TripCard
                key={trip.slug}
                trip={trip}
                className="h-56 sm:h-64 aspect-video"
              />
            ))}
            <div className="h-56 sm:h-64 aspect-video flex items-center justify-center">
              <Button asChild className="cursor-pointer">
                <Link href={"/trips"}>See all Trips ? </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
