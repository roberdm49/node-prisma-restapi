import prisma from '@/config/db'
import { CompanyRepositoryCreate, CompanyRepositoryGetAll } from './company.types'
import { ICompanyRepository } from './company.interface'

export default class CompanyRepository implements ICompanyRepository {
  getAll: CompanyRepositoryGetAll = async (tenantId) => {
    const companies = await prisma.company.findMany({
      where: {
        tenantId
      }
    })
    return companies
  }

  create: CompanyRepositoryCreate = async (tenantId, company) => {
    return await prisma.company.create({
      data: {
        name: company.name,
        tenant: {
          connect: {
            id: tenantId
          }
        }
      }
    })
  }
}
