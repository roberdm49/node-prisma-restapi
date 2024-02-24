import prisma from '@/config/db'
import { IPurchaseModel } from './purchase.interfaces'
import { Purchase, PurchaseModelCreate, PurchaseModelGetAll } from './purchase.types'

export default class PurchaseModel implements IPurchaseModel {
  getAll: PurchaseModelGetAll = async (tenantId) => {
    const dailySales = await prisma.dailySale.findMany({
      where: {
        tenantId
      },
      include: {
        purchases: true
      }
    })

    const nestedPurchases: Purchase[] = []

    for (const dailySale of dailySales) {
      nestedPurchases.push(...dailySale.purchases)
    }

    const flatPurchases = nestedPurchases.flat()
    return flatPurchases
  }

  create: PurchaseModelCreate = async (dailySaleId, purchasedItems) => {
    const newPurchase = await prisma.purchase.create({
      data: {
        dailySale: {
          connect: {
            id: dailySaleId
          }
        },
        purchasedItems: {
          create: purchasedItems.map(purchasedItem => ({
            quantity: purchasedItem.quantity,
            unitPrice: purchasedItem.unitPrice,
            productHistory: {
              connect: { id: purchasedItem.productHistoryId }
            },
            dailyExchangeRate: {
              connect: { id: purchasedItem.dailyExchangeRateId }
            }
          }))
        }
      },
      include: {
        purchasedItems: true
      }
    })

    return newPurchase.purchasedItems.length
  }
}
