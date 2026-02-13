import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe } from "vitest";
import { makeOrgFactory } from "../factories/tests/make-org-factory";
import { hash } from "bcryptjs";
import { AuthenticateOrgsUseCase } from "../authenticate-orgs-use-case";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

describe('Authenticate Orgs Use Case', () => {
   let orgsRepository: InMemoryOrgsRepository
   let sut: AuthenticateOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgsUseCase(orgsRepository)
  })

  it('should be able to authenticate a org', async () => {
      const password = '123456'

      const org = await orgsRepository.create(makeOrgFactory({password: await hash(password, 6)}))

      const {org: orgAuthenticated} = await sut.authenticate({
        email: org.email,
        password
      })

      expect(orgAuthenticated).toEqual(org)
      
  })

  it('should not be able to authenticate a org with wrong email', async () => {
    await expect(() => sut.authenticate({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a org with wrong password', async () => {
    const password = '123456'

    const org = await orgsRepository.create(makeOrgFactory({password: await hash(password, 6)}))

    await expect(() => sut.authenticate({
      email: org.email,
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})
