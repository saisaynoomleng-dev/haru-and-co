import { defineField, defineType } from 'sanity';
import { BsBriefcase } from 'react-icons/bs';
import { defaultSlugify } from './components/defaultSlugify';
import { formatDate, formatTitle } from '@/lib/formatters';

export const careerType = defineType({
  name: 'career',
  title: 'Careers',
  icon: BsBriefcase,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Job Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-career`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postedAt',
      type: 'date',
      title: 'Posted Date',
      validation: (rule) => rule.required(),
      initialValue: new Date().toDateString(),
    }),
    defineField({
      name: 'body',
      title: 'Job Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Job Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isRemote',
      title: 'Is Remote Available',
      type: 'boolean',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      date: 'postedAt',
    },
    prepare({ name, date }) {
      const nameFormatted = name ? formatTitle(name) : 'name not provided';
      const dateFormatted = date ? formatDate(date) : 'date not provided';

      return {
        title: nameFormatted,
        subtitle: `Posted on: ${dateFormatted}`,
        media: BsBriefcase,
      };
    },
  },
});
