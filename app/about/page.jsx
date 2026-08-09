import Image from 'next/image';
import Link from 'next/link';

import { MagneticButton, ParallaxFade, ParallaxReveal } from '@/components';
import { pageMetadata } from '@/config';
import { about, getProject, socialMedias } from '@/data';
import { Contact, Navbar, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = pageMetadata({
  title: 'about',
  description:
    'sripad nadella - high school student based in alpharetta, georgia, building personal projects like socle and helping run sfe foundry.',
  path: '/about',
});

const labelClass =
  'text-xs uppercase tracking-[0.2em] text-secondary-foreground';

export default function About() {
  const {
    portrait,
    location,
    statement,
    intro,
    currentlyBuilding,
    builtSlugs,
    currentlyLearning,
    outsideOfCoding,
  } = about;

  // Resolve the built-list slugs against the real project data so titles and
  // links can never drift out of sync when a project is renamed.
  const built = builtSlugs
    .map(slug => getProject(slug))
    .filter(project => project !== undefined);

  return (
    <Transition>
      <Navbar tone='dark' />

      <main>
        <header className='container pb-20 pt-44'>
          <p className={labelClass}>About · {location}</p>
          <h1
            className='mt-8 leading-[0.95]'
            style={{ fontSize: 'clamp(2.75em, 9vw, 8.5em)' }}
          >
            Sripad Nadella
          </h1>
          <ParallaxFade>
            <p className='mt-8 max-w-2xl text-xl lg:text-2xl'>
              High School Student &amp; Builder
            </p>
          </ParallaxFade>
        </header>

        <section className='container'>
          <div className='grid gap-16 lg:grid-cols-2 lg:gap-20'>
            <div className='relative aspect-[4/5] w-full overflow-hidden rounded'>
              <Image
                src={portrait}
                alt='Sripad Nadella'
                fill={true}
                sizes='(min-width: 1024px) 50vw, 100vw'
                className='object-cover'
                priority
              />
            </div>

            <div className='flex max-w-xl flex-col justify-center gap-6'>
              {intro.map(paragraph => (
                <ParallaxFade key={paragraph}>
                  <p className='text-lg lg:text-xl'>{paragraph}</p>
                </ParallaxFade>
              ))}
            </div>
          </div>
        </section>

        <section className='container py-28'>
          <p
            className='leading-[1.15]'
            style={{ fontSize: 'clamp(1.5em, 3.4vw, 3em)' }}
          >
            <ParallaxReveal paragraph={statement} />
          </p>
        </section>

        <section className='container pb-28'>
          <h2 className={labelClass}>What I&apos;m up to</h2>
          <ul className='mt-10'>
            {currentlyBuilding.map(({ title, href, description }, index) => (
              <li
                key={title}
                className='grid gap-6 border-t border-solid py-10 last-of-type:border-b md:grid-cols-[3rem_1fr_2fr]'
              >
                <span className='pt-2 text-sm text-secondary-foreground'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className='text-2xl lg:text-3xl'>
                  {href ? (
                    <Link
                      href={href}
                      className='underline-offset-8 hover:underline'
                      passHref
                    >
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </h3>
                <p className='text-lg text-muted-foreground'>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className='container pb-28'>
          <div className='grid gap-16 lg:grid-cols-2'>
            <div>
              <h2 className={labelClass}>Things I&apos;ve built</h2>
              <ul className='mt-8 flex flex-col gap-4'>
                {built.map(({ slug, title, category }) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className='group flex items-baseline justify-between gap-6 border-b border-solid pb-4 pt-3 transition-colors hover:text-foreground'
                      passHref
                    >
                      <span className='text-2xl transition-transform duration-300 ease-in-expo group-hover:translate-x-2 lg:text-3xl'>
                        {title}
                      </span>
                      <span className='text-sm text-secondary-foreground'>
                        {category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={labelClass}>Currently learning</h2>
              <ul className='mt-8 flex flex-col gap-4'>
                {currentlyLearning.map(item => (
                  <li
                    key={item}
                    className='border-b border-solid pb-4 pt-3 text-2xl lg:text-3xl'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className='container pb-28'>
          <div className='grid gap-6 border-t border-solid pt-12 md:grid-cols-[1fr_3fr]'>
            <h2 className={labelClass}>Outside of coding</h2>
            <p className='max-w-2xl text-xl lg:text-2xl'>{outsideOfCoding}</p>
          </div>
        </section>

        <section className='container pb-28'>
          <div className='grid gap-12 border-t border-solid pt-12 md:grid-cols-2'>
            <div>
              <h2 className={labelClass}>Selected projects</h2>
              <p className='mt-5 max-w-md text-lg'>
                Everything I&apos;ve been making, from small apps to AI
                experiments. Click through for the story behind each one.
              </p>
              <div className='mt-8'>
                <Link href='/work' passHref>
                  <MagneticButton
                    variant='outline'
                    className='px-10 py-8 text-base before:-top-1/2 hover:text-background'
                  >
                    View all projects
                  </MagneticButton>
                </Link>
              </div>
            </div>

            <div>
              <h2 className={labelClass}>Elsewhere</h2>
              <ul className='mt-5 flex flex-col gap-3'>
                {socialMedias.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-lg underline underline-offset-4'
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Contact />
    </Transition>
  );
}
