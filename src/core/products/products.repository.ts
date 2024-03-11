import prisma from '@/config/db'
import { IProductRepository } from './products.interfaces'
import {
  ProductsRepositoryCreateMany,
  ProductsRepositoryDelete,
  ProductsRepositoryGetAll,
  ProductsRepositoryGetManyById,
  ProductsRepositoryGetOneById,
  ProductsRepositoryUpdateMany
} from './products.types'

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
        },
        include: {
          productsHistory: true
        }
      }))
    }

    const partialCreatedProducts = await prisma.$transaction(pendentProducts)

    const pendentProductWithHistoryId = []

    for (const partialCreatedProduct of partialCreatedProducts) {
      const latestProductHistoryId = partialCreatedProduct.productsHistory[0].id
      pendentProductWithHistoryId.push(
        prisma.product.update({
          where: {
            id: partialCreatedProduct.id
          },
          data: {
            latestProductHistoryId
          }
        })
      )
    }

    const fullyCreatedProducts = await prisma.$transaction(pendentProductWithHistoryId)

    return fullyCreatedProducts
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
                {
                  name: product.name,
                  price: product.price,
                  tenantId: product.tenantId,
                  currencyId: product.currencyId,
                  description: product.description,
                  stock: product.stock,
                  barCode: product.barCode,
                  companyId: product.companyId
                }
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
