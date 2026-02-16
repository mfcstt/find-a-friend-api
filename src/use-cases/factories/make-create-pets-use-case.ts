import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreatePetsUseCase } from "../create-pets-use-case";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreatePetsUseCase() {
  return new CreatePetsUseCase(new PrismaOrgsRepository(), new PrismaPetsRepository())
}