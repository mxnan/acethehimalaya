import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getCategoryStats } from "@/lib/category-utils";
import { Badge } from "../ui/badge";
import Link from "next/link";


type CategoryTileProps = {
    name: string;
    count: number;
    href: string;
    image: string;
};

function CategoryTile({ name, count, href, image }: CategoryTileProps) {
    return (
        <div className="relative group h-40 overflow-hidden rounded-xl">
            <Link href={href}>

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

                {/* CONTENT */}
                <div
                    className="absolute z-10 bottom-10 left-2"
                >

                    <Badge variant="default" className="text-sm opacity-90">
                        <p>{name}</p>
                    </Badge>
                </div>
                <div
                    className="absolute z-10 bottom-2 left-2"
                >

                    <Badge variant="default" className="text-sm opacity-90">
                        <p>{count} trips</p>
                    </Badge>
                </div>
            </Link>
        </div>
    );
}


export default function CategorySection() {
    const categories = getCategoryStats();
    // console.log(categories)
    return (
        <section className="relative w-full py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        Activities We Offer
                    </h2>
                    <Separator className="my-4 max-w-md" />
                    <p className="text-sm sm:text-lg text-muted-foreground">
                        Explore the wide array of experiences provided by our team, designed to cater to your diverse interests and needs.
                    </p>
                </div>

                {/* Grid */}
                <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <CategoryTile
                            key={cat.key}
                            name={cat.label}
                            count={cat.count}
                            href={`/trips/${cat.key}`}
                            image={cat.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
