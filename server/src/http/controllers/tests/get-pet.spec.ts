import { app } from '@/app'
import { makeOrgFactory } from '@/use-cases/factories/tests/make-org-factory'
import { makePetFactory } from '@/use-cases/factories/tests/make-pet-factory'
import { e } from 'node_modules/@faker-js/faker/dist/airline-Dz1uGqgJ'
import request from 'supertest'
import { describe, it, beforeEach, afterAll, expect } from 'vitest'

describe('Get Pet (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    await request(app.server).post('/orgs').send(makeOrgFactory({email: 'test@example.com', password: 'password'}))

    const authenticateResponse = await request(app.server)
    .post('/orgs/authenticate')
    .send({
      email: 'test@example.com',
      password: 'password'
    })

   const createPetResponse = await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
    .send(makePetFactory())

    const response = await request(app.server).get(`/pets/${createPetResponse.body.id}`)

    expect(response.statusCode).toBe(200)
  })
})
