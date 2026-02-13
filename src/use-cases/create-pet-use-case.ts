import type { Age, EnergyLevel, Environment, IndependenceLevel, Pet, Size } from "generated/prisma/client";
import type { PetsRepository } from "@/repositories/pets-repository";
import type { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgNotFoundError } from "./errors/org-not-found-error";

interface CreatePetsUseCaseRequest {
  name: string
  about: string
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment: Environment
  pictures: string[]
  requirements: string[]
  org_id: string
}

interface CreatePetsUseCaseResponse {
  pet: Pet
}


export class CreatePetsUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ){}

  async create({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    pictures,
    requirements,
    org_id
  }: CreatePetsUseCaseRequest): Promise<CreatePetsUseCaseResponse> {

  const org = await this.orgsRepository.findById(org_id);

  if(!org){
    throw new OrgNotFoundError()
  }
  
  const pet = await this.petsRepository.create({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    pictures,
    requirements,
    org_id: org.id
  })

  return {
    pet,
  }
  }
}