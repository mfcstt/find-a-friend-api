import { app } from "@/app"
import { makeOrgFactory } from "@/use-cases/factories/tests/make-org-factory"
import request from "supertest"
import { afterAll, beforeEach, describe, expect, it } from "vitest"

describe("Get authenticated org (e2e)", () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get authenticated org data", async () => {
    const email = "org.me@example.com"
    const password = "123456"

    const orgPayload = makeOrgFactory({
      email,
      password,
    })

    await request(app.server).post("/orgs").send(orgPayload)

    const authenticateResponse = await request(app.server).post("/orgs/authenticate").send({
      email,
      password,
    })

    const response = await request(app.server)
      .get("/orgs/me")
      .set("Authorization", `Bearer ${authenticateResponse.body.token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        author_name: orgPayload.author_name,
        email,
        city: orgPayload.city,
        state: orgPayload.state,
        street: orgPayload.street,
      }),
    )
    expect(response.body.org.password).toBeUndefined()
  })

  it("should not be able to get authenticated org data without token", async () => {
    const response = await request(app.server).get("/orgs/me")

    expect(response.statusCode).toBe(401)
  })
})
