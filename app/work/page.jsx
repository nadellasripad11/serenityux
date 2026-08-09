import { ParallaxFade } from '@/components';
import { pageMetadata } from '@/config';
import { projects } from '@/data';
import { Contact, Navbar, Thumbnail, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = pageMetadata({
  title: 'projects',
  description:
    'personal projects built by sripad nadella while in high school - from ai experiments and finance data to consumer apps and education tools.',
  path: '/work',
});

export default function Work() {
  const items = projects.map(({ slug, title, category, image }) => ({
    href: `/${slug}`,
    title,
    category,
    image,
  }));

  return (
    <Transition>
      <Navbar tone='dark' />

      <main>
        <header className='container pb-20 pt-44'>
          <h1
            className='leading-[0.95]'
            style={{ fontSize: 'clamp(3.5em, 11vw, 10em)' }}
          >
            Projects
          </h1>
          <ParallaxFade>
            <p className='mt-8 max-w-2xl text-lg lg:text-xl'>
              {projects.length} personal projects across AI experiments,
              finance data, education tools, and consumer apps - each one
              built end to end.
            </p>
          </ParallaxFade>
        </header>

        <Thumbnail items={items} label='All projects' showAction={false} />
      </main>

      <Contact />
    </Transition>
  );
}
