import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { getTripCountByCountry } from "@/lib/trip-count";


type CountryTileProps = {
    name: string;
    trips: number;
    href: string;
    image: string;
    className?: string;
};

function CountryTile({
    name,
    trips,
    href,
    image,
    className = "",
}: CountryTileProps) {
    return (
        <div className={`relative group overflow-hidden rounded-lg ${className}`}>
            <Link href={href}>
                {/* IMAGE */}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />

                {/* NEUTRAL VIGNETTE */}
                <div
                    aria-hidden
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(64,64,64,0) 40%, rgba(64,64,64,0.25) 75%, rgba(64,64,64,0.45) 100%)",
                    }}
                />

                {/* NOISE */}
                <div
                    aria-hidden
                    className="max-md:hidden absolute inset-0 z-[2] rounded-xl opacity-[0.05] dark:opacity-[0.1] [mask-image:radial-gradient(#fff,transparent,95%)]"
                    style={{
                        backgroundImage: "url('/style/noise.webp')",
                        backgroundSize: "30%",
                    }}
                />

                {/* CONTENT */}
                <div
                    className="absolute z-10 bottom-2 left-2 
      flex items-center gap-2 rounded-lg bg-black/50 backdrop-blur-md p-2 group-hover:p-3 group-hover:bg-black/80 transition-all ease-in-out duration-500"
                >
                    <div className="flex items-center gap-2 px-2 py-1">
                        <p className="text-xl text-neutral-200">{name}</p>
                        <ChevronRight className="size-4 stroke-4 text-neutral-200 shrink-0 transition-transform duration-1000 group-hover:-rotate-30" />
                    </div>

                    <Badge variant="outline" className="text-sm text-neutral-200 opacity-90">
                        {trips} trips
                    </Badge>
                </div>
            </Link>
        </div>

    );
}


export default function CountrySection() {
    return (
        <section className="relative w-full py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Journey to the Himalayan Lands</h2>
                    <Separator className="my-4 max-w-md" />
                    <p className="text-sm sm:text-lg text-muted-foreground">Unveiling Hidden Wonders: Nepal, Bhutan, Tibet, and Beyond - Inspire Your Journey!</p>
                </div>
                <div className="mt-16 flex flex-col gap-4 sm:flex-row">
                    {/* LEFT — NEPAL */}
                    <CountryTile
                        name="Nepal"
                        trips={getTripCountByCountry("nepal")}
                        href="/trips/nepal"
                        image="/assets/landing/country/nepal.jpg"
                        className="sm:w-2/3 h-[420px]"
                    />

                    {/* RIGHT — BHUTAN + TIBET */}
                    <div className="flex flex-col justify-center gap-4 sm:w-1/3">
                        <CountryTile
                            name="Bhutan"
                            trips={getTripCountByCountry("bhutan")}
                            href="/trips/bhutan"
                            image="/assets/landing/country/bhutan.jpg"
                            className="h-[200px]"
                        />

                        <CountryTile
                            name="Tibet"
                            trips={getTripCountByCountry("tibet")}
                            href="/trips/tibet"
                            image="/trips/tibet/lhasa-tour-from-kathmandu/cover.jpg"
                            className="h-[200px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
