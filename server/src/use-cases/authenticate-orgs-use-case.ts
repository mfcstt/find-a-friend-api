import type { OrgsRepository } from "@/repositories/orgs-repository"
import type { Org } from "generated/prisma/client"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { compare } from "bcryptjs"

interface AuthenticateOrgsUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgsUseCaseResponse {
  org: Org
}

export class AuthenticateOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository){}

  async authenticate({
    email,
    password
  }: AuthenticateOrgsUseCaseRequest): Promise<AuthenticateOrgsUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches){
      throw new InvalidCredentialsError()
    }


    return {
      org,
    }
  }
}