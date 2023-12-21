import { PrismaClient } from '@prisma/client'
import { TCompanyModelGetAll } from './company.types'

const prisma = new PrismaClient()

export default class CompanyModel {
  getAll: TCompanyModelGetAll = async () => {
    const companies = await prisma.company.findMany()
    return companies
  }
}
