import prisma from '@/config/db'
import { IProductModel } from './products.interfaces'
import { Product, ProductsModelCreateMany, ProductsModelDelete, ProductsModelGetAll, ProductsModelUpdateMany } from './products.types'

export default class ProductsModel implements IProductModel {
  createMany: ProductsModelCreateMany = async (productsToCreateWithTenantId) => {
    const products = await prisma.product.createMany({
      data: productsToCreateWithTenantId
    })

    return products.count
  }

  getAll: ProductsModelGetAll = async (tenantId) => {
    const products = await prisma.product.findMany({
      where: {
        tenantId
      }
    })

    return products
  }

  getManyById = async (productIds: string[]): Promise<Product[]> => {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    })

    return products
  }

  updateMany: ProductsModelUpdateMany = async (tenantId, products) => {
    const productsToUpdate = []

    for (const product of products) {
      productsToUpdate.push(
        prisma.product.update({
          where: {
            id: product.id,
            tenantId
          },
          data: {
            ...product
          }
        })
      )
    }

    return await prisma.$transaction(productsToUpdate)
  }

  deleteMany: ProductsModelDelete = async (tenantId, ids) => {
    const productsToDelete = []

    for (const id of ids) {
      productsToDelete.push(
        prisma.product.delete({
          where: {
            id,
            tenantId
          }
        })
      )
    }

    return await prisma.$transaction(productsToDelete)
  }
}
