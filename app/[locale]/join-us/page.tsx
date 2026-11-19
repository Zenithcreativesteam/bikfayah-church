import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import ServiceTimeCard from '@/components/ServiceTimeCard';
import Accordion from '@/components/Accordion';
import RevealOnScroll from '@/components/RevealOnScroll';
import { safeFetch, sanityImageUrl, queries } from '@/lib/sanity-fetch';
import { churchImages } from '@/lib/church-images';
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

  const heroImageUrl = sanityImageUrl(cms?.heroImage) ?? churchImages.joinUsHero;
  const familiesImageUrl = sanityImageUrl(cms?.familiesImage) ?? churchImages.joinUsFamilies;

  const serviceTimes = cmsServiceTimes?.length
    ? cmsServiceTimes.map((s: any) => ({
        title: (ar ? s.titleAr : s.title) ?? s.title,
        time: (ar ? s.timeAr : s.time) ?? s.time,
        note: (ar ? s.noteAr : s.note) ?? '',
      }))
    : [
        { title: t('sundayTitle'), time: t('sundayTime'), note: t('sundayNote') },
        { title: t('sundaySchoolTitle'), time: t('sundaySchoolTime'), note: t('sundaySchoolNote') },
        { title: t('wednesdayTitle'), time: t('wednesdayTime'), note: t('wednesdayNote') },
        { title: t('youthTitle'), time: t('youthTime'), note: t('youthNote') },
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
          {/* Sunday Morning — featured prominently */}
          {serviceTimes[0] && (
            <RevealOnScroll>
              <div className="mb-5">
                <ServiceTimeCard featured title={serviceTimes[0].title} time={serviceTimes[0].time} note={serviceTimes[0].note} image={churchImages.joinUsSunday} />
              </div>
            </RevealOnScroll>
          )}
          {/* Other service times */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {serviceTimes.slice(1).map((s, i) => (
              <RevealOnScroll key={s.title} delay={i * 0.08}>
                <ServiceTimeCard title={s.title} time={s.time} note={s.note} image={churchImages.serviceTimes[i + 1]} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-parchment">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('locationLabel')} title={t('locationTitle')} /></RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-5">
            <RevealOnScroll direction="left">
              <div className="relative h-80 md:h-full min-h-80 overflow-hidden rounded-2xl shadow-warm-md">
                <img src={churchImages.joinUsLocation} alt={ar ? 'مدخل الكنيسة' : 'Church entrance'} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,32,68,0.85), transparent 60%)' }} />
                <p className="absolute bottom-5 left-5 right-5 font-serif text-xl text-white">{ar ? 'نراك عند البوابة' : 'See you at the gate'}</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <iframe
                src={siteSettings?.mapEmbedUrl ?? 'https://www.google.com/maps?q=Bikfaya+Baptist+Church,+Bikfaya,+Lebanon&output=embed'}
                className="w-full h-80 md:h-full min-h-80 rounded-2xl shadow-warm-md border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church location"
              />
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

      {/* Families */}
      <section
        className="py-20 px-6 relative bg-cover bg-center"
        style={familiesImageUrl
          ? { backgroundImage: `linear-gradient(rgba(28,18,8,0.75), rgba(28,18,8,0.75)), url(${familiesImageUrl})` }
          : { background: 'linear-gradient(135deg, #0F2044, #1B3A6B)' }}
      >
        <div className="container-church max-w-3xl text-center relative z-10">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">{(ar ? cms?.familiesTitleAr : cms?.familiesTitle) ?? t('familiesTitle')}</h2>
            <div className="w-24 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
            <p className="text-blue-200/80 text-lg leading-relaxed">{(ar ? cms?.familiesTextAr : cms?.familiesText) ?? t('familiesText')}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-parchment">
        <div className="container-church grid gap-10 md:grid-cols-5 md:items-start">
          <RevealOnScroll direction="left" className="md:col-span-2 md:sticky md:top-28">
            <div className="relative overflow-hidden rounded-3xl shadow-warm-lg h-80 md:h-[32rem]">
              <img src={churchImages.joinUsFaq} alt={ar ? 'استقبال عند باب الكنيسة' : 'Welcome at the church door'} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,32,68,0.85), transparent 55%)' }} />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl text-white leading-snug">
                {ar ? 'أول زيارة؟ يسعدنا أن نرحّب بك.' : 'First visit? We would love to welcome you.'}
              </p>
            </div>
          </RevealOnScroll>
          <div className="md:col-span-3">
            <RevealOnScroll><SectionHeader label={t('faqLabel')} title={t('faqTitle')} centered={false} /></RevealOnScroll>
            <RevealOnScroll delay={0.1}><Accordion items={faqItems} /></RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
