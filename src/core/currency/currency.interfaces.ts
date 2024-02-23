import { RequestHandler } from 'express'
import {
  CurrencyModelGetAll,
  CurrencyModelGetLastDailyExchangeRate,
  CurrencyModelGetLastDailyExchangeRateByCurrencyId,
  CurrencyServiceGetAll
} from './currency.types'

export interface ICurrencyModel {
  getAll: CurrencyModelGetAll
  getLastDailyExchangeRate: CurrencyModelGetLastDailyExchangeRate
  getLastDailyExchangeRateByCurrencyId: CurrencyModelGetLastDailyExchangeRateByCurrencyId
}

export interface ICurrencyService {
  getAll: CurrencyServiceGetAll
}

export interface ICurrencyController {
  getAll: RequestHandler
}
