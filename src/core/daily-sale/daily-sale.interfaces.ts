import { RequestHandler } from 'express'
import {
  DailySaleModelCreate,
  DailySaleModelGetAll,
  DailySaleModelGetManyByTenantId,
  DailySaleModelGetOneById,
  DailySaleServiceCreate,
  DailySaleServiceGetAll,
  DailySaleServiceGetManyByTenantId
} from './daily-sale.types'

export interface IDailySaleModel {
  getAll: DailySaleModelGetAll
  create: DailySaleModelCreate
  getOneById: DailySaleModelGetOneById
  getManyByTenantId: DailySaleModelGetManyByTenantId

}

export interface IDailySaleService {
  getAll: DailySaleServiceGetAll
  create: DailySaleServiceCreate
  getManyByTenantId: DailySaleServiceGetManyByTenantId
}

export interface IDailySaleController {
  getAll: RequestHandler
  create: RequestHandler
}
