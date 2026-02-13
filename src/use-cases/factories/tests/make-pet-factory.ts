import { en, faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  org_id?: string
}


export function makePetFactory(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: faker.helpers.arrayElement(['FILHOTE', 'ADULTO', 'IDOSO']),
    size: faker.helpers.arrayElement(['PEQUENO', 'MEDIO', 'GRANDE']),
    energy_level: faker.helpers.arrayElement(['BAIXA', 'MEDIA', 'ALTA']),
    independence_level: faker.helpers.arrayElement(['BAIXO', 'MEDIO', 'ALTO']),
    environment: faker.helpers.arrayElement(['AMBIENTE_AMPLO', 'APARTAMENTO', 'AMBIENTE_REDUZIDO']),
    pictures: [faker.image.url()],
    requirements: [faker.lorem.sentence()],
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
  }

}