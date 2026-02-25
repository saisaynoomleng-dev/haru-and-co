import { defineField, defineType } from 'sanity';
import { SiNike } from 'react-icons/si';
import { formatTitle } from '@/lib/formatters';
import { defaultSlugify } from './components/defaultSlugify';

export const productBrandType = defineType({
  name: 'productBrand',
  title: 'Product Brands',
  icon: SiNike,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .info(`Brand name must have 2 characters minimum`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) =>
          doc.name ? `${doc.name}-product-brand` : `${doc.name}`,
        slugify: defaultSlugify,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'blockImage',
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
        media: image || SiNike,
      };
    },
  },
});
