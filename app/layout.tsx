import type { Metadata, Viewport } from "next";
import { Anybody, Bayon, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import ProgressBar from "@/components/progress-bar";

const sans = Anybody({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// const mono = Geist({
//   variable: "--font-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: {
    template: "%s || AceTheHimalaya",
    default: "AceTheHimalaya",
  },
  // // Favicons
  // icons: {
  //   icon: [
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //   ],
  // },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
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
            <main className="container mx-auto min-h-screen">
              <ProgressBar />
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </>
        </Providers>
      </body>
    </html>
  );
}
