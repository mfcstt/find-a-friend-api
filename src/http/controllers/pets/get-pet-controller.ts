import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";
import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const paramsSchema = z.object({
  pet_id: z.uuid(),
})
export async function getPetController(request: FastifyRequest, reply: FastifyReply) {

  const {pet_id} = paramsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.getPet({pet_id})
    return reply.status(200).send(pet)

  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(400).send({
        message: error.message
      })
    }
    return reply.status(500).send({
      message: 'Internal server error'
    })
  }
}