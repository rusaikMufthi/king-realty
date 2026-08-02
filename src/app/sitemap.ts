import { MetadataRoute } from 'next';
import { INITIAL_PROPERTIES, INITIAL_BLOG_POSTS } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kingrealty.lk';

  const propertyUrls = INITIAL_PROPERTIES.map((p) => ({
    url: `${baseUrl}/properties/${p.id}`,
    lastModified: new Date(p.updatedAt)
  }));

  const blogUrls = INITIAL_BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt)
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/properties`, lastModified: new Date() },
    { url: `${baseUrl}/agent`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...propertyUrls,
    ...blogUrls
  ];
}
