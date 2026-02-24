import { AuthenticateOrgsController } from "./authenticate-orgs-controller";
import { CreateOrgsController } from "./create-orgs-controller";
import { getAuthenticatedOrgController } from "./get-authenticated-org-controller";
import { refreshTokenController } from "./refresh-token-controller";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function orgRoutes(app: FastifyInstance){
  app.post('/orgs', CreateOrgsController)
  app.post('/orgs/authenticate', AuthenticateOrgsController)
  app.patch('/orgs/refresh', refreshTokenController)
  app.get('/orgs/me', {onRequest: [verifyJwt]}, getAuthenticatedOrgController)
}