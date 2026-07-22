'use client';
import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import SermonCard from '@/components/SermonCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import { fallbackSermons } from '@/lib/fallback-data';

const ALL_TAGS = ['All', 'Gospel of John', 'Romans', 'Luke', 'Matthew', 'Ephesians', 'Easter', 'Parables', 'Justification', 'Grace'];

export default function SermonsPage() {
  const t = useTranslations('sermons');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const featured = fallbackSermons.find(s => s.featured);
  const rest = fallbackSermons.filter(s => !s.featured);

  const filtered = useMemo(() => {
    return rest.filter(s => {
      const title = locale === 'ar' ? s.titleAr : s.title;
      const speaker = locale === 'ar' ? s.speakerAr : s.speaker;
      const series = locale === 'ar' ? s.seriesAr : s.series;
      const matchesQuery =
        !query ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        speaker.toLowerCase().includes(query.toLowerCase()) ||
        series.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag === 'All' || s.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [rest, query, activeTag, locale]);

  return (
    <>
      <HeroSection label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSubtitle')} minHeight="min-h-[55vh]" />

      <section className="section-warm">
        <div className="container-church">
          {/* Featured */}
          {featured && (
            <div className="mb-16">
              <RevealOnScroll>
                <SectionHeader label={t('featuredLabel')} title={t('featuredTitle')} />
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <SermonCard sermon={featured} variant="featured" />
              </RevealOnScroll>
            </div>
          )}

          {/* Search + filters */}
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
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
            <div className="flex flex-wrap gap-2 mb-10">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    activeTag === tag
                      ? 'bg-gold text-white border-gold shadow-warm-sm'
                      : 'border-gold-light text-brown-mid hover:border-gold hover:text-gold bg-white'
                  }`}
                >
                  {tag === 'All' ? t('filterAll') : tag}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Grid */}
          {filtered.length === 0 ? (
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
    </>
  );
}
