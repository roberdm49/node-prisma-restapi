import { RequestHandler } from 'express'
import {
  TDailySaleModelGetAll,
  TDailySaleServiceGetAll
} from './daily-sale.types'

export interface IDailySaleModel {
  getAll: TDailySaleModelGetAll
}

export interface IDailySaleService {
  getAll: TDailySaleServiceGetAll
}

export interface IDailySaleServiceContructor {
  dailySaleModel: IDailySaleModel
}

export interface IDailySaleController {
  getAll: RequestHandler
}

export interface IDailySaleControllerConstructor {
  dailySaleService: IDailySaleService
}

export interface IDailySale {
  id?: string
  saleDate: Date
  closed: boolean
  tenantId: string
}
