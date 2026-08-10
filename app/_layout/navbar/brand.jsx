'use client';

import { Copyright } from 'lucide-react';
import Link from 'next/link';

export function NavbarBrand() {
  return (
    <Link href='/' className='group flex cursor-pointer pb-5' passHref>
      <div className='transition-transform duration-500 ease-in-expo group-hover:rotate-[360deg]'>
        <Copyright />
      </div>

      <div className='relative ms-2 flex overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-expo group-hover:pe-8'>
        <h5 className='transition-transform duration-500 ease-in-expo group-hover:-translate-x-full'>
          Built by
        </h5>
        <h5 className='ps-1 transition-transform duration-500 ease-in-expo group-hover:-translate-x-[3.5rem]'>
          Serenity
        </h5>
        <h5 className='absolute left-[6.5rem] ps-1 transition-transform duration-500 ease-in-expo group-hover:-translate-x-[3.5rem]'>
          UX
        </h5>
      </div>
    </Link>
  );
}
