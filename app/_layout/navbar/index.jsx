'use client';

import { cn } from '@/utils';

import { NavbarBrand } from './brand';
import { NavbarList } from './list';

/**
 * @param {Object} props
 * @param {'light' | 'dark'} [props.tone] `light` for white text over the dark
 * hero, `dark` for pages with a light background.
 */
export function Navbar({ tone = 'light' }) {
  return (
    <nav className='absolute inset-x-0 top-0 z-10'>
      <div
        className={cn(
          'flex items-center justify-between px-8 py-4',
          tone === 'dark' ? 'text-foreground' : 'text-background',
        )}
      >
        <NavbarBrand />
        <NavbarList />
      </div>
    </nav>
  );
}
