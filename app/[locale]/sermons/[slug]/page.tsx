import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import SermonCard from '@/components/SermonCard';
import VerseBlock from '@/components/VerseBlock';
import RevealOnScroll from '@/components/RevealOnScroll';
import { fallbackSermons } from '@/lib/fallback-data';

type Props = { params: { locale: string; slug: string } };

export async function generateStaticParams() {
  return fallbackSermons.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const sermon = fallbackSermons.find(s => s.slug === slug);
  if (!sermon) return { title: 'Sermon Not Found' };
  const title = locale === 'ar' ? sermon.titleAr : sermon.title;
  return { title, description: locale === 'ar' ? sermon.excerptAr : sermon.excerpt };
}

export default async function SermonDetailPage({ params: { locale, slug } }: Props) {
  const t = await getTranslations({ locale, namespace: 'sermonDetail' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tSer = await getTranslations({ locale, namespace: 'sermons' });

  const sermon = fallbackSermons.find(s => s.slug === slug);
  if (!sermon) notFound();

  const title = locale === 'ar' ? sermon.titleAr : sermon.title;
  const speaker = locale === 'ar' ? sermon.speakerAr : sermon.speaker;
  const series = locale === 'ar' ? sermon.seriesAr : sermon.series;
  const excerpt = locale === 'ar' ? sermon.excerptAr : sermon.excerpt;

  const related = fallbackSermons
    .filter(s => s.slug !== slug && (s.series === sermon.series || s.speaker === sermon.speaker))
    .slice(0, 3);

  const formattedDate = new Date(sermon.date).toLocaleDateString(locale === 'ar' ? 'ar-LB' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-16 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2044 0%, #1B3A6B 100%)' }}
      >
        <div className="container-church max-w-4xl relative z-10">
          <Link href={`/${locale}/sermons`} className="text-amber-400 text-sm hover:text-amber-200 transition-colors mb-6 inline-block">
            {t('backToSermons')}
          </Link>
          <p className="label-gold text-amber-400 mb-3">{series}</p>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">{title}</h1>
          <div className="flex flex-wrap gap-4 text-amber-200 text-sm">
            <span>{speaker}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{sermon.duration} {tCommon('min')}</span>
            <span>·</span>
            <span>{sermon.scripture}</span>
          </div>
        </div>
      </section>

      <section className="section-warm">
        <div className="container-church max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2">
              {/* YouTube embed */}
              {sermon.youtubeUrl && (
                <RevealOnScroll>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-warm-lg mb-8">
                    <iframe
                      src={sermon.youtubeUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={title}
                    />
                  </div>
                </RevealOnScroll>
              )}

              {/* Excerpt */}
              <RevealOnScroll delay={0.1}>
                <div className="prose prose-stone max-w-none mb-8">
                  <VerseBlock verse={`"${sermon.scripture}"`} reference="Scripture" className="mb-6" />
                  <p className="text-brown-mid leading-relaxed text-lg">{excerpt}</p>
                </div>
              </RevealOnScroll>

              {/* Transcript placeholder */}
              <RevealOnScroll delay={0.15}>
                <div className="card-warm">
                  <h2 className="font-serif text-xl text-brown-deep mb-4">{t('transcript')}</h2>
                  <p className="text-brown-muted italic text-sm">
                    Sermon transcript will appear here once connected to Sanity CMS.
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Meta card */}
              <div className="card-warm">
                <h3 className="font-serif text-lg text-brown-deep mb-4">{tSer('speaker')}</h3>
                <p className="text-brown-mid text-sm mb-4">{speaker}</p>
                <div className="border-t border-gold-light pt-4 space-y-3">
                  <div>
                    <p className="label-gold text-xs mb-1">{tSer('series')}</p>
                    <p className="text-brown-deep text-sm">{series}</p>
                  </div>
                  <div>
                    <p className="label-gold text-xs mb-1">{tSer('scripture')}</p>
                    <p className="text-brown-deep text-sm">{sermon.scripture}</p>
                  </div>
                  <div>
                    <p className="label-gold text-xs mb-1">{tSer('date')}</p>
                    <p className="text-brown-deep text-sm">{formattedDate}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="card-warm">
                <p className="label-gold mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {sermon.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-parchment-light text-brown-mid border border-gold-light">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Watch on YouTube */}
              {sermon.youtubeUrl && (
                <a
                  href={sermon.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full justify-center text-sm"
                >
                  {tSer('watchOn')}
                </a>
              )}
            </div>
          </div>

          {/* Related sermons */}
          {related.length > 0 && (
            <div className="mt-16">
              <RevealOnScroll>
                <SectionHeader label={t('relatedSermons')} title="Continue Listening" />
              </RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((s, i) => (
                  <RevealOnScroll key={s._id} delay={i * 0.08}>
                    <SermonCard sermon={s} variant="grid" />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
