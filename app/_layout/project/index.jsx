import { projects } from '@/data';

import { ProjectCard } from './card';

/**
 * Featured-work grid on the homepage: a centered 2x2 of the four flagship
 * projects, in the order they're defined in _data/projects.js - Socle and
 * Equity Intel on top, Where's My Context and Bio EOC Prep below.
 */
export function Project() {
  const featuredProjects = projects.filter(({ featured }) => featured);

  return (
    <section className='container relative z-10 py-20 md:py-28'>
      <div className='mx-auto grid max-w-4xl gap-x-10 gap-y-14 sm:grid-cols-2'>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
