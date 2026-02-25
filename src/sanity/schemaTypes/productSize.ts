import { defineField, defineType } from 'sanity';
import { IoResize } from 'react-icons/io5';
import { defaultSlugify } from './components/defaultSlugify';

export const productSizeType = defineType({
  name: 'productSize',
  icon: IoResize,
  title: 'Product Sizes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Size',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-size`,
        slugify: defaultSlugify,
      },
    }),
  ],
});
