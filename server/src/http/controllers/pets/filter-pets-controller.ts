import { CityIsRequiredError } from "@/use-cases/errors/city-is-required-error";
import { makeFilterPetsUseCase } from "@/use-cases/factories/make-filter-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const querySchema = z.object({
  city: z.string(),
  age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']).optional(),
  size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']).optional(),
  energy_level: z.enum(['BAIXA', 'MEDIA', 'ALTA']).optional(),
  independence_level: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional(),
  environment: z.enum(['AMBIENTE_AMPLO', 'APARTAMENTO', 'AMBIENTE_REDUZIDO']).optional()
})

export async function filterPetsController(request: FastifyRequest, reply: FastifyReply){
  const { city, age, size, energy_level, independence_level, environment } = querySchema.parse(request.query)

  const filterPetsUseCase = makeFilterPetsUseCase()

  try {
    const { pets } = await filterPetsUseCase.filterPets({
      city,
      age,
      size,
      energy_level,
      independence_level,
      environment
    })

    return reply.status(200).send({
      pets
    })
  } catch (error) {
    if (error instanceof CityIsRequiredError) {
      return reply.status(400).send({
        error: error.message
      })
    }
      return reply.status(500).send({
        error: 'Internal server error'
      })
  }


}