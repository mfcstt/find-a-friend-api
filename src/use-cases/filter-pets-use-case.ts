import type { PetsRepository } from "@/repositories/pets-repository"
import type { Pet } from "generated/prisma/client"

interface FilterPetsUseCaseDTO {
  city: string
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO'
  size?: 'PEQUENO' | 'MEDIO' | 'GRANDE'
  energyLevel?: 'BAIXA' | 'MEDIA' | 'ALTA'
  independeLevel?: 'BAIXO' | 'MEDIO' | 'ALTO'
  environment?: 'AMBIENTE_AMPLO' | 'APARTAMENTO' | 'AMBIENTE_REDUZIDO'
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository){}

  async filterPets({
    city,
    age,
    size,
    energyLevel,
    independeLevel,
    environment
  }: FilterPetsUseCaseDTO): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByParams({
      city,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independeLevel,
      environment
    })
    return {
      pets
    }
  }
}