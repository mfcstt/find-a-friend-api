import type { FastifyReply, FastifyRequest } from "fastify"

import { makeGetMinePetsUseCase } from "@/use-cases/factories/make-get-mine-pets-use-case"

export async function getMinePetsController(request: FastifyRequest, reply: FastifyReply) {
  const org_id = (request.user as { sub: string }).sub

  const getMinePetsUseCase = makeGetMinePetsUseCase()

  const { pets } = await getMinePetsUseCase.getMinePets({ org_id })

  return reply.status(200).send({ pets })
}
