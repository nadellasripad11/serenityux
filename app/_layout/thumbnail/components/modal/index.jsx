'use client';

import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Center } from '@/components';

const MotionComponent = motion(Center);

export const ThumbnailModal = forwardRef(
  /**
   * @param {import('react').HTMLAttributes<HTMLElement> & { items: Array<{title: string, image: string}>; variants: import('framer-motion').Variants; active: boolean; index: number;}} props
   * @param {import('react').ForwardedRef<HTMLElement>} ref
   */
  function ThumbnailModal({ items, variants, active, index, ...props }, ref) {
    const previews = items.map(({ title, image }) => (
      <Center key={title} className='relative h-full w-full'>
        <Image
          src={image}
          fill={true}
          sizes='420px'
          className='object-contain'
          alt={`${title} preview`}
        />
      </Center>
    ));

    return (
      <MotionComponent
        ref={ref}
        className='pointer-events-none fixed left-1/2 top-1/2 h-64 w-[26rem] overflow-hidden rounded bg-secondary-foreground'
        variants={variants}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
        {...props}
      >
        <div
          className='relative h-full w-full'
          style={{
            top: `${index * -100}%`,
            transition: 'top 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          {previews}
        </div>
      </MotionComponent>
    );
  },
);
