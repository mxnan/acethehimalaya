"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react'
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { getTrekkingRegionStatsNepal } from '@/lib/trekking-region-utils';

type RegionTileProps = {
    name: string;
    count: number;
    image: string;
    href: string;
};

function TrekkingRegionTile({ name, count, image, href }: RegionTileProps) {
    return (
        <div className="relative group overflow-hidden rounded-lg h-56 sm:h-64 aspect-video">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Neutral vignette */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(64,64,64,0) 40%, rgba(64,64,64,0.25) 75%, rgba(64,64,64,0.45) 100%)",
                }}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-white">
                <Button variant="secondary" size="lg">

                    {name}
                    <ChevronRight className="size-4 transition-transform group-hover:-rotate-90" />

                </Button>

                <Badge variant="secondary">{count} treks</Badge>
            </div>
        </div>
    );
}

export default function TrekkingRegionNepalSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const [scrollWidth, setScrollWidth] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);

    const regions = getTrekkingRegionStatsNepal();

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

    return (
        <div ref={sectionRef}
            style={{ height: sectionHeight || "100vh" }}
            className="relative">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                {/* Header */}
                <div className="pointer-events-none absolute left-1/2 top-32 z-10 -translate-x-1/2 text-center px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        Trekking Regions in Nepal
                    </h2>
                    <Separator className="mx-auto my-4 max-w-xs sm:max-w-md" />
                </div>
                {/* Footer text */}
                <div className="pointer-events-none absolute left-1/2 bottom-32 z-10 -translate-x-1/2 text-center px-4">
                    <p className="text-sm sm:text-lg text-muted-foreground">
                        Explore the Himalaya and unravel the beauty of trekking in Nepal along these regions.


                    </p>
                </div>

                {/* Horizontal track */}
                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex gap-4 sm:gap-6 px-6 sm:px-24"
                >
                    {regions.map((region) => (
                        <TrekkingRegionTile
                            key={region.key}
                            name={region.label}
                            count={region.count}
                            image={region.image}
                            href={`/trips/nepal/${region.key}`}
                        />
                    ))}
                </motion.div>

            </div>
        </div>
    )
}
