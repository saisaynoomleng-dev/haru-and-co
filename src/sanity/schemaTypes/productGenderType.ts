import { defineField, defineType } from 'sanity';
import { FaTransgenderAlt } from 'react-icons/fa';
import { defaultSlugify } from './components/defaultSlugify';

export const productGenderType = defineType({
  name: 'productGender',
  title: 'Product Genders',
  icon: FaTransgenderAlt,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Gender Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-gender`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
