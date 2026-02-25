import { IoColorPalette } from 'react-icons/io5';
import { defineField, defineType } from 'sanity';
import { defaultSlugify } from './components/defaultSlugify';

export const productColorType = defineType({
  name: 'productColor',
  title: 'Product Colors',
  icon: IoColorPalette,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'SLug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-color`,
        slugify: defaultSlugify,
      },
    }),
  ],
});
