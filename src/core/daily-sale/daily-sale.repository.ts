import prisma from '@/config/db'
import { IDailySaleRepository } from './daily-sale.interfaces'
import { DailySaleRepositoryCreate, DailySaleRepositoryGetAll, DailySaleRepositoryGetOneById } from './daily-sale.types'

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
}