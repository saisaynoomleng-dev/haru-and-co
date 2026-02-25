import { defineField, defineType } from 'sanity';
import { TiDocumentText } from 'react-icons/ti';
import { defaultSlugify } from './components/defaultSlugify';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utity Pages',
  type: 'document',
  icon: TiDocumentText,
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-utility-page`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'SEO description',
          type: 'text',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Description Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
