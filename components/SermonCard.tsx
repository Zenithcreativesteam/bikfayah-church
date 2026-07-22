'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Sermon } from '@/lib/fallback-data';
import CrossIcon from './CrossIcon';

interface SermonCardProps {
  sermon: Sermon;
  variant?: 'featured' | 'grid';
  locale?: string;
}

export default function SermonCard({ sermon, variant = 'grid' }: SermonCardProps) {
  const locale = useLocale();
  const t = useTranslations('sermons');
  const tCommon = useTranslations('common');

  const title = locale === 'ar' ? sermon.titleAr : sermon.title;
  const speaker = locale === 'ar' ? sermon.speakerAr : sermon.speaker;
  const series = locale === 'ar' ? sermon.seriesAr : sermon.series;
  const excerpt = locale === 'ar' ? sermon.excerptAr : sermon.excerpt;

  const formattedDate = new Date(sermon.date).toLocaleDateString(
    locale === 'ar' ? 'ar-LB' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  if (variant === 'featured') {
    return (
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-warm-md border border-gold-light overflow-hidden">
        {/* Thumbnail */}
        <div
          className="relative flex items-center justify-center min-h-64"
          style={{ background: 'linear-gradient(135deg, #FDF3DC 0%, #F0E4C0 100%)' }}
        >
          <div className="text-center">
            <CrossIcon size={64} color="#B8860B" className="mx-auto mb-3 opacity-40" />
            <span className="label-gold text-xs">{t('featuredLabel')}</span>
          </div>
          {sermon.youtubeUrl && (
            <a
              href={sermon.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-warm-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5l11 7-11 7V5z" fill="#B8860B" />
                </svg>
              </div>
            </a>
          )}
        </div>
        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <p className="label-gold mb-2">{series}</p>
          <h3 className="font-serif text-2xl md:text-3xl text-brown-deep mb-3">{title}</h3>
          <p className="text-brown-mid mb-2 text-sm">{speaker} · {formattedDate} · {sermon.duration} {tCommon('min')}</p>
          <p className="text-brown-mid leading-relaxed mb-6 line-clamp-3">{excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {sermon.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-parchment-light text-brown-mid border border-gold-light">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {sermon.youtubeUrl && (
              <a href={sermon.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                {tCommon('watchNow')}
              </a>
            )}
            <Link href={`/${locale}/sermons/${sermon.slug}`} className="btn-outline text-sm">
              {tCommon('readMore')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="card-warm group hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      {/* Thumbnail */}
      <div
        className="relative h-44 rounded-xl mb-4 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FDF3DC 0%, #F0E4C0 100%)' }}
      >
        <CrossIcon size={40} color="#B8860B" className="opacity-25" />
        {sermon.youtubeUrl && (
          <a
            href={sermon.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-warm-md flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 5l11 7-11 7V5z" fill="#B8860B" />
              </svg>
            </div>
          </a>
        )}
      </div>
      {/* Meta */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="label-gold text-xs">{series}</span>
        <span className="text-brown-muted text-xs">·</span>
        <span className="text-brown-muted text-xs">{sermon.scripture}</span>
      </div>
      <h3 className="font-serif text-xl text-brown-deep mb-2 group-hover:text-gold transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-brown-mid text-sm mb-3">
        {speaker} · {sermon.duration} {tCommon('min')}
      </p>
      <p className="text-brown-mid text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
        {excerpt}
      </p>
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/${locale}/sermons/${sermon.slug}`}
          className="text-gold text-sm font-medium hover:underline"
        >
          {tCommon('readMore')} →
        </Link>
      </div>
    </article>
  );
}
