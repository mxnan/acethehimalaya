"use client";
import { trips, blogs } from "#site/content";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SearchBar from "@/components/shared/search-bar";
import { buildSearchIndex } from "@/lib/search-index";

export const searchIndex = buildSearchIndex(trips, blogs);

type Props = {
  progress: MotionValue<number>;
};

function HeroContent({ progress }: Props) {
  const ace = useTransform(progress, [0, 0.05], [0, 1]);
  const the = useTransform(progress, [0.10, 0.15], [0, 1]);
  const himalaya = useTransform(progress, [0.20, 0.30], [0, 1]);
  const experience = useTransform(progress, [0.40, 0.50], [0, 1]);
  const the2 = useTransform(progress, [0.55, 0.60], [0, 1]);
  const difference = useTransform(progress, [0.65, 0.80], [0, 1]);

  return (
    <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div>
          <div className="relative flex flex-col text-center font-bold  text-black">
            <motion.span
              initial={{ opacity: 0 }}
              style={{ opacity: ace }}
              className="text-7xl"
            >
              Ace
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              style={{ opacity: the }}
              className="text-3xl"
            >
              the
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              style={{ opacity: himalaya }}
              className="text-3xl "
            >
              Himalaya
            </motion.span>
          </div>
          <div className="relative flex flex-col text-center font-bold  text-black">
            <motion.span
              initial={{ opacity: 0 }}
              style={{ opacity: experience }}
              className="text-3xl md:text-6xl "
            >
              Experience
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              style={{ opacity: the2 }}
              className="text-3xl md:text-6xl "
            >
              the
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              style={{ opacity: difference }}
              className="text-3xl md:text-6xl "
            >
              Difference
            </motion.span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <SearchBar items={searchIndex} />
          <div className="flex flex-row">
            <span>19+ years of experience</span>
            <span>3200+
              TripAdvisor Reviews</span>
            <span>Best Price
              Guaranteed</span>
            <span>Committed To
              Sustainability</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative w-full min-h-screen">
      <section ref={sectionRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/landing/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <HeroContent progress={scrollYProgress} />
        </div>
      </section>

      <IgnoreThis />
    </div>
  );
}

const IgnoreThis = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Component demo surface
          </p>
          <h1 className="font-sans text-4xl font-bold">UI Toolkit Preview</h1>
        </div>
        <ThemeToggle />
      </header>
      <section className="space-y-6 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Toast Icon Button - Outline Variants
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              import("sonner").then(({ toast }) =>
                toast.success("Success toast"),
              )
            }
          >
            <svg
              className="size-5 stroke-green-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              import("sonner").then(({ toast }) => toast.info("Info toast"))
            }
          >
            <svg
              className="size-5 stroke-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              import("sonner").then(({ toast }) =>
                toast.warning("Warning toast"),
              )
            }
          >
            <svg
              className="size-5 stroke-orange-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 22 20 2 20 12 2" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              import("sonner").then(({ toast }) => toast.error("Error toast"))
            }
          >
            <svg
              className="size-5 stroke-red-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              import("sonner").then(({ toast }) =>
                toast.loading("Loading toast"),
              )
            }
          >
            <svg
              className="size-5 stroke-primary animate-spin"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" className="opacity-20" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          </Button>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Typography
        </p>
        <div className="space-y-2">
          <h1 className="font-sans text-4xl font-bold">Heading One (h1)</h1>
          <h2 className="font-sans text-3xl font-bold">Heading Two (h2)</h2>
          <h3 className="font-sans text-2xl font-semibold">
            Heading Three (h3)
          </h3>
          <h4 className="font-sans text-xl font-semibold">Heading Four (h4)</h4>
          <p className="font-sans text-base text-muted-foreground">
            Paragraph body copy showing the default text styling. Keep content
            concise and readable across breakpoints.
          </p>
        </div>
      </section>

      {/* <section className="space-y-6 rounded-xl border bg-card/40 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase text-muted-foreground">
        Accordion Component
      </p>
    </section> */}

      <section className="space-y-6 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Button variants
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Button sizes
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="default">
            Small
          </Button>
          <Button size="default" variant="default">
            Default
          </Button>
          <Button size="lg" variant="default">
            Large
          </Button>
          <Button
            size="icon-sm"
            aria-label="icon button small"
            variant="default"
          >
            <ClipboardCheck />
          </Button>
          <Button size="icon" aria-label="icon button" variant="default">
            <ClipboardCheck />
          </Button>
          <Button
            size="icon-lg"
            aria-label="icon button large"
            variant="default"
          >
            <ClipboardCheck />
          </Button>
        </div>
      </section>
    </div>
  );
};
