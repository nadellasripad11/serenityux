'use client';

import Link from 'next/link';

import { MagneticButton } from '@/components';
import { about, socialMedias } from '@/data';
import { randomId } from '@/utils';

import { LocalTime } from '../local-time';
import { ListTitle } from './index.styled';

export function SocialInfo() {
  const medias = socialMedias.map(({ href, title }) => {
    const id = randomId();
    return (
      <li
        key={id}
        className='border-b border-solid border-b-transparent transition-all duration-300 ease-in-expo hover:border-b-border'
      >
        <Link href={href} target='_blank' rel='noopener' passHref>
          <MagneticButton>{title}</MagneticButton>
        </Link>
      </li>
    );
  });

  return (
    <div className='px-12 pb-4 pt-10'>
      <div className='flex flex-wrap items-stretch justify-between gap-5'>
        <div className='flex gap-8'>
          <div>
            <ListTitle>Based in</ListTitle>
            <p className='mt-7'>{about.location}</p>
          </div>
          <div>
            <ListTitle>Local time</ListTitle>
            <p className='mt-7'>
              <LocalTime timeZone={about.timeZone} />
            </p>
          </div>
        </div>

        <div className='flex flex-col'>
          <ListTitle>Socials</ListTitle>
          <ul className='flex gap-8'>{medias}</ul>
        </div>
      </div>

      <div className='mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-solid border-muted-foreground/30 pt-6 text-sm opacity-70'>
        <p>© {new Date().getFullYear()} Sripad Nadella</p>
        <div className='flex gap-6'>
          <Link
            href='/privacy'
            className='underline-offset-4 hover:underline'
          >
            Privacy
          </Link>
          <Link
            href='/terms'
            className='underline-offset-4 hover:underline'
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
