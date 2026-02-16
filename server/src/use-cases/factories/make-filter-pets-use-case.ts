import { FilterPetsUseCase } from "../filter-pets-use-case";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeFilterPetsUseCase() {
  return new FilterPetsUseCase(new PrismaPetsRepository())
}