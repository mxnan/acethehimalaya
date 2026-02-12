import { MetadataRoute } from 'next'
import { blogs, trips } from '#site/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acethehimalaya.vercel.app'

  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter(blog => blog.status === 'published')
    .map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slugAsParams}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const tripEntries: MetadataRoute.Sitemap = trips
    .filter(trip => trip.status === 'published')
    .map((trip) => ({
      url: `${baseUrl}/trips/${trip.slugAsParams}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogEntries,
    ...tripEntries,
  ]
}