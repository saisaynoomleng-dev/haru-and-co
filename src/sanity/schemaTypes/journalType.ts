import { FaNewspaper } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { defaultSlugify } from './components/defaultSlugify';
import { formatTitle } from '@/lib/formatters';

export const journalType = defineType({
  name: 'journal',
  title: 'Journal',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Journal Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-journal`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minRead',
      title: 'Reading Duration',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'journalCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Journal Cover',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Journal Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      category: 'category.name',
      author: 'author.name',
      date: 'publishedAt',
      image: 'mainImage',
    },
    prepare({ name, category, author, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const cateogryFormatted = category
        ? formatTitle(category)
        : 'category not provided';
      const authorFormatted = author
        ? formatTitle(author)
        : 'author not provided';

      return {
        title: nameFormatted,
        subtitle: `Category: ${cateogryFormatted} | Author: ${authorFormatted}`,
        media: image || FaNewspaper,
      };
    },
  },
});
