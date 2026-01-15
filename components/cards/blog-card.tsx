import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronUp, ClockIcon } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "../ui/button";

type Blog = {
  slugAsParams: string;
  title: string;
  description?: string;
  image?: string;
  date: string;
};

type BlogCardProps = {
  blog: Blog;
  className?: string;
};

export function BlogCard({ blog, className }: BlogCardProps) {
  const { slugAsParams, title, description, image, date } = blog;

  return (
    <Link href={`/blogs/${slugAsParams}`} className="group block h-full">
      <Card
        className={cn(
          "relative h-72 overflow-hidden rounded-xl border-none shadow-sm transition-shadow hover:shadow-lg",
          className
        )}
      >
        {/* Image */}
        {image && (
          <div
            className="absolute  inset-0"
            // whileHover={{ scale: 1.05 }}
            // transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover aspect-video object-center transition-all duration-300"
              //   sizes="(max-width: 768px) 100vw,
              //          (max-width: 1200px) 50vw,
              //          50vw"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          <Button
            variant={"default"}
            size={"icon"}
            className="absolute top-4 right-4"
          >
            <ChevronUp className="h-5 w-5 stroke-4 text-background group-hover:rotate-180 transition-transform ease-in-out duration-500" />
          </Button>
          <div className="rounded-lg bg-black/50 backdrop-blur-md p-3 group-hover:-translate-y-2 transition-all ease-in-out duration-500">
            <h3 className="text-base font-semibold text-white line-clamp-2">
              {title}
            </h3>

            {description && (
              <p className="mt-1 line-clamp-2 text-sm text-white/80">
                {description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
              <ClockIcon className="h-4 w-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
