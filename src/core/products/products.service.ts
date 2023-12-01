import { Prisma, PrismaClient } from '@prisma/client'
import { ProductInterface } from '@/interfaces/Product'

const prisma = new PrismaClient()

const createProducts = async (productsToCreate: ProductInterface[]): Promise<Prisma.BatchPayload> => {
  const products = await prisma.product.createMany({
    data: productsToCreate
  })

  return products
}

const getProducts = async () => {
  const products = await prisma.product.findMany()
  return products
}

export default {
  createProducts,
  getProducts
}
