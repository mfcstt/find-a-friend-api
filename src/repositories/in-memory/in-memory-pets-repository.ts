import type { Pet, Prisma } from "generated/prisma/client";
import type { PetUncheckedCreateInput } from "generated/prisma/models";
import type { FindByPetParams, PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items : Pet[] = [];
  
  
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

    async findByParams(params: FindByPetParams): Promise<Pet[]> {
      return this.items.filter((item) => {
        for (const key in params) {
          if (item[key as keyof Pet] !== params[key as keyof FindByPetParams]) {
            return false;
          }
        }
        return true;
      });
    }

}