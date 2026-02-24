import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { makePetFactory } from "@/use-cases/factories/tests/make-pet-factory"
import { describe, beforeEach, it, expect } from "vitest"

import { GetMinePetsUseCase } from "../get-mine-pets-use-case"

describe("Get Mine Pets Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetMinePetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetMinePetsUseCase(petsRepository)
  })

  it("should be able to list only org pets", async () => {
    const orgId = "org-1"

    await petsRepository.create(makePetFactory({ org_id: orgId }))
    await petsRepository.create(makePetFactory({ org_id: orgId }))
    await petsRepository.create(makePetFactory({ org_id: "org-2" }))

    const { pets } = await sut.getMinePets({ org_id: orgId })

    expect(pets).toHaveLength(2)
    expect(pets.every((pet) => pet.org_id === orgId)).toBe(true)
  })
})
