import { BiCategory } from 'react-icons/bi';
import { defineField, defineType } from 'sanity';
import { defaultSlugify } from './components/defaultSlugify';

export const journalCategoryType = defineType({
  name: 'journalCategory',
  icon: BiCategory,
  title: 'Journal Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-journal-category`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
