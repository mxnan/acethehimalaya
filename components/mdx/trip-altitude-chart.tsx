"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

type TripAltitudePoint = {
  day: string;
  location: string;
  meters: number;
};

type TripAltitudeChartProps = {
  data: TripAltitudePoint[];
  className?: string;
};

const metersToFeet = (m: number) => Math.round(m * 3.28084);

export function TripAltitudeChart({ data, className }: TripAltitudeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  const width = 1000;
  const height = 240;
  const padding = { top: 32, bottom: 32, left: 72, right: 72 };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const values = data.map((d) => d.meters);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const getX = (i: number) =>
    padding.left +
    (i / (data.length - 1)) * (width - padding.left - padding.right);

  const getY = (v: number) => {
    const range = max - min || 1;
    const n = (v - min) / range;
    return (
      height - padding.bottom - n * (height - padding.top - padding.bottom)
    );
  };

  /* ---------------------------- curve path ---------------------------- */

  const path = useMemo(() => {
    const pts = data.map((d, i) => ({
      x: getX(i),
      y: getY(d.meters),
    }));

    let d = `M ${pts[0].x} ${pts[0].y}`;
    const t = 0.35;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * t;
      const cp1y = p1.y + (p2.y - p0.y) * t;
      const cp2x = p2.x - (p3.x - p1.x) * t;
      const cp2y = p2.y - (p3.y - p1.y) * t;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return d;
  }, [data]);

  /* -------------------------- pointer logic -------------------------- */

  const getClosestIndex = (clientX: number) => {
    if (!svgRef.current) return null;

    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const relativeX = (x / rect.width) * width;

    let closest = 0;
    let dist = Infinity;

    data.forEach((_, i) => {
      const dx = Math.abs(getX(i) - relativeX);
      if (dx < dist) {
        dist = dx;
        closest = i;
      }
    });

    return closest;
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isTouch) return;
    const index = getClosestIndex(e.clientX);
    if (index !== null) setActiveIndex(index);
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isTouch) return;
    const index = getClosestIndex(e.clientX);
    if (index !== null) setActiveIndex(index);
  };

  const clearActive = () => {
    if (!isTouch) setActiveIndex(null);
  };

  const downloadAsPng = async () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;

    // Clone SVG so we don't mutate live DOM
    const clonedSvg = svg.cloneNode(true) as SVGSVGElement;

    const vb = svg.viewBox.baseVal;
    clonedSvg.setAttribute("width", `${vb.width}`);
    clonedSvg.setAttribute("height", `${vb.height}`);
    clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clonedSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    // Inject background (VERY IMPORTANT)
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "0");
    bg.setAttribute("y", "0");
    bg.setAttribute("width", "100%");
    bg.setAttribute("height", "100%");
    bg.setAttribute("fill", "#ffffff"); // or transparent
    clonedSvg.insertBefore(bg, clonedSvg.firstChild);

    // Inline brand color (CSS vars DO NOT EXIST in canvas)
    clonedSvg.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el as Element);

      if (style.fill && style.fill.includes("var(")) {
        (el as HTMLElement).setAttribute("fill", style.fill);
      }

      if (style.stroke && style.stroke.includes("var(")) {
        (el as HTMLElement).setAttribute("stroke", style.stroke);
      }
    });

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);

    const canvas = document.createElement("canvas");
    const scale = 2; // Retina
    canvas.width = vb.width * scale;
    canvas.height = vb.height * scale;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "altitude-map.png";
      link.click();
    };

    img.src = url;
  };

  /* ------------------------------------------------------------------ */

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full block"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerLeave={clearActive}
      >
        {/* Vertical grid lines */}
        {data.map((_, i) => (
          <line
            key={`grid-${i}`}
            x1={getX(i)}
            y1={padding.top}
            x2={getX(i)}
            y2={height - padding.bottom}
            stroke="var(--brand-color)"
            strokeWidth="1"
            opacity="0.2"
          />
        ))}

        {/* Area */}
        <path
          d={`${path} L ${width} ${height} L 0 ${height} Z`}
          fill="var(--brand-color)"
          opacity="0.08"
        />

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke="var(--brand-color)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Points */}
        {data.map((d, i) => (
          <circle
            key={`point-${i}`}
            cx={getX(i)}
            cy={getY(d.meters)}
            r={activeIndex === i ? 4 : 3}
            fill={activeIndex === i ? "#fff" : "var(--brand-color)"}
            stroke="var(--brand-color)"
            strokeWidth={activeIndex === i ? 5 : 4}
            className="transition-all duration-150 cursor-pointer"
          />
        ))}

        {/* Location labels (vertical, centered in chart, export-safe) */}
        {data.map((d, i) => {
          const centerY =
            padding.top + (height - padding.top - padding.bottom) / 2;

          return (
            <text
              key={`location-${i}`}
              x={getX(i)}
              y={centerY}
              textAnchor="middle"
              className="text-[11px] font-medium fill-foreground"
              style={{ pointerEvents: "none" }}
              transform={`rotate(-90 ${getX(i)} ${centerY})`}
            >
              {d.location}
            </text>
          );
        })}

        {/* Day labels */}
        {data.map((d, i) => (
          <text
            key={`label-${i}`}
            x={getX(i)}
            y={height - 12}
            textAnchor="middle"
            className="text-[10px] fill-muted-foreground"
          >
            {d.day}
          </text>
        ))}

        {/* Tooltip (SVG-native, point-anchored) */}
        {activeIndex !== null && (
          <foreignObject
            x={getX(activeIndex) - 80}
            y={
              getY(data[activeIndex].meters) < 70
                ? getY(data[activeIndex].meters) + 12
                : getY(data[activeIndex].meters) - 60
            }
            width={160}
            height={50}
            style={{ overflow: "visible" }}
          >
            <div className="pointer-events-none flex justify-center">
              <div className="rounded-md bg-background/90 backdrop-blur-sm px-3 py-2 shadow-sm border border-border text-center">
                <p className="text-xs font-medium text-foreground">
                  {data[activeIndex].day} · {data[activeIndex].location}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data[activeIndex].meters} m /{" "}
                  {metersToFeet(data[activeIndex].meters)} ft
                </p>
              </div>
            </div>
          </foreignObject>
        )}
      </svg>
      <Button
        onClick={downloadAsPng}
        size={"icon"}
        className="absolute top-1 right-1 cursor-pointer"
      >
        <Download />
      </Button>
    </div>
  );
}
