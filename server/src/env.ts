import z from "zod";
import 'dotenv/config'

const rawEnvSchema = z.object({
  DATABASE_URL: z.string(),
  PORT : z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'prod', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
})

const _env = rawEnvSchema.safeParse(process.env)

if(_env.success === false) {
  console.error("Invalid environment variables", _env.error.format())
  throw new Error("Invalid environment variables")
}

export const env = {
  ..._env.data,
  NODE_ENV: _env.data.NODE_ENV === 'production' ? 'prod' : _env.data.NODE_ENV,
}