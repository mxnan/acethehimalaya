import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Fjalla_One, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const sans = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

const mono = Fjalla_One({
  variable: "--font-mono",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s || acethehimalaya",
    default: "acethehimalaya",
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
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
