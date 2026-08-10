'use client';

import { useLenis } from '@/hooks';

/**
 * Page wrapper. Enables Lenis smooth scrolling and keeps overflow hidden so
 * horizontal parallax never spills. The per-page greeting preloader was
 * removed to keep navigation instant.
 *
 * @param {import('react').PropsWithChildren<unknown>}
 */
export function Transition({ children }) {
  useLenis();

  return <div className='overflow-hidden'>{children}</div>;
}
