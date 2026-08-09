'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { MagneticButton } from '@/components';
import { Navbar, Transition } from '@/layout';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Transition>
      <Navbar tone='dark' />
      <div className='flex h-screen flex-col items-center justify-center gap-6 px-6 text-center'>
        <p className='text-xs uppercase tracking-[0.2em] text-secondary-foreground'>
          Error
        </p>
        <h1
          className='select-none leading-[0.95]'
          style={{ fontSize: 'clamp(2.5em, 9vw, 7em)' }}
        >
          Something broke
        </h1>
        <p className='max-w-md text-lg text-muted-foreground'>
          That&apos;s on me, not you. Try again, or head back home.
        </p>
        <div className='mt-2 flex flex-wrap justify-center gap-4'>
          <MagneticButton
            type='button'
            onClick={reset}
            variant='primary'
            className='px-8 py-6 text-base'
          >
            Try again
          </MagneticButton>
          <Link href='/' passHref>
            <MagneticButton
              variant='outline'
              className='px-8 py-6 text-base before:-top-1/2 hover:text-background'
            >
              Back home
            </MagneticButton>
          </Link>
        </div>
      </div>
    </Transition>
  );
}
