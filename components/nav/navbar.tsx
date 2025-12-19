import { Button } from "../ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import ThemeToggle from "../theme-toggle";
import MobileNav from "./mobile-nav";

const Navbar = () => {
  return (
    <header
      className="z-40 sticky top-0 max-w-6xl mx-auto
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-background/60"
    >
      <nav className="h-14 px-3 flex items-center justify-between">
        <Button asChild variant={"outline"} size={"icon"}>
          <Link href="/" className="mr-4">
            {/* <Icons.logo className="h-6 w-6" />
        <span className="sr-only">{siteConfig.name}</span> */}
            <Home />
          </Link>
        </Button>{" "}
        <div className="hidden md:flex items-center">
          {" "}
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link
              href="/trips"
              className="font-mono uppercase tracking-wide text-xl"
            >
              Trips
            </Link>
          </Button>{" "}
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link
              href="/blogs"
              className="font-mono uppercase tracking-wide text-xl"
            >
              Blogs
            </Link>
          </Button>{" "}
          <Button asChild variant={"ghost"} size={"sm"} className="mr-2">
            <Link
              href="/blogs"
              className="font-mono uppercase tracking-wide text-xl"
            >
              Company
            </Link>
          </Button>{" "}
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
