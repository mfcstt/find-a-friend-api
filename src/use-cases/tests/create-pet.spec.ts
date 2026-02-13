import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetsUseCase } from "../create-pet-use-case";
import { makePetFactory } from "../factories/tests/make-pet-factory";
import { makeOrgFactory } from "../factories/tests/make-org-factory";


describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetsUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetsUseCase(orgsRepository, petsRepository)
  })
  
  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create(makeOrgFactory())

    const {pet} = await sut.create(makePetFactory({org_id: org.id}))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

})