import prisma from '@/db'
import { IProductModel } from './products.interfaces'
import { ProductsModelCreate, ProductsModelDelete, ProductsModelGetAll, ProductsModelUpdateMany } from './products.types'

export default class ProductsModel implements IProductModel {
  create: ProductsModelCreate = async (productsToCreate) => {
    const products = await prisma.product.createMany({
      data: productsToCreate
    })

    return products.count
  }

  getAll: ProductsModelGetAll = async () => {
    const products = await prisma.product.findMany()

    return products
  }

  updateMany: ProductsModelUpdateMany = async (products) => {
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

  deleteMany: ProductsModelDelete = async (ids) => {
    const productsToDelete = []

    for (const id of ids) {
      productsToDelete.push(
        prisma.product.delete({
          where: {
            id
          }
        })
      )
    }

    return await prisma.$transaction(productsToDelete)
  }
}
