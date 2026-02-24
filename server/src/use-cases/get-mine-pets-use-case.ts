import type { Pet } from "generated/prisma/client"

import type { PetsRepository } from "@/repositories/pets-repository"

interface GetMinePetsUseCaseRequest {
  org_id: string
}

interface GetMinePetsUseCaseResponse {
  pets: Pet[]
}

export class GetMinePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async getMinePets({ org_id }: GetMinePetsUseCaseRequest): Promise<GetMinePetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId(org_id)

    return {
      pets,
    }
  }
}
