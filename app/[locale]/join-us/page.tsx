import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import ServiceTimeCard from '@/components/ServiceTimeCard';
import Accordion from '@/components/Accordion';
import RevealOnScroll from '@/components/RevealOnScroll';
import { safeFetch, sanityImageUrl, queries } from '@/lib/sanity-fetch';
import { fallbackServiceTimes } from '@/lib/fallback-data';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'joinUs' });
  return { title: 'Join Us', description: t('heroSubtitle') };
}

export default async function JoinUsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'joinUs' });
  const ar = locale === 'ar';

  const [cms, cmsServiceTimes, cmsFaq] = await Promise.all([
    safeFetch<any>(queries.joinUsPage),
    safeFetch<any[]>(queries.serviceTimes),
    safeFetch<any[]>(queries.faqItems),
  ]);

  const heroImageUrl = sanityImageUrl(cms?.heroImage);
  const familiesImageUrl = sanityImageUrl(cms?.familiesImage);

  const serviceTimes = cmsServiceTimes?.length
    ? cmsServiceTimes.map((s: any) => ({
        title: (ar ? s.titleAr : s.title) ?? s.title,
        time: (ar ? s.timeAr : s.time) ?? s.time,
        note: (ar ? s.noteAr : s.note) ?? '',
        icon: s.icon ?? '⛪',
      }))
    : [
        { title: t('sundayTitle'), time: t('sundayTime'), note: t('sundayNote'), icon: '⛪' },
        { title: t('sundaySchoolTitle'), time: t('sundaySchoolTime'), note: t('sundaySchoolNote'), icon: '📖' },
        { title: t('wednesdayTitle'), time: t('wednesdayTime'), note: t('wednesdayNote'), icon: '🕯' },
        { title: t('youthTitle'), time: t('youthTime'), note: t('youthNote'), icon: '✨' },
      ];

  const faqItems = cmsFaq?.length
    ? cmsFaq.map((f: any) => ({
        title: (ar ? f.questionAr : f.question) ?? f.question,
        content: (ar ? f.answerAr : f.answer) ?? f.answer,
      }))
    : [
        { title: t('faq1Q'), content: t('faq1A') },
        { title: t('faq2Q'), content: t('faq2A') },
        { title: t('faq3Q'), content: t('faq3A') },
        { title: t('faq4Q'), content: t('faq4A') },
        { title: t('faq5Q'), content: t('faq5A') },
        { title: t('faq6Q'), content: t('faq6A') },
      ];

  const expectations = cms?.expectations?.length
    ? cms.expectations.map((e: any) => ({
        title: (ar ? e.titleAr : e.title) ?? e.title,
        text: (ar ? e.textAr : e.text) ?? e.text,
        icon: e.icon ?? '✓',
      }))
    : [
        { title: t('expect1Title'), text: t('expect1Text'), icon: '👋' },
        { title: t('expect2Title'), text: t('expect2Text'), icon: '🎵' },
        { title: t('expect3Title'), text: t('expect3Text'), icon: '📖' },
        { title: t('expect4Title'), text: t('expect4Text'), icon: '☕' },
      ];

  const siteSettings = await safeFetch<any>(queries.siteSettings);
  const mapsUrl = siteSettings?.googleMapsUrl ?? 'https://maps.google.com/?q=Bikfaya,Lebanon';

  return (
    <>
      <HeroSection
        label={(ar ? cms?.heroLabelAr : cms?.heroLabel) ?? t('heroLabel')}
        title={(ar ? cms?.heroTitleAr : cms?.heroTitle) ?? t('heroTitle')}
        subtitle={(ar ? cms?.heroSubtitleAr : cms?.heroSubtitle) ?? t('heroSubtitle')}
        backgroundImageUrl={heroImageUrl}
        overlayOpacity={cms?.heroOverlayOpacity ?? 55}
      />

      {/* Service Times */}
      <section className="section-warm">
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

      {/* Location */}
      <section className="section-parchment">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('locationLabel')} title={t('locationTitle')} /></RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <RevealOnScroll direction="left">
              {siteSettings?.mapEmbedUrl ? (
                <iframe src={siteSettings.mapEmbedUrl} className="w-full h-64 rounded-2xl shadow-warm-md border-0" allowFullScreen loading="lazy" title="Church location" />
              ) : (
                <div className="rounded-2xl h-64 flex items-center justify-center shadow-warm-md" style={{ background: 'linear-gradient(135deg, #FDF3DC, #E8D9A0)' }}>
                  <div className="text-center"><p className="text-5xl mb-3">🗺</p><p className="text-brown-mid font-serif text-lg">Bikfaya, Lebanon</p><p className="text-brown-muted text-sm">Mount Lebanon Governorate</p></div>
                </div>
              )}
            </RevealOnScroll>
            <RevealOnScroll direction="right" delay={0.1}>
              <div className="card-warm h-full flex flex-col justify-center">
                <h3 className="font-serif text-xl text-brown-deep mb-4">{siteSettings?.address ?? t('locationAddress')}</h3>
                <ul className="space-y-3 text-brown-mid text-sm mb-6">
                  <li className="flex items-center gap-3"><span className="text-gold text-lg">📍</span><span>{siteSettings?.address ?? 'Bikfaya, Mount Lebanon, Lebanon'}</span></li>
                  {siteSettings?.phone && <li className="flex items-center gap-3"><span className="text-gold text-lg">📞</span><a href={`tel:${siteSettings.phone}`} className="hover:text-gold transition-colors">{siteSettings.phone}</a></li>}
                  {siteSettings?.email && <li className="flex items-center gap-3"><span className="text-gold text-lg">✉</span><a href={`mailto:${siteSettings.email}`} className="hover:text-gold transition-colors">{siteSettings.email}</a></li>}
                </ul>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold self-start">{t('locationDirections')}</a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-warm">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('expectLabel')} title={t('expectTitle')} /></RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {expectations.map((e: any, i: number) => (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <div className="card-warm flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FDF3DC, #F0E4C0)', border: '1px solid rgba(184,134,11,0.2)' }}>{e.icon}</div>
                  <div><h3 className="font-serif text-lg text-brown-deep mb-1">{e.title}</h3><p className="text-brown-mid text-sm leading-relaxed">{e.text}</p></div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Families */}
      <section
        className="py-20 px-6 relative bg-cover bg-center"
        style={familiesImageUrl
          ? { backgroundImage: `linear-gradient(rgba(28,18,8,0.75), rgba(28,18,8,0.75)), url(${familiesImageUrl})` }
          : { background: 'linear-gradient(135deg, #2C1A08, #3D2410)' }}
      >
        <div className="container-church max-w-3xl text-center relative z-10">
          <RevealOnScroll>
            <p className="text-5xl mb-6">👨‍👩‍👧‍👦</p>
            <p className="label-gold text-amber-400 mb-4">{t('familiesLabel')}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">{(ar ? cms?.familiesTitleAr : cms?.familiesTitle) ?? t('familiesTitle')}</h2>
            <div className="w-24 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
            <p className="text-amber-200 text-lg leading-relaxed">{(ar ? cms?.familiesTextAr : cms?.familiesText) ?? t('familiesText')}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-parchment">
        <div className="container-church max-w-3xl">
          <RevealOnScroll><SectionHeader label={t('faqLabel')} title={t('faqTitle')} /></RevealOnScroll>
          <RevealOnScroll delay={0.1}><Accordion items={faqItems} /></RevealOnScroll>
        </div>
      </section>
    </>
  );
}
