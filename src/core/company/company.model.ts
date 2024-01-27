import prisma from '@/config/db'
import { CompanyModelCreate, CompanyModelGetAll } from './company.types'
import { ICompanyModel } from './company.interface'

export default class CompanyModel implements ICompanyModel {
  getAll: CompanyModelGetAll = async () => {
    const companies = await prisma.company.findMany()
    return companies
  }

  create: CompanyModelCreate = async (company, products) => {
    const productsToAdd = []

    for (const product of products) {
      productsToAdd.push(
        prisma.product.create({
          data: {
            ...product
          }
        })
      )
    }

    const newCompany = await prisma.company.create({
      data: {
        name: company.name,
        tenant: {
          connect: {
            id: company.tenantId
          }
        },
        products: {
          connect: await prisma.$transaction(productsToAdd)
        }
      }
    })

    return newCompany
  }
}
