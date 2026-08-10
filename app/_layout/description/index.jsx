'use client';

import { MagneticButton, ParallaxFade, ParallaxReveal } from '@/components';

import { Title, Wrapper } from './index.styled';

const phrase =
  'Serenity UX designs calm, thoughtful digital experiences - products that feel as good as they look, from the first idea to the final detail.';

export function Description() {
  return (
    <article className='container relative'>
      <Wrapper>
        <div className='basis-full lg:basis-9/12'>
          <Title>
            <ParallaxReveal paragraph={phrase} />
          </Title>
        </div>

        <div className='basis-7/12 lg:basis-3/12'>
          <ParallaxFade>
            <p className='mt-2 text-balance text-base lg:text-lg'>
              We care about the details - the layout, the motion, and the small
              interactions that make an interface feel effortless.
            </p>
          </ParallaxFade>
        </div>

        {/* Launch the full SerenityOS desktop (Notes, Calculator, Timer, and
            the other apps). It's a self-contained static app under /os, so we
            use a plain anchor for a full-page load rather than the router. */}
        <div className='absolute right-0 top-3/4 lg:top-full lg:me-10'>
          <a href='/os/index.html#/OS'>
            <MagneticButton variant='ghost' size='xl'>
              Launch OS
            </MagneticButton>
          </a>
        </div>
      </Wrapper>
    </article>
  );
}
