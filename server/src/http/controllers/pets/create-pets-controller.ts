import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";
import { makeCreatePetsUseCase } from "@/use-cases/factories/make-create-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
  size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
  energy_level: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
  independence_level: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
  environment: z.enum(['AMBIENTE_AMPLO', 'APARTAMENTO', 'AMBIENTE_REDUZIDO']),
  pictures: z.array(z.string()),
  requirements: z.array(z.string()),
})
export async function createPetsController(request: FastifyRequest, reply: FastifyReply) {

  const body = bodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetsUseCase()

  const org_id = (request.user as { sub: string }).sub


  try {
    const { pet } = await createPetUseCase.create({...body, org_id })
    return reply.status(201).send(pet)

  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({
        message: error.message
      })
    }
    return reply.status(500).send({
      message: 'Internal server error'
    })
  }
}