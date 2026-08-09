'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { MagneticButton, ParallaxFade, ParallaxReveal } from '@/components';

import { Title, Wrapper } from './index.styled';

const phrase =
  'Building things that solve real problems. From AI-powered tools to discovery platforms, I like turning ideas into projects people actually use.';

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
              I like figuring out how things work by building them - from the
              code to the design to the small details that make something feel
              real.
            </p>
          </ParallaxFade>
        </div>

        <motion.div
          whileInView={{ y: '-15%' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className='absolute right-0 top-3/4 lg:top-full lg:me-10'>
            <Link href='/about' passHref>
              <MagneticButton variant='ghost' size='xl'>
                About me
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      </Wrapper>
    </article>
  );
}
