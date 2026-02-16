import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";



export async function CreateOrgController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    author_name: z.string(),
    email: z.email(),
    password: z.string(),
    whatsapp: z.string(),

    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
  })

  const body = bodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.create(body)
    return reply.status(201).send({org})
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({
        message: err.message
      })
    }

  }}