import type { PetsRepository } from "@/repositories/pets-repository"
import type { Pet } from "generated/prisma/client"
import { PetNotFoundError } from "./errors/pet-not-found-error"


interface GetPetUseCaseRequest {
  pet_id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}


export class GetPetUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async getPet ({
     pet_id 
    }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {

  const pet = await this.petsRepository.findById(pet_id)

  if(!pet) {
    throw new PetNotFoundError()
  }

  return {
    pet
  }

  }
}