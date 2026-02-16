import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'
import { email } from 'zod'

type Overwrite = {
  password?: string
  city?: string
  email?: string
}

export function makeOrgFactory(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    author_name: faker.person.fullName(),
    email: overwrite?.email ?? faker.internet.email(),
    password: overwrite?.password ?? faker.internet.password(),
    whatsapp: faker.phone.number(),

    cep: faker.location.zipCode(),
    city: overwrite?.city ?? faker.location.city(),
    state: faker.location.state(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
  }
}