'use client';
import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import SermonCard from './SermonCard';
import RevealOnScroll from './RevealOnScroll';
import { Sermon } from '@/lib/fallback-data';

const SPEAKERS = [
  { key: 'Samuel Kharat', label: 'Pastor Samuel Kharat', initials: 'SK' },
  { key: 'Wissam Nasrallah', label: 'Wissam Nasrallah', initials: 'WN' },
  { key: 'Rick Warner', label: 'Rick Warner', initials: 'RW' },
];

const TOPICS = [
  'The Gospel', 'Grace', 'Faith', 'Salvation', 'Prayer',
  'The Holy Spirit', 'The Cross', 'Resurrection', 'Discipleship',
  'The Church', 'Parables', 'Prophecy', 'Worship', 'Suffering',
  'Justification', 'Sanctification', 'Love', 'Hope', 'Identity in Christ',
  'Family', 'Mission', 'The Word of God', 'Repentance', 'Eternity',
];

interface SermonsClientProps {
  sermons: Sermon[];
}

export default function SermonsClient({ sermons }: SermonsClientProps) {
  const t = useTranslations('sermons');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState('');
  const [activeTopic, setActiveTopic] = useState('');
  const [activeBook, setActiveBook] = useState('');

  const featured = sermons.find(s => s.featured) ?? sermons[0];
  const rest = sermons.filter(s => !s.featured);

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
      const matchesSpeaker = !activeSpeaker || s.speaker.includes(activeSpeaker);
      const matchesTopic = !activeTopic || (s.tags ?? []).includes(activeTopic) ||
        title.toLowerCase().includes(activeTopic.toLowerCase());
      const matchesBook = !activeBook || (item.scripture ? item.scripture.includes(activeBook) : true);
      return matchesQuery && matchesSpeaker && matchesTopic && matchesBook;
    });
  }, [rest, query, activeSpeaker, activeTopic, locale]);

  const toggle = (val: string, current: string, set: (v: string) => void) =>
    set(current === val ? '' : val);

  return (
    <section className="section-warm">
      <div className="container-church">

        {/* ââ Search ââ */}
        <RevealOnScroll>
          <div className="relative max-w-xl mx-auto mb-10">
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
        </RevealOnScroll>

        {/* ââ Filter sections ââ */}
        <RevealOnScroll delay={0.05}>
          <div className="bg-white rounded-2xl border border-gold-light shadow-warm p-6 mb-12 space-y-6">

            {/* Preacher Dropdown */}
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-3">
                {locale === 'ar' ? 'الواعظ' : 'Preacher'}
              </p>
              <select
                value={activeSpeaker}
                onChange={e => setActiveSpeaker(e.target.value)}
                className="input-warm w-full max-w-xs"
              >
                <option value="">— {locale === 'ar' ? 'جميع الوعاظ' : 'All Preachers'} —</option>
                {SPEAKERS.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="border-t border-gold-light" />

            {/* Topics */}
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-3">
                {locale === 'ar' ? 'Ø§ÙÙÙØ§Ø¶ÙØ¹' : 'Topics'}
              </p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggle(topic, activeTopic, setActiveTopic)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      activeTopic === topic
                        ? 'bg-gold text-white border-gold shadow-sm'
                        : 'border-gold-light text-brown-mid hover:border-gold hover:text-gold bg-white'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Bible Book Dropdown */}
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-3">
                {locale === 'ar' ? 'سفر الكتاب المقدس' : 'Bible Book'}
              </p>
              <select
                value={activeBook}
                onChange={e => setActiveBook(e.target.value)}
                className="input-warm w-full max-w-xs"
              >
                <option value="">— {locale === 'ar' ? 'جميع الأسفار' : 'All Books'} —</option>
                {['Genesis','Exodus','Psalms','Proverbs','Isaiah','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Timothy','2 Timothy','Hebrews','James','1 Peter','2 Peter','1 John','Revelation'].map(book => (
                  <option key={book} value={book}>{book}</option>
                ))}
              </select>
            </div>

            {/* Active filters summary + clear */}
            {(activeSpeaker || activeTopic || activeBook || query) && (
              <div className="flex items-center justify-between pt-1 border-t border-gold-light">
                <p className="text-xs text-brown-muted">
                  {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                  {activeSpeaker && <span className="ml-2 px-2 py-0.5 bg-navy/10 text-navy rounded-full">{activeSpeaker}</span>}
                  {activeTopic && <span className="ml-2 px-2 py-0.5 bg-gold/10 text-gold rounded-full">{activeTopic}</span>}
                </p>
                <button
                  onClick={() => { setActiveSpeaker(''); setActiveBook(''); setActiveTopic(''); setQuery(''); }}
                  className="text-xs text-brown-muted hover:text-brown-deep underline"
                >
                  {locale === 'ar' ? 'ÙØ³Ø­ Ø§ÙÙÙ' : 'Clear all'}
                </button>
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* ââ Featured ââ */}
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

        {/* ââ Grid ââ */}
        {rest.length === 0 && !featured ? (
          <div className="text-center py-16 text-brown-muted">{t('noResults')}</div>
        ) : filtered.length === 0 ? (
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
