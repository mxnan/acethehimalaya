import type { Metadata, Viewport } from "next";
import { Anybody } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import ProgressBar from "@/components/progress-bar";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import('@/components/nav/navbar'));
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
            <main className="px-4 lg:px-8 max-w-7xl mx-auto min-h-screen">
              <ProgressBar />
              {children}
              <Footer />
            </main>

            <Toaster position="bottom-right" />
          </>
        </Providers>
      </body>
    </html>
  );
}
