import { Button } from "../ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";
import { Icons } from "../brand";

const Navbar = () => {
  return (
    <header
      className="z-40 sticky top-0 mx-auto
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-background/60"
    >
      <nav className="h-14 container flex items-center justify-between">
        <Link href="/" className="">
          {/* <span className="sr-only">{siteConfig.name}</span> */}
          <Icons.navlogo />
          {/* <Icons.navlogolight className="" /> */}
        </Link>

        <DesktopNav />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
