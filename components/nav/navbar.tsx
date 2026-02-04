import Link from "next/link";
import { Icons } from "../brand";
import dynamic from "next/dynamic";
import DesktopNav from "./desktop-nav";
import { TalkToAnExpert } from "../shared/talk-to-an-expert";

const MobileNav = dynamic(() => import("./mobile-nav"));

const Navbar = () => {
  return (
    <header
      className="z-40 fixed top-2 left-1/2 transform -translate-x-1/2
    rounded-lg border border-border/50 px-4 lg:px-6 
    bg-background/95 backdrop-blur max-w-7xl w-full
    supports-backdrop-filter:bg-background/80"
    >
      <nav className="mx-auto  flex gap-10 items-center justify-between">
        <div className="py-2" >
          <Link href="/" className="max-md:hidden ">
            {/* <span className="sr-only">{siteConfig.name}</span> */}
            <Icons.navlogo />
          </Link>
          <Link href="/" className="md:hidden ">
            {/* <span className="sr-only">{siteConfig.name}</span> */}
            <Icons.iconlogo />
          </Link>
        </div>

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
    </header >
  );
};

export default Navbar;
