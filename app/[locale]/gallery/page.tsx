import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import GalleryClient from '@/components/GalleryClient';
import { churchImages, galleryPhotos } from '@/lib/church-images';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'gallery' });
  return { title: t('heroTitle'), description: t('heroSubtitle') };
}

export default async function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'gallery' });

  return (
    <>
      <HeroSection
        label={t('heroLabel')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        minHeight="min-h-[55vh]"
        backgroundImageUrl={churchImages.galleryHero}
      />
      <section className="section-warm">
        <div className="container-church">
          <GalleryClient
            photos={galleryPhotos}
            labels={{ close: t('close'), prev: t('prev'), next: t('next'), photoAlt: t('photoAlt') }}
          />
        </div>
      </section>
    </>
  );
}
