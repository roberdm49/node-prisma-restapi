import prisma from '@/config/db'
import { CompanyModelGetAll } from './company.types'
import { ICompanyModel } from './company.interface'

export default class CompanyModel implements ICompanyModel {
  getAll: CompanyModelGetAll = async () => {
    const companies = await prisma.company.findMany()
    return companies
  }
}
