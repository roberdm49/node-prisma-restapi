import prisma from '@/db'
import { IDailySaleModel } from './daily-sale.interfaces'
import { TDailySaleModelGetAll } from './daily-sale.types'

export default class DailySaleModel implements IDailySaleModel {
  getAll: TDailySaleModelGetAll = async () => {
    return await prisma.dailySale.findMany()
  }
}
