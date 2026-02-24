import type { FastifyInstance } from "fastify";
import { createPetsController } from "./create-pets-controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getPetController } from "./get-pet-controller";
import { filterPetsController } from "./filter-pets-controller";
import { getMinePetsController } from "./get-mine-pets-controller";

export async function petsRoutes(app: FastifyInstance){
  app.post('/pets',{onRequest: [verifyJwt]} ,createPetsController)
  app.get('/pets/mine', { onRequest: [verifyJwt] }, getMinePetsController)
  app.get('/pets/:pet_id', getPetController)
  app.get('/pets', filterPetsController)
}