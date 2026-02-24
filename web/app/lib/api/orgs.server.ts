import { backendRequest } from "~/lib/api/backend-client.server"
import type {
  AuthenticateOrgInput,
  AuthenticateOrgOutput,
  CreateOrgInput,
  Org,
} from "~/lib/api/types"

interface CreateOrgResponse {
  org: Org
}

interface GetAuthenticatedOrgResponse {
  org: Org
}

export async function createOrg(input: CreateOrgInput) {
  const result = await backendRequest<CreateOrgResponse>("/orgs", {
    method: "POST",
    body: input,
  })

  return result.org
}

export async function authenticateOrg(input: AuthenticateOrgInput) {
  return backendRequest<AuthenticateOrgOutput>("/orgs/authenticate", {
    method: "POST",
    body: input,
  })
}

export async function getAuthenticatedOrg(token: string) {
  const result = await backendRequest<GetAuthenticatedOrgResponse>("/orgs/me", {
    token,
  })

  return result.org
}