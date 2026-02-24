export type PetAge = "FILHOTE" | "ADULTO" | "IDOSO"
export type PetSize = "PEQUENO" | "MEDIO" | "GRANDE"
export type PetEnergyLevel = "BAIXA" | "MEDIA" | "ALTA"
export type PetIndependenceLevel = "BAIXO" | "MEDIO" | "ALTO"
export type PetEnvironment = "AMBIENTE_AMPLO" | "APARTAMENTO" | "AMBIENTE_REDUZIDO"

export interface Org {
  id: string
  author_name: string
  email: string
  whatsapp: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

export interface Pet {
  id: string
  name: string
  about: string
  age: PetAge
  size: PetSize
  energy_level: PetEnergyLevel
  independence_level: PetIndependenceLevel
  environment: PetEnvironment
  pictures: string[]
  requirements: string[]
  org_id: string
}

export interface CreateOrgInput {
  author_name: string
  email: string
  password: string
  whatsapp: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

export interface AuthenticateOrgInput {
  email: string
  password: string
}

export interface AuthenticateOrgOutput {
  token: string
}

export interface CreatePetInput {
  name: string
  about: string
  age: PetAge
  size: PetSize
  energy_level: PetEnergyLevel
  independence_level: PetIndependenceLevel
  environment: PetEnvironment
  pictures: string[]
  requirements: string[]
}

export interface FilterPetsInput {
  city: string
  age?: PetAge
  size?: PetSize
  energy_level?: PetEnergyLevel
  independence_level?: PetIndependenceLevel
  environment?: PetEnvironment
}