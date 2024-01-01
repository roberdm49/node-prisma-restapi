import { RequestHandler } from 'express'
import {
  DailySaleModelGetAll,
  DailySaleServiceGetAll
} from './daily-sale.types'

export interface IDailySaleModel {
  getAll: DailySaleModelGetAll
}

export interface IDailySaleService {
  getAll: DailySaleServiceGetAll
}

export interface IDailySaleController {
  getAll: RequestHandler
}
