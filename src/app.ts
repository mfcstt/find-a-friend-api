import fastify from "fastify"
import { orgRoutes } from "./http/controllers/org/routes"

export const app = fastify()

app.register(orgRoutes)

