import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleAr', title: 'Title (Arabic)', type: 'string' }),
    defineField({ name: 'date', title: 'Date & Time', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description (English)', type: 'text', rows: 4 }),
    defineField({ name: 'descriptionAr', title: 'Description (Arabic)', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Event Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['worship', 'youth', 'community', 'outreach', 'special'] } }),
  ],
  orderings: [{ title: 'Date, Upcoming', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '', media }),
  },
});
