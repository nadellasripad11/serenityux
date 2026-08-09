import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { MagneticButton, ParallaxFade, ParallaxReveal } from '@/components';
import { pageMetadata } from '@/config';
import { about, socialMedias } from '@/data';
import { Navbar, Transition } from '@/layout';
import { LocalTime } from '../_layout/contact/components/local-time';
import { ContactForm } from './form';

/** @type {import('next').Metadata} */
export const metadata = pageMetadata({
  title: 'contact',
  description:
    'get in touch with sripad nadella. open to unpaid internships, student collaborations, and coffee chats.',
  path: '/contact',
});

const EMAIL = 'nadellasripad11@gmail.com';

const labelClass =
  'text-xs uppercase tracking-[0.2em] text-secondary-foreground';

const openTo = [
  {
    title: 'Unpaid internships',
    description:
      'Learning-focused, especially around product, engineering, or research. Most interested in AI, consumer apps, and anything that ships.',
  },
  {
    title: 'Collaborations',
    description:
      'Fellow student builders, hackathon teams, and anyone working on a problem worth solving. Reach out.',
  },
  {
    title: 'Coffee chats',
    description:
      'Always down to talk about AI, product, building things in school, or whatever you’re working on.',
  },
];

export default function Contact() {
  return (
    <Transition>
      <Navbar tone='dark' />

      <main>
        <header className='container flex flex-col items-center pb-24 pt-44 text-center'>
          <p className={labelClass}>Contact · {about.location}</p>
          <h1
            className='mt-8 leading-[0.95]'
            style={{ fontSize: 'clamp(2.75em, 9vw, 8.5em)' }}
          >
            Let&apos;s build
            <br />
            something.
          </h1>
          <ParallaxFade>
            <p className='mx-auto mt-8 max-w-2xl text-xl lg:text-2xl'>
              Have a project, an idea, or just want to say hi? The fastest way
              to reach me is email. I usually reply within a day.
            </p>
          </ParallaxFade>
        </header>

        <section className='container pb-28'>
          <div className='grid gap-16 lg:grid-cols-[1fr_2fr]'>
            <div>
              <p className={labelClass}>Send a message</p>
              <h2
                className='mt-6 leading-[1.05]'
                style={{ fontSize: 'clamp(1.75em, 3.4vw, 3em)' }}
              >
                Fill this out and I&apos;ll get back to you.
              </h2>
              <p className='mt-6 text-base text-muted-foreground'>
                Or just email{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className='underline underline-offset-4'
                >
                  {EMAIL}
                </a>{' '}
                directly.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>

        <section className='container pb-28'>
          <p
            className='leading-[1.15]'
            style={{ fontSize: 'clamp(1.5em, 3.4vw, 3em)' }}
          >
            <ParallaxReveal paragraph='If you are working on something interesting or you think I could help, send a message. Short and specific beats polished and vague.' />
          </p>
        </section>

        <section className='container pb-28'>
          <h2 className={labelClass}>What I&apos;m open to</h2>
          <ul className='mt-10'>
            {openTo.map(({ title, description }, index) => (
              <li
                key={title}
                className='grid gap-6 border-t border-solid py-10 last-of-type:border-b md:grid-cols-[3rem_1fr_2fr]'
              >
                <span className='pt-2 text-sm text-secondary-foreground'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className='text-2xl lg:text-3xl'>{title}</h3>
                <p className='text-lg text-muted-foreground'>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className='container pb-28'>
          <div className='grid gap-12 border-t border-solid pt-12 md:grid-cols-3'>
            <div>
              <h2 className={labelClass}>Based in</h2>
              <p className='mt-5 text-lg'>{about.location}</p>
            </div>
            <div>
              <h2 className={labelClass}>Local time</h2>
              <p className='mt-5 text-lg'>
                <LocalTime timeZone={about.timeZone} />
              </p>
            </div>
            <div>
              <h2 className={labelClass}>Response time</h2>
              <p className='mt-5 text-lg'>Usually within 24 hours.</p>
            </div>
          </div>
        </section>

        <section className='container pb-28'>
          <div className='grid gap-12 border-t border-solid pt-12 md:grid-cols-2'>
            <div>
              <h2 className={labelClass}>Or reach out on</h2>
              <ul className='mt-8 flex flex-col gap-4'>
                {socialMedias.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group flex items-baseline justify-between gap-6 border-b border-solid pb-4 pt-3'
                    >
                      <span className='text-2xl transition-transform duration-300 ease-in-expo group-hover:translate-x-2 lg:text-3xl'>
                        {title}
                      </span>
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className='text-secondary-foreground transition-transform duration-300 ease-in-expo group-hover:-translate-y-1 group-hover:translate-x-1'
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={labelClass}>Prefer to browse first?</h2>
              <p className='mt-5 max-w-md text-lg'>
                Skim the projects or read about how I got here. When you have
                something to say, the inbox is open.
              </p>
              <div className='mt-8 flex flex-wrap gap-4'>
                <Link href='/work' passHref>
                  <MagneticButton
                    variant='outline'
                    className='px-8 py-6 text-base before:-top-1/2 hover:text-background'
                  >
                    View projects
                  </MagneticButton>
                </Link>
                <Link href='/about' passHref>
                  <MagneticButton
                    variant='outline'
                    className='px-8 py-6 text-base before:-top-1/2 hover:text-background'
                  >
                    About me
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='border-t border-solid'>
          <div className='container flex flex-wrap items-center justify-between gap-6 py-10 text-sm text-secondary-foreground'>
            <p>© {new Date().getFullYear()} Sripad Nadella</p>
            <div className='flex flex-wrap gap-6'>
              <Link
                href='/privacy'
                className='underline-offset-4 hover:underline'
              >
                Privacy
              </Link>
              <Link
                href='/terms'
                className='underline-offset-4 hover:underline'
              >
                Terms
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Transition>
  );
}
