'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { ParallaxSlider } from '@/components';

import { slideUp } from './variants';

export function Header() {
  const ref = useRef(null);

  /**
   * Track scroll relative to the hero itself. `start start` → `end start`
   * covers the moment you begin scrolling until the hero has fully left
   * the viewport, which is the range we want to animate over.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <motion.header
      ref={ref}
      className='relative h-screen overflow-hidden bg-secondary-foreground text-background'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <motion.div
        className='absolute inset-0'
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src='/images/hero-bg.svg'
          className='object-cover'
          fill={true}
          sizes='100vw'
          alt='Serenity UX'
          priority
        />
      </motion.div>

      <motion.div
        className='relative flex h-full flex-col justify-end gap-2 md:flex-col-reverse md:justify-normal'
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className='select-none'>
          <h1 className='text-[max(9em,15vw)]'>
            <ParallaxSlider repeat={4} baseVelocity={2}>
              <span className='pe-12'>
                Serenity UX
                <span className='spacer'>-</span>
              </span>
            </ParallaxSlider>
          </h1>
        </div>

        <div className='md:ml-auto'>
          <div className='mx-10 max-md:my-12 md:mx-36'>
            <div className='mb-4 md:mb-20'>
              <MoveDownRight size={28} strokeWidth={1.25} />
            </div>

            <h4 className='text-[clamp(1.55em,2.5vw,2.75em)]'>
              <span className='block'>Design &amp;</span>
              <span className='block'>Product Studio</span>
            </h4>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
