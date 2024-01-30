import prisma from '@/config/db'
import { IPurchaseModel } from './purchase.interfaces'
import { PurchaseModelCreate, PurchaseModelGetAll } from './purchase.types'

export default class PurchaseModel implements IPurchaseModel {
  getAll: PurchaseModelGetAll = async (tenantId) => {
    // TODO: tenantId isn't necessary since it depends only of the dailySaleId
    return await prisma.purchase.findMany({
      where: {
        tenantId
      }
    })
  }

  create: PurchaseModelCreate = async (data) => {
    return await prisma.purchase.createMany({
      data
    })
  }
}
