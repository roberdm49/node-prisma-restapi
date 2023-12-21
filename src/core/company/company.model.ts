import { PrismaClient } from '@prisma/client'
import { TCompanyModelGetAll } from './company.types'

const prisma = new PrismaClient()

export default class CompanyModel {
  getAll: TCompanyModelGetAll = async () => {
    // TODO: replace "productCompany" for "company"
    return await prisma.productCompany.findMany()
  }
}
