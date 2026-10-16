import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'questionAr', title: 'Question (Arabic)', type: 'string' }),
    defineField({ name: 'answer', title: 'Answer (English)', type: 'text', rows: 3 }),
    defineField({ name: 'answerAr', title: 'Answer (Arabic)', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'page', title: 'Page', type: 'string', options: { list: ['join-us', 'general', 'contact'] }, initialValue: 'join-us' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'page' } },
});
