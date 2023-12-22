import prisma from '@/db'
import { IPurchaseModel } from './purchase.interfaces'
import { TPurchaseModelGetAll } from './purchase.types'

export default class PurchaseModel implements IPurchaseModel {
  getAll: TPurchaseModelGetAll = async () => {
    return await prisma.purchase.findMany()
  }
}
