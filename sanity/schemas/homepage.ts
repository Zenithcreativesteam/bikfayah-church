import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title (English)', type: 'string' }),
    defineField({ name: 'heroTitleAr', title: 'Hero Title (Arabic)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle (English)', type: 'text', rows: 2 }),
    defineField({ name: 'heroSubtitleAr', title: 'Hero Subtitle (Arabic)', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'welcomeText', title: 'Welcome Text (English)', type: 'text', rows: 4 }),
    defineField({ name: 'welcomeTextAr', title: 'Welcome Text (Arabic)', type: 'text', rows: 4 }),
    defineField({
      name: 'marqueeVerses',
      title: 'Marquee Verses',
      type: 'array',
      of: [defineField({ name: 'verse', type: 'object', fields: [
        defineField({ name: 'text', title: 'Verse Text (English)', type: 'string' }),
        defineField({ name: 'textAr', title: 'Verse Text (Arabic)', type: 'string' }),
        defineField({ name: 'ref', title: 'Reference', type: 'string' }),
      ] })],
    }),
    defineField({ name: 'featuredSermon', title: 'Featured Sermon', type: 'reference', to: [{ type: 'sermon' }] }),
  ],
  preview: { prepare: () => ({ title: 'Homepage Settings' }) },
});
