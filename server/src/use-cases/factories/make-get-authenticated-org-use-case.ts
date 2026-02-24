import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { GetAuthenticatedOrgUseCase } from "../get-authenticated-org-use-case"

export function makeGetAuthenticatedOrgUseCase() {
  return new GetAuthenticatedOrgUseCase(new PrismaOrgsRepository())
}
