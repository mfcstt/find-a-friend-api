import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe } from "vitest";
import { GetPetUseCase } from "../get-pet-use-case";
import { makePetFactory } from "../factories/tests/make-pet-factory";


describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const pet = await petsRepository.create(makePetFactory())

    const {pet: petFound} = await sut.getPet({pet_id: pet.id})

    expect(petFound).toEqual(expect.objectContaining({
      id: pet.id
    }))
  })
})