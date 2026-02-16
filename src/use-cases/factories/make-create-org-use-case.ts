import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgsUseCase } from "../create-orgs-use-case";

export function makeCreateOrgUseCase() {
  return new CreateOrgsUseCase(new PrismaOrgsRepository())
}