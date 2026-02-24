import { env } from '@/env';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'

const databaseUrl = new URL(env.DATABASE_URL);
databaseUrl.searchParams.delete('sslmode');
databaseUrl.searchParams.delete('uselibpqcompat');

const schema = databaseUrl.searchParams.get('schema') || 'public';

const pool = new Pool({
  connectionString: databaseUrl.toString(),
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool, { schema });

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
  adapter,
});