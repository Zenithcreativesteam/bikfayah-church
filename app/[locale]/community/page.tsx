import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import TestimonialCard from '@/components/TestimonialCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import { fallbackTestimonials } from '@/lib/fallback-data';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'community' });
  return { title: 'Community', description: t('heroSubtitle') };
}

function CommunityContent({ locale }: { locale: string }) {
  const t = useTranslations('community');

  return (
    <>
      {/* Hero — CTA lives inside the hero, no awkward separate section */}
      <HeroSection label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSubtitle')}>
        <Link href={`/${locale}/join-us`} className="btn-gold text-base px-8 py-3">
          {t('heroCtaJoinUs')}
        </Link>
      </HeroSection>

      {/* Youth and Young Adults Ministry */}
      <section className="section-warm">
        <div className="container-church grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll direction="left">
            <div>
              <SectionHeader label={t('youthLabel')} title={t('youthTitle')} centered={false} />
              <p className="text-brown-mid text-lg leading-relaxed mb-6">{t('youthText')}</p>
              {/* Rick WhatsApp contact */}
              <a
                href="https://wa.me/96176838229"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-navy/30 text-navy rounded-full px-5 py-2.5 hover:bg-navy hover:text-white transition-all duration-200"
              >
                <span>💬</span>
                {locale === 'ar' ? 'تواصل مع ريك عبر واتساب' : 'Contact Rick on WhatsApp'}
              </a>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1}>
            <div
              className="rounded-3xl h-64 flex items-center justify-center shadow-warm-lg"
              style={{ background: 'linear-gradient(135deg, #EAF0FA, #D8E4F5)' }}
            >
              <span className="text-6xl">✨</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Weekly Bible Study */}
      <section className="section-parchment">
        <div className="container-church grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll direction="left">
            <div
              className="rounded-3xl h-64 flex items-center justify-center shadow-warm-lg order-2 md:order-1"
              style={{ background: 'linear-gradient(135deg, #0F2044, #1B3A6B)' }}
            >
              <p className="font-serif text-white italic text-xl px-8 text-center">
                "Your word is a lamp to my feet"
                <span className="block text-gold text-sm mt-2 not-italic tracking-widest uppercase text-xs">Psalm 119:105</span>
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1} className="order-1 md:order-2">
            <div>
              <SectionHeader label={t('bibleLabel')} title={t('bibleTitle')} centered={false} />
              <p className="text-brown-mid text-lg leading-relaxed">{t('bibleText')}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-warm">
        <div className="container-church">
          <RevealOnScroll>
            <SectionHeader label={t('testimonialsLabel')} title={t('testimonialsTitle')} />
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackTestimonials.map((testimonial, i) => (
              <RevealOnScroll key={testimonial._id} delay={i * 0.1}>
                <TestimonialCard testimonial={testimonial} locale={locale} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* All Ministries & Upcoming Events — hidden until content is ready */}
    </>
  );
}

export default function CommunityPage({ params: { locale } }: { params: { locale: string } }) {
  return <CommunityContent locale={locale} />;
}
