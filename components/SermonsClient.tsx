'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { PlayCircle, Book, Search, SlidersHorizontal, X, ChevronDown, Volume2, Calendar, User } from 'lucide-react';

// All canonical books of the Bible for filtering
const BIBLICAL_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude',
  'Revelation'
];

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  scripture: string;
  series?: string;
  date: string;
  duration: string;
  youtubeUrl?: string;
  audioUrl?: string;
  transcriptUrl?: string;
  tags?: string[];
}

interface SermonsClientProps {
  sermons: Sermon[];
  featured?: Sermon | null;
}

export default function SermonsClient({ sermons, featured }: SermonsClientProps) {
  const t = useTranslations('sermons');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const seriesList = useMemo(() => {
    const uniqueSeries = new Set(sermons.map(s => s.series).filter(Boolean) as string[]);
    return Array.from(uniqueSeries);
  }, [sermons]);

  function matchesBook(s: Sermon, book: string): boolean {
    const haystack = [s.scripture, s.title, ...(s.tags ?? [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(book.toLowerCase());
  }

  const filteredSermons = useMemo(() => {
    return sermons.filter(s => {
      const matchesSearch = !searchQuery ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.scripture.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeries = !activeSeries || s.series === activeSeries;
      const matchesBookFilter = !activeBook || matchesBook(s, activeBook);
      return matchesSearch && matchesSeries && matchesBookFilter;
    });
  }, [sermons, searchQuery, activeSeries, activeBook]);

  const hasActiveFilters = !!searchQuery || !!activeSeries || !!activeBook;

  return (
    <div className="space-y-8">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(p => !p)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
            showFilters
              ? 'bg-navy-700 text-white border-navy-700'
              : 'bg-white text-gray-700 border-gray-300 hover:border-navy-500'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm">{t('filterAll')}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
          {/* Series filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t('filterSeries')}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSeries(null)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  !activeSeries
                    ? 'bg-navy-700 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-navy-500'
                }`}
              >
                {t('filterAll')}
              </button>
              {seriesList.map(series => (
                <button
                  key={series}
                  onClick={() => setActiveSeries(series === activeSeries ? null : series)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    activeSeries === series
                      ? 'bg-navy-700 text-white'
                      : 'bg-white border border-gray-300 text-gray-600 hover:border-navy-500'
                  }`}
                >
                  {series}
                </button>
              ))}
            </div>
          </div>

          {/* Biblical Book filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t('filterBook')}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveBook(null)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  !activeBook
                    ? 'bg-navy-700 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-navy-500'
                }`}
              >
                {t('filterAll')}
              </button>
              {BIBLICAL_BOOKS.map(book => (
                <button
                  key={book}
                  onClick={() => setActiveBook(book === activeBook ? null : book)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    activeBook === book
                      ? 'bg-navy-700 text-white'
                      : 'bg-white border border-gray-300 text-gray-600 hover:border-navy-500'
                  }`}
                >
                  {book}
                </button>
              ))}
            </div>
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveSeries(null);
                setActiveBook(null);
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{filteredSermons.length} results</span>
          {searchQuery && <span className="px-2 py-0.5 rounded bg-gray-100 text-xs">“{searchQuery}”</span>}
          {activeSeries && <span className="px-2 py-0.5 rounded bg-navy-100 text-navy-800 text-xs">{cativeSeries}</span>}
          {activeBook && <span className="px-2 py-0.5 rounded bg-navy-100 text-navy-800 text-xs">{cativeBook}</span>}
        </div>
      )}

      {/* Sermons Grid */}
      {filteredSermons.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Book className="we-8 h-8 mx-auto mb-2 opacity-40" />
          <p {t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map(sermon => (
            <div
              key={sermon.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:si��adow-md transition-shadow"
            >
              {/* Colour band */}
              <div className="h-1 bg-gradient-to-r from-navy-600 to-gold-500" />
              <div className="p-5 space-y-3">
                {sermon.series && (
                  <span className="inline-block text-xs font-medium text-navy-600 bg-navy-50 px-2 py-0.5 rounded-full">
                    {sermon.series}
                  </span>
                )}
                <h3 className="font-bold text-gray-900 leading-sng">{sermon.title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{sermon.speaker}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Book className="w-3 h-3" />
                  <span>{sermon.scripture}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{sermon.date}</span>
                  </div>
                  <span>{sermon.duration}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  {sermon.youtubeUrl && (
                    <a
                      href={sermon.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-700 text-white hover:bv-navy-800 transition-colors"
                    >
                      <PlayCircle className="w4 h4" />
                      {t('watchOn')}
                    </a>
                  )}
                  {sermon.audioUrl && (
                    <a
                      href={sermon.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-700 hover:border-navy-500"
                    >
                      <Volume2 className="w-3 h-3" />
                      {t('listenAudio')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
