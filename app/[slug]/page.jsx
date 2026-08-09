import { notFound } from 'next/navigation';

import { pageMetadata } from '@/config';
import { getNextProject, getProject, projects } from '@/data';
import { Contact, Navbar, ProjectDetail, Transition } from '@/layout';

// Only the slugs below are valid routes; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

/** Lowercase, em-dash-free, and trimmed to a good social-preview length. */
function toMetaDescription(text) {
  const clean = text.toLowerCase().replace(/—/g, '-');
  if (clean.length <= 160) return clean;
  return clean.slice(0, 157).replace(/\s+\S*$/, '') + '...';
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return pageMetadata({
    title: (project.fullTitle ?? project.title).toLowerCase(),
    description: toMetaDescription(project.description),
    path: `/${project.slug}`,
  });
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <Transition>
      <Navbar tone='dark' />
      <ProjectDetail project={project} next={getNextProject(slug)} />
      <Contact />
    </Transition>
  );
}
