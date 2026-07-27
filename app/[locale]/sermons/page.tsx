import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import SermonsClient from '@/components/SermonsClient';
import { fetchYouTubeVideos, youtubeToSermons } from '@/lib/youtube';
import { fallbackSermons } from '@/lib/fallback-data';

export const revalidate = 3600; // re-render page at most once per hour

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'sermons' });
  return { title: t('heroTitle') };
}

export default async function SermonsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'sermons' });

  // Fetch from YouTube RSS — falls back to static data if unavailable
  const ytVideos = await fetchYouTubeVideos();
  const sermons = ytVideos.length > 0 ? youtubeToSermons(ytVideos) : fallbackSermons;

  return (
    <>
      <HeroSection
        label={t('heroLabel')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        minHeight="min-h-[55vh]"
      />
      <SermonsClient sermons={sermons} />
    </>
  );
}
