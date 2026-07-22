import { defineField, defineType } from 'sanity';

// Reusable hero object
const heroFields = [
  defineField({ name: 'heroLabel', title: 'Hero Label (English)', type: 'string' }),
  defineField({ name: 'heroLabelAr', title: 'Hero Label (Arabic)', type: 'string' }),
  defineField({ name: 'heroTitle', title: 'Hero Title (English)', type: 'string' }),
  defineField({ name: 'heroTitleAr', title: 'Hero Title (Arabic)', type: 'string' }),
  defineField({ name: 'heroSubtitle', title: 'Hero Subtitle (English)', type: 'text', rows: 2 }),
  defineField({ name: 'heroSubtitleAr', title: 'Hero Subtitle (Arabic)', type: 'text', rows: 2 }),
  defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, description: 'Upload a photo to replace the default dark gradient' }),
  defineField({ name: 'heroOverlayOpacity', title: 'Image Overlay Opacity (0–100)', type: 'number', initialValue: 55, validation: r => r.min(0).max(100) }),
];

// ── Home Page ────────────────────────────────────────────
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'welcome', title: 'Welcome Section' },
    { name: 'sermon', title: 'Latest Sermon' },
    { name: 'gospel', title: 'Gospel Section' },
    { name: 'marquee', title: 'Scripture Marquee' },
  ],
  fields: [
    ...heroFields.map(f => ({ ...f, group: 'hero' })),
    defineField({ name: 'heroVerse', title: 'Hero Verse (English)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroVerseAr', title: 'Hero Verse (Arabic)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroCtaPrimary', title: 'Primary CTA Text (English)', type: 'string', group: 'hero', initialValue: 'Join Us Sunday' }),
    defineField({ name: 'heroCtaPrimaryAr', title: 'Primary CTA Text (Arabic)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroCtaSecondary', title: 'Secondary CTA Text (English)', type: 'string', group: 'hero', initialValue: 'Learn More' }),
    defineField({ name: 'heroCtaSecondaryAr', title: 'Secondary CTA Text (Arabic)', type: 'string', group: 'hero' }),

    // Welcome
    defineField({ name: 'welcomeTitle', title: 'Welcome Title (English)', type: 'string', group: 'welcome' }),
    defineField({ name: 'welcomeTitleAr', title: 'Welcome Title (Arabic)', type: 'string', group: 'welcome' }),
    defineField({ name: 'welcomeText', title: 'Welcome Text (English)', type: 'text', rows: 4, group: 'welcome' }),
    defineField({ name: 'welcomeTextAr', title: 'Welcome Text (Arabic)', type: 'text', rows: 4, group: 'welcome' }),
    defineField({ name: 'welcomeImage', title: 'Welcome Section Image', type: 'image', options: { hotspot: true }, group: 'welcome' }),
    defineField({ name: 'welcomeQuote', title: 'Welcome Quote (English)', type: 'string', group: 'welcome' }),
    defineField({ name: 'welcomeQuoteAr', title: 'Welcome Quote (Arabic)', type: 'string', group: 'welcome' }),

    // Sermon
    defineField({ name: 'featuredSermon', title: 'Featured Sermon', type: 'reference', to: [{ type: 'sermon' }], group: 'sermon' }),

    // Gospel
    defineField({ name: 'gospelTitle', title: 'Gospel Section Title (English)', type: 'string', group: 'gospel' }),
    defineField({ name: 'gospelTitleAr', title: 'Gospel Section Title (Arabic)', type: 'string', group: 'gospel' }),
    defineField({ name: 'gospelText', title: 'Gospel Section Text (English)', type: 'text', rows: 3, group: 'gospel' }),
    defineField({ name: 'gospelTextAr', title: 'Gospel Section Text (Arabic)', type: 'text', rows: 3, group: 'gospel' }),
    defineField({ name: 'gospelImage', title: 'Gospel Section Background', type: 'image', options: { hotspot: true }, group: 'gospel' }),

    // Marquee
    defineField({
      name: 'marqueeVerses',
      title: 'Scripture Marquee Verses',
      type: 'array',
      group: 'marquee',
      of: [{ type: 'object', fields: [
        defineField({ name: 'text', title: 'Verse (English)', type: 'string' }),
        defineField({ name: 'textAr', title: 'Verse (Arabic)', type: 'string' }),
      ], preview: { select: { title: 'text' } } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
});

// ── Jesus Page ───────────────────────────────────────────
export const jesusPage = defineType({
  name: 'jesusPage',
  title: 'Jesus Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'who', title: 'Who Is Jesus' },
    { name: 'gospel', title: 'Gospel Steps' },
    { name: 'prayer', title: 'Prayer Section' },
  ],
  fields: [
    ...heroFields.map(f => ({ ...f, group: 'hero' })),
    defineField({ name: 'whoTitle', title: 'Who Is Jesus — Title (EN)', type: 'string', group: 'who' }),
    defineField({ name: 'whoTitleAr', title: 'Who Is Jesus — Title (AR)', type: 'string', group: 'who' }),
    defineField({ name: 'whoText', title: 'Who Is Jesus — Text (EN)', type: 'text', rows: 4, group: 'who' }),
    defineField({ name: 'whoTextAr', title: 'Who Is Jesus — Text (AR)', type: 'text', rows: 4, group: 'who' }),
    defineField({ name: 'whoImage', title: 'Who Is Jesus — Image', type: 'image', options: { hotspot: true }, group: 'who' }),
    defineField({ name: 'verseJohn', title: 'John 1:1 Verse (EN)', type: 'string', group: 'who' }),
    defineField({ name: 'verseJohnAr', title: 'John 1:1 Verse (AR)', type: 'string', group: 'who' }),
    defineField({
      name: 'gospelSteps',
      title: 'Gospel Steps (4 steps)',
      type: 'array',
      group: 'gospel',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Step Title (EN)', type: 'string' }),
        defineField({ name: 'titleAr', title: 'Step Title (AR)', type: 'string' }),
        defineField({ name: 'text', title: 'Step Text (EN)', type: 'text', rows: 2 }),
        defineField({ name: 'textAr', title: 'Step Text (AR)', type: 'text', rows: 2 }),
        defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
      ], preview: { select: { title: 'title' } } }],
    }),
    defineField({ name: 'verseGospel', title: 'Gospel Verse (EN)', type: 'string', group: 'gospel' }),
    defineField({ name: 'verseGospelAr', title: 'Gospel Verse (AR)', type: 'string', group: 'gospel' }),
    defineField({ name: 'prayerTitle', title: 'Prayer Section Title (EN)', type: 'string', group: 'prayer' }),
    defineField({ name: 'prayerTitleAr', title: 'Prayer Section Title (AR)', type: 'string', group: 'prayer' }),
    defineField({ name: 'prayerText', title: 'Prayer Intro Text (EN)', type: 'text', rows: 2, group: 'prayer' }),
    defineField({ name: 'prayerTextAr', title: 'Prayer Intro Text (AR)', type: 'text', rows: 2, group: 'prayer' }),
    defineField({ name: 'prayerSample', title: 'Sample Prayer (EN)', type: 'text', rows: 4, group: 'prayer' }),
    defineField({ name: 'prayerSampleAr', title: 'Sample Prayer (AR)', type: 'text', rows: 4, group: 'prayer' }),
    defineField({ name: 'prayerImage', title: 'Prayer Section Background', type: 'image', options: { hotspot: true }, group: 'prayer' }),
  ],
  preview: { prepare: () => ({ title: 'Jesus Page' }) },
});

