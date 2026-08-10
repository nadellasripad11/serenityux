'use client';

import { ParallaxFade, ParallaxReveal } from '@/components';

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
      </Wrapper>
    </article>
  );
}
