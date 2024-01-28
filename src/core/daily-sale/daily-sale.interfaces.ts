import { RequestHandler } from 'express'
import {
  DailySaleModelCreate,
  DailySaleModelGetAll,
  DailySaleServiceCreate,
  DailySaleServiceGetAll
} from './daily-sale.types'

export interface IDailySaleModel {
  getAll: DailySaleModelGetAll
  create: DailySaleModelCreate
}

export interface IDailySaleService {
  getAll: DailySaleServiceGetAll
  create: DailySaleServiceCreate
}

export interface IDailySaleController {
  getAll: RequestHandler
  create: RequestHandler
}