// ── About Page ───────────────────────────────────────────
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'beliefs', title: 'Beliefs (1689 LBCF)' },
    { name: 'history', title: 'Church History' },
  ],
  fields: [
    ...heroFields.map(f => ({ ...f, group: 'hero' })),
    defineField({ name: 'beliefsIntro', title: 'Beliefs Intro (EN)', type: 'text', rows: 2, group: 'beliefs' }),
    defineField({ name: 'beliefsIntroAr', title: 'Beliefs Intro (AR)', type: 'text', rows: 2, group: 'beliefs' }),
    defineField({
      name: 'confessionChapters',
      title: 'Confession Chapters',
      type: 'array',
      group: 'beliefs',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Chapter Title (EN)', type: 'string' }),
        defineField({ name: 'titleAr', title: 'Chapter Title (AR)', type: 'string' }),
        defineField({ name: 'content', title: 'Chapter Content (EN)', type: 'text', rows: 4 }),
        defineField({ name: 'contentAr', title: 'Chapter Content (AR)', type: 'text', rows: 4 }),
      ], preview: { select: { title: 'title' } } }],
    }),
    defineField({
      name: 'timeline',
      title: 'History Timeline',
      type: 'array',
      group: 'history',
      of: [{ type: 'object', fields: [
        defineField({ name: 'year', title: 'Year / Label', type: 'string' }),
        defineField({ name: 'title', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'titleAr', title: 'Title (AR)', type: 'string' }),
        defineField({ name: 'text', title: 'Description (EN)', type: 'text', rows: 2 }),
        defineField({ name: 'textAr', title: 'Description (AR)', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Timeline Image', type: 'image', options: { hotspot: true } }),
      ], preview: { select: { title: 'year', subtitle: 'title' } } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
});

// ── Community Page ───────────────────────────────────────
export const communityPage = defineType({
  name: 'communityPage',
  title: 'Community Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'youth', title: 'Youth Ministry' },
    { name: 'bible', title: 'Bible Study' },
  ],
  fields: [
    ...heroFields.map(f => ({ ...f, group: 'hero' })),
    defineField({ name: 'youthTitle', title: 'Youth Title (EN)', type: 'string', group: 'youth' }),
    defineField({ name: 'youthTitleAr', title: 'Youth Title (AR)', type: 'string', group: 'youth' }),
    defineField({ name: 'youthText', title: 'Youth Text (EN)', type: 'text', rows: 3, group: 'youth' }),
    defineField({ name: 'youthTextAr', title: 'Youth Text (AR)', type: 'text', rows: 3, group: 'youth' }),
    defineField({ name: 'youthImage', title: 'Youth Ministry Image', type: 'image', options: { hotspot: true }, group: 'youth' }),
    defineField({ name: 'bibleTitle', title: 'Bible Study Title (EN)', type: 'string', group: 'bible' }),
    defineField({ name: 'bibleTitleAr', title: 'Bible Study Title (AR)', type: 'string', group: 'bible' }),
    defineField({ name: 'bibleText', title: 'Bible Study Text (EN)', type: 'text', rows: 3, group: 'bible' }),
    defineField({ name: 'bibleTextAr', title: 'Bible Study Text (AR)', type: 'text', rows: 3, group: 'bible' }),
    defineField({ name: 'bibleImage', title: 'Bible Study Image', type: 'image', options: { hotspot: true }, group: 'bible' }),
  ],
  preview: { prepare: () => ({ title: 'Community Page' }) },
});

// ── Sermons Page ─────────────────────────────────────────
export const sermonsPage = defineType({
  name: 'sermonsPage',
  title: 'Sermons Page',
  type: 'document',
  fields: [
    ...heroFields,
    defineField({ name: 'featuredSermon', title: 'Featured Sermon', type: 'reference', to: [{ type: 'sermon' }] }),
  ],
  preview: { prepare: () => ({ title: 'Sermons Page' }) },
});

// ── Join Us Page ─────────────────────────────────────────
export const joinUsPage = defineType({
  name: 'joinUsPage',
  title: 'Join Us Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'families', title: 'Families Section' },
    { name: 'expect', title: 'What to Expect' },
  ],
  fields: [
    ...heroFields.map(f => ({ ...f, group: 'hero' })),
    defineField({ name: 'familiesTitle', title: 'Families Section Title (EN)', type: 'string', group: 'families' }),
    defineField({ name: 'familiesTitleAr', title: 'Families Section Title (AR)', type: 'string', group: 'families' }),
    defineField({ name: 'familiesText', title: 'Families Section Text (EN)', type: 'text', rows: 3, group: 'families' }),
    defineField({ name: 'familiesTextAr', title: 'Families Section Text (AR)', type: 'text', rows: 3, group: 'families' }),
    defineField({ name: 'familiesImage', title: 'Families Section Background', type: 'image', options: { hotspot: true }, group: 'families' }),
    defineField({
      name: 'expectations',
      title: 'What to Expect Items',
      type: 'array',
      group: 'expect',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'titleAr', title: 'Title (AR)', type: 'string' }),
        defineField({ name: 'text', title: 'Text (EN)', type: 'text', rows: 2 }),
        defineField({ name: 'textAr', title: 'Text (AR)', type: 'text', rows: 2 }),
        defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
      ], preview: { select: { title: 'title' } } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Join Us Page' }) },
});

// ── Contact Page ─────────────────────────────────────────
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    ...heroFields,
    defineField({ name: 'prayerIntroText', title: 'Prayer Form Intro (EN)', type: 'text', rows: 2 }),
    defineField({ name: 'prayerIntroTextAr', title: 'Prayer Form Intro (AR)', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
});
