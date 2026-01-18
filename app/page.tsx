import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ace The Himalaya",
  description: "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more. Your gateway to Nepal's mountain adventures.",
  openGraph: {
    title: "AceTheHimalaya - Premium Himalayan Trekking & Adventure Tours",
    description: "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more.",
    images: [
      {
        url: "/brand-assets/brand-logo-icon.png",
        width: 1200,
        height: 630,
        alt: "AceTheHimalaya - Himalayan Trekking Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AceTheHimalaya - Premium Himalayan Trekking & Adventure Tours",
    description: "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more.",
    images: ["/brand-assets/brand-logo-icon.png"],
  },
};
export default function Home() {
  return (
    <div className="my-8 min-h-screen flex items-center justify-center">
      <Button variant={"secondary"}>
        {" "}
        <Link href={"/blogs"}>Blogs</Link>
      </Button>
      <Button variant={"secondary"}>
        {" "}
        <Link href={"/trips"}>Trips</Link>
      </Button>
    </div>
  );
}
