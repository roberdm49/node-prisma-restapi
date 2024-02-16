import { RequestHandler } from 'express'
import {
  DailySaleModelCreate,
  DailySaleModelGetAll,
  DailySaleModelGetOneById,
  DailySaleServiceCreate,
  DailySaleServiceGetAll
} from './daily-sale.types'

export interface IDailySaleModel {
  getAll: DailySaleModelGetAll
  create: DailySaleModelCreate
  getOneById: DailySaleModelGetOneById
}

export interface IDailySaleService {
  getAll: DailySaleServiceGetAll
  create: DailySaleServiceCreate
}

export interface IDailySaleController {
  getAll: RequestHandler
  create: RequestHandler
}
