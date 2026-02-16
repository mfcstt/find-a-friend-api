import type { Pet } from "generated/prisma/client";
import type { PetUncheckedCreateInput } from "generated/prisma/models";
import type { FindByPetParams, PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository{
  async create(data: PetUncheckedCreateInput){
    const pet =await prisma.pet.create({
      data
    })
    return pet
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })
    return pet
  }

  async findByParams(params: FindByPetParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: params.city,
        },
        age: params.age ?? undefined,
        size: params.size ?? undefined,
        energy_level: params.energy_level ?? undefined,
        independence_level: params.independence_level ?? undefined,
        environment: params.environment ?? undefined,
      }
      }
    )
    return pets
  }

}