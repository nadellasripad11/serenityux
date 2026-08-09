import Link from 'next/link';

import { MagneticButton } from '@/components';
import { Navbar, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'not found',
  description: "the page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <Transition>
      <Navbar tone='dark' />
      <div className='flex h-screen flex-col items-center justify-center gap-6 px-6 text-center'>
        <p className='text-xs uppercase tracking-[0.2em] text-secondary-foreground'>
          404
        </p>
        <h1
          className='select-none leading-[0.95]'
          style={{ fontSize: 'clamp(2.5em, 9vw, 7em)' }}
        >
          Page not found
        </h1>
        <p className='max-w-md text-lg text-muted-foreground'>
          Whatever you were looking for isn&apos;t here. It might have moved,
          or never existed.
        </p>
        <Link href='/' passHref>
          <MagneticButton
            variant='outline'
            className='mt-2 px-8 py-6 text-base before:-top-1/2 hover:text-background'
          >
            Back home
          </MagneticButton>
        </Link>
      </div>
    </Transition>
  );
}
