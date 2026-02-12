export type SearchItem = {
  id: string;
  title: string;
  type: "trip" | "blog";
  slug: string;
  duration?: string; // Only for trips
  date?: string; // Only for blogs
};

export function buildSearchIndex(
  trips: any[],
  blogs: any[]
): SearchItem[] {
  const tripItems = trips.map((trip) => ({
    id: `trip-${trip.slug}`,
    title: trip.title,
    type: "trip" as const,
    slug: trip.slug,
    duration: trip.duration,
  }));

  const blogItems = blogs.map((blog) => ({
    id: `blog-${blog.slug}`,
    title: blog.title,
    type: "blog" as const,
    slug: blog.slug,
    date: blog.date,
  }));

  return [...tripItems, ...blogItems];
}
