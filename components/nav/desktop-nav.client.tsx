"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme-toggle";

const navItems = [
  {
    label: "Trips",
    href: "/trips",
    menu: [
      { label: "All Trips", href: "/trips" },
      { label: "Nepal1", href: "/trips/nepal/nepal1" },
      { label: "Bhutan1", href: "/trips/bhutan/bhutan1" },
      { label: "Tibet1", href: "/trips/tibet/tibet1" },
    ],
  },
  {
    label: "Blogs",
    href: "/blogs",
    menu: [
      { label: "All Blogs", href: "/blogs" },
      { label: "MDX Guide", href: "/blogs/mdx-gist" },
      { label: "Style Guide", href: "/blogs/style-guide" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    menu: [{ label: "About Us", href: "/company" }],
  },
];

export const DesktopNavClient = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleItemHover = (itemLabel: string) => {
    setHoveredItem(itemLabel);
    const itemElement = itemRefs.current[itemLabel];
    if (itemElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = itemElement.getBoundingClientRect();
      setMenuPosition({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  };

  const handleNavLeave = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    if (hoveredItem) {
      const itemElement = itemRefs.current[hoveredItem];
      if (itemElement && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        setMenuPosition({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
        });
      }
    }
  }, [hoveredItem]);

  const currentMenu = navItems.find((item) => item.label === hoveredItem)?.menu;

  return (
    <div
      ref={navRef}
      className="hidden md:flex items-end relative"
      onMouseLeave={handleNavLeave}
    >
      {navItems.map((item) => (
        <div
          key={item.label}
          ref={(el) => {
            itemRefs.current[item.label] = el;
          }}
          className="relative mr-2"
          onMouseEnter={() => handleItemHover(item.label)}
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Link
              href={item.href}
              className={cn(
                "font-bold flex items-center gap-1 px-3 py-1 rounded-md transition-colors",
                "hover:text-primary/70",
                hoveredItem === item.label && "border"
              )}
            >
              {item.label}
              <motion.div
                animate={{
                  rotate: hoveredItem === item.label ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 stroke-primary" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      ))}

      <AnimatePresence mode="wait">
        {hoveredItem && currentMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              opacity: { duration: 0.2, ease: "easeOut" },
              y: { duration: 0.2, ease: "easeOut" },
            }}
            style={{
              left: menuPosition.left,
            }}
            className="absolute top-full mt-2 min-w-32 rounded-lg border  bg-background/95 backdrop-blur
           supports-backdrop-filter:bg-background/60 shadow-lg z-30 transition-[left] duration-500 ease-in-out"
            onMouseEnter={() => setHoveredItem(hoveredItem)}
            onMouseLeave={handleNavLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredItem}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-2"
              >
                {currentMenu.map((menuItem, index) => (
                  <motion.div
                    key={menuItem.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      href={menuItem.href}
                      className={cn(
                        "block px-4 py-2 rounded-md text-sm  tracking-wide",
                        "hover:bg-accent hover:text-accent-foreground transition-colors"
                      )}
                    >
                      {menuItem.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeToggle />
    </div>
  );
};
