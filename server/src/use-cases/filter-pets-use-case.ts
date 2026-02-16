import type { PetsRepository } from "@/repositories/pets-repository"
import type { Pet } from "generated/prisma/client"
import { CityIsRequiredError } from "./errors/city-is-required-error"

interface FilterPetsUseCaseDTO {
  city: string
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO'
  size?: 'PEQUENO' | 'MEDIO' | 'GRANDE'
  energy_level?: 'BAIXA' | 'MEDIA' | 'ALTA'
  independence_level?: 'BAIXO' | 'MEDIO' | 'ALTO'
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
    energy_level,
    independence_level,
    environment
  }: FilterPetsUseCaseDTO): Promise<FilterPetsUseCaseResponse> {

    if(!city || city.trim() === '' || city === null) {
      throw new CityIsRequiredError()
    }

    const pets = await this.petsRepository.findByParams({
      city,
      age,
      size,
      energy_level,
      independence_level,
      environment
    })
    return {
      pets
    }
  }
}