import type { Pet, Prisma } from "generated/prisma/client";
import type { PetUncheckedCreateInput } from "generated/prisma/models";
import type { PetsRepository } from "../pets-repository";

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

}