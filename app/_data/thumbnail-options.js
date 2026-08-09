import { projects } from './projects';

/** The featured projects shown in the homepage "Recent work" list. */
export const thumbnailOptions = projects
  .filter(({ featured }) => featured)
  .map(({ slug, title, category, image }) => ({
    href: `/${slug}`,
    title,
    category,
    image,
  }));
