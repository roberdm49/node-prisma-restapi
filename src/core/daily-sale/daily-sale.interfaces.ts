import { RequestHandler } from 'express'
import {
  DailySaleRepositoryCreate,
  DailySaleRepositoryGetAll,
  DailySaleRepositoryGetOneByDate,
  DailySaleRepositoryGetOneById,
  DailySaleServiceCreate,
  DailySaleServiceDailySaleBelongToTenant,
  DailySaleServiceGetAll,
  DailySaleServiceGetOneById
} from './daily-sale.types'

export interface IDailySaleRepository {
  getAll: DailySaleRepositoryGetAll
  create: DailySaleRepositoryCreate
  getOneById: DailySaleRepositoryGetOneById
  getOneByDate: DailySaleRepositoryGetOneByDate
}

export interface IDailySaleService {
  getAll: DailySaleServiceGetAll
  create: DailySaleServiceCreate
  getOneById: DailySaleServiceGetOneById
  dailySaleBelongToTenant: DailySaleServiceDailySaleBelongToTenant
}

export interface IDailySaleController {
  getAll: RequestHandler
  create: RequestHandler
}
