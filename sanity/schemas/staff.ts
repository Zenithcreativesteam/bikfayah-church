import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'staff',
  title: 'Staff Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'nameAr', title: 'Name (Arabic)', type: 'string' }),
    defineField({ name: 'role', title: 'Role (English)', type: 'string' }),
    defineField({ name: 'roleAr', title: 'Role (Arabic)', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio (English)', type: 'text', rows: 5 }),
    defineField({ name: 'bioAr', title: 'Bio (Arabic)', type: 'text', rows: 5 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
