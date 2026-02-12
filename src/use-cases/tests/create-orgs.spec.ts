import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { CreateOrgsUseCase } from "../create-orgs-use-case";
import { makeOrgFactory } from "../factories/tests/make-org-factory";


describe('Create Orgs Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreateOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgsUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const {org} = await sut.create(makeOrgFactory())


    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

})