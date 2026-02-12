import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Trip = {
    slugAsParams: string;
    title: string;
    description?: string;
    duration?: string;
    category?: string;
    image?: string;
};

type TripCardProps = {
    trip: Trip;
    className?: string;
};

export function TripCard({ trip, className }: TripCardProps) {
    const { slugAsParams, title, image, duration, category } = trip;

    return (
        <Link
            href={`/trips/${slugAsParams}`}
            className="group block h-full w-full max-w-full overflow-hidden"
        >
            <Card
                className={cn(
                    "relative h-72 w-full overflow-hidden rounded-xl border-none shadow-sm",
                    "transition-shadow hover:shadow-lg",
                    className
                )}
            >
                {/* Image */}
                {image && (
                    <div className="absolute inset-0">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            priority
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
                        />
                    </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end p-4">
                    <div className="rounded-lg bg-black/50 backdrop-blur-md p-3 transition-transform duration-300 group-hover:-translate-y-1">
                        <h3 className="text-base truncate font-semibold text-white line-clamp-2">
                            {title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
                            <ChevronRight className="size-4 stroke-2 shrink-0 transition-transform group-hover:-rotate-90" />

                            {duration && (
                                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                    <ClockIcon className="size-4 shrink-0" />
                                    {duration}
                                </span>
                            )}

                            {category && (
                                <span className="max-w-[60%] truncate font-semibold bg-neutral-200/80 text-black px-2 py-[3px] rounded-lg">
                                    {category}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>

    );
}
