import prisma from '@/db'
import { TCompanyModelGetAll } from './company.types'
import { ICompanyModel } from './company.interface'

export default class CompanyModel implements ICompanyModel {
  getAll: TCompanyModelGetAll = async () => {
    const companies = await prisma.company.findMany()
    return companies
  }
}
