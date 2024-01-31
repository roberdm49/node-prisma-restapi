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

  create: PurchaseModelCreate = async (data) => {
    return await prisma.purchase.createMany({
      data
    })
  }
}
