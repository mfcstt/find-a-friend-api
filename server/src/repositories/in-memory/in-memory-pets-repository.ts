import type { Pet, Prisma } from "generated/prisma/client";
import type { FindByPetParams, PetsRepository } from "../pets-repository";
import type { OrgsRepository } from "../orgs-repository";
import type { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items : Pet[] = [];
  
  constructor(private orgsRepository: InMemoryOrgsRepository){}
  
  async findByParams(params: FindByPetParams): Promise<Pet[]> {
     const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
     )

     const petsByOrg = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.energy_level ? item.energy_level === params.energy_level : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.independence_level ? item.independence_level === params.independence_level : true))
      .filter((item) => (params.environment ? item.environment === params.environment : true))
        
      return petsByOrg
  }


  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
      const pet = {
        id: crypto.randomUUID(),
        ...data,
        pictures: data.pictures ?? [],
        requirements: data.requirements ?? [],
      } as Pet;
      this.items.push(pet);
      return pet;
    }

    
    async findById(id: string): Promise<Pet | null> {
      const pet = this.items.find((item) => item.id === id)
      if(!pet) {
        return null
      }
      return pet
    }

}
