import FooterBottom from "./footer-bottom";
import FooterBento from "./footer-bento";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import FooterNewsletterBrand from "./footer-2";

const FooterMap = dynamic(() => import("./footer-1"));

export default function Footer() {
  return (
    <footer className="relative bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Separator className="my-8" />
      <FooterMap />
      {/* Horizontal separator between map and subscribe */}
      {/* <Separator className="my-10" /> */}
      <FooterNewsletterBrand />
      {/* Horizontal separator between subscribe and main footer */}
      {/* <Separator className="my-10" /> */}
      {/* Use divide-y for stacked separators on small screens and divide-x on large screens for vertical separators */}
      <FooterBento />
      {/* Bottom Bar */}
      <FooterBottom />
    </footer>
  );
}
