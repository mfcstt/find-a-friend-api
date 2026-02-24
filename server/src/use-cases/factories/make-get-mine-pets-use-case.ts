import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"

import { GetMinePetsUseCase } from "../get-mine-pets-use-case"

export function makeGetMinePetsUseCase() {
  return new GetMinePetsUseCase(new PrismaPetsRepository())
}
