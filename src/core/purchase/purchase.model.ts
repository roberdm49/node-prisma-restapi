import prisma from '@/db'
import { IPurchaseModel } from './purchase.interfaces'
import { PurchaseModelGetAll } from './purchase.types'

export default class PurchaseModel implements IPurchaseModel {
  getAll: PurchaseModelGetAll = async () => {
    return await prisma.purchase.findMany()
  }
}
