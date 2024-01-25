import prisma from '@/config/db'
import { IPurchaseModel } from './purchase.interfaces'
import { PurchaseModelGetAll } from './purchase.types'

export default class PurchaseModel implements IPurchaseModel {
  getAll: PurchaseModelGetAll = async () => {
    return await prisma.purchase.findMany()
  }
}
