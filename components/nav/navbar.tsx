import { Button } from "../ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";

const Navbar = () => {
  return (
    <header
      className="z-40 sticky top-0 mx-auto
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-background/60"
    >
      <nav className="h-14 flex items-center justify-between">
        <Button asChild variant={"outline"} size={"icon"}>
          <Link href="/" className="">
            {/* <Icons.logo className="h-6 w-6" />
        <span className="sr-only">{siteConfig.name}</span> */}
            <Home />
          </Link>
        </Button>
        <DesktopNav />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
