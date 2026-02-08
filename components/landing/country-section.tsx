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
                {/* Image */}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
                <div
                    className="max-md:hidden absolute inset-0 rounded-xl w-full h-full scale-[1] transform opacity-[0.05] dark:opacity-[0.1] [mask-image:radial-gradient(#fff,transparent,95%)]"
                    style={{
                        backgroundImage: "url('/style/noise.webp')",
                        backgroundSize: "30%",
                    }}
                ></div>
                {/* Content */}
                <div className="absolute z-10 bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 
                flex flex-col items-center gap-2 
                ">
                    <Button variant={"secondary"} size={"lg"} className="cursor-pointer">
                        <p className="text-xl ">  {name}</p>
                        <ChevronRight className="size-4 stroke-2 shrink-0 transition-transform group-hover:-rotate-90" />
                    </Button>
                    <Badge variant={"secondary"} className="text-sm opacity-90">
                        {trips} trips
                    </Badge>
                </div>
            </Link>
        </div>
    );
}


export default function CountrySection() {
    return (
        <section className="relative w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        image="/trips/nepal/nepal-multi-sport-luxury-adventure/cover.jpg"
                        className="sm:w-2/3 h-[420px]"
                    />

                    {/* RIGHT — BHUTAN + TIBET */}
                    <div className="flex flex-col gap-4 sm:w-1/3">
                        <CountryTile
                            name="Bhutan"
                            trips={getTripCountByCountry("bhutan")}
                            href="/trips/bhutan"
                            image="/trips/bhutan/paro-tshechu-festival/cover.jpg"
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
