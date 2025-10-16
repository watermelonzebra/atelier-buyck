import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { writeFileSync } from 'fs'
import xmlFormat from 'xml-formatter'
import { client } from '../sanity'

interface SitemapEntry {
  url: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: number
  lastmod?: string
}

export async function generateSitemap() {
  // Fetch all posts from Sanity
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  // Base URLs that should always be in sitemap
  const staticPages: SitemapEntry[] = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/blog', changefreq: 'daily', priority: 0.9 },
    // Add more static routes as needed
  ]

  // Convert posts to sitemap entries
  const postEntries: SitemapEntry[] = posts.map((post: any) => ({
    url: `/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: post._updatedAt
  }))

  const allEntries = [...staticPages, ...postEntries]

  // Create sitemap
  const stream = new SitemapStream({ hostname: process.env.VITE_SITE_URL })
  const sitemap = await streamToPromise(Readable.from(allEntries).pipe(stream))

  // Format XML
  const formattedXml = xmlFormat(sitemap.toString(), {
    indentation: '  ',
    collapseContent: true
  })

  // Write to public directory
  writeFileSync('./public/sitemap.xml', formattedXml)
}