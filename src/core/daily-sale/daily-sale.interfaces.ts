import { RequestHandler } from 'express'
import {
  DailySaleModelCreate,
  DailySaleModelGetAll,
  DailySaleModelGetOneById,
  DailySaleServiceCreate,
  DailySaleServiceDailySaleBelongToTenant,
  DailySaleServiceGetAll,
  DailySaleServiceGetOneById
} from './daily-sale.types'

export interface IDailySaleModel {
  getAll: DailySaleModelGetAll
  create: DailySaleModelCreate
  getOneById: DailySaleModelGetOneById
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
