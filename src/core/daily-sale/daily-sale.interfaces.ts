import { RequestHandler } from 'express'
import {
  DailySaleRepositoryClose,
  DailySaleRepositoryCreate,
  DailySaleRepositoryGetAll,
  DailySaleRepositoryGetOneByDate,
  DailySaleRepositoryGetOneById,
  DailySaleServiceClose,
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
  close: DailySaleRepositoryClose
}

export interface IDailySaleService {
  getAll: DailySaleServiceGetAll
  create: DailySaleServiceCreate
  getOneById: DailySaleServiceGetOneById
  dailySaleBelongToTenant: DailySaleServiceDailySaleBelongToTenant
  close: DailySaleServiceClose
}

export interface IDailySaleController {
  getAll: RequestHandler
  create: RequestHandler
  close: RequestHandler
}
