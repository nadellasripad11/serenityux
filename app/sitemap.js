import { siteUrl } from '@/config';
import { projects } from '@/data';

export default function sitemap() {
  const staticRoutes = ['', '/work', '/about', '/contact', '/privacy', '/terms'].map(path => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map(({ slug }) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
