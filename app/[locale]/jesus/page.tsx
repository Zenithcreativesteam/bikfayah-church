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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-warm-sm" style={{ background: 'linear-gradient(135deg, #EAF0FA, #D8E4F5)', border: '1px solid rgba(184,134,11,0.2)' }}>
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

      {/* Talk to a Pastor */}
      <section className="section-parchment-deep" style={{ background: 'linear-gradient(135deg, #0F2044 0%, #1B3A6B 100%)' }}>
        <div className="container-church max-w-3xl text-center">
          <RevealOnScroll>
            <p className="label-gold text-amber-400 mb-4">{ar ? 'ال خصوة التالية ' : 'Next Step'}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">
              {ar ? 'تحدّث مچ أححد القساوسة' : 'Talk to a Pastor'}
            </h2>
            <div className="w-24 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
            <p className="text-blue-200/80 text-lg leading-relaxed mb-10">
              {ar
                ? 'هل لديك أسئلة خ٥فلان أى الكتاو al المقدس أق قراأته للتو؟ حول الاستماى — لا يوحد سؤال صغيس جداً ولاك موقف بعيد المنال.'
                : 'Questions about faith, the Bible, or what you just read? We are here to listen. Reach out to one of our pastors — no question is too small, no situation too far.'}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-gold">
                {ar ? 'تواصل معنا' : 'Get in Touch'}
              </Link>
              <a
                href="https://wa.me/9611234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-amber-300 text-blue-100 px-6 py-3 rounded-full font-sans font-medium hover:bg-white hover:text-brown-deep transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {ar ? 'واتساب' : 'WhatsApp'}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
