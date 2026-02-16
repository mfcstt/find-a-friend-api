import { env } from "@/env";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateOrgsUseCase } from "@/use-cases/factories/make-authenticate-orgs-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function AuthenticateOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
){
  const bodySchema = z.object({
    email: z.email(),
    password: z.string()
  })
  
  const body = bodySchema.parse(request.body)
  const authenticateOrgUseCase = makeAuthenticateOrgsUseCase()

  try {
    const { org } = await authenticateOrgUseCase.authenticate(body)
    
    const token = await reply.jwtSign({}, {
      sign: {
        sub: org.id
      }
    })

    const refreshToken = await reply.jwtSign({}, {
      sign: {
        sub: org.id,
        expiresIn: "7d",
      },
    })

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if(error instanceof InvalidCredentialsError){
      return reply.status(400).send({message: error.message})
    }
    throw error
  }
}