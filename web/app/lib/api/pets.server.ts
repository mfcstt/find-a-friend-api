import { backendRequest } from "~/lib/api/backend-client.server"
import type { CreatePetInput, FilterPetsInput, Pet } from "~/lib/api/types"

interface FilterPetsResponse {
  pets: Pet[]
}

export async function filterPets(input: FilterPetsInput) {
  const query = new URLSearchParams()

  query.set("city", input.city)

  if (input.age) query.set("age", input.age)
  if (input.size) query.set("size", input.size)
  if (input.energy_level) query.set("energy_level", input.energy_level)
  if (input.independence_level) query.set("independence_level", input.independence_level)
  if (input.environment) query.set("environment", input.environment)

  const result = await backendRequest<FilterPetsResponse>(`/pets?${query.toString()}`)
  return result.pets
}

export async function getPetById(petId: string) {
  return backendRequest<Pet>(`/pets/${petId}`)
}

export async function createPet(input: CreatePetInput, token: string) {
  return backendRequest<Pet>("/pets", {
    method: "POST",
    body: input,
    token,
  })
}