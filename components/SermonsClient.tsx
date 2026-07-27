'use client';
import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import SermonCard from './SermonCard';
import RevealOnScroll from './RevealOnScroll';
import { Sermon } from '@/lib/fallback-data';

interface SermonsClientProps {
  sermons: Sermon[];
}

export default function SermonsClient({ sermons }: SermonsClientProps) {
  const t = useTranslations('sermons');
  const locale = useLocale();
  const [query, setQuery] = useState('');

  const featured = sermons.find(s => s.featured) ?? sermons[0];
  const rest = sermons.filter(s => !s.featured);

  const filtered = useMemo(() => {
    if (!query) return rest;
    const q = query.toLowerCase();
    return rest.filter(s => {
      const title = locale === 'ar' ? s.titleAr : s.title;
      const speaker = locale === 'ar' ? s.speakerAr : s.speaker;
      const series = locale === 'ar' ? s.seriesAr : s.series;
      return (
        title.toLowerCase().includes(q) ||
        speaker.toLowerCase().includes(q) ||
        series.toLowerCase().includes(q)
      );
    });
  }, [rest, query, locale]);

  return (
    <section className="section-warm">
      <div className="container-church">
        {/* Featured */}
        {featured && (
          <div className="mb-16">
            <RevealOnScroll>
              <div className="text-center mb-8">
                <p className="label-gold mb-2">{t('featuredLabel')}</p>
                <h2 className="font-serif text-3xl text-brown-deep">{t('featuredTitle')}</h2>
                <div className="gold-divider mt-4" />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <SermonCard sermon={featured} variant="featured" />
            </RevealOnScroll>
          </div>
        )}

        {/* Search */}
        {rest.length > 0 && (
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="input-warm pl-11"
                />
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Grid */}
        {rest.length === 0 && !featured ? (
          <div className="text-center py-16 text-brown-muted">{t('noResults')}</div>
        ) : filtered.length === 0 && query ? (
          <div className="text-center py-16 text-brown-muted">{t('noResults')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sermon, i) => (
              <RevealOnScroll key={sermon._id} delay={i * 0.06}>
                <SermonCard sermon={sermon} variant="grid" />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
