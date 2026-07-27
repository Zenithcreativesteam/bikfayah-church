// ────────────────────────────────────────────────────────────
// YouTube RSS feed fetcher — no API key required
// Channel: @bikfayayouth  (UCWt3FhDq43qRgZ6olELrQSw)
// ────────────────────────────────────────────────────────────

import { Sermon } from './fallback-data';

const CHANNEL_ID = 'UCWt3FhDq43qRgZ6olELrQSw';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim() : '';
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i');
  const m = xml.match(re);
  return m ? m[1] : '';
}

export interface YouTubeVideo {
  videoId: string;
  title: string;
  published: string;
  description: string;
  thumbnailUrl: string;
  watchUrl: string;
  embedUrl: string;
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 }, // re-fetch at most once per hour
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? [];

    return entries.map((entry): YouTubeVideo => {
      const videoId = extractTag(entry, 'yt:videoId');
      const title = extractTag(entry, 'title');
      const published = extractTag(entry, 'published');
      const description = entry.match(/<media:description>([\s\S]*?)<\/media:description>/i)?.[1]?.trim() ?? '';

      return {
        videoId,
        title,
        published: published.split('T')[0],
        description,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };
    });
  } catch {
    return [];
  }
}

/** Map YouTube videos → Sermon shape for SermonCard compatibility */
export function youtubeToSermons(videos: YouTubeVideo[]): Sermon[] {
  return videos.map((v, i): Sermon => ({
    _id: v.videoId,
    slug: v.videoId,
    title: v.title,
    titleAr: v.title, // titles may be Arabic already
    speaker: 'Bikfaya Baptist Youth',
    speakerAr: 'شبيبة كنيسة بكفيّا المعمدانية',
    date: v.published,
    series: 'Bikfaya Baptist Youth',
    seriesAr: 'شبيبة كنيسة بكفيّا',
    scripture: '',
    duration: 0,
    youtubeUrl: v.watchUrl,
    thumbnailUrl: v.thumbnailUrl,
    excerpt: v.description.slice(0, 220) || 'Watch this sermon on YouTube.',
    excerptAr: v.description.slice(0, 220) || 'شاهد هذه العظة على يوتيوب.',
    tags: [],
    featured: i === 0,
  }));
}
