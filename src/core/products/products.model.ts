import { PrismaClient } from '@prisma/client'
import { IProductModel } from './products.interfaces'
import { TProductsModelCreate, TProductsModelDelete, TProductsModelGetAll, TProductsModelUpdateMany } from './products.types'

const prisma = new PrismaClient()

export default class ProductsModel implements IProductModel {
  create: TProductsModelCreate = async (productsToCreate) => {
    const products = await prisma.product.createMany({
      data: productsToCreate
    })

    return products.count
  }

  getAll: TProductsModelGetAll = async () => {
    const products = await prisma.product.findMany()

    return products
  }

  updateMany: TProductsModelUpdateMany = async (products) => {
    const productsToUpdate = []

    for (const product of products) {
      productsToUpdate.push(
        prisma.product.update({
          where: {
            id: product.id
          },
          data: {
            ...product
          }
        })
      )
    }

    return await prisma.$transaction(productsToUpdate)
  }

  delete: TProductsModelDelete = async (id) => {
    return await prisma.product.delete({
      where: {
        id
      }
    })
  }
}
