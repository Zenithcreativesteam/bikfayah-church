import Link from 'next/link';

interface PhotoMosaicProps {
  images: string[];
  alt: string;
  ctaHref?: string;
  ctaLabel?: string;
}

// Six-photo mosaic: one large tile plus five smaller ones (mobile: simple 2-column grid).
export default function PhotoMosaic({ images, alt, ctaHref, ctaLabel }: PhotoMosaicProps) {
  const tiles = images.slice(0, 6);
  const spans = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 md:col-span-2 row-span-1',
    'col-span-1 md:col-span-2 row-span-1',
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 auto-rows-[9rem] gap-3 md:grid-cols-4 md:auto-rows-[11rem]">
        {tiles.map((src, i) => (
          <div
            key={src + i}
            className={`group relative overflow-hidden rounded-2xl shadow-warm ${spans[i]} ${i >= 4 ? 'hidden md:block' : ''}`}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      {ctaHref && ctaLabel && (
        <div className="mt-8 text-center">
          <Link href={ctaHref} className="btn-outline">{ctaLabel}</Link>
        </div>
      )}
    </div>
  );
}
