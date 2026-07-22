import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import VerseMarquee from '@/components/VerseMarquee';
import SectionHeader from '@/components/SectionHeader';
import SermonCard from '@/components/SermonCard';
import MinistryCard from '@/components/MinistryCard';
import ServiceTimeCard from '@/components/ServiceTimeCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import VerseBlock from '@/components/VerseBlock';
import { fallbackSermons, fallbackServiceTimes } from '@/lib/fallback-data';
import { safeFetch, sanityImageUrl, queries } from '@/lib/sanity-fetch';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });
  return { title: 'Home', description: t('heroSubtitle') };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tMin = await getTranslations({ locale, namespace: 'ministries' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  // Fetch from Sanity (null if not configured)
  const [cms, cmsMinistries, cmsServiceTimes, cmsSermons] = await Promise.all([
    safeFetch<any>(queries.homePage),
    safeFetch<any[]>(queries.ministries),
    safeFetch<any[]>(queries.serviceTimes),
    safeFetch<any[]>(queries.sermons),
  ]);

  const heroImageUrl = sanityImageUrl(cms?.heroImage);
  const welcomeImageUrl = sanityImageUrl(cms?.welcomeImage);
  const heroTitle = (locale === 'ar' ? cms?.heroTitleAr : cms?.heroTitle) ?? t('heroTitle');
  const heroSubtitle = (locale === 'ar' ? cms?.heroSubtitleAr : cms?.heroSubtitle) ?? t('heroSubtitle');
  const heroLabel = (locale === 'ar' ? cms?.heroLabelAr : cms?.heroLabel) ?? t('heroLabel');
  const heroVerse = (locale === 'ar' ? cms?.heroVerseAr : cms?.heroVerse) ?? t('heroVerse');
  const welcomeTitle = (locale === 'ar' ? cms?.welcomeTitleAr : cms?.welcomeTitle) ?? t('welcomeTitle');
  const welcomeText = (locale === 'ar' ? cms?.welcomeTextAr : cms?.welcomeText) ?? t('welcomeText');
  const welcomeQuote = (locale === 'ar' ? cms?.welcomeQuoteAr : cms?.welcomeQuote) ?? '"Taste and see that the LORD is good."';
  const gospelTitle = (locale === 'ar' ? cms?.gospelTitleAr : cms?.gospelTitle) ?? t('gospelTitle');
  const gospelText = (locale === 'ar' ? cms?.gospelTextAr : cms?.gospelText) ?? t('gospelText');
  const marqueeVerses = cms?.marqueeVerses ?? undefined;

  const featuredSermon = (cmsSermons?.find((s: any) => s.featured)) ?? fallbackSermons.find(s => s.featured) ?? fallbackSermons[0];

  const defaultMinistries = [
    { key: 'worship', icon: '🎵' }, { key: 'youth', icon: '✨' },
    { key: 'women', icon: '🌸' }, { key: 'men', icon: '⚓' },
    { key: 'outreach', icon: '🌍' }, { key: 'prayer', icon: '🕯' },
    { key: 'children', icon: '🌱' }, { key: 'care', icon: '🤝' },
  ] as const;

  const serviceTimes = cmsServiceTimes?.length
    ? cmsServiceTimes.map((s: any) => ({
        title: (locale === 'ar' ? s.titleAr : s.title) ?? s.title,
        time: (locale === 'ar' ? s.timeAr : s.time) ?? s.time,
        note: (locale === 'ar' ? s.noteAr : s.note) ?? s.note,
        icon: s.icon,
      }))
    : fallbackServiceTimes.map(s => ({
        title: locale === 'ar' ? s.titleAr : s.title,
        time: locale === 'ar' ? s.timeAr : s.time,
        note: locale === 'ar' ? s.noteAr : s.note,
        icon: s.icon,
      }));

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        label={heroLabel}
        title={heroTitle}
        subtitle={heroSubtitle}
        minHeight="min-h-screen"
        backgroundImageUrl={heroImageUrl}
        overlayOpacity={cms?.heroOverlayOpacity ?? 55}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/join-us`} className="btn-gold">
            {(locale === 'ar' ? cms?.heroCtaPrimaryAr : cms?.heroCtaPrimary) ?? t('heroCtaPrimary')}
          </Link>
          <Link href={`/${locale}/about`} className="inline-flex items-center gap-2 border border-amber-300 text-amber-100 px-6 py-3 rounded-full font-sans font-medium hover:bg-white hover:text-brown-deep transition-all">
            {(locale === 'ar' ? cms?.heroCtaSecondaryAr : cms?.heroCtaSecondary) ?? t('heroCtaSecondary')}
          </Link>
        </div>
        <p className="mt-8 text-amber-300 font-serif italic text-sm max-w-lg mx-auto">{heroVerse}</p>
      </HeroSection>

      {/* ── Verse Marquee ── */}
      <VerseMarquee verses={marqueeVerses} />

      {/* ── Welcome ── */}
      <section className="section-warm">
        <div className="container-church grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll direction="left">
            <div>
              <SectionHeader label={t('welcomeLabel')} title={welcomeTitle} centered={false} />
              <p className="text-brown-mid leading-relaxed mb-8 text-lg">{welcomeText}</p>
              <Link href={`/${locale}/join-us`} className="btn-gold">{t('welcomeCta')}</Link>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.15}>
            {welcomeImageUrl ? (
              <img src={welcomeImageUrl} alt="Welcome" className="rounded-3xl shadow-warm-lg w-full h-80 object-cover" />
            ) : (
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg flex items-center justify-center min-h-80" style={{ background: 'linear-gradient(135deg, #2C1A08, #3D2410)' }}>
                <div className="text-center p-10 text-amber-100">
                  <p className="font-serif italic text-2xl mb-4 leading-relaxed">"{welcomeQuote}"</p>
                  <p className="label-gold text-amber-400">— Psalm 34:8</p>
                </div>
              </div>
            )}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Latest Sermon ── */}
      <section className="section-parchment">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('latestLabel')} title={t('latestTitle')} /></RevealOnScroll>
          <RevealOnScroll delay={0.1}><SermonCard sermon={featuredSermon} variant="featured" /></RevealOnScroll>
          <div className="text-center mt-10">
            <Link href={`/${locale}/sermons`} className="btn-outline">{t('latestCta')}</Link>
          </div>
        </div>
      </section>

      {/* ── Ministries ── */}
      <section className="section-warm">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('ministriesLabel')} title={t('ministriesTitle')} /></RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cmsMinistries?.length
              ? cmsMinistries.map((m: any, i: number) => (
                  <RevealOnScroll key={m._id} delay={i * 0.06}>
                    <MinistryCard
                      title={(locale === 'ar' ? m.titleAr : m.title) ?? m.title}
                      description={(locale === 'ar' ? m.descriptionAr : m.description) ?? m.description}
                      icon={m.icon ?? '✝'}
                    />
                  </RevealOnScroll>
                ))
              : defaultMinistries.map((m, i) => (
                  <RevealOnScroll key={m.key} delay={i * 0.06}>
                    <MinistryCard title={tMin(m.key)} description={tMin(`${m.key}Desc`)} icon={m.icon} />
                  </RevealOnScroll>
                ))
            }
          </div>
        </div>
      </section>

      {/* ── Service Times ── */}
      <section className="section-parchment-deep">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('timesLabel')} title={t('timesTitle')} /></RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceTimes.map((s, i) => (
              <RevealOnScroll key={s.title} delay={i * 0.08}>
                <ServiceTimeCard title={s.title} time={s.time} note={s.note} icon={s.icon} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gospel CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2C1A08 0%, #3D2410 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container-church relative z-10 text-center">
          <RevealOnScroll>
            <p className="label-gold text-amber-400 mb-4">{t('gospelLabel')}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">{gospelTitle}</h2>
            <div className="w-24 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
            <p className="text-amber-200 max-w-2xl mx-auto text-lg leading-relaxed mb-10">{gospelText}</p>
            <Link href={`/${locale}/jesus`} className="btn-gold">{t('gospelCta')}</Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
