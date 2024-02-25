import { RequestHandler } from 'express'
import {
  CurrencyModelCreateNewCurrencyHistories,
  CurrencyModelGetAll,
  CurrencyModelGetManyByIsoCodes,
  CurrencyModelUpdateCurrencyWithLatestExchangeRates,
  CurrencyServiceCreateNewCurrencyHistories,
  CurrencyServiceGetAll,
  CurrencyServiceGetManyByIsoCodes,
  CurrencyServiceUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export interface ICurrencyModel {
  getAll: CurrencyModelGetAll
  createNewCurrencyHistories: CurrencyModelCreateNewCurrencyHistories
  getManyByIsoCodes: CurrencyModelGetManyByIsoCodes
  updateCurrencyWithLatestExchangeRates: CurrencyModelUpdateCurrencyWithLatestExchangeRates
}

export interface ICurrencyService {
  getAll: CurrencyServiceGetAll
  createNewCurrencyHistories: CurrencyServiceCreateNewCurrencyHistories
  getManyByIsoCodes: CurrencyServiceGetManyByIsoCodes
  updateCurrencyWithLatestExchangeRates: CurrencyServiceUpdateCurrencyWithLatestExchangeRates
}

export interface ICurrencyController {
  getAll: RequestHandler
  createNewCurrencyHistories: RequestHandler
}
