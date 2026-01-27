import Link from "next/link";
import { Icons } from "../brand";
import dynamic from "next/dynamic";
import DesktopNav from "./desktop-nav";
import { TalkToAnExpert } from "../shared/talk-to-an-expert";

const MobileNav = dynamic(() => import("./mobile-nav"));

const Navbar = () => {
  return (
    <header
      className="z-40 sticky top-2 mx-auto max-w-7xl rounded-lg border
    border-border/50
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-background/60"
    >
      <nav className="px-4 lg:px-8 h-18 flex items-center justify-between">
        <>
          <Link href="/" className="max-md:hidden py-2">
            {/* <span className="sr-only">{siteConfig.name}</span> */}
            <Icons.navlogo />
          </Link>
          <Link href="/" className="md:hidden py-2">
            {/* <span className="sr-only">{siteConfig.name}</span> */}
            <Icons.iconlogo />
          </Link>
        </>

        <div className="flex items-center gap-2">
          <TalkToAnExpert />
          <div className="relative flex">
            <DesktopNav />
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
