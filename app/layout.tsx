import "./globals.css";
import dynamic from "next/dynamic";
import type { Metadata, Viewport } from "next";
import { Anybody } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import ProgressBar from "@/components/progress-bar";
import Footer from "@/components/footer/footer";
const Navbar = dynamic(() => import("@/components/nav/navbar"));

const sans = Anybody({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://acethehimalaya.vercel.app"
  ),
  title: {
    template: "%s || AceTheHimalaya",
    default: "AceTheHimalaya",
  },
  description:
    "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more. Your gateway to Nepal's mountain adventures.",
  keywords: [
    "Himalayan trekking",
    "Everest Base Camp",
    "Nepal tours",
    "mountain adventures",
    "trekking Nepal",
  ],
  authors: [{ name: "AceTheHimalaya Team" }],
  creator: "mxnan",
  publisher: "mxnan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://acethehimalaya.vercel.app",
    title: "AceTheHimalaya - Experience the Difference",
    description:
      "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more.",
    siteName: "AceTheHimalaya",
    // images: [
    //   {
    //     url: "/brand-assets/brand-logo-icon.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "AceTheHimalaya - Himalayan Trekking Tours",
    //   },
    // ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "AceTheHimalaya - Premium Himalayan Trekking & Adventure Tours",
  //   description:
  //     "Experience the majesty of the Himalayas with AceTheHimalaya. Expert-led trekking tours to Everest Base Camp, Annapurna Circuit, and more.",
  //   images: ["/brand-assets/brand-logo-icon.png"],
  //   creator: "@AceTheHimalaya",
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Favicons
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     {
  //       url: "/brand-assets/brand-logo-icon.png",
  //       type: "image/png",
  //       sizes: "32x32",
  //     },
  //   ],
  //   apple: [
  //     {
  //       url: "/brand-assets/brand-logo-icon.png",
  //       sizes: "180x180",
  //       type: "image/png",
  //     },
  //   ],
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative antialiased font-sans",
          sans.variable
          // mono.variable
        )}
      >
        <Providers>
          <>
            {/* <ResponsiveSidebar /> */}
            <Navbar />
            <main className="px-4 lg:px-8 max-w-7xl mx-auto min-h-screen">
              <ProgressBar />
              {children}
              <Footer />
            </main>

            <Toaster position="top-left" />
          </>
        </Providers>
      </body>
    </html>
  );
}
