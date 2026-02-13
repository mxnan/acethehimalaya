import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, ClockIcon } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

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
          className,
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
              priority
              className="object-cover aspect-video object-center transition-all duration-300"
              sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       50vw"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          <div className="rounded-lg bg-black/50 group-hover:bg-black/80 backdrop-blur-md p-3 group-hover:-translate-y-2 transition-all ease-in-out duration-500">
            <h3 className="text-base font-semibold truncate text-white line-clamp-2">
              {title}
            </h3>

            {description && (
              <p className="mt-1 line-clamp-2 text-sm text-white/80">
                {description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
              <ChevronRight className="size-4 stroke-4 group-hover:-rotate-30 transition-transform ease-in-out duration-500" />
              <ClockIcon className="size-5 " />
              <time dateTime={date} className="font-semibold">
                {formatDate(date)}
              </time>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
