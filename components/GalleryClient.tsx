'use client';
import { useCallback, useEffect, useState } from 'react';
import type { ChurchPhoto } from '@/lib/church-images';

interface GalleryClientProps {
  photos: ChurchPhoto[];
  labels: { close: string; prev: string; next: string; photoAlt: string };
}

export default function GalleryClient({ photos, labels }: GalleryClientProps) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen(i => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl shadow-warm break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <img
              src={photo.thumb}
              alt={`${labels.photoAlt} ${i + 1}`}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <img
            src={photos[open].src}
            alt={`${labels.photoAlt} ${open + 1}`}
            className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label={labels.close}
            onClick={close}
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>
          <button
            type="button"
            aria-label={labels.prev}
            onClick={e => { e.stopPropagation(); step(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={e => { e.stopPropagation(); step(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
          >
            ›
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {open + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
