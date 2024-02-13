import prisma from '@/config/db'
import { BadRequestError } from '@/errors'
import { ErrorClientMessages } from '@/enums/errors'
import { IPurchaseModel } from './purchase.interfaces'
import { Purchase, PurchaseModelCreate, PurchaseModelGetAll } from './purchase.types'

export default class PurchaseModel implements IPurchaseModel {
  getAll: PurchaseModelGetAll = async (tenantId) => {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        dailySales: {
          include: {
            purchases: true
          }
        }
      }
    })

    if (!tenant) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const purchases: Purchase[] = []

    tenant.dailySales.forEach((dailysale) => {
      purchases.push(...dailysale.purchases)
    })

    return purchases
  }

  create: PurchaseModelCreate = async (tenantId, dailySaleId, purchasedItems) => {
    // TODO: split all the logic into small functions and move them to the business layer
    const [tenant, dailySale] = await Promise.all([
      prisma.tenant.findUnique({ where: { id: tenantId } }),
      prisma.dailySale.findUnique({ where: { tenantId, id: dailySaleId } })
    ])

    if (!tenant) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    if (!dailySale) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

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
            product: {
              connect: { id: purchasedItem.productId }
            },
            currencySnapshot: {
              connect: { id: purchasedItem.currencySnapshotId }
            }
          }))
        }
      },
      include: {
        purchasedItems: true
      }
    })

    return newPurchase
  }
}
