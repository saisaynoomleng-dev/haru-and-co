import { generateSKU } from '@/lib/helper';
import { FaTshirt } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { defaultSlugify } from './components/defaultSlugify';
import { formatPrice, formatTitle } from '@/lib/formatters';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  icon: FaTshirt,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Product SKU',
      type: 'string',
      initialValue: generateSKU(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-${doc.sku}`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Product Brand',
      type: 'reference',
      to: [{ type: 'productBrand' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availableSizes',
      title: 'Product Sizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productSize' }] }],
    }),
    defineField({
      name: 'availableColors',
      title: 'Product Colors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productColor' }] }],
    }),
    defineField({
      name: 'gender',
      title: 'Product Gender',
      type: 'reference',
      to: [{ type: 'productGender' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discountInPercent',
      title: 'Discount In Percent',
      type: 'number',
    }),
    defineField({
      name: 'numberInStock',
      title: 'Number in Stocks',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImages',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'blockImage' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Product Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'basePrice',
      brand: 'brand.name',
      category: 'category.name',
      image: 'mainImages.0.asset',
    },
    prepare({ name, price, brand, category, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Product Name not provided';
      const priceFormatted = price ? formatPrice(price) : 'Price not provided';
      const brandFormatted = brand ? formatTitle(brand) : 'Brand not provided';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category name not provided';

      return {
        title: `${nameFormatted} | Catgory: ${categoryFormatted}`,
        subtitle: `Price: ${priceFormatted} | Brand: ${brandFormatted}`,
        media: image || FaTshirt,
      };
    },
  },
});
