"use client";
import { trips, blogs } from "#site/content";
import { Award, ChevronDown, ChevronUp, ClipboardCheck, DollarSign, Leaf, Star } from "lucide-react";
import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import SearchBar from "@/components/shared/search-bar";
import { buildSearchIndex } from "@/lib/search-index";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/brand";


export const searchIndex = buildSearchIndex(trips, blogs);

type Props = {
    progress: MotionValue<number>;
};

function HeroContent({ progress }: Props) {
    const logo = useTransform(progress, [0, 0.25], [1, 0]);
    const experience = useTransform(progress, [0.25, 0.50], [0, 1]);
    const the = useTransform(progress, [0.55, 0.60], [0, 1]);
    const difference = useTransform(progress, [0.60, 0.80], [0, 1]);

    const [visible, setVisible] = useState(true);
    const [direction, setDirection] = useState<"down" | "up">("down");

    useMotionValueEvent(progress, "change", (v) => {
        // Hide near the end (no flicker)
        if (v > 0.99) {
            setVisible(false);
            return;
        }

        setVisible(true);

        // Direction logic
        if (v < 0.15) {
            setDirection("down");
        } else if (v > 0.85) {
            setDirection("up");
        }
    });

    // if (!visible) return null;

    return (
        <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8">

                <div className="my-8 relative flex flex-col gap-4 text-center font-black text-primary-foreground">
                    <motion.div initial={{ opacity: 1 }} style={{ opacity: logo }} className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Icons.brandlogo className="size-64 sm:size-96 lg:size-128 " />
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        style={{ opacity: experience }}
                        className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl"
                    >
                        Experience
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        style={{ opacity: the }}
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
                    >
                        the
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        style={{ opacity: difference }}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
                    >
                        Difference
                    </motion.span>
                </div>
                {/* <Separator className="max-w-xl mx-auto bg-primary-foreground" /> */}
                <div className="w-full flex flex-col gap-4">
                    <SearchBar items={searchIndex} />
                    <div className="max-w-xl mx-auto flex flex-wrap items-center justify-center gap-4 text-white">
                        {/* Experience */}
                        <Badge variant="default" className="px-2 py-1 truncate">
                            <Award className="size-5 stroke-2" />
                            <span className="text-sm">
                                <strong>19+</strong> years experience
                            </span>
                        </Badge>

                        {/* Reviews */}
                        <Badge variant="default" className="px-2 py-1 truncate">
                            <Star className="size-5 stroke-2" />
                            <span className="text-sm">
                                <strong>3200+</strong> TripAdvisor reviews
                            </span>
                        </Badge>

                        {/* Price */}
                        <Badge variant="default" className="px-2 py-1 truncate">
                            <DollarSign className="size-5 stroke-2" />
                            <span className="text-sm">Best price guaranteed</span>
                        </Badge>

                        {/* Sustainability */}
                        <Badge variant="default" className="px-2 py-1 truncate">
                            <Leaf className="size-5 stroke-2" />
                            <span className="text-sm">Committed to sustainability</span>
                        </Badge>
                    </div>
                </div>

            </div>

            <motion.div
                className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    animate={{ y: direction === "down" ? [0, 6, 0] : [0, -6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-md"
                >
                    {direction === "down" ? (
                        <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            <span>Scroll</span>
                        </>
                    ) : (
                        <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            <span>Scroll up</span>
                        </>
                    )}
                </motion.div>
            </motion.div>

        </div>
    );
}

export default function HeroVideoSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={sectionRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-100"
                    src="/assets/landing/hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <div
                    className="max-md:hidden absolute inset-0 rounded-xl w-full h-full scale-[1] transform opacity-[0.05] dark:opacity-[0.1] [mask-image:radial-gradient(#fff,transparent,95%)]"
                    style={{
                        backgroundImage: "url('/style/noise.webp')",
                        backgroundSize: "30%",
                    }}
                ></div>

                <HeroContent progress={scrollYProgress} />
            </div>
        </section>
    )
}
