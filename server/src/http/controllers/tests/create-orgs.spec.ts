import { app } from "@/app";
import { describe } from "vitest";
import request from "supertest";
import { makeOrgFactory } from "@/use-cases/factories/tests/make-org-factory";

describe('Create Orgs (e2e)', () => {

  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })


  it('should be able to create a new org', async () => {
      const org = await request(app.server).post('/orgs').send(makeOrgFactory())

      expect(org.statusCode).toEqual(201)
  })
})