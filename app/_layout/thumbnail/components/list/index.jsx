'use client';

import Link from 'next/link';

/**
 * @param {Object} props
 * @param {Array<{href: string, title: string, category: string}>} props.items
 * @param {(index: number) => void} props.handlePointerEnter
 * @param {(index: number) => void} props.handlePointerLeave
 * @param {(x: number, y: number) => void} props.moveItems
 */
export function ThumbnailList({
  items,
  handlePointerEnter,
  handlePointerLeave,
  moveItems,
}) {
  const rows = items.map(({ href, title, category }, index) => {
    const id = index;
    return (
      <li
        key={`thumbnail-list-${id}`}
        className='border-t border-solid transition-all last-of-type:border-b group-hover:opacity-90'
        style={{
          paddingInline: 'calc(clamp(1em,3vw,4em) * 2)',
          paddingBlock: 'clamp(1em,3vw,4em)',
        }}
        onPointerEnter={({ clientX, clientY }) => {
          handlePointerEnter(id);
          moveItems(clientX, clientY);
        }}
        onPointerLeave={({ clientX, clientY }) => {
          handlePointerLeave(id);
          moveItems(clientX, clientY);
        }}
      >
        <Link
          href={href}
          className='flex items-center justify-between max-lg:flex-wrap'
          passHref
        >
          <h4
            style={{
              fontSize: 'calc(clamp(3.25em, 7vw, 8em) * 0.75)',
            }}
          >
            {title}
          </h4>
          <p className='text-lg font-medium'>{category}</p>
        </Link>
      </li>
    );
  });

  return <ul className='group'>{rows}</ul>;
}
