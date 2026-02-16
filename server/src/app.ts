import fastify from "fastify"
import { orgRoutes } from "./http/controllers/org/routes"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import fastifyCookie from "@fastify/cookie"
import z, { ZodError } from "zod"
import { petsRoutes } from "./http/controllers/pets/routes"

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "7d"
  }
})

app.register(orgRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, request, reply) => {
  if(error instanceof ZodError){
    return reply.status(400).send({
      message: 'Validation error',
      issues: z.treeifyError(error)
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }else{
    // TODO: log error to an external service like Sentry
  }
  return reply.status(500).send({
    message: 'Internal server error'
  })
})

