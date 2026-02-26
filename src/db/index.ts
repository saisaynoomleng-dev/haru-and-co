import 'dotenv';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '@/lib/env/server';

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema, logger: true });
