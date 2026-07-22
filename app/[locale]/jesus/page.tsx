import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import VerseBlock from '@/components/VerseBlock';
import { safeFetch, sanityImageUrl, queries } from '@/lib/sanity-fetch';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'jesus' });
  return { title: 'Jesus', description: t('heroSubtitle') };
}

export default async function JesusPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'jesus' });
  const cms = await safeFetch<any>(queries.jesusPage);

  const ar = locale === 'ar';
  const heroImageUrl = sanityImageUrl(cms?.heroImage);

  const steps = cms?.gospelSteps?.length
    ? cms.gospelSteps.map((s: any) => ({
        title: (ar ? s.titleAr : s.title) ?? s.title,
        text: (ar ? s.textAr : s.text) ?? s.text,
        icon: s.icon ?? '✝',
      }))
    : [
        { title: t('step1Title'), text: t('step1Text'), icon: '✝' },
        { title: t('step2Title'), text: t('step2Text'), icon: '💔' },
        { title: t('step3Title'), text: t('step3Text'), icon: '⚖' },
        { title: t('step4Title'), text: t('step4Text'), icon: '🙏' },
      ];

  const whoImageUrl = sanityImageUrl(cms?.whoImage);
  const prayerImageUrl = sanityImageUrl(cms?.prayerImage);

  return (
    <>
      <HeroSection
        label={(ar ? cms?.heroLabelAr : cms?.heroLabel) ?? t('heroLabel')}
        title={(ar ? cms?.heroTitleAr : cms?.heroTitle) ?? t('heroTitle')}
        subtitle={(ar ? cms?.heroSubtitleAr : cms?.heroSubtitle) ?? t('heroSubtitle')}
        minHeight="min-h-[75vh]"
        backgroundImageUrl={heroImageUrl}
        overlayOpacity={cms?.heroOverlayOpacity ?? 55}
      />

      {/* Who is Jesus */}
      <section className="section-warm">
        <div className="container-church max-w-4xl">
          <RevealOnScroll>
            <SectionHeader label={t('whoLabel')} title={(ar ? cms?.whoTitleAr : cms?.whoTitle) ?? t('whoTitle')} />
          </RevealOnScroll>
          {whoImageUrl && (
            <RevealOnScroll delay={0.05}>
              <img src={whoImageUrl} alt="Who is Jesus" className="w-full rounded-2xl shadow-warm-lg mb-8 max-h-80 object-cover" />
            </RevealOnScroll>
          )}
          <RevealOnScroll delay={0.1}>
            <p className="text-brown-mid text-lg leading-relaxed text-center mb-10">
              {(ar ? cms?.whoTextAr : cms?.whoText) ?? t('whoText')}
            </p>
            <VerseBlock
              verse={(ar ? cms?.verseJohnAr : cms?.verseJohn) ?? t('verseJohn')}
              reference={t('verseJohnRef')}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Gospel steps */}
      <section className="section-parchment">
        <div className="container-church">
          <RevealOnScroll><SectionHeader label={t('gospelLabel')} title={t('gospelTitle')} /></RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {steps.map((step: any, i: number) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="card-warm h-full">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-warm-sm" style={{ background: 'linear-gradient(135deg, #FDF3DC, #F0E4C0)', border: '1px solid rgba(184,134,11,0.2)' }}>
                      {step.icon}
                    </div>
                    <div className="pt-2">
                      <span className="label-gold text-xs mb-1 block">Step {i + 1}</span>
                      <h3 className="font-serif text-xl text-brown-deep">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-brown-mid leading-relaxed">{step.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={0.2}>
            <div className="max-w-4xl mx-auto mt-10">
              <VerseBlock
                verse={(ar ? cms?.verseGospelAr : cms?.verseGospel) ?? t('verseRomans')}
                reference={t('verseRomansRef')}
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Prayer section */}
      <section className="section-parchment-deep" style={prayerImageUrl ? { backgroundImage: `url(${prayerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        <div className="container-church max-w-3xl text-center">
          <RevealOnScroll>
            <SectionHeader label={t('prayerLabel')} title={(ar ? cms?.prayerTitleAr : cms?.prayerTitle) ?? t('prayerTitle')} />
            <p className="text-brown-mid leading-relaxed mb-8 text-lg">
              {(ar ? cms?.prayerTextAr : cms?.prayerText) ?? t('prayerText')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="relative rounded-2xl p-8 md:p-10 text-left shadow-warm-md" style={{ background: 'linear-gradient(135deg, #FDFBF7, #F7F0E4)', border: '1px solid rgba(184,134,11,0.25)' }}>
              <div className="absolute top-4 left-6 font-serif text-8xl leading-none select-none" style={{ color: 'rgba(184,134,11,0.08)' }} aria-hidden="true">"</div>
              <p className="font-serif italic text-xl text-brown-deep leading-relaxed relative z-10">
                {(ar ? cms?.prayerSampleAr : cms?.prayerSample) ?? t('prayerSample')}
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href={`/${locale}/join-us`} className="btn-gold">{t('prayerCta')}</Link>
              <Link href={`/${locale}/contact`} className="btn-outline">{t('contactCta')}</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
