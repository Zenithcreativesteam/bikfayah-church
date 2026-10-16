'use client';
import { useLocale } from 'next-intl';
import { fallbackMarqueeVerses } from '@/lib/fallback-data';

interface VerseMarqueeProps {
  verses?: Array<{ text: string; textAr: string }>;
}

export default function VerseMarquee({ verses }: VerseMarqueeProps) {
  const locale = useLocale();
  const items = verses ?? fallbackMarqueeVerses;
  const displayItems = [...items, ...items]; // double for seamless loop

  const firstItem = items[0];

  return (
    <div
      className="py-5 overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #B8860B 0%, #A07408 50%, #B8860B 100%)' }}
    >
      {/* Mobile: static centered verse */}
      <div className="md:hidden text-center px-6">
        <span className="text-blue-100 font-serif italic text-sm leading-relaxed">
          {locale === 'ar' ? firstItem.textAr : firstItem.text}
        </span>
      </div>

      {/* Desktop: scrolling marquee */}
      <div className="hidden md:flex animate-marquee whitespace-nowrap">
        {displayItems.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8">
            <span className="text-blue-100 font-serif italic text-base">
              {locale === 'ar' ? v.textAr : v.text}
            </span>
            <span className="text-amber-300 text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
