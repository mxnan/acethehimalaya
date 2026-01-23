"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TrekMapProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fileName?: string;
};

export function TrekMap({
  src,
  alt,
  width = 1000,
  height = 1000,
  className,
  fileName = "trek-map.jpg",
}: TrekMapProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Download button */}
      <Button
        size="sm"
        variant={"default"}
        onClick={handleDownload}
        className="absolute top-4 right-4 cursor-pointer flex gap-2 items-center"
        aria-label="Download trek map"
      >
        Download <Download className="stroke-2" />
      </Button>

      {/* Map image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover object-center rounded-2xl border shadow-sm"
        loading="lazy"
      />
    </div>
  );
}
