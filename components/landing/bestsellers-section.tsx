"use client";

import { trips } from "#site/content";
import { TripCard } from "@/components/cards/trip-card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Separator } from "../ui/separator";

export default function BestSellersSection() {

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-75%"]);


    // TS-safe bestseller filter
    const bestSellerTrips = trips
        .filter(
            (trip): trip is typeof trip & { rating: number } =>
                typeof trip.rating === "number" && trip.rating > 8
        )
        .sort((a, b) => b.rating - a.rating);

    return (
        <section className="py-16">
            <div
                ref={targetRef}
                className="relative h-[300vh]"
            >

                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <div className="absolute left-1/2 top-36 -translate-x-1/2 text-center">
                        <h2 className="text-3xl  font-bold">Best Sellers for 2026</h2>

                        <Separator className="max-w-full mx-auto my-4 " />
                    </div>
                    <div className="absolute left-1/2 bottom-24 -translate-x-1/2 text-center">
                        <p className="text-lg text-muted-foreground">Explore our most popular trips, loved by adventurers worldwide.</p>
                    </div>
                    <motion.div
                        style={{ x }}
                        className="flex gap-6 px-24"
                    >
                        {bestSellerTrips.map((trip) => (
                            <TripCard className="aspect-video" key={trip.slug} trip={trip} />
                        ))}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                        <div className="h-72 aspect-video bg-green-500 " /> {/* Extra card*/}
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
