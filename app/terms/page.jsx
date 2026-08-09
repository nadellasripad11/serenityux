import Link from 'next/link';

import { ParallaxFade } from '@/components';
import { pageMetadata } from '@/config';
import { Navbar, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = pageMetadata({
  title: 'terms',
  description:
    "terms of use for sripad nadella's portfolio site. what you can do with it, what you can't, and what's not guaranteed.",
  path: '/terms',
});

const EMAIL = 'nadellasripad11@gmail.com';

const labelClass =
  'text-xs uppercase tracking-[0.2em] text-secondary-foreground';

const LAST_UPDATED = 'August 8, 2026';

const sections = [
  {
    title: 'What this site is',
    body: (
      <p>
        This is my personal portfolio. It shows projects I have built and a
        bit about who I am. Using the site means you agree to these terms. If
        you do not agree, please do not use the site.
      </p>
    ),
  },
  {
    title: 'Ownership',
    body: (
      <>
        <p>
          The code, design, writing, images, animations, and layout of this
          site are mine. They are not open source and are not available for
          reuse, copying, or redistribution.
        </p>
        <p className='mt-4'>
          You are welcome to view the site, share links to it, and take
          inspiration from the general idea of &quot;a personal portfolio&quot;
          - but do not clone, fork, screenshot as your own work, republish, or
          repurpose any part of it. If you want a site like this, build your
          own.
        </p>
      </>
    ),
  },
  {
    title: 'No warranty',
    body: (
      <p>
        This site is provided as-is, without warranty of any kind. The
        content, including project descriptions and any statistics mentioned,
        reflects what I know at the time of writing and may become outdated.
        Nothing on this site is professional, legal, financial, or investment
        advice.
      </p>
    ),
  },
  {
    title: 'External links',
    body: (
      <p>
        The site links to external services and profiles (GitHub, LinkedIn,
        Instagram, project demos, and so on). I am not responsible for the
        content, availability, or policies of any site I link to. Clicking a
        link is your decision.
      </p>
    ),
  },
  {
    title: 'Contact form use',
    body: (
      <>
        <p>
          The contact form on <Link href='/contact' className='underline underline-offset-4'>/contact</Link>{' '}
          is provided for people who want to reach out honestly. Please do
          not use it to send spam, phishing attempts, threats, or automated
          submissions.
        </p>
        <p className='mt-4'>
          Submissions are rate-limited (three per day per browser and per
          email). I reserve the right to ignore, delete, or block any
          submission that violates these terms.
        </p>
      </>
    ),
  },
  {
    title: 'Changes to these terms',
    body: (
      <p>
        If these terms ever change, the &quot;last updated&quot; date at the
        bottom will change with them. Since this is a personal site, material
        changes are unlikely.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <Transition>
      <Navbar tone='dark' />

      <main>
        <header className='container pb-20 pt-44'>
          <p className={labelClass}>Terms of use</p>
          <h1
            className='mt-8 leading-[0.95]'
            style={{ fontSize: 'clamp(2.75em, 9vw, 8.5em)' }}
          >
            Short,
            <br />
            plain terms.
          </h1>
          <ParallaxFade>
            <p className='mt-8 max-w-2xl text-xl lg:text-2xl'>
              The basic rules for using this site. Nothing sneaky.
            </p>
          </ParallaxFade>
        </header>

        <section className='container pb-24'>
          <ul>
            {sections.map(({ title, body }, index) => (
              <li
                key={title}
                className='grid gap-6 border-t border-solid py-12 last-of-type:border-b md:grid-cols-[3rem_1fr_2fr]'
              >
                <span className='pt-3 text-sm text-secondary-foreground'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className='text-2xl lg:text-3xl'>{title}</h2>
                <div className='space-y-4 text-base leading-relaxed text-muted-foreground lg:text-lg'>
                  {body}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className='container pb-28'>
          <div className='grid gap-6 border-t border-solid pt-12 md:grid-cols-[1fr_2fr]'>
            <div>
              <p className={labelClass}>Questions</p>
              <p className='mt-5 text-lg'>
                Email{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className='underline underline-offset-4'
                >
                  {EMAIL}
                </a>
                .
              </p>
            </div>
            <div>
              <p className={labelClass}>Last updated</p>
              <p className='mt-5 text-lg'>{LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        <section className='border-t border-solid'>
          <div className='container flex flex-wrap items-center justify-between gap-6 py-10 text-sm text-secondary-foreground'>
            <p>© {new Date().getFullYear()} Sripad Nadella</p>
            <div className='flex gap-6'>
              <Link
                href='/privacy'
                className='underline-offset-4 hover:underline'
              >
                Privacy
              </Link>
              <Link href='/' className='underline-offset-4 hover:underline'>
                Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Transition>
  );
}
