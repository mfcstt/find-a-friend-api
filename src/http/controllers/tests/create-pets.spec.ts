import { app } from '@/app'
import { makeOrgFactory } from '@/use-cases/factories/tests/make-org-factory'
import { makePetFactory } from '@/use-cases/factories/tests/make-pet-factory'
import { e } from 'node_modules/@faker-js/faker/dist/airline-Dz1uGqgJ'
import request from 'supertest'
import { describe, it, beforeEach, afterAll, expect } from 'vitest'

describe('Create pets(e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {

    // create an org and authenticate to be able to create a pet
    const org = await request(app.server).post('/orgs').send(makeOrgFactory({email: 'test@example.com', password: 'password'}))
    const authenticateResponse = await request(app.server)
    .post('/orgs/authenticate')
    .send({
      email: 'test@example.com',
      password: 'password'
    })

    // create a pet
    const response = await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
    .send(makePetFactory())

    expect(response.statusCode).toBe(201)
  })
})
