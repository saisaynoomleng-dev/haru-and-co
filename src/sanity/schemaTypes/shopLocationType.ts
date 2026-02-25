import { defineField, defineType } from 'sanity';
import { CiLocationOn } from 'react-icons/ci';
import { defaultSlugify } from './components/defaultSlugify';
import { formatTitle } from '@/lib/formatters';

export const shopLocationType = defineType({
  name: 'shopLocation',
  title: 'Shop Locations',
  icon: CiLocationOn,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Shop Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-store-name`,
        slugify: defaultSlugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addr1',
      title: 'Address 1',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addr2',
      title: 'Address 2',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'zip',
      title: 'Zip Code',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'long',
      title: 'Longitude',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Store Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      city: 'city',
      country: 'country',
      image: 'mainImage',
    },
    prepare({ name, city, country, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Store Name not provided';
      const address =
        city && country
          ? `${formatTitle(city)}, ${formatTitle(country)}`
          : 'Address not provided';

      return {
        title: nameFormatted,
        subtitle: address,
        media: image || CiLocationOn,
      };
    },
  },
});
