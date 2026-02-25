import { FaHashtag } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { defaultSlugify } from './components/defaultSlugify';

export const productTagType = defineType({
  name: 'productTag',
  title: 'Product Tags',
  type: 'document',
  icon: FaHashtag,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Tag Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-tag`,
        slugify: defaultSlugify,
      },
    }),
  ],
});
