'use client';

import { useScroll, useTransform } from 'framer-motion';

/** @param {import('react').MutableRefObject<HTMLElement>} element */
export function useContactSlider(element) {
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start end', 'end start'],
  });

  // The footer is the last thing on the page, so scroll can never carry its
  // bottom past the top of the viewport. This progress finishes once the
  // footer is fully in view, which is the furthest the page can actually go.
  const { scrollYProgress: revealProgress } = useScroll({
    target: element,
    offset: ['start end', 'end end'],
  });

  const transformX = useTransform(revealProgress, [0, 1], ['0%', '100%']);
  const transformY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return { transformX, transformY };
}
