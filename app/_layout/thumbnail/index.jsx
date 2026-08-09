'use client';

import { useRef } from 'react';

import { projects, thumbnailOptions } from '@/data';
import { useFollowPointer } from '@/hooks';

import {
  ThumbnailAction,
  ThumbnailCursorCircle,
  ThumbnailCursorLabel,
  ThumbnailLabel,
  ThumbnailList,
  ThumbnailModal,
} from './components';
import { scaleUp } from './variants';

/**
 * @param {Object} props
 * @param {Array<{href: string, title: string, category: string, image: string}>} [props.items]
 * @param {string} [props.label]
 * @param {boolean} [props.showAction] Render the "More work" button below the list.
 */
export function Thumbnail({
  items = thumbnailOptions,
  label = 'Recent projects',
  showAction = true,
}) {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const modal = useRef(null);
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const cursor = useRef(null);
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const labelRef = useRef(null);

  const {
    item: { active, index },
    handlePointerEnter,
    handlePointerLeave,
    moveItems,
  } = useFollowPointer({
    modal,
    cursor,
    label: labelRef,
  });

  return (
    <section
      className='container relative'
      onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
    >
      <div className='my-8 flex flex-col gap-10'>
        <ThumbnailLabel>{label}</ThumbnailLabel>
        <ThumbnailList
          items={items}
          handlePointerEnter={handlePointerEnter}
          handlePointerLeave={handlePointerLeave}
          moveItems={moveItems}
        />
        <ThumbnailModal
          ref={modal}
          items={items}
          variants={scaleUp}
          active={active}
          index={index}
        />
        <ThumbnailCursorCircle
          ref={cursor}
          variants={scaleUp}
          active={active}
        />
        <ThumbnailCursorLabel ref={labelRef} variants={scaleUp} active={active}>
          View
        </ThumbnailCursorLabel>
        {showAction ? (
          <ThumbnailAction>
            More projects
            <sup className='text-muted-foreground'>{projects.length}</sup>
          </ThumbnailAction>
        ) : null}
      </div>
    </section>
  );
}
