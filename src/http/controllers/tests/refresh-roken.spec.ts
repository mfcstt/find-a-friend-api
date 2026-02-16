import { app } from "@/app";
import { makeOrgFactory } from "@/use-cases/factories/tests/make-org-factory";
import request from "supertest";
import { describe } from "vitest";

describe('Refresh token controller', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token using the refresh token', async () => {
     await request(app.server).post('/orgs').send(makeOrgFactory({
          email: 'org@example.com', 
          password: '123456'
        }))

        const authResponse = await request(app.server).post('/orgs/authenticate').send({
          email: 'org@example.com',
          password: '123456'
        })

        const cookies = authResponse.get('Set-Cookie') ?? []



        const response = await request(app.server)
          .patch('/orgs/refresh')
          .set('Cookie', cookies)
          .send()
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
          expect.objectContaining({
            token: expect.any(String)
          })
        )
        expect(response.get('Set-Cookie')).toEqual(
          expect.arrayContaining([
            expect.stringContaining('refreshToken=')
          ])
        )
  })
})