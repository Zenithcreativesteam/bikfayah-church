import { sanityClient, urlFor } from '@/sanity/lib/client';

// Generic fetch with error swallowing — always returns null if Sanity isn't configured
export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === 'your-project-id') return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}

export function sanityImageUrl(source: unknown): string | undefined {
  if (!source) return undefined;
  try {
    return urlFor(source).auto('format').fit('max').width(1920).url();
  } catch {
    return undefined;
  }
}

// ── Page queries ─────────────────────────────────────────
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]`,
  homePage: `*[_type == "homePage"][0]`,
  jesusPage: `*[_type == "jesusPage"][0]`,
  aboutPage: `*[_type == "aboutPage"][0]`,
  communityPage: `*[_type == "communityPage"][0]`,
  sermonsPage: `*[_type == "sermonsPage"][0]`,
  joinUsPage: `*[_type == "joinUsPage"][0]`,
  contactPage: `*[_type == "contactPage"][0]`,
  sermons: `*[_type == "sermon"] | order(date desc)`,
  featuredSermon: `*[_type == "sermon" && featured == true][0]`,
  staff: `*[_type == "staff"] | order(order asc)`,
  ministries: `*[_type == "ministry" && active == true] | order(order asc)`,
  serviceTimes: `*[_type == "serviceTime" && active == true] | order(order asc)`,
  faqItems: `*[_type == "faqItem"] | order(order asc)`,
  testimonials: `*[_type == "testimonial"]`,
  events: `*[_type == "event"] | order(date asc)`,
};
