import prisma from '@/config/db'
import { IDailySaleRepository } from './daily-sale.interfaces'
import { DailySaleRepositoryClose, DailySaleRepositoryCreate, DailySaleRepositoryGetAll, DailySaleRepositoryGetOneByDate, DailySaleRepositoryGetOneById } from './daily-sale.types'

export default class DailySaleRepository implements IDailySaleRepository {
  getAll: DailySaleRepositoryGetAll = async (tenantId) => {
    return await prisma.dailySale.findMany({
      where: {
        tenantId
      }
    })
  }

  getOneById: DailySaleRepositoryGetOneById = async (dailySaleId: string) => {
    return await prisma.dailySale.findUnique({
      where: {
        id: dailySaleId
      }
    })
  }

  create: DailySaleRepositoryCreate = async (tenantId) => {
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

  getOneByDate: DailySaleRepositoryGetOneByDate = async (tenantId, currentDate) => {
    const foundDate = await prisma.dailySale.findFirst({
      where: {
        tenantId,
        saleDate: {
          gte: new Date(new Date(currentDate).setHours(0, 0, 0)),
          lte: new Date(new Date(currentDate).setHours(23, 59, 59))
        }
      }
    })

    return foundDate
  }

  close: DailySaleRepositoryClose = async (dailySale) => {
    return await prisma.dailySale.update({
      where: {
        id: dailySale.id
      },
      data: {
        closed: true
      }
    })
  }
}
