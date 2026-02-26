import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_WRITE_TOKEN: z.string(),
    SANITY_READ_TOKEN: z.string(),
    SANITY_STUDIO_PROJECT_ID: z.string(),
    SANITY_STUDIO_DATASET: z.string(),
    DATABASE_URL: z.string().startsWith('postgresql://'),
    SANITY_PRODUCT_WEBHOOK_SECRET: z.string(),
    SANITY_CAREER_WEBHOOK_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
