"use client";
import * as React from "react";
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { SearchItem } from "@/lib/search-index";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

type Props = {
  items: SearchItem[];
};

export default function SearchBar({ items }: Props) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const trips = items.filter((i) => i.type === "trip");
  const blogs = items.filter((i) => i.type === "blog");
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // console.log("SearchBar items:", items);

  return (
    <>
      {/* INPUT TRIGGER (Hero visible) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key.length === 1) setOpen(true);
        }}
        className="flex h-14 w-full max-w-xl mx-auto cursor-text items-center gap-3 rounded-xl bg-muted px-4 text-sm text-muted-foreground shadow-lg transition hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <Search className="size-5 stroke-2" />
        <span className="font-bold text-xs md:text-sm">Search trips or blogs</span>
        <CommandShortcut className="font-bold text-xs md:text-sm">⌘ + K</CommandShortcut>
      </div>

      {/* SEARCH DIALOG */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search trips or blogs..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {trips.length > 0 && (
              <CommandGroup heading="Trips">
                {trips.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/${item.slug}`);
                    }}
                  >
                    {item.title}
                    {item.duration && (
                      <CommandShortcut className="ml-auto truncate">
                        {item.duration}
                      </CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {blogs.length > 0 && (
              <CommandGroup heading="Blogs">
                {blogs.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/${item.slug}`);
                    }}
                  >
                    {item.title}
                    {item.date && (
                      <CommandShortcut className="w-min truncate">
                        {formatDate(item.date)}
                      </CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>

    </>
  );
}
