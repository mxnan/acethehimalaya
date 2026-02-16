"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme-toggle";
import { Users, ShieldCheck, Phone, ChevronDown, Mountain, BookOpen, Building2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

/* =========================
   TYPES
========================= */

type CountryItem = {
  type: "country";
  label: string;
  href: string;
  image: string;
};

type FeaturedItem = {
  type: "featured";
  label: string;
  href: string;
  image: string;
};

type CompanyItem = {
  type: "company";
  label: string;
  href: string;
  icon: React.ReactNode;
};

type TripsMenu = (CountryItem | FeaturedItem)[];
type CompanyMenu = CompanyItem[];

type BlogsMenu = {
  featured: {
    label: string;
    href: string;
    image: string;
  };
  categories: {
    label: string;
    href: string;
  }[];
};

type NavItem =
  | {
    label: "Trips";
    href: string;
    menu: TripsMenu;
  }
  | {
    label: "Blogs";
    href: string;
    menu: BlogsMenu;
  }
  | {
    label: "Company";
    href: string;
    menu: CompanyMenu;
  };

const navIcons: Record<string, React.ReactNode> = {
  Trips: <Mountain size={16} />,
  Blogs: <BookOpen size={16} />,
  Company: <Building2 size={16} />,
};


/* =========================
   NAV ITEMS
========================= */

const navItems: NavItem[] = [
  {
    label: "Trips",
    href: "/trips",
    menu: [
      {
        type: "country",
        label: "Nepal",
        href: "/trips/nepal",
        image: "/assets/landing/country/nepal.jpg",
      },
      {
        type: "country",
        label: "Bhutan",
        href: "/trips/bhutan",
        image: "/assets/landing/country/bhutan.jpg",
      },
      {
        type: "country",
        label: "Tibet",
        href: "/trips/tibet",
        image: "/trips/tibet/lhasa-tour-from-kathmandu/cover.jpg",
      },
      {
        type: "featured",
        label: "Everest Base Camp Trek",
        href: "/trips/nepal/everest-base-camp-trek",
        image: "/trips/nepal/everest-base-camp-trek/cover.jpg",
      },
    ],
  },
  {
    label: "Blogs",
    href: "/blogs",
    menu: {
      featured: {
        label:
          "Everest Base Camp Trek Distance Guide: How Far You Walk Each Day",
        href: "/blogs/everest-base-camp-trek-distance-guide",
        image:
          "/blogs/ebc-trek/everest-base-camp-trek-distance-guide/0.webp",
      },
      categories: [
        {
          label: "EBC Trek Info Hub",
          href: `/blogs?category=${encodeURIComponent(
            "EBC Trek Info Hub"
          )}`,
        },
        {
          label: "ABC Trek",
          href: `/blogs?category=${encodeURIComponent(
            "ABC Trek"
          )}`,
        },
        {
          label: "Ask An Expert",
          href: `/blogs?category=${encodeURIComponent(
            "Ask An Expert"
          )}`,
        },
        {
          label: "General Travel",
          href: `/blogs?category=${encodeURIComponent(
            "General Travel"
          )}`,
        },
      ],
    },
  },
  {
    label: "Company",
    href: "/company",
    menu: [
      {
        type: "company",
        label: "Why ACE ?",
        href: "/company/why-ace",
        icon: <Users size={16} />,
      },
      {
        type: "company",
        label: "Mission Statement",
        href: "/company/mission-statement",
        icon: <ShieldCheck size={16} />,
      },
      {
        type: "company",
        label: "Meet our Founder",
        href: "/company/founder",
        icon: <Phone size={16} />,
      },
    ],
  },
];

/* =========================
   COMPONENT
========================= */

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

  const handleNavLeave = () => setHoveredItem(null);

  useEffect(() => {
    if (!hoveredItem) return;

    const itemElement = itemRefs.current[hoveredItem];
    if (!itemElement || !navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();

    setMenuPosition({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
    });
  }, [hoveredItem]);

  const currentItem = navItems.find(
    (item) => item.label === hoveredItem
  );

  return (
    <div
      ref={navRef}
      className="relative hidden md:flex items-center"
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
          <motion.div whileHover={{ y: -2 }}>
            <Link
              href={item.href}
              className={cn(
                "font-bold flex items-center gap-1 px-3 py-1 rounded-md",
                "hover:text-primary/70",
                hoveredItem === item.label && "border"
              )}
            >
              {navIcons[item.label]}
              <span>{item.label}</span>
              <motion.div
                animate={{
                  rotate:
                    hoveredItem === item.label ? 180 : 0,
                }}
              >
                <ChevronDown className="h-4 w-4 stroke-primary" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      ))}

      <AnimatePresence mode="wait">
        {hoveredItem && currentItem && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              left: menuPosition.left + menuPosition.width / 2 - 200,
              transform: "translateX(-100%)",
            }}
            className={cn(
              "absolute top-full mt-1 rounded-lg border bg-background/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-700 ease-in-out",
              hoveredItem === "Trips" && "w-[420px]",
              hoveredItem === "Blogs" && "w-[410px]",
              hoveredItem === "Company" && "w-[300px]"
            )}
          >
            {/* ================= TRIPS ================= */}
            {hoveredItem === "Trips" &&
              Array.isArray(currentItem.menu) && (
                <div className="p-4 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-2">
                    {currentItem.menu
                      .filter((i) => i.type === "country")
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-muted transition-all duration-200"
                        >
                          <img
                            src={item.image}
                            alt={item.label}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                  </div>

                  <Separator />

                  {currentItem.menu
                    .filter((i) => i.type === "featured")
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-4 p-2 rounded-lg border hover:shadow-lg transition-all duration-500"
                      >
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-24 h-20 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-xs uppercase text-muted-foreground">
                            Most Popular Trek
                          </p>
                          <span className="text-sm font-semibold">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              )}

            {/* ================= BLOGS ================= */}
            {hoveredItem === "Blogs" &&
              !Array.isArray(currentItem.menu) && (
                <div className="p-4 flex flex-col gap-4">
                  <Link
                    href={currentItem.menu.featured.href}
                    className="flex gap-4 border rounded-lg p-3 hover:shadow-lg transition-all duration-500"
                  >
                    <img
                      src={currentItem.menu.featured.image}
                      alt={currentItem.menu.featured.label}
                      className="w-28 h-24 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">
                        Latest Article
                      </p>
                      <span className="text-sm font-semibold">
                        {currentItem.menu.featured.label}
                      </span>
                    </div>
                  </Link>

                  <Separator />

                  <div className="grid grid-cols-2 gap-2">
                    {currentItem.menu.categories.map((cat) => (

                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="text-sm px-3 py-2 border rounded-md text-center bg-primary-foreground hover:bg-muted transition-all duration-300"
                      >
                        {cat.label}
                      </Link>

                    ))}
                  </div>
                </div>
              )}

            {/* ================= COMPANY ================= */}
            {hoveredItem === "Company" &&
              Array.isArray(currentItem.menu) && (
                <div className="p-3 flex flex-col gap-2">
                  {currentItem.menu
                    .filter((item): item is CompanyItem => item.type === "company")
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                      >
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeToggle />
    </div>
  );
};
