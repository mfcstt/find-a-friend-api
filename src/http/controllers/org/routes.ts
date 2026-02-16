import { CreateOrgController } from "./create-org-controller";
import type { FastifyInstance } from "fastify";

export async function orgRoutes(app: FastifyInstance){
  app.post('/orgs', CreateOrgController)
}