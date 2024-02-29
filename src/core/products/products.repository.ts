import prisma from '@/config/db'
import { IProductRepository } from './products.interfaces'
import { ProductsRepositoryCreateMany, ProductsRepositoryDelete, ProductsRepositoryGetAll, ProductsRepositoryGetManyById, ProductsRepositoryGetOneById, ProductsRepositoryUpdateMany } from './products.types'

export default class ProductsRepository implements IProductRepository {
  createMany: ProductsRepositoryCreateMany = async (productsToCreateWithTenantId) => {
    const pendentProducts = []

    for (const product of productsToCreateWithTenantId) {
      pendentProducts.push(prisma.product.create({
        data: {
          ...product,
          productsHistory: {
            create: [
              { ...product }
            ]
          }
        }
      }))
    }

    const createdProducts = await prisma.$transaction(pendentProducts)

    return createdProducts.length
  }

  getAll: ProductsRepositoryGetAll = async (tenantId) => {
    const products = await prisma.product.findMany({
      where: {
        tenantId
      }
    })

    return products
  }

  getManyById: ProductsRepositoryGetManyById = async (productIds) => {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    })

    return products
  }

  updateMany: ProductsRepositoryUpdateMany = async (tenantId, products) => {
    const productsToUpdate = []

    for (const product of products) {
      productsToUpdate.push(
        prisma.product.update({
          where: {
            id: product.id,
            tenantId
          },
          data: {
            ...product,
            productsHistory: {
              create: [
                { ...product }
              ]
            }
          }
        })
      )
    }

    return await prisma.$transaction(productsToUpdate)
  }

  deleteMany: ProductsRepositoryDelete = async (tenantId, ids) => {
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

  getOneById: ProductsRepositoryGetOneById = async (productId) => {
    return await prisma.product.findUnique({
      where: {
        id: productId
      }
    })
  }
}