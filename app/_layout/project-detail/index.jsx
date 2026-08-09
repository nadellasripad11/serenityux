import Link from 'next/link';

import { Center, MagneticButton, ParallaxFade, ParallaxReveal } from '@/components';
import { ProjectHero } from './hero';

const labelClass =
  'text-xs uppercase tracking-[0.2em] text-secondary-foreground';

/**
 * @param {Object} props
 * @param {import('@/data').Project} props.project
 * @param {import('@/data').Project} props.next
 */
export function ProjectDetail({ project, next }) {
  const {
    title,
    fullTitle,
    category,
    type,
    tagline,
    image,
    liveUrl,
    status,
    description,
    achievements,
    skills,
  } = project;

  return (
    <main>
      <header className='container pb-16 pt-44'>
        <p className={labelClass}>{category}</p>
        <h1
          className='mt-8 leading-[0.95]'
          style={{ fontSize: 'clamp(2.75em, 9vw, 8.5em)' }}
        >
          {fullTitle ?? title}
        </h1>
        <ParallaxFade>
          <p className='mt-8 max-w-2xl text-xl lg:text-2xl'>{tagline}</p>
        </ParallaxFade>
      </header>

      <ProjectHero src={image} alt={`${title} preview`} />

      <section className='container py-20'>
        <dl className='grid gap-12 border-t border-solid pt-12 md:grid-cols-3'>
          <div>
            <dt className={labelClass}>Type</dt>
            <dd className='mt-5 text-lg'>{type}</dd>
          </div>
          <div>
            <dt className={labelClass}>Skills</dt>
            <dd className='mt-5 text-lg'>{skills.join(', ')}</dd>
          </div>
          <div>
            <dt className={labelClass}>Status</dt>
            <dd className='mt-5 text-lg'>
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline underline-offset-4'
                >
                  {new URL(liveUrl).host}
                </a>
              ) : (
                (status ?? 'In development')
              )}
            </dd>
          </div>
        </dl>
      </section>

      <section className='container pb-24'>
        <h2 className={labelClass}>Overview</h2>
        <p
          className='mt-10 leading-[1.15]'
          style={{ fontSize: 'clamp(1.5em, 3.4vw, 3em)' }}
        >
          <ParallaxReveal paragraph={description} />
        </p>
      </section>

      <section className='container pb-24'>
        <h2 className={labelClass}>Highlights</h2>
        <ul className='mt-10'>
          {achievements.map((achievement, index) => (
            <li
              key={achievement}
              className='flex gap-8 border-t border-solid py-8 last-of-type:border-b'
            >
              <span className='pt-2 text-sm text-secondary-foreground'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className='text-xl lg:text-2xl'>{achievement}</p>
            </li>
          ))}
        </ul>
      </section>

      {liveUrl ? (
        <Center className='pb-28'>
          <a href={liveUrl} target='_blank' rel='noopener noreferrer'>
            <MagneticButton
              variant='outline'
              className='px-10 py-8 text-base before:-top-1/2 hover:text-background'
            >
              Visit {title}
            </MagneticButton>
          </a>
        </Center>
      ) : null}

      <section className='border-t border-solid'>
        <Link href={`/${next.slug}`} className='group block' passHref>
          <div className='container py-24'>
            <p className={labelClass}>Next project</p>
            <h3
              className='mt-6 transition-transform duration-500 ease-in-expo group-hover:translate-x-4'
              style={{ fontSize: 'clamp(2.25em, 7vw, 6em)' }}
            >
              {next.title}
            </h3>
          </div>
        </Link>
      </section>
    </main>
  );
}
