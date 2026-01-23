import Link from "next/link";
import { Icons } from "../brand";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import WhatsappIcon from "../ui/icons/whatsapp-icon";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import DesktopNav from "./desktop-nav";

const MobileNav = dynamic(() => import("./mobile-nav"));

const Navbar = () => {
  return (
    <header
      className="z-40 sticky top-2 mx-auto max-w-7xl px-4 lg:px-8 rounded-lg border
    border-border/50
    bg-background/95 backdrop-blur
    supports-backdrop-filter:bg-background/60"
    >
      <nav className="h-14 flex items-center justify-between">
        <Link href="/" className="">
          {/* <span className="sr-only">{siteConfig.name}</span> */}
          <Icons.navlogo />
        </Link>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="inline-flex group cursor-pointer"
                aria-label="Talk to an Expert"
              >
                <WhatsappIcon className="h-6 w-6 stroke-green-700" />
                <span className="sr-only">Talk to an Expert</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Talk to an Expert</DialogTitle>
              map all sales personnel whatsapp numbers here
              <DialogFooter>Ace the Himalaya</DialogFooter>
            </DialogContent>
          </Dialog>
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
