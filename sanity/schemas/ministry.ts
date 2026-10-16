import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleAr', title: 'Title (Arabic)', type: 'string' }),
    defineField({ name: 'description', title: 'Description (English)', type: 'text', rows: 2 }),
    defineField({ name: 'descriptionAr', title: 'Description (Arabic)', type: 'text', rows: 2 }),
    defineField({ name: 'icon', title: 'Icon (Emoji or text)', type: 'string', description: 'Paste an emoji e.g. 🎵' }),
    defineField({ name: 'image', title: 'Ministry Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'color', title: 'Accent Color (hex)', type: 'string', description: 'Optional card accent color' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'active', title: 'Show on Site', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle: (subtitle ?? '').slice(0, 60), media }),
  },
});
