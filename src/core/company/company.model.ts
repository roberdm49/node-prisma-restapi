import prisma from '@/config/db'
import { CompanyModelCreate, CompanyModelGetAll } from './company.types'
import { ICompanyModel } from './company.interface'

export default class CompanyModel implements ICompanyModel {
  getAll: CompanyModelGetAll = async (tenantId) => {
    const companies = await prisma.company.findMany({
      where: {
        tenantId
      }
    })
    return companies
  }

  create: CompanyModelCreate = async (tenantId, company) => {
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

  /*
  createWithNewProducts: CompanyModelCreate = async (tenantId, company, products) => {
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
            id: tenantId
          }
        },
        products: {
          connect: await prisma.$transaction(productsToAdd)
        }
      }
    })

    return newCompany
  }
  */
}
