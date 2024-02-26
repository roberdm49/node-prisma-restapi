import { RequestHandler } from 'express'
import {
  DailySaleRepositoryCreate,
  DailySaleRepositoryGetAll,
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
