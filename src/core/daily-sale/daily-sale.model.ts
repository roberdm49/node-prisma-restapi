import prisma from '@/db'
import { IDailySaleModel } from './daily-sale.interfaces'
import { DailySaleModelGetAll } from './daily-sale.types'

export default class DailySaleModel implements IDailySaleModel {
  getAll: DailySaleModelGetAll = async () => {
    return await prisma.dailySale.findMany()
  }
}
