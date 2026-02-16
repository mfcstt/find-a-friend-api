import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgsUseCase } from "../authenticate-orgs-use-case";

export function makeAuthenticateOrgsUseCase() {
  return new AuthenticateOrgsUseCase(new PrismaOrgsRepository())
}