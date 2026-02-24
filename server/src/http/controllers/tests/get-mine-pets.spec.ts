import { app } from "@/app"
import { makeOrgFactory } from "@/use-cases/factories/tests/make-org-factory"
import { makePetFactory } from "@/use-cases/factories/tests/make-pet-factory"
import request from "supertest"
import { afterAll, beforeEach, describe, expect, it } from "vitest"

describe("Get mine pets (e2e)", () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to list authenticated org pets", async () => {
    const orgOneEmail = "mine-pets-1@example.com"
    const orgTwoEmail = "mine-pets-2@example.com"
    const password = "123456"

    await request(app.server)
      .post("/orgs")
      .send(makeOrgFactory({ email: orgOneEmail, password, city: "Recife" }))

    await request(app.server)
      .post("/orgs")
      .send(makeOrgFactory({ email: orgTwoEmail, password, city: "Recife" }))

    const authOrgOne = await request(app.server).post("/orgs/authenticate").send({
      email: orgOneEmail,
      password,
    })

    const authOrgTwo = await request(app.server).post("/orgs/authenticate").send({
      email: orgTwoEmail,
      password,
    })

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authOrgOne.body.token}`)
      .send(makePetFactory())

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authOrgOne.body.token}`)
      .send(makePetFactory())

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authOrgTwo.body.token}`)
      .send(makePetFactory())

    const response = await request(app.server)
      .get("/pets/mine")
      .set("Authorization", `Bearer ${authOrgOne.body.token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it("should not be able to list mine pets without token", async () => {
    const response = await request(app.server).get("/pets/mine")

    expect(response.statusCode).toBe(401)
  })
})
