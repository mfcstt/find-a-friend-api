import { AuthenticateOrgsController } from "./authenticate-orgs-controller";
import { CreateOrgsController } from "./create-orgs-controller";
import { refreshTokenController } from "./refresh-token-controller";
import type { FastifyInstance } from "fastify";

export async function orgRoutes(app: FastifyInstance){
  app.post('/orgs', CreateOrgsController)
  app.post('/orgs/authenticate', AuthenticateOrgsController)
  app.patch('/orgs/refresh', refreshTokenController)
}