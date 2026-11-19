import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import TestimonialCard from '@/components/TestimonialCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import { fallbackTestimonials } from '@/lib/fallback-data';
import { churchImages } from '@/lib/church-images';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'community' });
  return { title: 'Community', description: t('heroSubtitle') };
}

function CommunityContent({ locale }: { locale: string }) {
  const t = useTranslations('community');

  return (
    <>
      {/* Hero — CTA lives inside the hero, no awkward separate section */}
      <HeroSection label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSubtitle')} backgroundImageUrl={churchImages.communityHero}>
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
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[26rem] md:h-[30rem]">
              <img
                src={churchImages.youthCollage[0]}
                alt={locale === 'ar' ? 'شباب الكنيسة في رحلة' : 'Church youth on a hike'}
                className="row-span-2 h-full w-full rounded-3xl object-cover shadow-warm-lg"
              />
              <img src={churchImages.youthCollage[1]} alt={locale === 'ar' ? 'مجموعة الشباب' : 'Youth group'} loading="lazy" className="h-full w-full rounded-3xl object-cover shadow-warm-md" />
              <img src={churchImages.youthCollage[2]} alt={locale === 'ar' ? 'سهرة ألعاب للشباب' : 'Youth game night'} loading="lazy" className="h-full w-full rounded-3xl object-cover shadow-warm-md" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Weekly Bible Study */}
      <section className="section-parchment">
        <div className="container-church grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll direction="left">
            <div
              className="rounded-3xl h-80 md:h-[26rem] flex items-end justify-start shadow-warm-lg order-2 md:order-1 bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(to top, rgba(15,32,68,0.9), rgba(15,32,68,0.15) 65%), url(${churchImages.communityBible})` }}
            >
              <p className="font-serif text-white italic text-2xl p-8">
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
      <section
        className="py-24 px-4 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(15,32,68,0.88), rgba(15,32,68,0.88)), url(${churchImages.testimonialsBand})` }}
      >
        <div className="container-church">
          <RevealOnScroll>
            <SectionHeader label={t('testimonialsLabel')} title={t('testimonialsTitle')} light />
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
