"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme-toggle";
import { Icons } from "../brand";
import InstagramIcon from "../ui/icons/instagram-icon";
import FacebookIcon from "../ui/icons/facebook-icon";
import TwitterXIcon from "../ui/icons/twitter-x-icon";
import YoutubeIcon from "../ui/icons/youtube-icon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { BadgeCheck, BookOpen, Building2, Mountain } from "lucide-react";



type OpenCloseButtonProps = {
  onclickFunction: () => void;
  isOpen: boolean;
  text1?: string;
  text2?: string;
  className?: string;
};

const OpenCloseButton = ({
  onclickFunction,
  isOpen,
  text1,
  text2,
  className,
}: OpenCloseButtonProps) => (
  <motion.div
    className={cn("", className)}
    initial={false}
    animate={isOpen ? "open" : "closed"}
  >
    <Button
      variant="outline"
      onClick={onclickFunction}
      className="flex items-center gap-4"
    >
      {text1 && text2 && <span>{isOpen ? text2 : text1}</span>}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 23 23"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-primary"
      >
        <motion.path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </motion.svg>
    </Button>
  </motion.div>
);

const menuVariants = {
  closed: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    pointerEvents: "none" as const,
    transition: { duration: 0.18 },
  },
  open: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    pointerEvents: "auto" as const,
    transition: { duration: 0.18 },
  },
};

function SocialIconLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 w-14 items-center justify-center rounded-lg bg-background/40 backdrop-blur-md border border-border
                 transition-all duration-300 hover:bg-muted hover:scale-105"
    >
      {children}
    </Link>
  );
}


const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu when clicking / tapping outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const target = event.target as Node | null;
      if (target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <OpenCloseButton
        onclickFunction={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
      // text1="Menu"
      // text2="Close"
      />

      {/* Animated menu panel positioned below the button */}
      <motion.div
        initial={false}
        variants={menuVariants}
        animate={isOpen ? "open" : "closed"}
        className="absolute z-50 -left-65 mt-3 w-[302px] overflow-hidden rounded-xl border bg-muted text-muted-foreground shadow-lg"
      >
        <div className="flex flex-col max-h-[70vh]">
          {/* Header with logo / brand */}
          <div className="flex justify-between items-center gap-3 px-4 py-3 border-b bg-muted/40">
            <ThemeToggle />
            <Link href="/" className="inline-flex items-center gap-3">
              <Icons.navlogo className="h-8 w-auto" />
              <span className="sr-only">AceTheHimalaya</span>
            </Link>
          </div>


          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
            <Card className="p-6 lg:p-8">

              <CardContent className="grid grid-cols-2 gap-2 place-items-center">
                <Link href="/trips" className="w-full">
                  <Button className="w-full justify-start gap-2">
                    <Mountain size={16} />
                    Trips
                  </Button>
                </Link>

                <Link href="/blogs" className="w-full">
                  <Button className="w-full justify-start gap-2">
                    <BookOpen size={16} />
                    Blogs
                  </Button>
                </Link>

                <Link href="/company" className="w-full">
                  <Button className="w-full justify-start gap-2">
                    <Building2 size={16} />
                    About Us
                  </Button>
                </Link>

                <Link href="/company/why-ace" className="w-full">
                  <Button className="w-full justify-start gap-2">
                    <BadgeCheck size={16} />
                    Why Ace?
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Social links */}
            <Card className="w-full p-6 lg:p-8">


              <CardContent className="grid grid-cols-4 gap-4 place-items-center">
                <SocialIconLink href="https://www.instagram.com/acethehimalaya/">
                  <InstagramIcon size={28} />
                </SocialIconLink>

                <SocialIconLink href="https://www.facebook.com/acethehimalaya">
                  <FacebookIcon size={28} />
                </SocialIconLink>

                <SocialIconLink href="https://www.youtube.com/@acethehimalayas">
                  <YoutubeIcon size={28} />
                </SocialIconLink>

                <SocialIconLink href="https://x.com/acethehimalaya">
                  <TwitterXIcon size={28} />
                </SocialIconLink>

              </CardContent>
            </Card>

            {/* Footer small text */}
            <div className="px-4 pt-2 pb-3 border-t text-xs text-muted-foreground">
              © {new Date().getFullYear()} AceTheHimalaya. All rights reserved.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileNav;
