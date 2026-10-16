import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: 'Nav Items',
      type: 'array',
      of: [defineField({
        name: 'navItem',
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label (English)', type: 'string' }),
          defineField({ name: 'labelAr', title: 'Label (Arabic)', type: 'string' }),
          defineField({ name: 'href', title: 'Path (e.g. /about)', type: 'string' }),
          defineField({ name: 'isHighlighted', title: 'Show as CTA Button', type: 'boolean', initialValue: false }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      })],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label (English)', type: 'string', initialValue: 'Join Us' }),
    defineField({ name: 'ctaLabelAr', title: 'CTA Button Label (Arabic)', type: 'string', initialValue: 'انضم إلينا' }),
    defineField({ name: 'ctaHref', title: 'CTA Button Link', type: 'string', initialValue: '/join-us' }),
  ],
  preview: { prepare: () => ({ title: 'Navigation' }) },
});
