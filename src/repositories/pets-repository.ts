import type { Pet, Prisma } from "generated/prisma/client";

export interface FindByPetParams {
  city: string
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO'
  size?: 'PEQUENO' | 'MEDIO' | 'GRANDE'
  energy_level?: 'BAIXA' | 'MEDIA' | 'ALTA'
  independence_level?: 'BAIXO' | 'MEDIO' | 'ALTO'
  environment?: 'AMBIENTE_AMPLO' | 'APARTAMENTO' | 'AMBIENTE_REDUZIDO'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByParams(params: FindByPetParams): Promise<Pet[]>
}