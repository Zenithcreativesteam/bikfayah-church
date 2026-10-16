import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'serviceTime',
  title: 'Service Time',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleAr', title: 'Title (Arabic)', type: 'string' }),
    defineField({ name: 'time', title: 'Time (English)', type: 'string', description: 'e.g. 10:00 AM' }),
    defineField({ name: 'timeAr', title: 'Time (Arabic)', type: 'string', description: 'e.g. ١٠:٠٠ صباحاً' }),
    defineField({ name: 'note', title: 'Note (English)', type: 'string' }),
    defineField({ name: 'noteAr', title: 'Note (Arabic)', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
    defineField({ name: 'day', title: 'Day', type: 'string', options: { list: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'active', title: 'Show on Site', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'time' },
  },
});
