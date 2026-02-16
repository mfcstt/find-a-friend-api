import { app } from "@/app";
import { describe } from "vitest";
import request from "supertest";
import { makeOrgFactory } from "@/use-cases/factories/tests/make-org-factory";

describe('Create Org (e2e)', () => {

  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })


  it('should be able to create a new org', async () => {
      const org = await request(app.server).post('/orgs').send(makeOrgFactory())

      expect(org.statusCode).toEqual(201)
  })
})