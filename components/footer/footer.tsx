

import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import FooterTwo from "./footer-2";
import FooterThree from "./footer-3";
import FooterBottom from "./footer-bottom";
const FooterMap = dynamic(() => import("./footer-1"));

export default function Footer() {
  return (
    <footer className="relative max-w-7xl mx-auto">
      <Separator className="my-8" />
      <FooterMap />
      {/* Horizontal separator between map and subscribe */}
      {/* <Separator className="my-10" /> */}
      <FooterTwo />
      {/* Horizontal separator between subscribe and main footer */}
      {/* <Separator className="my-10" /> */}
      {/* Use divide-y for stacked separators on small screens and divide-x on large screens for vertical separators */}
      <FooterThree />
      {/* Bottom Bar */}
      <FooterBottom />
    </footer>
  );
}
