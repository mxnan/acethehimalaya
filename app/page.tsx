import CategorySection from "@/components/landing/category-section";
import BestSellersSection from "@/components/landing/bestsellers-section";
import BestOfBhutanTibet from "@/components/landing/bhutantibet-section";
import CountrySection from "@/components/landing/country-section";
import FAQSection from "@/components/landing/faq-section";
import HeroVideoSection from "@/components/landing/hero-video-section";
import InstagramFeed from "@/components/landing/instafeed-section";
import TrekkingRegionNepalSection from "@/components/landing/trekregionnepal-section";
import TripOfTheMonth from "@/components/landing/tripofmonth-section";
import WhyAceSection from "@/components/landing/whyace-section";
import { Metadata } from "next";
import OurAssociations from "@/components/landing/association-section";

export const metadata: Metadata = {
  title: "Ace The Himalaya",
  description:
    "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more. Your gateway to Nepal's mountain adventures.",
  // openGraph: {
  //   title: "AceTheHimalaya - Premium Himalayan Trekking & Adventure Tours",
  //   description: "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more.",
  //   images: [
  //     {
  //       url: "/brand-assets/brand-logo-icon.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "AceTheHimalaya - Himalayan Trekking Tours",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "AceTheHimalaya - Premium Himalayan Trekking & Adventure Tours",
  //   description: "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more.",
  //   images: ["/brand-assets/brand-logo-icon.png"],
  // },
};
export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <HeroVideoSection />
      <BestSellersSection />
      {/* <WhyAceSection /> */}
      <CountrySection />
      <CategorySection />
      <TrekkingRegionNepalSection />
      <BestOfBhutanTibet />
      <FAQSection />
      <OurAssociations />
      <TripOfTheMonth />
      {/* <InstagramFeed /> */}
    </div>
  );
}
