import { siteUrl } from '@/config';

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ];
}
