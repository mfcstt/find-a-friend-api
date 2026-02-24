import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { describe, beforeEach, it, expect } from "vitest"

import { OrgNotFoundError } from "../errors/org-not-found-error"
import { makeOrgFactory } from "../factories/tests/make-org-factory"
import { GetAuthenticatedOrgUseCase } from "../get-authenticated-org-use-case"

describe("Get Authenticated Org Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: GetAuthenticatedOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetAuthenticatedOrgUseCase(orgsRepository)
  })

  it("should be able to get an org by id", async () => {
    const createdOrg = await orgsRepository.create(makeOrgFactory())

    const { org } = await sut.getAuthenticatedOrg({ org_id: createdOrg.id })

    expect(org.id).toEqual(createdOrg.id)
    expect(org.email).toEqual(createdOrg.email)
  })

  it("should not be able to get an org with invalid id", async () => {
    await expect(() =>
      sut.getAuthenticatedOrg({
        org_id: "invalid-org-id",
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
