import { describe } from "vitest";
import { FilterPetsUseCase } from "../filter-pets-use-case";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrgFactory } from "../factories/tests/make-org-factory";
import { makePetFactory } from "../factories/tests/make-pet-factory";
import { CityIsRequiredError } from "../errors/city-is-required-error";

describe("Filter Pets Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: FilterPetsUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FilterPetsUseCase(petsRepository);
  })
  it('shoul be able to filter pets by caracteristics', async () => {
    const org = await orgsRepository.create(makeOrgFactory({city: 'São Paulo'}))
    await petsRepository.create(makePetFactory({age: 'FILHOTE', org_id: org.id}))
    await petsRepository.create(makePetFactory({age: 'ADULTO', org_id: org.id}))

    const {pets} = await sut.filterPets({
      city: 'São Paulo',
      age: 'FILHOTE',
    })
    expect(pets).toHaveLength(1)
    expect(pets[0].age).toEqual('FILHOTE')
  })

    it('should not be able to filter pets without city', async () => {
      const org = await orgsRepository.create(
        makeOrgFactory({ city: 'São Paulo' })
      )

      await petsRepository.create(
        makePetFactory({ age: 'FILHOTE', org_id: org.id })
      )

      await petsRepository.create(
        makePetFactory({ age: 'ADULTO', org_id: org.id })
      )

      await expect(() =>
        sut.filterPets({
          city: '',
          age: 'FILHOTE',
        })
      ).rejects.toBeInstanceOf(CityIsRequiredError)
})
})