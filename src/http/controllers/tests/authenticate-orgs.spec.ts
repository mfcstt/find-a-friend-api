import { app } from "@/app"
import { describe, it } from "vitest"
import request from "supertest"
import { makeOrgFactory } from "@/use-cases/factories/tests/make-org-factory"

describe('Authenticate Orgs (e2e)', () => {

  beforeEach(()=> {
    app.ready()
  })

  afterAll(()=> {
    app.close()
  })

  it('should be able to authenticate a org', async () => {
    await request(app.server).post('/orgs').send(makeOrgFactory({
      email: 'org@example.com', 
      password: '123456'
    }))

    const response = await request(app.server).post('/orgs/authenticate').send({
      email: 'org@example.com',
      password: '123456'
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String)
      })
    )
  })
})

