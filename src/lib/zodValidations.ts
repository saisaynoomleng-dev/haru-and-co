import z from 'zod';

export const sanityProductWebhookSchema = z.object({
  _id: z.string().min(10, 'must have at least 10 characters'),
  basePrice: z.number().positive(),
  mainImages: z.object({
    alt: z.string(),
    asset: z.object({
      url: z.string().startsWith('https://cdn.sanity.io/'),
    }),
  }),
  numberInStock: z.number().min(0),
});

export const sanityCareerWebhookSchema = z.object({
  _id: z.string().min(10, 'must have at least 10 characters'),
  name: z.string(),
  location: z.string(),
  isRemote: z.boolean(),
  postedAt: z.string(),
});
