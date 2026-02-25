import { defineField, defineType } from 'sanity';
import { BiSolidCategoryAlt } from 'react-icons/bi';

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Product Categories',
  type: 'document',
  icon: BiSolidCategoryAlt,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Category',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .info(`Category name must have 2 characters minimum`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) =>
          doc?.name ? `${doc.name}-product-category` : `${doc.name}`,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
