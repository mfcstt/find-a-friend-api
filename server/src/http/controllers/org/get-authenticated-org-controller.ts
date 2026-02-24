import type { FastifyReply, FastifyRequest } from "fastify"

import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error"
import { makeGetAuthenticatedOrgUseCase } from "@/use-cases/factories/make-get-authenticated-org-use-case"

export async function getAuthenticatedOrgController(request: FastifyRequest, reply: FastifyReply) {
  const org_id = (request.user as { sub: string }).sub
  const getAuthenticatedOrgUseCase = makeGetAuthenticatedOrgUseCase()

  try {
    const { org } = await getAuthenticatedOrgUseCase.getAuthenticatedOrg({ org_id })
    const { password: _password, ...orgWithoutPassword } = org

    return reply.status(200).send({ org: orgWithoutPassword })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    return reply.status(500).send({
      message: "Internal server error",
    })
  }
}
