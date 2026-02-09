import { defineConfig, defineCollection, s } from "velite";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});


const blogs = defineCollection({
  name: "Blogs",
  pattern: "blogs/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      category: s.string(),
      description: s.string().optional(),
      date: s.isodate(),
      status: s.enum(["published", "draft"]).default("draft"),
      image: s.string().optional(),
      tags: s.string().array().optional(),
      toc: s.toc(),
      content: s.mdx(),
    })
    .transform(computedFields),
});
const trips = defineCollection({
  name: "Trips",
  pattern: "trips/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      country: s.enum(["nepal", "tibet", "bhutan"]),
      category: s.string().optional(),
      region: s.string().optional(),
      rating: s.number().optional(),
      duration: s.string().optional(),
      description: s.string().optional(),
      status: s.enum(["published", "draft"]).default("draft"),
      image: s.string().optional(),
      tags: s.string().array().optional(),
      toc: s.toc(),
      price: s.number().optional(),
      content: s.mdx(),
    })
    .transform(computedFields),
});
const countryPages = defineCollection({
  name: "CountryPages",
  pattern: "trips/*.mdx", // content/trips/nepal.mdx, content/trips/tibet.mdx, etc.
  schema: s
    .object({
      slug: s.path(),
      country: s.enum(["nepal", "tibet", "bhutan"]),
      title: s.string(),
      description: s.string(),
      videoUrl: s.string().optional(),
      toc: s.toc(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

const company = defineCollection({
  name: "Company",
  pattern: "company/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      category: s.string(),
      description: s.string().optional(),
      status: s.enum(["published", "draft"]).default("draft"),
      tags: s.string().array().optional(),
      toc: s.toc(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { blogs, trips, company, countryPages },
  mdx: {
    rehypePlugins: [
      // rehypeSlug,
      //   [
      //     rehypePrettyCode,
      //     {
      //       theme: "vitesse-black",
      //     },
      //   ],
      // [
      //   rehypeAutoLinkHeadings,
      //   {
      //     behavior: ":wrap",
      //     properties: {
      //       className: ["subheading-anchor"],
      //       ariaLabel: "Link to section",
      //     },
      //   },
      // ],
    ],
    remarkPlugins: [],
  },
});
