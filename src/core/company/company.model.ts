import prisma from '@/db'
import { TCompanyModelGetAll } from './company.types'

export default class CompanyModel {
  getAll: TCompanyModelGetAll = async () => {
    const companies = await prisma.company.findMany()
    return companies
  }
}
