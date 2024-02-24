import { RequestHandler } from 'express'
import {
  CurrencyModelGetAll,
  CurrencyServiceGetAll
} from './currency.types'

export interface ICurrencyModel {
  getAll: CurrencyModelGetAll
}

export interface ICurrencyService {
  getAll: CurrencyServiceGetAll
}

export interface ICurrencyController {
  getAll: RequestHandler
}
