import { PrismaClient } from '@prisma/client'
import { IProductModel } from './products.interfaces'
import { TProductsModelCreate, TProductsModelGetAll } from './products.types'

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
}
