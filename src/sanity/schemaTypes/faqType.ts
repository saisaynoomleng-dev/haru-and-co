import { FaQuestion } from 'react-icons/fa';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { defaultSlugify } from './components/defaultSlugify';

export const faqType = defineType({
  name: 'faq',
  title: 'FAQs',
  icon: FaQuestion,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'FAQ titles',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-faq`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'question',
          type: 'string',
        }),
        defineArrayMember({
          name: 'answer',
          type: 'text',
        }),
      ],
    }),
  ],
});
