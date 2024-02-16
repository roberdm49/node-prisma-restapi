import prisma from '@/config/db'
import { IDailySaleModel } from './daily-sale.interfaces'
import { DailySaleModelCreate, DailySaleModelGetAll, DailySaleModelGetOneById } from './daily-sale.types'

export default class DailySaleModel implements IDailySaleModel {
  getAll: DailySaleModelGetAll = async (tenantId) => {
    return await prisma.dailySale.findMany({
      where: {
        tenantId
      }
    })
  }

  getOneById: DailySaleModelGetOneById = async (dailySaleId: string) => {
    return await prisma.dailySale.findUnique({
      where: {
        id: dailySaleId
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
