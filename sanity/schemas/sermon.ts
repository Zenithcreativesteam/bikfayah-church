import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleAr', title: 'Title (Arabic)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'speaker', title: 'Speaker (English)', type: 'string' }),
    defineField({ name: 'speakerAr', title: 'Speaker (Arabic)', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'series', title: 'Series (English)', type: 'string' }),
    defineField({ name: 'seriesAr', title: 'Series (Arabic)', type: 'string' }),
    defineField({ name: 'scripture', title: 'Scripture Reference', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration (minutes)', type: 'number' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'audioFile', title: 'Audio File', type: 'file', options: { accept: 'audio/*' } }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Excerpt (English)', type: 'text', rows: 3 }),
    defineField({ name: 'excerptAr', title: 'Excerpt (Arabic)', type: 'text', rows: 3 }),
    defineField({ name: 'transcript', title: 'Transcript (English)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'transcriptAr', title: 'Transcript (Arabic)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'featured', title: 'Featured Sermon', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', speaker: 'speaker', date: 'date', media: 'thumbnail' },
    prepare: ({ title, speaker, date, media }) => ({
      title,
      subtitle: `${speaker ?? 'Unknown'} · ${date ?? ''}`,
      media,
    }),
  },
});
