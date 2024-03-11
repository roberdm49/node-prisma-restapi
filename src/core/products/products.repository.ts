import prisma from '@/config/db'
import { IProductRepository } from './products.interfaces'
import {
  ProductsRepositoryCreateMany,
  ProductsRepositoryDelete,
  ProductsRepositoryGetAll,
  ProductsRepositoryGetManyById,
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
          productsHistory: {
            select: {
              id: true,
              modificationTimestamp: true
            },
            orderBy: {
              modificationTimestamp: 'desc'
            },
            take: 1
          }
        }
      }))
    }

    return await prisma.$transaction(pendentProducts)
  }

  getAll: ProductsRepositoryGetAll = async (tenantId) => {
    const products = await prisma.product.findMany({
      where: {
        tenantId
      },
      include: {
        productsHistory: {
          select: {
            id: true,
            modificationTimestamp: true
          },
          orderBy: {
            modificationTimestamp: 'desc'
          },
          take: 1
        }
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
      },
      include: {
        productsHistory: {
          select: {
            id: true,
            modificationTimestamp: true
          },
          orderBy: {
            modificationTimestamp: 'desc'
          },
          take: 1
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
          },
          include: {
            productsHistory: {
              select: {
                id: true,
                modificationTimestamp: true
              },
              orderBy: {
                modificationTimestamp: 'desc'
              },
              take: 1
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
}
