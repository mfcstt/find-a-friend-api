import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string
}

export function makeOrgFactory(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    author_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: overwrite?.password ?? faker.internet.password(),
    whatsapp: faker.phone.number(),

    cep: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),

    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  }
}