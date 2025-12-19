import type { Metadata, Viewport } from "next";
import { Anybody, Bayon  } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/nav/navbar";
import { Toaster } from "@/components/ui/sonner";

const sans = Anybody({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Bayon({
  variable: "--font-mono",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s || AceTheHimalaya",
    default: "AceTheHimalaya",
  },
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
          sans.variable,
          mono.variable
        )}
      >
        <Providers>
          <>
            {/* <ResponsiveSidebar /> */}
            <Navbar />
            {children}
            <Toaster position="bottom-right"/>
          </>
        </Providers>
      </body>
    </html>
  );
}
