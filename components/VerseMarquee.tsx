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

  return (
    <div
      className="py-5 overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #B8860B 0%, #A07408 50%, #B8860B 100%)' }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {displayItems.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8">
            <span className="text-amber-100 font-serif italic text-sm md:text-base">
              {locale === 'ar' ? v.textAr : v.text}
            </span>
            <span className="text-amber-300 text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
