import type { OrgCreateInput } from "generated/prisma/models";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";


export class PrismaOrgsRepository implements OrgsRepository{
  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({
      data
    })
    return org
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    })
    return org
  }
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id
      }
    })
    return org
  }
  
}