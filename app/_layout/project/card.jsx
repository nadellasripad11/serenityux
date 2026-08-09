'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * One tile in the homepage featured-work grid. The frame fades up into
 * view on the first pass, then the image inside keeps parallaxing against
 * the scroll - the picture drifts slower than the tile, so as you scroll
 * past it looks like you're moving past a physical print.
 *
 * @param {Object} props
 * @param {import('@/data').Project} props.project
 * @param {number} props.index Position in the grid, used to stagger the
 * reveal so tiles don't all fade in at once.
 */
export function ProjectCard({ project, index }) {
  const { slug, title, category, image } = project;
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: (index % 2) * 0.12,
      }}
    >
      <Link href={`/${slug}`} className='group block' passHref>
        <div className='relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted transition-colors duration-300 group-hover:bg-secondary'>
          <motion.div
            className='absolute inset-6 md:inset-8'
            style={{ y: imageY }}
          >
            <Image
              src={image}
              fill={true}
              sizes='(min-width: 768px) 40vw, 90vw'
              className='object-contain transition-transform duration-500 ease-in-expo group-hover:scale-[1.03]'
              alt={`${title} preview`}
            />
          </motion.div>
        </div>

        <div className='mt-5 flex items-center justify-between'>
          <h3 className='text-xl transition-transform duration-300 ease-in-expo group-hover:translate-x-1 lg:text-2xl'>
            {title}
          </h3>
          <div className='flex items-center gap-2 text-sm text-secondary-foreground'>
            <span>{category}</span>
            <MoveUpRight
              size={16}
              className='transition-transform duration-300 ease-in-expo group-hover:-translate-y-1 group-hover:translate-x-1'
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
