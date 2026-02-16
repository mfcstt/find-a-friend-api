import { app } from '@/app'
import { makeOrgFactory } from '@/use-cases/factories/tests/make-org-factory'
import { makePetFactory } from '@/use-cases/factories/tests/make-pet-factory'
import { e } from 'node_modules/@faker-js/faker/dist/airline-Dz1uGqgJ'
import request from 'supertest'
import { describe, it, beforeEach, afterAll, expect } from 'vitest'

describe('Filter Pet (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to filter pets by their characteristics', async () => {
    await request(app.server).post('/orgs').send(makeOrgFactory({email: 'test@example.com', password: 'password', city: 'Porto Alegre'}))

    const authenticateResponse = await request(app.server)
    .post('/orgs/authenticate')
    .send({
      email: 'test@example.com',
      password: 'password'
    })

   await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
    .send(makePetFactory({
      age: 'ADULTO'
    }))

    await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
    .send(makePetFactory({
      age: 'FILHOTE'
    }))

    await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
    .send(makePetFactory({
      age: 'FILHOTE'
    }))

    const response = await request(app.server).get(`/pets?city=Porto Alegre&age=FILHOTE`)

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
