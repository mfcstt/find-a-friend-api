import type { Org } from "generated/prisma/client";
import type { OrgCreateInput } from "generated/prisma/models";
import type { OrgsRepository } from "../orgs-repository";
import { Decimal } from "generated/prisma/internal/prismaNamespace";


export class InMemoryOrgsRepository implements OrgsRepository{
    public items : Org[] = [];


  async create(data: OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }
    this.items.push(org);
    return org;
  }
  
  async findByEmail(email: string) {
    return this.items.find(item => item.email === email) || null;
  }

  async findById(id: string) {
    return this.items.find(item => item.id === id) || null;
  }

}