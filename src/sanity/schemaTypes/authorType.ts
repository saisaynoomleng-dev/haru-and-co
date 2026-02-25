import { defineField, defineType } from 'sanity';
import { LuUserPen } from 'react-icons/lu';
import { defaultSlugify } from './components/defaultSlugify';
import { formatTitle } from '@/lib/formatters';

export const authorType = defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: LuUserPen,
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-author`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLink',
      title: 'Social Link',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Author Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Author Bio',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const nameFormatted = name ? formatTitle(name) : 'name not provided';
      return {
        title: nameFormatted,
        media: image || LuUserPen,
      };
    },
  },
});
