'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/**
 * Full-width project-page hero. The frame starts slightly narrower and
 * expands to full container width as it enters the viewport, and the
 * image itself parallaxes inside the frame the whole way through.
 */
export function ProjectHero({ src, alt }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const frameScale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div ref={ref} className='container'>
      <motion.div
        style={{ scale: frameScale }}
        className='relative aspect-[16/9] w-full overflow-hidden rounded bg-foreground'
      >
        <motion.div
          className='absolute inset-0'
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src={src}
            alt={alt}
            fill={true}
            sizes='100vw'
            className='object-contain'
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
