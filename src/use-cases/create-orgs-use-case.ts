import type { OrgsRepository } from "@/repositories/orgs-repository";
import type { Org } from "generated/prisma/client";
import { OrgsAlreadyExistsError } from "./errors/org-alredy-exists-error";
import { hash } from "bcryptjs";

interface CreateOrgUseCaseRequest {
  author_name: string
  email: string
  password: string
  whatsapp: string

  cep: string
  state: string
  city: string
  neighborhood: string
  street: string

  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}


export class CreateOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository){}

  async create({
    author_name, 
    email,
    password, 
    whatsapp, 
    cep, 
    state, 
    city, 
    neighborhood, 
    street, 
    latitude, 
    longitude}: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
  
  const orgByEmail = await this.orgsRepository.findByEmail(email)

  if (orgByEmail) {
    throw new OrgsAlreadyExistsError()
  }

  const passwordHash = await hash(password, 6)

  const org = await this.orgsRepository.create({
    author_name,
    email,
    password: passwordHash,
    whatsapp,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude
  })

  return {
    org,
  }
  }
}