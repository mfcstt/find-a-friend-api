import type { Org } from "generated/prisma/client"

import type { OrgsRepository } from "@/repositories/orgs-repository"
import { OrgNotFoundError } from "./errors/org-not-found-error"

interface GetAuthenticatedOrgUseCaseRequest {
  org_id: string
}

interface GetAuthenticatedOrgUseCaseResponse {
  org: Org
}

export class GetAuthenticatedOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async getAuthenticatedOrg({ org_id }: GetAuthenticatedOrgUseCaseRequest): Promise<GetAuthenticatedOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    return {
      org,
    }
  }
}
