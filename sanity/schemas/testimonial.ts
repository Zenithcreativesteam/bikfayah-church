import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote (English)', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'quoteAr', title: 'Quote (Arabic)', type: 'text', rows: 4 }),
    defineField({ name: 'author', title: 'Author Name', type: 'string' }),
    defineField({ name: 'role', title: 'Author Role / Description', type: 'string' }),
    defineField({ name: 'photo', title: 'Author Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'quote', media: 'photo' },
    prepare: ({ title, subtitle, media }) => ({ title: title ?? 'Anonymous', subtitle: (subtitle ?? '').slice(0, 80), media }),
  },
});
