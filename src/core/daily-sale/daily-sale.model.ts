import prisma from '@/config/db'
import { IDailySaleModel } from './daily-sale.interfaces'
import { DailySaleModelCreate, DailySaleModelGetAll } from './daily-sale.types'

export default class DailySaleModel implements IDailySaleModel {
  getAll: DailySaleModelGetAll = async (tenantId) => {
    return await prisma.dailySale.findMany({
      where: {
        tenantId
      }
    })
  }

  create: DailySaleModelCreate = async (tenantId) => {
    return await prisma.dailySale.create({
      data: {
        tenant: {
          connect: {
            id: tenantId
          }
        }
      }
    })
  }
}
