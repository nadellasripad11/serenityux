'use client';

import { useEffect } from 'react';

import Lenis from '@studio-freight/lenis';

/**
 * Heavy, weighted smooth scroll. `duration` stretches how long the wheel
 * impulse keeps carrying - higher = more inertia. The
 * easing is a long-tail cubic so momentum lingers instead of snapping.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
