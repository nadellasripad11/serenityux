import Link from 'next/link';

import { ParallaxFade } from '@/components';
import { pageMetadata } from '@/config';
import { Navbar, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = pageMetadata({
  title: 'privacy',
  description:
    "how sripad nadella's portfolio site handles your data. what it collects, what it doesn't, and who it shares with.",
  path: '/privacy',
});

const EMAIL = 'nadellasripad11@gmail.com';

const labelClass =
  'text-xs uppercase tracking-[0.2em] text-secondary-foreground';

const LAST_UPDATED = 'August 8, 2026';

const sections = [
  {
    title: 'What this site collects',
    body: (
      <>
        <p>
          The only place this site collects any information from you is the
          contact form on <Link href='/contact' className='underline underline-offset-4'>/contact</Link>.
          When you submit it, the following is sent to my inbox:
        </p>
        <ul className='mt-4 list-inside list-disc space-y-2'>
          <li>The name you typed</li>
          <li>The email address you typed</li>
          <li>The type of message you picked (Internship, Collaboration, etc.)</li>
          <li>The message body</li>
        </ul>
        <p className='mt-4'>
          The rest of the site is fully static. Browsing the homepage, project
          pages, or the about page does not collect any personal information
          from you.
        </p>
      </>
    ),
  },
  {
    title: 'What this site does not collect',
    body: (
      <>
        <p>To be specific about what is not happening here:</p>
        <ul className='mt-4 list-inside list-disc space-y-2'>
          <li>No analytics, no page-view tracking, no session recording</li>
          <li>No advertising or marketing cookies</li>
          <li>No third-party tracking pixels</li>
          <li>No fingerprinting</li>
          <li>No newsletters or mailing lists</li>
          <li>No account system, no login, no passwords</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Cookies and browser storage',
    body: (
      <>
        <p>
          This site does not set any HTTP cookies. The only browser storage it
          uses is <code>localStorage</code> on the contact page, which stores a
          list of timestamps for messages you have submitted from your browser.
          That list is used to enforce the daily submission limit
          (three messages per 24 hours) so the form cannot be spammed.
        </p>
        <p className='mt-4'>
          You can clear it at any time by clearing your browser storage for
          this site. The values are never sent anywhere and never leave your
          device.
        </p>
      </>
    ),
  },
  {
    title: 'Third parties',
    body: (
      <>
        <p>
          Contact form submissions are transmitted through a small serverless
          function on this site to{' '}
          <a
            href='https://resend.com'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4'
          >
            Resend
          </a>
          , which delivers the message to my email inbox. Resend acts purely
          as an email transport, similar to any other email service.
        </p>
        <p className='mt-4'>
          The site itself is hosted on{' '}
          <a
            href='https://vercel.com'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4'
          >
            Vercel
          </a>
          . Vercel receives standard HTTP request metadata (IP address, user
          agent, request path) that any web host receives, which it uses for
          delivering the site and for platform-level security.
        </p>
        <p className='mt-4'>
          Google Search Console has been configured on the site domain for
          search indexing. It reports aggregate search performance to me and
          does not track individual visitors.
        </p>
      </>
    ),
  },
  {
    title: 'Rate limiting and IP addresses',
    body: (
      <>
        <p>
          When you submit the contact form, the server-side function briefly
          holds your IP address and the email address you typed in memory to
          enforce the daily submission limit. These values are stored in
          memory only, are not written to any database, and are automatically
          discarded once the 24-hour window ends.
        </p>
      </>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <>
        <p>
          If you have sent me a message and want the copy in my inbox deleted,
          email me at{' '}
          <a
            href={`mailto:${EMAIL}`}
            className='underline underline-offset-4'
          >
            {EMAIL}
          </a>{' '}
          and I will delete it. Depending on where you live, you may have
          additional rights under laws like GDPR or CCPA. If so, email me and
          I will honor them.
        </p>
      </>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <>
        <p>
          If this policy ever changes, the &quot;last updated&quot; date at
          the bottom will change with it. This is a personal portfolio, so
          material changes are unlikely.
        </p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <Transition>
      <Navbar tone='dark' />

      <main>
        <header className='container pb-20 pt-44'>
          <p className={labelClass}>Privacy policy</p>
          <h1
            className='mt-8 leading-[0.95]'
            style={{ fontSize: 'clamp(2.75em, 9vw, 8.5em)' }}
          >
            What I collect,
            <br />
            and what I don&apos;t.
          </h1>
          <ParallaxFade>
            <p className='mt-8 max-w-2xl text-xl lg:text-2xl'>
              Plain English. No dark patterns. This is a personal portfolio,
              not a data business.
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
                href='/terms'
                className='underline-offset-4 hover:underline'
              >
                Terms
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
